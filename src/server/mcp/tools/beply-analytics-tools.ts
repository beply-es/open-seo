import type { CallToolResult } from "@modelcontextprotocol/server";
import { z } from "zod";
import { UmamiAnalyticsService } from "@/server/features/umami/UmamiAnalyticsService";
import { UmamiAnalyticsError } from "@/server/lib/umamiErrors";
import { buildProjectMeta } from "@/server/mcp/context";
import { mcpResponse } from "@/server/mcp/formatters";
import { looseObjectOutputSchema } from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { projectIdSchema } from "@/server/mcp/schemas";
import { formatMcpTable } from "@/server/mcp/table";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .describe("Inclusive YYYY-MM-DD date. Provide both startDate and endDate.");

const commonInput = {
  projectId: projectIdSchema,
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
} as const;

const reportOutputSchema = z
  .object({
    status: z.enum(["ok", "error"]),
    source: looseObjectOutputSchema.optional(),
    request: looseObjectOutputSchema.optional(),
    error: looseObjectOutputSchema.optional(),
  })
  .passthrough();

type ProjectContext = {
  auth: { organizationId: string };
  baseUrl: string;
};

function errorResponse(
  projectId: string,
  context: ProjectContext,
  error: unknown,
): CallToolResult {
  if (!(error instanceof UmamiAnalyticsError)) throw error;
  return mcpResponse({
    text: error.message,
    meta: buildProjectMeta(context, projectId),
    structuredContent: {
      status: "error",
      error: { code: error.code, message: error.message },
    },
  });
}

const overviewInputSchema = z.strictObject(commonInput);
type OverviewArgs = z.infer<typeof overviewInputSchema>;

export const getBeplyAnalyticsOverviewTool = {
  name: "get_beply_analytics_overview",
  config: {
    title: "Get Beply Analytics overview",
    description:
      "Read cookie-free aggregate pageviews, visitors, visits, bounces, total time, previous-period comparison, and daily trend from the project's Beply Analytics (Umami) website. Defaults to the last 28 complete days. Read-only and uses no OpenSEO credits.",
    inputSchema: overviewInputSchema,
    outputSchema: reportOutputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: OverviewArgs, context) => {
    try {
      const result = await UmamiAnalyticsService.getOverview(args);
      const range = result.request.resolvedDateRange;
      const coverage = result.request.comparisonCoverage;
      const comparisonWarning =
        coverage && !coverage.complete
          ? ` Comparison warning: ${coverage.availableDays} of ${coverage.expectedDays} previous-period days are available; do not treat the comparison as complete.`
          : "";
      return mcpResponse({
        text: `Beply Analytics for ${range.startDate} through ${range.endDate}: ${result.current.pageviews} pageviews, ${result.current.visitors} visitors, and ${result.current.visits} visits. Cookie-free aggregate measurement.${comparisonWarning}`,
        meta: buildProjectMeta(context, args.projectId),
        structuredContent: result,
      });
    } catch (error) {
      return errorResponse(args.projectId, context, error);
    }
  }),
};

const pageInputSchema = z.strictObject({
  ...commonInput,
  breakdown: z.enum(["page", "entry_page"]).optional().default("page"),
  limit: z.number().int().min(1).max(1_000).optional().default(100),
  offset: z.number().int().min(0).optional().default(0),
});
type PageArgs = z.infer<typeof pageInputSchema>;

export const getBeplyAnalyticsPagePerformanceTool = {
  name: "get_beply_analytics_page_performance",
  config: {
    title: "Get Beply Analytics page performance",
    description:
      "Read aggregate pageview counts by page or entry page from Beply Analytics. Includes all acquisition channels and returns no session, visitor, or personal identifiers. Read-only and uses no OpenSEO credits.",
    inputSchema: pageInputSchema,
    outputSchema: reportOutputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: PageArgs, context) => {
    try {
      const result = await UmamiAnalyticsService.getPagePerformance(args);
      const table = formatMcpTable(result.rows, [
        { header: "path", value: (row) => row.path },
        { header: "views", value: (row) => row.views },
      ]);
      return mcpResponse({
        text: `Beply Analytics page performance: ${result.rowCount} aggregate row(s).\n\n${table}`,
        meta: buildProjectMeta(context, args.projectId),
        structuredContent: result,
      });
    } catch (error) {
      return errorResponse(args.projectId, context, error);
    }
  }),
};

const eventsInputSchema = z.strictObject({
  ...commonInput,
  limit: z.number().int().min(1).max(1_000).optional().default(100),
  offset: z.number().int().min(0).optional().default(0),
});
type EventsArgs = z.infer<typeof eventsInputSchema>;

export const getBeplyAnalyticsEventsTool = {
  name: "get_beply_analytics_events",
  config: {
    title: "Get Beply Analytics events",
    description:
      "Read aggregate conversion and interaction event names with counts from Beply Analytics. Returns no event payloads, session IDs, visitor IDs, or personal data. Read-only and uses no OpenSEO credits.",
    inputSchema: eventsInputSchema,
    outputSchema: reportOutputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: EventsArgs, context) => {
    try {
      const result = await UmamiAnalyticsService.getEvents(args);
      const table = formatMcpTable(result.rows, [
        { header: "event", value: (row) => row.eventName },
        { header: "count", value: (row) => row.events },
      ]);
      return mcpResponse({
        text: `Beply Analytics events: ${result.rowCount} aggregate row(s).\n\n${table}`,
        meta: buildProjectMeta(context, args.projectId),
        structuredContent: result,
      });
    } catch (error) {
      return errorResponse(args.projectId, context, error);
    }
  }),
};
