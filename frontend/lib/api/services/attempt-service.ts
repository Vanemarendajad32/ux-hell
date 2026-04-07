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

export function submitAttempt(userId: number, payload: AttemptPayload) {
  return apiClient.post<void>(`/api/attempts/${userId}`, payload);
}

export function getMyAttempts() {
  return apiClient.get<LeaderboardAttempt[]>("/api/attempts/me");
}
