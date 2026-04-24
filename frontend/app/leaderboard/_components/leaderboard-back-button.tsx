"use client";

import type { LeaderboardSource } from "../_lib/leaderboard-data";
import BackButton from "@/components/ui/back-button";

type LeaderboardBackButtonProps = {
  source: LeaderboardSource;
  className?: string;
};

export default function LeaderboardBackButton({
  source,
  className,
}: LeaderboardBackButtonProps) {
  const to = source === "home" ? "/" : "/dashboard";
  return <BackButton to={to} className={`mb-6 ${className ?? ""}`} />;
}
