import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
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
    </div>
  );
}
