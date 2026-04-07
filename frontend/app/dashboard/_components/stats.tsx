import { ChevronDown, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type {
  GameStats,
  LastOverview,
  SummaryStats,
} from "@/lib/dashboard/dashboard-view-model";

type StatsProps = {
  games: GameStats[];
  summary: SummaryStats;
  lastOverview: LastOverview;
};

const SPARKLINE_WIDTH = 72;
const SPARKLINE_HEIGHT = 24;

function getTimeTone(lastMs: number | null, fastestMs: number | null): string {
  if (lastMs === null || fastestMs === null) {
    return "text-slate-600";
  }

  if (lastMs <= fastestMs * 1.05) {
    return "text-emerald-600";
  }

  if (lastMs <= fastestMs * 1.25) {
    return "text-amber-600";
  }

  return "text-rose-600";
}

function getFrustrationTone(value: number): string {
  if (value >= 7) {
    return "text-rose-600";
  }

  if (value >= 4) {
    return "text-amber-600";
  }

  return "text-emerald-600";
}

function formatGlobalRank(rank: number | null): string {
  if (rank === null) {
    return "Complete this game to claim a global leaderboard rank.";
  }

  return `Your rank in the global leaderboard is #${rank}.`;
}

function buildSparklinePath(values: number[]): string {
  if (values.length < 2) {
    return "";
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * SPARKLINE_WIDTH;
      const y = SPARKLINE_HEIGHT - ((value - min) / range) * SPARKLINE_HEIGHT;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function Sparkline({ values, tone }: { values: number[]; tone: string }) {
  const path = buildSparklinePath(values);

  if (!path) {
    return (
      <span className="text-xs text-slate-400" aria-hidden="true">
        --
      </span>
    );
  }

  const lastValue = values[values.length - 1] ?? 0;

  return (
    <svg
      width={SPARKLINE_WIDTH}
      height={SPARKLINE_HEIGHT}
      viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
      className={`block ${tone}`}
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx={SPARKLINE_WIDTH}
        cy={
          SPARKLINE_HEIGHT -
          ((lastValue - Math.min(...values)) /
            (Math.max(...values) - Math.min(...values) || 1)) *
            SPARKLINE_HEIGHT
        }
        r="2.5"
        fill="currentColor"
      />
    </svg>
  );
}

function MetricStack({
  total,
  average,
  tone,
  values,
  suffix,
  title,
}: {
  total: number | string;
  average: number | string;
  tone: string;
  values: number[];
  suffix?: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-2" title={title}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          total
        </span>
        <span className="text-lg font-semibold text-slate-800">
          {total}
          {suffix ?? ""}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          avg
        </span>
        <span className={`text-sm font-semibold ${tone}`}>
          {average}
          {suffix ?? ""}
        </span>
      </div>
      <Sparkline values={values} tone={tone} />
    </div>
  );
}

export default function Stats({ games, summary, lastOverview }: StatsProps) {
  return (
    <section className="rounded-[2rem] border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 p-3 shadow-xl shadow-rose-100/50 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
            Your Stats
          </p>
          <h2 className="text-2xl text-slate-700">Your suffering so far</h2>
        </div>
        <Button asChild className="w-auto self-start">
          <Link href="/leaderboard?from=dashboard">
            <Trophy className="size-4" />
            View Global Leaderboard
          </Link>
        </Button>
      </div>

      <div className="mt-3 grid gap-3 rounded-2xl border border-rose-200 bg-white/90 p-2.5 shadow-inner sm:mt-5 sm:gap-4 sm:p-4 lg:grid-cols-2">
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Total Overview
          </p>
          <div className="text-lg font-semibold text-slate-900 sm:text-2xl">
            {summary.totalAttempts} attempts
          </div>
          <div className="text-xs leading-5 text-slate-500 sm:text-sm">
            Average time {summary.averageTime}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm sm:gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-2 sm:p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              clicks
            </p>
            <p className="text-sm font-semibold text-slate-900 sm:text-lg">
              {summary.totalClicks}
            </p>
            <p className="text-xs leading-5 text-slate-500 sm:text-xs">
              avg {summary.averageClicks}
            </p>
          </div>
          <div className="rounded-xl border border-rose-100 bg-amber-50/40 p-2 sm:p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              errors
            </p>
            <p className="text-sm font-semibold text-slate-900 sm:text-lg">
              {summary.totalErrors}
            </p>
            <p className="text-xs leading-5 text-slate-500 sm:text-xs">
              avg {summary.averageErrors}
            </p>
          </div>
          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-2 sm:p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              frustration
            </p>
            <p className="text-sm font-semibold text-slate-900 sm:text-lg">
              {summary.totalFrustration}
            </p>
            <p className="text-xs leading-5 text-slate-500 sm:text-xs">
              avg {summary.averageFrustration}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 rounded-2xl border border-rose-200 bg-white/90 p-2.5 shadow-inner sm:mt-5 sm:gap-4 sm:p-4 lg:grid-cols-2">
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Last Overview
          </p>
          <div className="text-lg font-semibold text-slate-900 sm:text-2xl">
            {lastOverview.gameLabel}
          </div>
          <div className="text-xs leading-5 text-slate-500 sm:text-sm">
            Last run {lastOverview.lastRunTime}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm sm:gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-2 sm:p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              clicks
            </p>
            <p className="text-sm font-semibold text-slate-900 sm:text-lg">
              {lastOverview.lastClicks}
            </p>
            <p className="text-xs leading-5 text-slate-500 sm:text-xs">
              last {lastOverview.lastClicks}
            </p>
          </div>
          <div className="rounded-xl border border-rose-100 bg-amber-50/40 p-2 sm:p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              errors
            </p>
            <p className="text-sm font-semibold text-slate-900 sm:text-lg">
              {lastOverview.lastErrors}
            </p>
            <p className="text-xs leading-5 text-slate-500 sm:text-xs">
              last {lastOverview.lastErrors}
            </p>
          </div>
          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-2 sm:p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              frustration
            </p>
            <p
              className={`text-sm font-semibold sm:text-lg ${getFrustrationTone(lastOverview.lastFrustration)}`}
            >
              {lastOverview.lastFrustration}
            </p>
            <p className="text-xs leading-5 text-slate-500 sm:text-xs">
              last {lastOverview.lastFrustration}
            </p>
          </div>
        </div>
      </div>

      <details className="group mt-6 overflow-hidden rounded-2xl border border-rose-200 bg-white/90">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
              Detailed Game Stats
            </p>
            <p className="text-sm text-slate-500">
              Expand to view per-game performance breakdown.
            </p>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
              {games.length} games
            </span>
            <ChevronDown className="size-4 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
          </div>
        </summary>

        <div className="border-t border-rose-100 px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="mt-4 space-y-4 md:hidden">
            {games.map((game) => {
              const timeTone = getTimeTone(game.lastRunMs, game.fastestMs);
              const frustrationTone = getFrustrationTone(
                game.averageFrustration,
              );

              return (
                <article
                  key={game.gameType}
                  className="rounded-2xl border border-rose-200 bg-white/90 p-4 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {game.label}
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        Last {game.lastRunTime}
                      </p>
                      <p className="mt-1 text-xs text-rose-700">
                        {formatGlobalRank(game.globalRank)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Fastest</p>
                      <p className={`text-base font-semibold ${timeTone}`}>
                        {game.fastestTime}
                      </p>
                      <p className="text-xs text-slate-400">
                        Avg {game.averageTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        attempts
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {game.totalAttempts}
                      </p>
                    </div>
                    <div className="rounded-xl border border-rose-100 bg-white p-3">
                      <MetricStack
                        total={game.totalClicks}
                        average={game.averageClicks}
                        tone="text-slate-700"
                        values={game.series.clicks}
                        title={`Total clicks ${game.totalClicks}, avg ${game.averageClicks}`}
                      />
                    </div>
                    <div className="rounded-xl border border-rose-100 bg-white p-3">
                      <MetricStack
                        total={game.totalErrors}
                        average={game.averageErrors}
                        tone="text-amber-600"
                        values={game.series.errors}
                        title={`Total errors ${game.totalErrors}, avg ${game.averageErrors}`}
                      />
                    </div>
                    <div className="rounded-xl border border-rose-100 bg-white p-3">
                      <MetricStack
                        total={game.totalFrustration}
                        average={game.averageFrustration}
                        tone={frustrationTone}
                        values={game.series.frustration}
                        title={`Total frustration ${game.totalFrustration}, avg ${game.averageFrustration}`}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-rose-200 bg-white/90 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-rose-50 text-xs uppercase tracking-[0.2em] text-rose-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Game</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Attempts</th>
                  <th className="px-4 py-3 font-semibold">Clicks</th>
                  <th className="px-4 py-3 font-semibold">Errors</th>
                  <th className="px-4 py-3 font-semibold">Frustration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100 text-slate-700">
                {games.map((game) => {
                  const timeTone = getTimeTone(game.lastRunMs, game.fastestMs);
                  const frustrationTone = getFrustrationTone(
                    game.averageFrustration,
                  );

                  return (
                    <tr key={game.gameType} className="bg-white/70">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">
                          {game.label}
                        </div>
                        <div className="text-xs text-slate-400">
                          {game.totalAttempts} runs
                        </div>
                        <div className="mt-1 inline-flex rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
                          {formatGlobalRank(game.globalRank)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`text-base font-semibold ${timeTone}`}
                          >
                            {game.lastRunTime}
                          </span>
                          <span className="text-xs text-slate-500">
                            Fastest {game.fastestTime} · Avg {game.averageTime}
                          </span>
                          <Sparkline
                            values={game.series.timeMs}
                            tone={timeTone}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-lg font-semibold text-slate-900">
                          {game.totalAttempts}
                        </div>
                        <div className="text-xs text-slate-400">attempts</div>
                      </td>
                      <td className="px-4 py-4">
                        <MetricStack
                          total={game.totalClicks}
                          average={game.averageClicks}
                          tone="text-slate-700"
                          values={game.series.clicks}
                          title={`Total clicks ${game.totalClicks}, avg ${game.averageClicks}`}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <MetricStack
                          total={game.totalErrors}
                          average={game.averageErrors}
                          tone="text-amber-600"
                          values={game.series.errors}
                          title={`Total errors ${game.totalErrors}, avg ${game.averageErrors}`}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <MetricStack
                          total={game.totalFrustration}
                          average={game.averageFrustration}
                          tone={frustrationTone}
                          values={game.series.frustration}
                          title={`Total frustration ${game.totalFrustration}, avg ${game.averageFrustration}`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </section>
  );
}
