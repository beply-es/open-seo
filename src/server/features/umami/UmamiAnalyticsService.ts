import {
  getOptionalEnvValue,
  getRequiredEnvValue,
} from "@/server/lib/runtime-env";
import { UmamiAnalyticsError } from "@/server/lib/umamiErrors";
import {
  createUmamiClient,
  normalizeUmamiLimit,
  normalizeUmamiOffset,
  resolveUmamiComparisonCoverage,
  resolveUmamiDateRange,
  type UmamiAggregateStats,
  type UmamiConfig,
  type UmamiDateInput,
  umamiConfigSchema,
  validateUmamiBaseUrl,
} from "./UmamiClient";

export {
  createUmamiClient,
  resolveUmamiComparisonCoverage,
  resolveUmamiDateRange,
} from "./UmamiClient";

async function loadConfig(projectId: string): Promise<UmamiConfig> {
  const configuredProjectId = await getOptionalEnvValue(
    "OPENSEO_UMAMI_PROJECT_ID",
  );
  if (!configuredProjectId) {
    throw new UmamiAnalyticsError(
      "umami_not_configured",
      "Beply Analytics is not configured for this OpenSEO deployment.",
    );
  }
  if (configuredProjectId !== projectId) {
    throw new UmamiAnalyticsError(
      "umami_project_not_configured",
      "Beply Analytics is not configured for this project.",
    );
  }
  const values = await Promise.all([
    getRequiredEnvValue("OPENSEO_UMAMI_BASE_URL"),
    getRequiredEnvValue("OPENSEO_UMAMI_WEBSITE_ID"),
    getRequiredEnvValue("OPENSEO_UMAMI_USERNAME"),
    getRequiredEnvValue("OPENSEO_UMAMI_PASSWORD"),
    getRequiredEnvValue("OPENSEO_UMAMI_DOMAIN"),
    getOptionalEnvValue("OPENSEO_UMAMI_TIMEZONE"),
    getOptionalEnvValue("OPENSEO_UMAMI_DATA_START_DATE"),
  ]);
  const parsed = umamiConfigSchema.safeParse({
    baseUrl: values[0],
    websiteId: values[1],
    projectId: configuredProjectId,
    username: values[2],
    password: values[3],
    domain: values[4],
    timezone: values[5] ?? "Europe/Madrid",
    dataStartDate: values[6],
  });
  if (!parsed.success) {
    throw new UmamiAnalyticsError(
      "umami_not_configured",
      "Beply Analytics configuration is incomplete or invalid.",
    );
  }
  return { ...parsed.data, baseUrl: validateUmamiBaseUrl(parsed.data.baseUrl) };
}

function publicSource(config: UmamiConfig) {
  return {
    provider: "beply_analytics",
    engine: "umami",
    websiteId: config.websiteId,
    domain: config.domain,
    timezone: config.timezone,
    cookieFree: true,
    aggregateOnly: true,
  };
}

function publicStats(stats: UmamiAggregateStats) {
  return {
    pageviews: stats.pageviews,
    visitors: stats.visitors,
    visits: stats.visits,
    bounces: stats.bounces,
    totalTimeSeconds: stats.totaltime,
  };
}

export const UmamiAnalyticsService = {
  async isConfiguredForProject(projectId: string) {
    return (
      (await getOptionalEnvValue("OPENSEO_UMAMI_PROJECT_ID")) === projectId
    );
  },

  async getOverview(input: UmamiDateInput & { projectId: string }) {
    const config = await loadConfig(input.projectId);
    const range = resolveUmamiDateRange(input, config.timezone);
    const client = createUmamiClient(config);
    const [stats, series] = await Promise.all([
      client.getStats(range),
      client.getSeries(range),
    ]);
    const sessions = new Map(
      series.sessions.map((row) => [row.x.slice(0, 10), row.y]),
    );
    const comparisonCoverage = config.dataStartDate
      ? resolveUmamiComparisonCoverage(range, config.dataStartDate)
      : null;
    const warnings = [
      "Beply Analytics is cookie-free; consent coverage and bot filtering can differ from Search Console.",
    ];
    if (comparisonCoverage && !comparisonCoverage.complete) {
      warnings.push(
        `Previous-period comparison is incomplete: ${comparisonCoverage.availableDays} of ${comparisonCoverage.expectedDays} days are available because Beply Analytics data starts on ${config.dataStartDate}.`,
      );
    }
    return {
      status: "ok" as const,
      source: publicSource(config),
      request: { resolvedDateRange: range, comparisonCoverage },
      current: publicStats(stats),
      previous: publicStats(stats.comparison),
      trend: series.pageviews.map((row) => ({
        date: row.x.slice(0, 10),
        pageviews: row.y,
        visits: sessions.get(row.x.slice(0, 10)) ?? 0,
      })),
      warnings,
    };
  },

  async getPagePerformance(
    input: UmamiDateInput & {
      projectId: string;
      breakdown?: "page" | "entry_page";
      limit?: number;
      offset?: number;
    },
  ) {
    const config = await loadConfig(input.projectId);
    const range = resolveUmamiDateRange(input, config.timezone);
    const limit = normalizeUmamiLimit(input.limit);
    const offset = normalizeUmamiOffset(input.offset);
    const rows = await createUmamiClient(config).getMetrics(
      input.breakdown === "entry_page" ? "entry" : "path",
      range,
      { limit, offset },
    );
    return {
      status: "ok" as const,
      source: publicSource(config),
      request: {
        resolvedDateRange: range,
        breakdown: input.breakdown ?? "page",
      },
      rowCount: rows.length,
      rows: rows.map((row) => ({ path: row.x, views: row.y })),
      pageInfo: {
        limit,
        offset,
        hasMore: rows.length === limit,
        nextOffset: rows.length === limit ? offset + rows.length : null,
      },
      warnings: ["Page counts include all acquisition channels."],
    };
  },

  async getEvents(
    input: UmamiDateInput & {
      projectId: string;
      limit?: number;
      offset?: number;
    },
  ) {
    const config = await loadConfig(input.projectId);
    const range = resolveUmamiDateRange(input, config.timezone);
    const limit = normalizeUmamiLimit(input.limit);
    const offset = normalizeUmamiOffset(input.offset);
    const rows = await createUmamiClient(config).getMetrics("event", range, {
      limit,
      offset,
    });
    return {
      status: "ok" as const,
      source: publicSource(config),
      request: { resolvedDateRange: range },
      rowCount: rows.length,
      rows: rows.map((row) => ({ eventName: row.x, events: row.y })),
      pageInfo: {
        limit,
        offset,
        hasMore: rows.length === limit,
        nextOffset: rows.length === limit ? offset + rows.length : null,
      },
      warnings: ["Only aggregate event names and counts are returned."],
    };
  },
};
