"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/api/services/leaderboard-service";
import {
  emptyLeaderboardData,
  type LeaderboardGame,
  type LeaderboardSource,
  type LeaderboardViewData,
  mapLeaderboardResponseToView,
} from "../_lib/leaderboard-data";
import LeaderboardPageContent from "./leaderboard-page-content";

type LeaderboardDataLoaderProps = {
  selectedGame: LeaderboardGame;
  source: LeaderboardSource;
};

export default function LeaderboardDataLoader({
  selectedGame,
  source,
}: LeaderboardDataLoaderProps) {
  const [viewData, setViewData] =
    useState<LeaderboardViewData>(emptyLeaderboardData);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    let isCancelled = false;

    async function loadLeaderboard() {
      try {
        const response = await getLeaderboard(selectedGame, page, pageSize);

        if (!isCancelled) {
          setViewData(mapLeaderboardResponseToView(response));
        }
      } catch {
        if (!isCancelled) {
          setViewData(emptyLeaderboardData);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isCancelled = true;
    };
  }, [page, selectedGame]);

  return (
    <LeaderboardPageContent
      currentPage={viewData.page}
      onPageChange={setPage}
      selectedGame={selectedGame}
      source={source}
      stats={viewData.stats}
      players={viewData.players}
      totalPages={viewData.totalPages}
    />
  );
}
