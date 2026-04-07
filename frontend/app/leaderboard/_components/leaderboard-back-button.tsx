"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { LeaderboardSource } from "../_lib/leaderboard-data";

type LeaderboardBackButtonProps = {
  source: LeaderboardSource;
};

export default function LeaderboardBackButton({
  source,
}: LeaderboardBackButtonProps) {
  const router = useRouter();

  function handleBack() {
    router.push(source === "home" ? "/" : "/dashboard");
  }

  return (
    <Button
      variant="ghost"
      className="mb-6 inline-flex gap-2 text-slate-600 hover:text-slate-900"
      onClick={handleBack}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="text-sm font-medium">Back to Game</span>
    </Button>
  );
}
