import type { TrackingPayload } from "@/lib/tracking/types";

const MAX_FRUSTRATION_LEVEL = 10;

export function computeFrustrationLevel(payload: TrackingPayload): number {
  const errorScore = payload.errorCount * 2;
  const retryScore = Math.max(0, payload.submitAttempts - 1);
  const timeScore = payload.completionTimeMs
    ? Math.floor(payload.completionTimeMs / 15000)
    : 0;

  const rawScore = errorScore + retryScore + timeScore;
  const clamped = Math.min(MAX_FRUSTRATION_LEVEL, Math.max(0, rawScore));

  return clamped;
}
