import type { LeaderboardAttempt } from "@/lib/api/services/attempt-service";
import type { AuthSession } from "@/lib/api/services/auth-service";
import {
  type GameType,
  gameTypeLabels,
  gameTypeOrder,
} from "@/lib/tracking/game-types";

export type GameStats = {
  gameType: GameType;
  label: string;
  lastRunTime: string;
  fastestTime: string;
  averageTime: string;
  lastRunMs: number | null;
  fastestMs: number | null;
  averageMs: number | null;
  totalAttempts: number;
  totalClicks: number;
  averageClicks: number;
  totalErrors: number;
  averageErrors: number;
  totalFrustration: number;
  averageFrustration: number;
  series: {
    timeMs: number[];
    clicks: number[];
    errors: number[];
    frustration: number[];
  };
};

export type SummaryStats = {
  totalAttempts: number;
  totalClicks: number;
  totalErrors: number;
  totalFrustration: number;
  averageTime: string;
  averageClicks: number;
  averageErrors: number;
  averageFrustration: number;
};

export type LastOverview = {
  gameLabel: string;
  lastRunTime: string;
  lastClicks: number;
  lastErrors: number;
  lastFrustration: number;
};

export type DashboardData = {
  games: GameStats[];
  summary: SummaryStats;
  lastOverview: LastOverview;
};

export type CreateDashboardDataInput = {
  leaderboard?: LeaderboardAttempt[];
  registration?: AuthSession | null;
};

const EMPTY_TIME = "--:--";

function formatDuration(ms: number | null | undefined): string {
  if (ms === null || ms === undefined) {
    return EMPTY_TIME;
  }

  return `${(ms / 1000).toFixed(2)}s`;
}

function formatAverage(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return Number(value.toFixed(1));
}

function matchesRegistration(
  attempt: LeaderboardAttempt,
  registration?: AuthSession | null,
): boolean {
  if (!registration) {
    return false;
  }

  if (attempt.user?.id && registration.id) {
    return attempt.user.id === registration.id;
  }

  if (attempt.user?.username && registration.username) {
    return attempt.user.username === registration.username;
  }

  return false;
}

function createEmptyGameStats(gameType: GameType): GameStats {
  return {
    gameType,
    label: gameTypeLabels[gameType],
    lastRunTime: EMPTY_TIME,
    fastestTime: EMPTY_TIME,
    averageTime: EMPTY_TIME,
    lastRunMs: null,
    fastestMs: null,
    averageMs: null,
    totalAttempts: 0,
    totalClicks: 0,
    averageClicks: 0,
    totalErrors: 0,
    averageErrors: 0,
    totalFrustration: 0,
    averageFrustration: 0,
    series: {
      timeMs: [],
      clicks: [],
      errors: [],
      frustration: [],
    },
  };
}

function normalizeGameType(value: string | null | undefined): GameType {
  if (value === "registration") return "registration";
  if (value === "checkbox-hell") return "checkbox-hell";
  if (value === "account-verification") return "account-verification";
  return "unknown";
}

export function createDashboardData(
  input: CreateDashboardDataInput = {},
): DashboardData {
  const leaderboard = input.leaderboard ?? [];
  const userAttempts = leaderboard.filter((attempt) =>
    matchesRegistration(attempt, input.registration),
  );

  const lastOverallAttempt = userAttempts.reduce<LeaderboardAttempt | null>(
    (latest, attempt) => {
      if (!latest) {
        return attempt;
      }
      return new Date(attempt.createdAt).getTime() >
        new Date(latest.createdAt).getTime()
        ? attempt
        : latest;
    },
    null,
  );

  const attemptsByGame = new Map<GameType, LeaderboardAttempt[]>();

  for (const attempt of userAttempts) {
    const gameType = normalizeGameType(attempt.gameType);
    const current = attemptsByGame.get(gameType) ?? [];
    current.push(attempt);
    attemptsByGame.set(gameType, current);
  }

  const games = gameTypeOrder.map((gameType) => {
    const attempts = attemptsByGame.get(gameType) ?? [];

    if (attempts.length === 0) {
      return createEmptyGameStats(gameType);
    }

    const sortedAttempts = [...attempts].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const totalAttempts = attempts.length;
    const totalClicks = attempts.reduce(
      (sum, attempt) => sum + attempt.clickCount,
      0,
    );
    const totalErrors = attempts.reduce(
      (sum, attempt) => sum + attempt.errorCount,
      0,
    );
    const totalFrustration = attempts.reduce(
      (sum, attempt) => sum + attempt.frustrationLevel,
      0,
    );

    const totalTimeMs = attempts.reduce(
      (sum, attempt) => sum + attempt.completionTimeMs,
      0,
    );

    const fastestAttempt = attempts.reduce((best, attempt) =>
      attempt.completionTimeMs < best.completionTimeMs ? attempt : best,
    );

    const lastAttempt = attempts.reduce((latest, attempt) =>
      new Date(attempt.createdAt).getTime() >
      new Date(latest.createdAt).getTime()
        ? attempt
        : latest,
    );

    const averageMs = totalAttempts > 0 ? totalTimeMs / totalAttempts : null;
    const averageClicks = totalAttempts > 0 ? totalClicks / totalAttempts : 0;
    const averageErrors = totalAttempts > 0 ? totalErrors / totalAttempts : 0;
    const averageFrustration =
      totalAttempts > 0 ? totalFrustration / totalAttempts : 0;

    return {
      gameType,
      label: gameTypeLabels[gameType],
      lastRunTime: formatDuration(lastAttempt.completionTimeMs),
      fastestTime: formatDuration(fastestAttempt.completionTimeMs),
      averageTime: formatDuration(averageMs),
      lastRunMs: lastAttempt.completionTimeMs ?? null,
      fastestMs: fastestAttempt.completionTimeMs ?? null,
      averageMs,
      totalAttempts,
      totalClicks,
      averageClicks: formatAverage(averageClicks),
      totalErrors,
      averageErrors: formatAverage(averageErrors),
      totalFrustration,
      averageFrustration: formatAverage(averageFrustration),
      series: {
        timeMs: sortedAttempts.map((attempt) => attempt.completionTimeMs),
        clicks: sortedAttempts.map((attempt) => attempt.clickCount),
        errors: sortedAttempts.map((attempt) => attempt.errorCount),
        frustration: sortedAttempts.map((attempt) => attempt.frustrationLevel),
      },
    };
  });

  const totalAttempts = games.reduce(
    (sum, game) => sum + game.totalAttempts,
    0,
  );
  const totalClicks = games.reduce((sum, game) => sum + game.totalClicks, 0);
  const totalErrors = games.reduce((sum, game) => sum + game.totalErrors, 0);
  const totalFrustration = games.reduce(
    (sum, game) => sum + game.totalFrustration,
    0,
  );
  const totalTimeMs = games.reduce(
    (sum, game) => sum + (game.averageMs ?? 0) * game.totalAttempts,
    0,
  );

  const averageTimeMs = totalAttempts > 0 ? totalTimeMs / totalAttempts : null;
  const averageClicks = totalAttempts > 0 ? totalClicks / totalAttempts : 0;
  const averageErrors = totalAttempts > 0 ? totalErrors / totalAttempts : 0;
  const averageFrustration =
    totalAttempts > 0 ? totalFrustration / totalAttempts : 0;

  return {
    games,
    summary: {
      totalAttempts,
      totalClicks,
      totalErrors,
      totalFrustration,
      averageTime: formatDuration(averageTimeMs),
      averageClicks: formatAverage(averageClicks),
      averageErrors: formatAverage(averageErrors),
      averageFrustration: formatAverage(averageFrustration),
    },
    lastOverview: {
      gameLabel: lastOverallAttempt
        ? gameTypeLabels[normalizeGameType(lastOverallAttempt.gameType)]
        : "No runs yet",
      lastRunTime: formatDuration(lastOverallAttempt?.completionTimeMs),
      lastClicks: lastOverallAttempt?.clickCount ?? 0,
      lastErrors: lastOverallAttempt?.errorCount ?? 0,
      lastFrustration: lastOverallAttempt?.frustrationLevel ?? 0,
    },
  };
}
