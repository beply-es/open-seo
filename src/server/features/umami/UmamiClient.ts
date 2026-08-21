import { z } from "zod";
import { UmamiAnalyticsError } from "@/server/lib/umamiErrors";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1_000;
const MAX_DAYS = 180;

export const umamiConfigSchema = z.object({
  baseUrl: z.string().url(),
  websiteId: z.string().uuid(),
  projectId: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  timezone: z.string().min(1),
  domain: z.string().min(1),
  dataStartDate: z.string().regex(DATE_PATTERN).optional(),
});

export type UmamiConfig = z.infer<typeof umamiConfigSchema>;
export type UmamiDateInput = { startDate?: string; endDate?: string };
export type UmamiResolvedDateRange = { startDate: string; endDate: string };
export type UmamiComparisonCoverage = {
  requestedStartDate: string;
  requestedEndDate: string;
  availableStartDate: string | null;
  expectedDays: number;
  availableDays: number;
  complete: boolean;
};

const aggregateStatsSchema = z.object({
  pageviews: z.number().nonnegative(),
  visitors: z.number().nonnegative(),
  visits: z.number().nonnegative(),
  bounces: z.number().nonnegative(),
  totaltime: z.number().nonnegative(),
});

export type UmamiAggregateStats = z.infer<typeof aggregateStatsSchema>;

const statsSchema = aggregateStatsSchema.extend({
  comparison: aggregateStatsSchema,
});
const metricRowsSchema = z.array(
  z.object({ x: z.string(), y: z.number().nonnegative() }),
);
const seriesSchema = z.object({
  pageviews: metricRowsSchema,
  sessions: metricRowsSchema,
});
const loginSchema = z.object({ token: z.string().min(1) });

type Fetcher = typeof fetch;

function validDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsed.valueOf()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

function shiftDate(value: string, days: number): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function dateInTimeZone(now: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((candidate) => candidate.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function dayCount(range: UmamiResolvedDateRange): number {
  return (
    Math.round(
      (Date.parse(`${range.endDate}T00:00:00.000Z`) -
        Date.parse(`${range.startDate}T00:00:00.000Z`)) /
        86_400_000,
    ) + 1
  );
}

export function resolveUmamiDateRange(
  input: UmamiDateInput,
  timezone: string,
  now: Date = new Date(),
): UmamiResolvedDateRange {
  if (Boolean(input.startDate) !== Boolean(input.endDate)) {
    throw new UmamiAnalyticsError(
      "validation_error",
      "Provide both startDate and endDate, or neither.",
    );
  }
  const endDate = input.endDate ?? shiftDate(dateInTimeZone(now, timezone), -1);
  const startDate = input.startDate ?? shiftDate(endDate, -27);
  if (!validDate(startDate) || !validDate(endDate) || startDate > endDate) {
    throw new UmamiAnalyticsError(
      "validation_error",
      "Dates must be valid YYYY-MM-DD values with startDate on or before endDate.",
    );
  }
  const range = { startDate, endDate };
  if (dayCount(range) > MAX_DAYS) {
    throw new UmamiAnalyticsError(
      "validation_error",
      `Beply Analytics reports are limited to ${MAX_DAYS} days per request.`,
    );
  }
  return range;
}

export function resolveUmamiComparisonCoverage(
  range: UmamiResolvedDateRange,
  dataStartDate: string,
): UmamiComparisonCoverage {
  if (!validDate(dataStartDate)) {
    throw new UmamiAnalyticsError(
      "umami_not_configured",
      "Beply Analytics data start date is invalid.",
    );
  }

  const expectedDays = dayCount(range);
  const requestedEndDate = shiftDate(range.startDate, -1);
  const requestedStartDate = shiftDate(requestedEndDate, -(expectedDays - 1));
  const availableStartDate =
    dataStartDate > requestedEndDate
      ? null
      : dataStartDate > requestedStartDate
        ? dataStartDate
        : requestedStartDate;
  const availableDays = availableStartDate
    ? dayCount({ startDate: availableStartDate, endDate: requestedEndDate })
    : 0;

  return {
    requestedStartDate,
    requestedEndDate,
    availableStartDate,
    expectedDays,
    availableDays,
    complete: availableDays === expectedDays,
  };
}

function zonedMidnightEpoch(date: string, timezone: string): number {
  const target = Date.parse(`${date}T00:00:00.000Z`);
  let guess = target;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const values = Object.fromEntries(
      formatter
        .formatToParts(new Date(guess))
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, Number(part.value)]),
    );
    const observed = Date.UTC(
      values.year,
      values.month - 1,
      values.day,
      values.hour,
      values.minute,
      values.second,
    );
    guess += target - observed;
  }
  return guess;
}

function reportParams(range: UmamiResolvedDateRange, timezone: string) {
  return {
    startAt: String(zonedMidnightEpoch(range.startDate, timezone)),
    endAt: String(zonedMidnightEpoch(shiftDate(range.endDate, 1), timezone)),
    timezone,
  };
}

export function normalizeUmamiLimit(value: number | undefined): number {
  const limit = value ?? DEFAULT_LIMIT;
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
    throw new UmamiAnalyticsError(
      "validation_error",
      `limit must be an integer from 1 to ${MAX_LIMIT}.`,
    );
  }
  return limit;
}

export function normalizeUmamiOffset(value: number | undefined): number {
  const offset = value ?? 0;
  if (!Number.isInteger(offset) || offset < 0) {
    throw new UmamiAnalyticsError(
      "validation_error",
      "offset must be a non-negative integer.",
    );
  }
  return offset;
}

export function validateUmamiBaseUrl(value: string): string {
  const url = new URL(value);
  const internalService =
    url.protocol === "http:" && url.hostname.endsWith(".svc.cluster.local");
  if (url.protocol !== "https:" && !internalService) {
    throw new UmamiAnalyticsError(
      "umami_not_configured",
      "Beply Analytics must use HTTPS or an internal Kubernetes service URL.",
    );
  }
  return url.toString().replace(/\/+$/, "");
}

function query(path: string, values: Record<string, string | number>) {
  const params = new URLSearchParams(
    Object.entries(values).map(([key, value]) => [key, String(value)]),
  );
  return `${path}?${params.toString()}`;
}

export function createUmamiClient(
  config: UmamiConfig,
  fetcher: Fetcher = fetch,
) {
  const baseUrl = validateUmamiBaseUrl(config.baseUrl);
  let token: string | null = null;

  async function login() {
    let response: Response;
    try {
      response = await fetcher(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: config.username,
          password: config.password,
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      throw new UmamiAnalyticsError(
        "umami_upstream_unavailable",
        "Beply Analytics is temporarily unavailable.",
      );
    }
    if (!response.ok) {
      throw new UmamiAnalyticsError(
        "umami_authentication_failed",
        "OpenSEO could not authenticate with Beply Analytics.",
      );
    }
    const parsed = loginSchema.safeParse(await response.json());
    if (!parsed.success) {
      throw new UmamiAnalyticsError(
        "umami_malformed_response",
        "Beply Analytics returned an invalid authentication response.",
      );
    }
    token = parsed.data.token;
    return token;
  }

  async function request<T>(
    path: string,
    schema: z.ZodType<T>,
    retry = true,
  ): Promise<T> {
    const authToken = token ?? (await login());
    let response: Response;
    try {
      response = await fetcher(`${baseUrl}${path}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw new UmamiAnalyticsError(
        "umami_upstream_unavailable",
        "Beply Analytics is temporarily unavailable.",
      );
    }
    if (response.status === 401 && retry) {
      token = null;
      return request(path, schema, false);
    }
    if (!response.ok) {
      throw new UmamiAnalyticsError(
        response.status === 401
          ? "umami_authentication_failed"
          : "umami_upstream_unavailable",
        response.status === 401
          ? "OpenSEO could not authenticate with Beply Analytics."
          : "Beply Analytics reporting is temporarily unavailable.",
      );
    }
    const parsed = schema.safeParse(await response.json());
    if (!parsed.success) {
      throw new UmamiAnalyticsError(
        "umami_malformed_response",
        "Beply Analytics returned an invalid aggregate report.",
      );
    }
    return parsed.data;
  }

  return {
    getStats(range: UmamiResolvedDateRange) {
      return request(
        query(
          `/api/websites/${config.websiteId}/stats`,
          reportParams(range, config.timezone),
        ),
        statsSchema,
      );
    },
    getSeries(range: UmamiResolvedDateRange) {
      return request(
        query(`/api/websites/${config.websiteId}/pageviews`, {
          ...reportParams(range, config.timezone),
          unit: "day",
        }),
        seriesSchema,
      );
    },
    getMetrics(
      type: "path" | "entry" | "event",
      range: UmamiResolvedDateRange,
      page: { limit?: number; offset?: number } = {},
    ) {
      return request(
        query(`/api/websites/${config.websiteId}/metrics`, {
          ...reportParams(range, config.timezone),
          type,
          limit: normalizeUmamiLimit(page.limit),
          offset: normalizeUmamiOffset(page.offset),
        }),
        metricRowsSchema,
      );
    },
  };
}
