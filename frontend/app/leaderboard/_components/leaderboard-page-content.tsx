import Link from "next/link";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import type {
  LeaderboardGame,
  LeaderboardPlayer,
  LeaderboardSource,
  LeaderboardStat,
} from "../_lib/leaderboard-data";
import LeaderboardGameTabs from "./leaderboard-game-tabs";
import LeaderboardHero from "./leaderboard-hero";
import LeaderboardList from "./leaderboard-list";
import LeaderboardPagination from "./leaderboard-pagination";
import LeaderboardStats from "./leaderboard-stats";

type LeaderboardPageContentProps = {
  currentUserRank: number | null;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
  players: LeaderboardPlayer[];
  selectedGame: LeaderboardGame;
  source: LeaderboardSource;
  stats: LeaderboardStat[];
  totalPages: number;
};

export default function LeaderboardPageContent({
  currentUserRank,
  currentPage,
  onPageChange,
  players,
  selectedGame,
  source,
  stats,
  totalPages,
}: LeaderboardPageContentProps) {
  return (
    <div className="min-h-screen px-3 py-5 text-slate-900 sm:px-6 sm:py-8">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6">
        <DashboardHeader />

        <div className="w-full">
          <LeaderboardHero source={source} currentUserRank={currentUserRank} />
          <LeaderboardGameTabs selectedGame={selectedGame} source={source} />
          <LeaderboardStats stats={stats} />
          <LeaderboardList players={players} />
          <LeaderboardPagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />

          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="px-10 py-4 text-lg font-bold hover:scale-[1.02]"
            >
              <Link href="/dashboard">Play Now &amp; Beat the Best</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
