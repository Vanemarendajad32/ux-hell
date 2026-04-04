import type { LucideIcon } from "lucide-react";
import { Timer, Trophy, Zap } from "lucide-react";
import type { LeaderboardResponse } from "@/lib/api/services/leaderboard-service";

export type LeaderboardGame =
  | "registration"
  | "robot-test"
  | "account-verification";

export type LeaderboardSource = "home" | "dashboard";

export type LeaderboardStat = {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  value: string;
};

export type LeaderboardPlayer = {
  completedAt: string;
  frustration: string;
  id: string;
  name: string;
  rank: number;
  score: string;
  time: string;
};

export type LeaderboardGameOption = {
  id: LeaderboardGame;
  label: string;
};

export type LeaderboardViewData = {
  page: number;
  players: LeaderboardPlayer[];
  size: number;
  stats: LeaderboardStat[];
  totalPages: number;
};

export const leaderboardGames: LeaderboardGameOption[] = [
  { id: "registration", label: "Registration" },
  { id: "robot-test", label: "Robot Test" },
  { id: "account-verification", label: "Account Verification" },
];

export const defaultLeaderboardGame: LeaderboardGame = "registration";
export const defaultLeaderboardSource: LeaderboardSource = "dashboard";

export const emptyLeaderboardData: LeaderboardViewData = {
  page: 0,
  stats: [
    {
      icon: Timer,
      iconClassName: "from-rose-500 to-orange-500",
      label: "Best Time",
      value: "--:--",
    },
    {
      icon: Zap,
      iconClassName: "from-orange-500 to-amber-500",
      label: "Top Score",
      value: "-",
    },
    {
      icon: Trophy,
      iconClassName: "from-amber-500 to-rose-500",
      label: "Total Players",
      value: "0",
    },
  ],
  players: [],
  size: 20,
  totalPages: 0,
};

export function parseLeaderboardGame(game?: string): LeaderboardGame {
  if (!game) {
    return defaultLeaderboardGame;
  }

  return leaderboardGames.some((item) => item.id === game)
    ? (game as LeaderboardGame)
    : defaultLeaderboardGame;
}

export function parseLeaderboardSource(from?: string): LeaderboardSource {
  if (from === "home" || from === "dashboard") {
    return from;
  }

  return defaultLeaderboardSource;
}

export function mapLeaderboardResponseToView(
  response: LeaderboardResponse,
): LeaderboardViewData {
  return {
    page: response.page,
    stats: [
      {
        icon: Timer,
        iconClassName: "from-rose-500 to-orange-500",
        label: "Best Time",
        value: response.bestTime,
      },
      {
        icon: Zap,
        iconClassName: "from-orange-500 to-amber-500",
        label: "Top Score",
        value: response.topScore,
      },
      {
        icon: Trophy,
        iconClassName: "from-amber-500 to-rose-500",
        label: "Total Players",
        value: String(response.totalPlayers),
      },
    ],
    players: response.entries.map((entry) => ({
      completedAt: entry.completedAt,
      frustration: entry.frustration,
      id: `${response.gameType}-${entry.rank}-${entry.userName}`,
      name: entry.userName,
      rank: entry.rank,
      score: entry.score,
      time: entry.time,
    })),
    size: response.size,
    totalPages: response.totalPages,
  };
}
