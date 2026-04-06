import type { DashboardData } from "@/lib/dashboard/dashboard-view-model";
import Challenges from "./challenges";
import DashboardHeader from "./dashboard-header";
import Stats from "./stats";

type DashboardSurfaceProps = {
  data: DashboardData;
  onAttemptRecorded?: () => void;
  username: string;
};

export default function DashboardSurface({
  data,
  onAttemptRecorded,
  username,
}: DashboardSurfaceProps) {
  return (
<<<<<<< ux-hell-24-login-session-logout
    <div className="min-h-screen px-6 py-8 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6">
=======
    <div className="min-h-screen px-3 py-5 text-slate-900 sm:px-6 sm:py-8">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6">
>>>>>>> main
        <DashboardHeader username={username} />

        <section className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white px-3 py-5 shadow-xl shadow-orange-100/70 sm:px-8 sm:py-10">
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 sm:h-1.5" />

          <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
              Dashboard
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Welcome back, {username}!
            </h1>
            <p className="max-w-2xl text-sm leading-5 text-slate-600 sm:text-base sm:leading-7">
              Your account is in, the mock workspace is alive, and the worst of
              the registration drama is hopefully behind you.
            </p>
          </div>
        </section>

        <Stats
          games={data.games}
          summary={data.summary}
          lastOverview={data.lastOverview}
        />
        <Challenges onAttemptRecorded={onAttemptRecorded} />
      </main>
    </div>
  );
}
