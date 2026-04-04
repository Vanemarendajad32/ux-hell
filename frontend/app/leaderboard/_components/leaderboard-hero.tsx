import { Trophy } from "lucide-react";
import type { LeaderboardSource } from "../_lib/leaderboard-data";
import LeaderboardBackButton from "./leaderboard-back-button";

type LeaderboardHeroProps = {
  source: LeaderboardSource;
};

export default function LeaderboardHero({ source }: LeaderboardHeroProps) {
  return (
    <header className="mb-12 text-center">
      <LeaderboardBackButton source={source} />

      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shadow-xl">
          <Trophy className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="mb-3 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
        Hall of Fame
      </h1>
      <p className="text-base text-slate-600 sm:text-lg">
        Masters who conquered UI Hell with minimal frustration
      </p>
    </header>
  );
}
