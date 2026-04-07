import type { LeaderboardStat } from "../_lib/leaderboard-data";

type LeaderboardStatsProps = {
  stats: LeaderboardStat[];
};

function LeaderboardStatCard({
  icon: Icon,
  iconClassName,
  label,
  value,
}: LeaderboardStat) {
  return (
    <article className="rounded-2xl border border-rose-200 bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${iconClassName}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
          {label}
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </article>
  );
}

export default function LeaderboardStats({ stats }: LeaderboardStatsProps) {
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <LeaderboardStatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
