import type { DashboardData } from "@/lib/dashboard/dashboard-view-model";
import { getAccountCards } from "../_lib/dashboard-cards";
import Challenges from "./challenges";
import DashboardHeader from "./dashboard-header";
import InfoCard from "./info-card";
import Stats from "./stats";

type DashboardSurfaceProps = {
  data: DashboardData;
  errorMessage?: string;
};

export default function DashboardSurface({
  data,
  errorMessage,
}: DashboardSurfaceProps) {
  const accountCards = getAccountCards(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-rose-50 px-6 py-8 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <DashboardHeader />

        <section className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white px-6 py-8 shadow-xl shadow-orange-100/70 sm:px-8 sm:py-10">
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600" />

          <div className="mt-8 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
              Dashboard
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Welcome back, {data.username}!
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Your account is in, the mock workspace is alive, and the worst of
              the registration drama is hopefully behind you.
            </p>
            {errorMessage ? (
              <p className="max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Account info
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {accountCards.map((card) => (
              <InfoCard
                key={card.label}
                className="p-6 shadow-lg shadow-orange-100/50"
                description={card.description}
                label={card.label}
                tone={card.tone}
                value={card.value}
                valueClassName={card.valueClassName}
              />
            ))}
          </div>
        </section>

        <Challenges />
        <Stats
          stats={{
            clicks: data.totalClicks,
            fastestTime: data.fastestTime,
            lastTime: data.lastTime,
            leaderboardPlace: data.leaderboardPlace,
            totalAttempts: data.totalAttempts,
            totalTimePlayed: data.totalTimePlayed,
          }}
        />
      </main>
    </div>
  );
}
