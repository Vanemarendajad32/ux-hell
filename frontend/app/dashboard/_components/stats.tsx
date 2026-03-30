import type { ReactNode } from "react";
import {
  defaultUserStats,
  type StatsTileConfig,
  statsTileConfig,
  type UserStats,
} from "../_lib/stats";

function StatsTile({
  className,
  subtitle,
  title,
}: {
  className?: string;
  subtitle: ReactNode;
  title: ReactNode;
}) {
  return (
    <article
      className={`rounded-2xl border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/40 p-4 shadow-md shadow-orange-100/40 ${className ?? ""}`.trim()}
    >
      <p className="flex items-center gap-2 text-3xl font-bold tracking-tight text-slate-800">
        {title}
      </p>
      <p className="mt-2 text-2xl text-slate-600">{subtitle}</p>
    </article>
  );
}

type StatsProps = {
  stats?: UserStats;
};

function getTileValue(
  stats: UserStats,
  tile: StatsTileConfig,
): string | number {
  switch (tile.id) {
    case "total-time":
      return stats.totalTimePlayed;
    case "fastest-time":
      return stats.fastestTime;
    case "attempts":
      return stats.totalAttempts;
    case "clicks":
      return stats.clicks;
    default:
      return "";
  }
}

function getTileSubtitle(stats: UserStats, tile: StatsTileConfig): string {
  switch (tile.id) {
    case "attempts":
      return `${tile.subtitle} ${stats.lastTime}`;
    case "clicks":
      return stats.leaderboardPlace;
    default:
      return tile.subtitle;
  }
}

export default function Stats({ stats = defaultUserStats }: StatsProps) {
  return (
    <section className="rounded-[2rem] border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 p-4 shadow-xl shadow-rose-100/50 sm:p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
          Your Stats
        </p>
        <h2 className="text-2xl text-slate-700">Your suffering so far</h2>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statsTileConfig.map((tile) => {
          const TitleIcon = tile.titleIcon;
          const SubtitleIcon = tile.subtitleIcon;

          return (
            <StatsTile
              key={tile.id}
              subtitle={
                <span className="inline-flex items-center gap-2">
                  {SubtitleIcon && (
                    <SubtitleIcon
                      className={`size-4 ${tile.subtitleIconClassName ?? "text-slate-500"}`}
                    />
                  )}
                  {getTileSubtitle(stats, tile)}
                </span>
              }
              title={
                <>
                  <TitleIcon className={`size-5 ${tile.titleIconClassName}`} />
                  {getTileValue(stats, tile)}
                  {tile.titleSuffix && (
                    <span className="text-2xl font-medium text-slate-500">
                      {tile.titleSuffix}
                    </span>
                  )}
                </>
              }
            />
          );
        })}
      </div>
    </section>
  );
}
