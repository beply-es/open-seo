import { GscService } from "@/server/features/gsc/services/GscService";
import { GscNotConnectedError } from "@/server/lib/gscErrors";
import { UmamiAnalyticsError } from "@/server/lib/umamiErrors";
import {
  resolveUmamiDateRange,
  UmamiAnalyticsService,
} from "./UmamiAnalyticsService";

type SearchOpportunityInput = {
  projectId: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
};

function shiftDate(value: string, days: number): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function resolveDates(input: SearchOpportunityInput, now: Date) {
  if (input.startDate || input.endDate) {
    return resolveUmamiDateRange(input, "Europe/Madrid", now);
  }
  const today = now.toISOString().slice(0, 10);
  const endDate = shiftDate(today, -3);
  return { startDate: shiftDate(endDate, -27), endDate };
}

function normalizePath(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "(not set)") return null;
  try {
    const path = trimmed.includes("://")
      ? new URL(trimmed).pathname
      : new URL(trimmed, "https://beply.invalid").pathname;
    if (!path.startsWith("/")) return null;
    return path.length > 1 ? path.replace(/\/+$/, "") : path;
  } catch {
    return null;
  }
}

function percentileRanks(values: number[]): number[] {
  if (values.length === 0) return [];
  if (values.length === 1) return [1];
  return values.map((value) => {
    const lower = values.filter((candidate) => candidate < value).length;
    return lower / (values.length - 1);
  });
}

function round(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}

export const UmamiSearchOpportunityService = {
  async getOpportunities(
    input: SearchOpportunityInput,
    opts: { now?: Date } = {},
  ) {
    const limit = input.limit ?? 50;
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new UmamiAnalyticsError(
        "validation_error",
        "limit must be an integer from 1 to 100.",
      );
    }
    const gscConnection = await GscService.getConnection(input.projectId);
    if (!gscConnection) throw new GscNotConnectedError(input.projectId);

    const dates = resolveDates(input, opts.now ?? new Date());
    const [gsc, analytics] = await Promise.all([
      GscService.getPerformance({
        projectId: input.projectId,
        dimensions: ["page"],
        startDate: dates.startDate,
        endDate: dates.endDate,
        rowLimit: 1_000,
        startRow: 0,
        type: "web",
        dataState: "final",
      }),
      UmamiAnalyticsService.getPagePerformance({
        projectId: input.projectId,
        startDate: dates.startDate,
        endDate: dates.endDate,
        breakdown: "page",
        limit: 1_000,
        offset: 0,
      }),
    ]);

    const viewsByPath = new Map<string, number>();
    for (const row of analytics.rows) {
      const path = normalizePath(row.path);
      if (path) viewsByPath.set(path, row.views);
    }

    const candidates = gsc.rows
      .filter((row) => row.position >= 4 && row.position <= 20)
      .map((row) => {
        const page = row.keys?.[0] ?? "";
        const path = normalizePath(page);
        const pageviews = path ? viewsByPath.get(path) : undefined;
        return {
          page,
          normalizedPath: path,
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
          joinStatus:
            pageviews === undefined
              ? ("gsc_only" as const)
              : ("joined" as const),
          analytics: pageviews === undefined ? null : { pageviews },
          score: null as number | null,
          scoreComponents: null as {
            demand: number;
            reachability: number;
            observedTraffic: number;
          } | null,
        };
      });

    const joined = candidates.filter(
      (
        candidate,
      ): candidate is typeof candidate & {
        analytics: { pageviews: number };
      } => candidate.analytics !== null,
    );
    const demand = percentileRanks(
      joined.map((candidate) => Math.log1p(candidate.impressions)),
    );
    const observedTraffic = percentileRanks(
      joined.map((candidate) => Math.log1p(candidate.analytics.pageviews)),
    );
    joined.forEach((candidate, index) => {
      const reachability = Math.max(
        0,
        Math.min(1, (20 - candidate.position) / 16),
      );
      candidate.scoreComponents = {
        demand: round(demand[index] ?? 0),
        reachability: round(reachability),
        observedTraffic: round(observedTraffic[index] ?? 0),
      };
      candidate.score = round(
        100 *
          (0.45 * candidate.scoreComponents.demand +
            0.35 * candidate.scoreComponents.reachability +
            0.2 * candidate.scoreComponents.observedTraffic),
      );
    });

    const sorted = candidates.toSorted((left, right) => {
      if (left.score !== null && right.score === null) return -1;
      if (left.score === null && right.score !== null) return 1;
      if (left.score !== right.score)
        return (right.score ?? 0) - (left.score ?? 0);
      return right.impressions - left.impressions;
    });

    return {
      status: "ok" as const,
      source: {
        providers: ["google_search_console", "beply_analytics"],
        analyticsProvider: "beply_analytics",
        analytics: analytics.source,
      },
      request: { resolvedDateRange: dates, limit },
      rowCount: Math.min(limit, sorted.length),
      totalCandidateRows: sorted.length,
      rows: sorted.slice(0, limit),
      scoring: {
        version: "beply-umami-v1",
        formula:
          "45% demand + 35% reachability + 20% observed aggregate traffic",
        unscoredRule:
          "Rows without an aggregate Beply Analytics page match remain visible and unscored.",
      },
      coverage: {
        matchedRows: joined.length,
        unmatchedRows: candidates.length - joined.length,
        matchRate:
          candidates.length > 0 ? round(joined.length / candidates.length) : 0,
      },
      truncated: {
        gscRows: gsc.rows.length === 1_000,
        analyticsRows: analytics.rows.length === 1_000,
        resultRows: sorted.length > limit,
      },
      warnings: [
        "Beply Analytics pageviews include all acquisition channels; GSC clicks and analytics pageviews are not equivalent.",
        "Cookie-free consent coverage and bot filtering can leave valid GSC pages unmatched.",
      ],
      reportMetadata: {
        privacy: "aggregate_only",
        analyticsSemantics: "all_channel_pageviews",
      },
      quota: null,
    };
  },
};
