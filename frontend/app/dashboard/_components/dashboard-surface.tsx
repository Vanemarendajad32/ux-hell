"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [buttonPhase, setButtonPhase] = useState(0);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [warningStep, setWarningStep] = useState<"warning" | "joke">("warning");

  function handleForbiddenButtonClick() {
    if (buttonPhase === 0) {
      setButtonPhase(1);
      return;
    }

    if (buttonPhase === 1) {
      setButtonPhase(2);
      return;
    }

    setWarningStep("warning");
    setIsWarningOpen(true);
  }

  function handleAcceptConsequences() {
    setWarningStep("joke");
    setButtonPhase(0);
  }

  function handleWarningOpenChange(nextOpen: boolean) {
    if (!nextOpen && warningStep === "warning") {
      return;
    }

    setIsWarningOpen(nextOpen);
  }

  const buttonCaption =
    buttonPhase === 0
      ? "Do not push this button!"
      : buttonPhase === 1
        ? "Seriously."
        : "We are logging this.";

  return (
    <div className="min-h-screen px-3 py-5 text-slate-900 sm:px-6 sm:py-8">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6">
        <DashboardHeader username={username} />

        <section className="overflow-hidden rounded-[2rem] border border-rose-200 bg-white px-3 py-5 shadow-xl shadow-orange-100/70 sm:px-8 sm:py-10">
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 sm:h-1.5" />

          <div className="mt-4 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2 sm:gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
                Dashboard
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Welcome back, {username}!
              </h1>
              <p className="max-w-2xl text-sm leading-5 text-slate-600 sm:text-base sm:leading-7">
                Your account is in, the mock workspace is alive, and the worst
                of the registration drama is hopefully behind you.
              </p>
            </div>

            <div className="flex w-44 flex-col items-center gap-2 self-start sm:mt-1">
              <button
                type="button"
                aria-label="Do not push this button"
                className="size-16 cursor-not-allowed rounded-full border-4 border-red-700 bg-red-600 shadow-[0_10px_20px_rgba(220,38,38,0.35)] transition hover:scale-105 hover:bg-red-500 active:scale-95 sm:size-20"
                onClick={handleForbiddenButtonClick}
              />
              <p className="text-center text-xs font-semibold text-red-700">
                {buttonCaption}
              </p>
            </div>
          </div>
        </section>

        <Dialog open={isWarningOpen} onOpenChange={handleWarningOpenChange}>
          <DialogContent className="max-w-md">
            {warningStep === "warning" ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <DialogTitle className="text-xl font-bold text-slate-900">
                    System warning ⚠️
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-700">
                    You have violated a direct instruction.
                    <br />
                    Penalty will be applied.
                  </DialogDescription>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleAcceptConsequences}
                >
                  Accept consequences
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Just kidding.
                </DialogTitle>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setIsWarningOpen(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

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
