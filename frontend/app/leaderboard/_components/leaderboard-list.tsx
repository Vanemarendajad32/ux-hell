import { Crown, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeaderboardPlayer } from "../_lib/leaderboard-data";

type LeaderboardListProps = {
  players: LeaderboardPlayer[];
};

const topRankStyles: Record<number, string> = {
  1: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300",
  2: "bg-gradient-to-r from-slate-50 to-zinc-50 border-slate-300",
  3: "bg-gradient-to-r from-orange-50 to-amber-50 border-amber-300",
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return <Crown className="h-6 w-6 text-yellow-500" />;
  }

  if (rank === 2) {
    return <Medal className="h-6 w-6 text-slate-400" />;
  }

  if (rank === 3) {
    return <Medal className="h-6 w-6 text-amber-600" />;
  }

  return (
    <div className="flex h-6 w-6 items-center justify-center text-sm font-bold text-slate-400">
      {rank}
    </div>
  );
}

function Metric({
  label,
  value,
  score = false,
}: {
  label: string;
  value: string;
  score?: boolean;
}) {
  return (
    <div className="text-center">
      <div className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
        {label}
      </div>
      <div
        className={cn(
          "font-bold text-slate-900",
          score &&
            "bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-xl text-transparent",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function LeaderboardListRow({ player }: { player: LeaderboardPlayer }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-2xl border-2 p-5 transition-all hover:shadow-lg md:flex-row md:items-center md:gap-6",
        topRankStyles[player.rank] ?? "border-slate-200 bg-white",
      )}
    >
      <div className="flex w-12 items-center justify-center">
        <RankBadge rank={player.rank} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-lg font-bold text-slate-900">
          {player.name}
        </div>
        <div className="text-xs text-slate-500">{player.completedAt}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:gap-8">
        <Metric label="Time" value={player.time} />
        <Metric label="Frustration" value={player.frustration} />
        <div className="min-w-[100px]">
          <Metric label="Score" value={player.score} score />
        </div>
      </div>
    </article>
  );
}

export default function LeaderboardList({ players }: LeaderboardListProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-rose-200 bg-white shadow-2xl">
      <div className="bg-gradient-to-r from-rose-600 to-orange-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Top Players</h2>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {players.map((player) => (
            <LeaderboardListRow key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  );
}
