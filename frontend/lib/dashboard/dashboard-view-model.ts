export type DashboardData = {
  totalTimePlayed: string;
  totalClicks: number;
  totalAttempts: number;
  fastestTime: string;
  lastTime: string;
  leaderboardPlace: string;
};

const EMPTY_TIME = "--:--";

export function createDashboardData(): DashboardData {
  return {
    totalTimePlayed: EMPTY_TIME,
    totalClicks: 0,
    totalAttempts: 0,
    fastestTime: EMPTY_TIME,
    lastTime: EMPTY_TIME,
    leaderboardPlace: "Unranked",
  };
}
