import type { LucideIcon } from "lucide-react";
import {
  MousePointerClick,
  Rocket,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";

export type UserStats = {
  clicks: number;
  fastestTime: string;
  lastTime: string;
  leaderboardPlace: string;
  totalAttempts: number;
  totalTimePlayed: string;
};

export type StatsTileConfig = {
  id: "total-time" | "fastest-time" | "attempts" | "clicks";
  subtitle: string;
  subtitleIcon?: LucideIcon;
  subtitleIconClassName?: string;
  titleIcon: LucideIcon;
  titleIconClassName: string;
  titleSuffix?: string;
};

export const defaultUserStats: UserStats = {
  clicks: 0,
  fastestTime: "--:--",
  lastTime: "--:--",
  leaderboardPlace: "Unranked",
  totalAttempts: 0,
  totalTimePlayed: "--:--",
};

export const statsTileConfig: StatsTileConfig[] = [
  {
    id: "total-time",
    subtitle: "total time",
    titleIcon: Timer,
    titleIconClassName: "text-slate-500",
  },
  {
    id: "fastest-time",
    subtitle: "fastest",
    titleIcon: Zap,
    titleIconClassName: "text-amber-500",
  },
  {
    id: "attempts",
    subtitle: "Last run",
    subtitleIcon: Rocket,
    subtitleIconClassName: "text-slate-500",
    titleIcon: Target,
    titleIconClassName: "text-rose-500",
    titleSuffix: "attempts",
  },
  {
    id: "clicks",
    subtitleIcon: Trophy,
    subtitleIconClassName: "text-amber-600",
    titleIcon: MousePointerClick,
    titleIconClassName: "text-slate-500",
    titleSuffix: "clicks",
    subtitle: "",
  },
];
