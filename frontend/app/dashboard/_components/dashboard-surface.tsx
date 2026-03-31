import type { DashboardData } from "@/lib/dashboard/dashboard-view-model";
import Challenges from "./challenges";
import DashboardHeader from "./dashboard-header";
import Stats from "./stats";

type DashboardSurfaceProps = {
  data: DashboardData;
  username: string;
};

export default function DashboardSurface({
  data,
  username,
}: DashboardSurfaceProps) {
  return (
    <div className="min-h-screen px-6 py-8 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <DashboardHeader />

        <section className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white px-6 py-8 shadow-xl shadow-orange-100/70 sm:px-8 sm:py-10">
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600" />

          <div className="mt-8 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
              Dashboard
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Welcome back, {username}!
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Your account is in, the mock workspace is alive, and the worst of
              the registration drama is hopefully behind you.
            </p>
          </div>
        </section>

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
        <Challenges />
      </main>
    </div>
  );
}
