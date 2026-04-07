import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  LeaderboardGame,
  LeaderboardSource,
} from "../_lib/leaderboard-data";
import { leaderboardGames } from "../_lib/leaderboard-data";

type LeaderboardGameTabsProps = {
  selectedGame: LeaderboardGame;
  source: LeaderboardSource;
};

export default function LeaderboardGameTabs({
  selectedGame,
  source,
}: LeaderboardGameTabsProps) {
  return (
    <section className="mb-8 rounded-2xl border border-rose-200 bg-white/80 p-3 shadow-sm">
      <div className="mb-2 text-xs font-semibold tracking-[0.2em] text-rose-600 uppercase">
        Game Leaderboards
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {leaderboardGames.map((game) => {
          const isActive = game.id === selectedGame;

          return (
            <Button
              key={game.id}
              asChild
              variant={isActive ? "default" : "secondary"}
              className={cn("w-full", isActive && "shadow-md")}
            >
              <Link href={`/leaderboard?game=${game.id}&from=${source}`}>
                {game.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
