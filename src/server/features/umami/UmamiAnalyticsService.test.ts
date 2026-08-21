import { describe, expect, it, vi } from "vitest";
import {
  createUmamiClient,
  resolveUmamiComparisonCoverage,
  resolveUmamiDateRange,
} from "./UmamiAnalyticsService";

describe("Beply Analytics (Umami) service", () => {
  it("defaults to the last 28 complete days", () => {
    expect(
      resolveUmamiDateRange(
        {},
        "Europe/Madrid",
        new Date("2026-08-20T12:00:00Z"),
      ),
    ).toMatchObject({
      startDate: "2026-07-23",
      endDate: "2026-08-19",
    });
  });

  it("marks the previous period incomplete when tracking started mid-period", () => {
    expect(
      resolveUmamiComparisonCoverage(
        { startDate: "2026-07-24", endDate: "2026-08-20" },
        "2026-07-09",
      ),
    ).toEqual({
      requestedStartDate: "2026-06-26",
      requestedEndDate: "2026-07-23",
      availableStartDate: "2026-07-09",
      expectedDays: 28,
      availableDays: 15,
      complete: false,
    });
  });

  it("authenticates server-to-server and returns only validated aggregate metrics", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ token: "server-token", user: { id: "u1" } }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            pageviews: 120,
            visitors: 70,
            visits: 80,
            bounces: 20,
            totaltime: 3600,
            comparison: {
              pageviews: 100,
              visitors: 60,
              visits: 65,
              bounces: 18,
              totaltime: 3000,
            },
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
      );
    const client = createUmamiClient(
      {
        baseUrl: "https://analytics.example.com",
        websiteId: "0ea27f53-3e06-4d20-965c-ad7994b45952",
        projectId: "project_1",
        username: "openseo",
        password: "not-logged",
        timezone: "Europe/Madrid",
        domain: "example.com",
      },
      fetcher,
    );

    await expect(
      client.getStats({ startDate: "2026-08-01", endDate: "2026-08-19" }),
    ).resolves.toMatchObject({ pageviews: 120, visitors: 70, visits: 80 });
    expect(fetcher).toHaveBeenCalledTimes(2);
    const requestInit = fetcher.mock.calls[1]?.[1];
    expect(new Headers(requestInit?.headers).get("Authorization")).toBe(
      "Bearer server-token",
    );
    const requestUrl = fetcher.mock.calls[1]?.[0];
    expect(typeof requestUrl).toBe("string");
    if (typeof requestUrl !== "string") throw new Error("Expected string URL");
    expect(requestUrl).toContain(
      "/api/websites/0ea27f53-3e06-4d20-965c-ad7994b45952/stats?",
    );
  });
});
