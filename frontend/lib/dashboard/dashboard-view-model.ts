import type { LeaderboardAttempt } from "@/lib/api/services/attempt-service";
import type { RegisteredUserSnapshot } from "@/lib/api/services/auth-service";

export type DashboardData = {
  username: string;
  email: string;
  totalTimePlayed: string;
  totalClicks: number;
  totalAttempts: number;
  fastestTime: string;
  lastTime: string;
  leaderboardPlace: string;
};

const EMPTY_TIME = "--:--";
const UNKNOWN_EMAIL = "Unknown email";

export function createDashboardData(args: {
  leaderboard: LeaderboardAttempt[];
  registration: RegisteredUserSnapshot | null;
}): DashboardData {
  const { leaderboard, registration } = args;
  const completedAttempts = leaderboard.filter(
    (attempt) => typeof attempt.completionTimeMs === "number",
  );
  const totalTimePlayedMs = completedAttempts.reduce(
    (sum, attempt) => sum + attempt.completionTimeMs,
    0,
  );
  const totalClicks = completedAttempts.reduce(
    (sum, attempt) => sum + attempt.clickCount,
    0,
  );
  const fastestAttempt = completedAttempts[0] ?? null;
  const lastAttempt = completedAttempts.at(-1) ?? null;
  const registrationUsername = registration?.username?.trim();
  const leaderboardIndex = registrationUsername
    ? leaderboard.findIndex(
        (attempt) => attempt.user?.username === registrationUsername,
      )
    : -1;

  return {
    username: registrationUsername || "Unknown survivor",
    email: UNKNOWN_EMAIL,
    totalTimePlayed: formatDuration(totalTimePlayedMs),
    totalClicks,
    totalAttempts: completedAttempts.length,
    fastestTime: fastestAttempt
      ? formatDuration(fastestAttempt.completionTimeMs)
      : EMPTY_TIME,
    lastTime: lastAttempt
      ? formatDuration(lastAttempt.completionTimeMs)
      : EMPTY_TIME,
    leaderboardPlace:
      leaderboardIndex >= 0 ? `#${leaderboardIndex + 1}` : "Unranked",
  };
}

function formatDuration(durationMs: number): string {
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    return EMPTY_TIME;
  }

  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
