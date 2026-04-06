import { apiClient } from "../client";

export type AttemptPayload = {
  gameType: string;
  completionTimeMs: number;
  clickCount: number;
  frustrationLevel: number;
  errorCount: number;
  submitAttempts: number;
  completed: boolean;
};

export type LeaderboardAttempt = {
  id: number;
  gameType: string;
  completionTimeMs: number;
  clickCount: number;
  frustrationLevel: number;
  errorCount: number;
  submitAttempts: number;
  completed: boolean;
  createdAt: string;
  user?: {
    id: number;
    username?: string;
  };
};

export function submitAttempt(
  userId: number,
  payload: AttemptPayload,
  token?: string,
) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  return apiClient.post<void>(`/api/attempts/${userId}`, payload, {
    headers,
  });
}

export function getLeaderboard(token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  return apiClient.get<LeaderboardAttempt[]>("/api/attempts/leaderboard", {
    headers,
  });
}
