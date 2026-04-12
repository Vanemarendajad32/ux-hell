import "client-only";

import { ApiError } from "@/lib/api/client";
import {
  submitAttempt,
  submitAttemptForCurrentUser,
} from "@/lib/api/services/attempt-service";
import { readRegistrationSession } from "@/lib/dashboard/registration-session";
import { computeFrustrationLevel } from "@/lib/tracking/frustration-level";
import type { GameType } from "@/lib/tracking/game-types";
import {
  clearPendingAttempt,
  readPendingAttempt,
} from "@/lib/tracking/pending-attempt";

export type PendingAttemptResult =
  | { ok: true }
  | { ok: false; reason: "no-session" | "no-payload" | "network" };

export async function submitPendingAttempt(
  fallbackGameType?: GameType,
): Promise<PendingAttemptResult> {
  const registration = readRegistrationSession();

  const pendingAttempt = readPendingAttempt();

  if (!pendingAttempt || pendingAttempt.payload.completionTimeMs === null) {
    return { ok: false, reason: "no-payload" };
  }

  try {
    const gameType =
      pendingAttempt.gameType === "unknown" && fallbackGameType
        ? fallbackGameType
        : pendingAttempt.gameType;

    const attemptPayload = {
      gameType,
      completionTimeMs: pendingAttempt.payload.completionTimeMs,
      clickCount: pendingAttempt.payload.clickCount,
      frustrationLevel: computeFrustrationLevel(pendingAttempt.payload),
      errorCount: pendingAttempt.payload.errorCount,
      submitAttempts: pendingAttempt.payload.submitAttempts,
      completed: pendingAttempt.payload.completed,
    };

    if (registration?.id) {
      try {
        await submitAttempt(registration.id, attemptPayload);
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 403) {
          throw error;
        }

        await submitAttemptForCurrentUser(attemptPayload);
      }
    } else {
      await submitAttemptForCurrentUser(attemptPayload);
    }

    clearPendingAttempt();
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
