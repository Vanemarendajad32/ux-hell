export interface TrackingPayload {
  sessionId: string;
  startTime: string;
  completionTimeMs: number | null;
  clickCount: number;
  errorCount: number;
  submitAttempts: number;
  completed: boolean;
}
