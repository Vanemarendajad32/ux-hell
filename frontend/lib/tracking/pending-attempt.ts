import { gameTypeOrder, type GameType } from "@/lib/tracking/game-types";
import type { TrackingPayload } from "@/lib/tracking/types";

const PENDING_ATTEMPT_KEY = "ux-hell.pending-attempt";

export type PendingAttemptGameType = GameType | "unknown";

export type PendingAttempt = {
  gameType: PendingAttemptGameType;
  payload: TrackingPayload;
};

export function savePendingAttempt(
  gameType: GameType,
  payload: TrackingPayload,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    PENDING_ATTEMPT_KEY,
    JSON.stringify({ gameType, payload }),
  );
}

export function readPendingAttempt(): PendingAttempt | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(PENDING_ATTEMPT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (parsed && typeof parsed === "object") {
      if ("payload" in parsed && "gameType" in parsed) {
        const gameType = normalizePendingAttemptGameType(parsed.gameType);
        if (!gameType) {
          window.sessionStorage.removeItem(PENDING_ATTEMPT_KEY);
          return null;
        }

        return {
          gameType,
          payload: parsed.payload as TrackingPayload,
        };
      }
      if ("completionTimeMs" in parsed) {
        return {
          gameType: "unknown",
          payload: parsed as TrackingPayload,
        };
      }
    }
  } catch {
    window.sessionStorage.removeItem(PENDING_ATTEMPT_KEY);
    return null;
  }

  window.sessionStorage.removeItem(PENDING_ATTEMPT_KEY);
  return null;
}

export function clearPendingAttempt() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(PENDING_ATTEMPT_KEY);
}

function normalizePendingAttemptGameType(
  value: unknown,
): PendingAttemptGameType | null {
  if (value === "unknown") {
    return "unknown";
  }

  return gameTypeOrder.some((gameType) => gameType === value)
    ? (value as GameType)
    : null;
}
