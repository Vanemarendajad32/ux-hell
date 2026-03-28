import type { DashboardData } from "@/lib/dashboard/dashboard-view-model";

type AccountCard = {
  label: string;
  value: string;
  description?: string;
  tone: string;
  valueClassName?: string;
};

export function getAccountCards(
  registrationResult: DashboardData,
): AccountCard[] {
  return [
    {
      label: "Username",
      value: registrationResult.username,
      description: "Freshly issued survivor handle.",
      tone: "bg-rose-50",
    },
    {
      label: "Email",
      value: registrationResult.email,
      description: "Where the victory receipt was sent.",
      tone: "bg-orange-50",
      valueClassName:
        "mt-4 text-xl font-bold tracking-tight text-slate-900 [overflow-wrap:anywhere]",
    },
  ];
}

export function getStatCards(registrationResult: DashboardData) {
  return [
    {
      label: "Total time played",
      value: registrationResult.totalTimePlayed,
      tone: "border-rose-200 bg-rose-50",
    },
    {
      label: "Total clicks",
      value: registrationResult.totalClicks,
      tone: "border-orange-200 bg-orange-50",
    },
    {
      label: "Total attempts",
      value: registrationResult.totalAttempts,
      tone: "border-amber-200 bg-amber-50",
    },
  ];
}

export function getTimeCards(registrationResult: DashboardData) {
  return [
    {
      label: "Fastest time",
      value: registrationResult.fastestTime,
      tone: "border-rose-200 bg-rose-50",
    },
    {
      label: "Last time",
      value: registrationResult.lastTime,
      tone: "border-orange-200 bg-orange-50",
    },
    {
      label: "Leaderboard place",
      value: registrationResult.leaderboardPlace,
      tone: "border-amber-200 bg-amber-50",
    },
  ];
}
