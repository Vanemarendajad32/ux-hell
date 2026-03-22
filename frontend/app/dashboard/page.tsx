"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const registrationResult = {
  username: "pixelpunisher",
  email: "pixelpunisher@uxhell.dev",
  time: "07:42",
  clicks: 128,
  submitAttempts: 5,
  fastestTime: "06:58",
  lastTime: "07:42",
  leaderboardPlace: "#14",
};

const accountCards = [
  {
    label: "Username",
    value: registrationResult.username,
    description: "Freshly issued survivor handle.",
    tone: "bg-rose-50",
  },
  {
    label: "Email",
    value: registrationResult.email,
    description: "Where the victory receipt was sent.",
    tone: "bg-orange-50",
  },
];

const statCards = [
  {
    label: "Total time played",
    value: registrationResult.time,
  },
  {
    label: "Total clicks",
    value: registrationResult.clicks,
  },
  {
    label: "Total attempts",
    value: registrationResult.submitAttempts,
  },
];

const timeCards = [
  {
    label: "Fastest time",
    value: registrationResult.fastestTime,
    tone: "border-rose-200 bg-rose-50",
  },
  {
    label: "Last time",
    value: registrationResult.lastTime,
    tone: "border-orange-200 bg-orange-50",
  },
  {
    label: "Leaderboard place",
    value: registrationResult.leaderboardPlace,
    tone: "border-amber-200 bg-amber-50",
  },
];

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSurface />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Registration can later redirect here: /dashboard?registered=true
  const shouldShowSuccessModal = searchParams.get("registered") === "true";
  const [isModalOpen, setIsModalOpen] = useState(shouldShowSuccessModal);

  useEffect(() => {
    setIsModalOpen(shouldShowSuccessModal);
  }, [shouldShowSuccessModal]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <DashboardSurface />

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/55 px-6 py-10 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-success-title"
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-rose-200 bg-white shadow-2xl shadow-slate-950/25"
          >
            <div className="h-1.5 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600" />

            <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
              <div className="max-w-xl">
                <h1
                  id="registration-success-title"
                  className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                >
                  Congratulations!
                </h1>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Your account has been created successfully.
                </p>
              </div>

              <section className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="min-w-0 rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-lg shadow-orange-100/50">
                    <p className="text-sm font-medium text-slate-600">
                      Username
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">
                      {registrationResult.username}
                    </p>
                  </article>

                  <article className="min-w-0 rounded-3xl border border-rose-200 bg-orange-50 p-5 shadow-lg shadow-orange-100/50">
                    <p className="text-sm font-medium text-slate-600">Email</p>
                    <p className="mt-3 text-lg leading-tight font-semibold text-slate-900 [overflow-wrap:anywhere] sm:text-xl">
                      {registrationResult.email}
                    </p>
                  </article>
                </div>
              </section>

              <div className="border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    router.replace(pathname);
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DashboardSurface() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-rose-50 px-6 py-8 text-slate-900">
      <main className="mx-auto flex h-full w-full max-w-6xl flex-col gap-6 overflow-hidden">
        <section className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white px-6 py-8 shadow-xl shadow-orange-100/70 sm:px-8 sm:py-10">
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600" />

          <div className="mt-8 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
              Dashboard
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Welcome to the dashboard
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Your account is in, the mock workspace is alive, and the worst of
              the registration drama is hopefully behind you.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Account info
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {accountCards.map((card) => (
              <article
                key={card.label}
                className={`rounded-3xl border border-rose-200 p-6 shadow-lg shadow-orange-100/50 ${card.tone}`}
              >
                <p className="text-sm font-medium text-slate-600">
                  {card.label}
                </p>
                <p className="mt-4 break-all text-2xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Registration stats
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card, index) => (
              <article
                key={card.label}
                className={`rounded-3xl border p-6 shadow-lg shadow-orange-100/50 ${
                  index === 0
                    ? "border-rose-200 bg-rose-50"
                    : index === 1
                      ? "border-orange-200 bg-orange-50"
                      : index === 2
                        ? "border-amber-200 bg-amber-50"
                        : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-sm font-medium text-slate-600">
                  {card.label}
                </p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {timeCards.map((card) => (
              <article
                key={card.label}
                className={`rounded-3xl border p-6 shadow-lg shadow-orange-100/50 ${card.tone}`}
              >
                <p className="text-sm font-medium text-slate-600">
                  {card.label}
                </p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
