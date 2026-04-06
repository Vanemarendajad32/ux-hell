import "client-only";

import { submitAttempt } from "@/lib/api/services/attempt-service";
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

  if (!registration?.id) {
    return { ok: false, reason: "no-session" };
  }

  const pendingAttempt = readPendingAttempt();

  if (!pendingAttempt || pendingAttempt.payload.completionTimeMs === null) {
    return { ok: false, reason: "no-payload" };
  }

  try {
    const gameType =
      pendingAttempt.gameType === "unknown" && fallbackGameType
        ? fallbackGameType
        : pendingAttempt.gameType;

    await submitAttempt(
      registration.id,
      {
        gameType,
        completionTimeMs: pendingAttempt.payload.completionTimeMs,
        clickCount: pendingAttempt.payload.clickCount,
        frustrationLevel: computeFrustrationLevel(pendingAttempt.payload),
        errorCount: pendingAttempt.payload.errorCount,
        submitAttempts: pendingAttempt.payload.submitAttempts,
        completed: pendingAttempt.payload.completed,
      },
    );
    clearPendingAttempt();
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
