import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeToolContext, textContent } from "./tool-test-support";

const mocks = vi.hoisted(() => ({
  getProjectForOrganization: vi.fn(),
  getOverview: vi.fn(),
  getPagePerformance: vi.fn(),
  getEvents: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/features/projects/services/ProjectService", () => ({
  ProjectService: {
    getProjectForOrganization: mocks.getProjectForOrganization,
  },
}));
vi.mock("@/server/features/umami/UmamiAnalyticsService", () => ({
  UmamiAnalyticsService: {
    getOverview: mocks.getOverview,
    getPagePerformance: mocks.getPagePerformance,
    getEvents: mocks.getEvents,
  },
}));

import {
  getBeplyAnalyticsEventsTool,
  getBeplyAnalyticsOverviewTool,
  getBeplyAnalyticsPagePerformanceTool,
} from "./beply-analytics-tools";

const context = makeToolContext();

describe("Beply Analytics MCP tools", () => {
  beforeEach(() => {
    mocks.getProjectForOrganization.mockResolvedValue({ id: "project_1" });
  });

  it("publishes a cookie-free aggregate overview", async () => {
    mocks.getOverview.mockResolvedValue({
      status: "ok",
      source: { provider: "beply_analytics", cookieFree: true },
      request: {
        resolvedDateRange: { startDate: "2026-08-01", endDate: "2026-08-19" },
      },
      current: {
        pageviews: 120,
        visitors: 70,
        visits: 80,
        bounces: 20,
        totalTimeSeconds: 3600,
      },
      previous: {
        pageviews: 100,
        visitors: 60,
        visits: 65,
        bounces: 18,
        totalTimeSeconds: 3000,
      },
      trend: [],
      warnings: [],
    });

    const result = await getBeplyAnalyticsOverviewTool.handler(
      { projectId: "project_1" },
      context,
    );

    expect(textContent(result)).toContain("120 pageviews");
    expect(result.structuredContent).toMatchObject({
      source: {
        provider: "beply_analytics",
        cookieFree: true,
      },
    });
  });

  it("surfaces incomplete comparison coverage in the human-readable report", async () => {
    mocks.getOverview.mockResolvedValue({
      status: "ok",
      source: { provider: "beply_analytics", cookieFree: true },
      request: {
        resolvedDateRange: { startDate: "2026-07-24", endDate: "2026-08-20" },
        comparisonCoverage: {
          requestedStartDate: "2026-06-26",
          requestedEndDate: "2026-07-23",
          availableStartDate: "2026-07-09",
          expectedDays: 28,
          availableDays: 15,
          complete: false,
        },
      },
      current: { pageviews: 120, visitors: 70, visits: 80 },
      previous: { pageviews: 90, visitors: 50, visits: 55 },
      trend: [],
      warnings: [
        "Previous-period comparison is incomplete: 15 of 28 days are available because Beply Analytics data starts on 2026-07-09.",
      ],
    });

    const result = await getBeplyAnalyticsOverviewTool.handler(
      { projectId: "project_1" },
      context,
    );

    expect(textContent(result)).toContain(
      "Comparison warning: 15 of 28 previous-period days are available",
    );
    expect(result.structuredContent).toMatchObject({
      request: { comparisonCoverage: { complete: false } },
    });
  });

  it("keeps page and event reports aggregate-only", async () => {
    mocks.getPagePerformance.mockResolvedValue({
      status: "ok",
      source: { provider: "beply_analytics" },
      request: {
        resolvedDateRange: { startDate: "2026-08-01", endDate: "2026-08-19" },
      },
      rowCount: 1,
      rows: [{ path: "/precios/", views: 25 }],
      pageInfo: { limit: 100, offset: 0, hasMore: false, nextOffset: null },
      warnings: [],
    });
    mocks.getEvents.mockResolvedValue({
      status: "ok",
      source: { provider: "beply_analytics" },
      request: {
        resolvedDateRange: { startDate: "2026-08-01", endDate: "2026-08-19" },
      },
      rowCount: 1,
      rows: [{ eventName: "form_submit", events: 3 }],
      pageInfo: { limit: 100, offset: 0, hasMore: false, nextOffset: null },
      warnings: [],
    });

    const pages = await getBeplyAnalyticsPagePerformanceTool.handler(
      { projectId: "project_1", limit: 100, offset: 0, breakdown: "page" },
      context,
    );
    const events = await getBeplyAnalyticsEventsTool.handler(
      { projectId: "project_1", limit: 100, offset: 0 },
      context,
    );

    expect(textContent(pages)).toContain("/precios/ | 25");
    expect(textContent(events)).toContain("form_submit | 3");
    expect(JSON.stringify(pages.structuredContent)).not.toMatch(
      /sessionId|distinctId/i,
    );
  });
});
