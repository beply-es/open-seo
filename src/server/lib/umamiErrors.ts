type UmamiAnalyticsErrorCode =
  | "validation_error"
  | "umami_not_configured"
  | "umami_project_not_configured"
  | "umami_authentication_failed"
  | "umami_upstream_unavailable"
  | "umami_malformed_response";

export class UmamiAnalyticsError extends Error {
  constructor(
    public readonly code: UmamiAnalyticsErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "UmamiAnalyticsError";
  }
}
