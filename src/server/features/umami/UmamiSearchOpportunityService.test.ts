import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as UmamiAnalyticsModule from "./UmamiAnalyticsService";

const mocks = vi.hoisted(() => ({
  getConnection: vi.fn(),
  getPerformance: vi.fn(),
  getPagePerformance: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: {
    getConnection: mocks.getConnection,
    getPerformance: mocks.getPerformance,
  },
}));
vi.mock("./UmamiAnalyticsService", async (importOriginal) => {
  const actual = await importOriginal<typeof UmamiAnalyticsModule>();
  return {
    ...actual,
    UmamiAnalyticsService: {
      ...actual.UmamiAnalyticsService,
      getPagePerformance: mocks.getPagePerformance,
    },
  };
});

import { UmamiSearchOpportunityService } from "./UmamiSearchOpportunityService";

describe("Umami search opportunities", () => {
  beforeEach(() => {
    mocks.getConnection.mockResolvedValue({
      propertyUrl: "sc-domain:beply.es",
    });
    mocks.getPerformance.mockResolvedValue({
      rows: [
        {
          keys: ["https://beply.es/blog/ticketbai/"],
          clicks: 1,
          impressions: 200,
          ctr: 0.005,
          position: 8,
        },
        {
          keys: ["https://beply.es/blog/unmatched/"],
          clicks: 0,
          impressions: 80,
          ctr: 0,
          position: 12,
        },
      ],
    });
    mocks.getPagePerformance.mockResolvedValue({
      source: { provider: "beply_analytics", cookieFree: true },
      request: {
        resolvedDateRange: { startDate: "2026-07-21", endDate: "2026-08-17" },
      },
      rows: [{ path: "/blog/ticketbai/", views: 35 }],
    });
  });

  it("joins GSC pages to aggregate path counts without claiming GA4 semantics", async () => {
    const result = await UmamiSearchOpportunityService.getOpportunities(
      { projectId: "project_1", limit: 25 },
      { now: new Date("2026-08-20T12:00:00Z") },
    );

    expect(result.source.analyticsProvider).toBe("beply_analytics");
    expect(result.coverage).toMatchObject({ matchedRows: 1, unmatchedRows: 1 });
    expect(result.rows[0]).toMatchObject({
      page: "https://beply.es/blog/ticketbai/",
      joinStatus: "joined",
      analytics: { pageviews: 35 },
    });
    expect(JSON.stringify(result)).not.toMatch(
      /activeUsers|sessionId|distinctId/,
    );
    expect(result.warnings.join(" ")).toMatch(/all acquisition channels/i);
  });
});
