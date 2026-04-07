import { apiClient } from "../client";

export type LeaderboardGameType =
  | "registration"
  | "robot-test"
  | "account-verification";

export type LeaderboardEntryResponse = {
  rank: number;
  userName: string;
  time: string;
  frustration: string;
  score: string;
  completedAt: string;
};

export type LeaderboardResponse = {
  gameType: LeaderboardGameType;
  bestTime: string;
  topScore: string;
  currentUserRank: number | null;
  totalPlayers: number;
  page: number;
  size: number;
  totalPages: number;
  entries: LeaderboardEntryResponse[];
};

export function getLeaderboard(
  gameType: LeaderboardGameType,
  page = 0,
  size = 20,
) {
  const query = new URLSearchParams({
    gameType,
    page: String(page),
    size: String(size),
  }).toString();

  return apiClient.get<LeaderboardResponse>(`/api/leaderboard?${query}`, {
    cache: "no-store",
  });
}
