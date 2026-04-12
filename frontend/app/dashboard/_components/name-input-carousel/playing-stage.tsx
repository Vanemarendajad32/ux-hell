import { ChevronLeft, ChevronRight, RotateCcw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SLOT_IDS, TARGET_NAME } from "./constants";
import type { FeedbackTone } from "./types";

type PlayingStageProps = {
  activeIndex: number;
  activeLetter: string;
  feedback: string;
  feedbackTone: FeedbackTone;
  nextLetter: string;
  onConfirmLetter: () => void;
  onMoveBack: () => void;
  onRestart: () => void;
  onShiftLetter: (direction: -1 | 1) => void;
  previousLetter: string;
  progressLetters: string[];
};

const feedbackClassName: Record<FeedbackTone, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
};

const infoCardClassName =
  "rounded-2xl border border-rose-200 bg-white/90 p-3 shadow-sm shadow-rose-100/60";

export default function PlayingStage({
  activeIndex,
  activeLetter,
  feedback,
  feedbackTone,
  nextLetter,
  onConfirmLetter,
  onMoveBack,
  onRestart,
  onShiftLetter,
  previousLetter,
  progressLetters,
}: PlayingStageProps) {
  return (
    <div className="space-y-4">
      <DialogHeader className="pr-8">
        <DialogTitle>Name Input Carousel</DialogTitle>
        <DialogDescription>
          Enter <span className="font-semibold">ALEX</span>. Direct typing has
          been replaced by a suspiciously cheerful character carousel.
        </DialogDescription>
      </DialogHeader>

      <section className="rounded-[1.75rem] border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 p-4 shadow-lg shadow-orange-100/40">
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className={infoCardClassName}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
                Target
              </p>
              <p className="mt-2 text-3xl font-bold tracking-[0.22em] text-slate-900">
                {TARGET_NAME}
              </p>
            </div>

            <div className={infoCardClassName}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Input mode
              </p>
              <div className="mt-2 rounded-xl border border-dashed border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-900">
                Keyboard disabled. Carousel required.
              </div>
            </div>
          </div>

          <div className={infoCardClassName}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Current progress
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Slot {activeIndex + 1} is currently active.
                </p>
              </div>

              <Button
                className="h-9 rounded-xl px-3 text-xs font-semibold"
                onClick={onRestart}
                size="sm"
                type="button"
                variant="secondary"
              >
                <RotateCcw className="size-3.5" />
                Restart
              </Button>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {progressLetters.map((letter, index) => (
                <div
                  key={SLOT_IDS[index]}
                  className={cn(
                    "rounded-[1.1rem] border px-2 py-3 text-center",
                    index === activeIndex
                      ? "border-rose-300 bg-rose-50 shadow-sm shadow-rose-100"
                      : "border-slate-200 bg-slate-50",
                  )}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Slot {index + 1}
                  </p>
                  <p className="mt-1.5 text-2xl font-black tracking-[0.2em] text-slate-900">
                    {letter}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/90 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Character carousel
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Pick one letter, save it, then suffer onward.
                </p>
              </div>

              <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                One slot at a time
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2">
              <Button
                className="h-24 rounded-[1.25rem] px-2 text-slate-700"
                onClick={() => onShiftLetter(-1)}
                size="lg"
                type="button"
                variant="outline"
              >
                <span className="flex flex-col items-center gap-2">
                  <ChevronLeft className="size-5" />
                  <span className="text-xl font-black tracking-[0.18em]">
                    {previousLetter}
                  </span>
                </span>
              </Button>

              <div className="rounded-[1.4rem] border border-rose-200 bg-gradient-to-b from-rose-50 to-orange-50 px-4 py-4 text-center shadow-sm shadow-orange-100/60">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-600">
                  Active letter
                </p>
                <p className="mt-2 text-5xl font-black tracking-[0.3em] text-slate-900 sm:text-6xl">
                  {activeLetter}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">
                  Z loops back to A.
                </p>
              </div>

              <Button
                className="h-24 rounded-[1.25rem] px-2 text-slate-700"
                onClick={() => onShiftLetter(1)}
                size="lg"
                type="button"
                variant="outline"
              >
                <span className="flex flex-col items-center gap-2">
                  <ChevronRight className="size-5" />
                  <span className="text-xl font-black tracking-[0.18em]">
                    {nextLetter}
                  </span>
                </span>
              </Button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                className="h-11 rounded-2xl"
                onClick={onMoveBack}
                type="button"
                variant="secondary"
              >
                <Undo2 className="size-4" />
                Back one slot
              </Button>

              <Button
                className="h-11 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                onClick={onConfirmLetter}
                type="button"
                variant="ghost"
              >
                Save and continue
              </Button>
            </div>

            {feedback && (
              <p
                className={cn(
                  "mt-3 rounded-2xl border px-3 py-2.5 text-sm",
                  feedbackClassName[feedbackTone],
                )}
              >
                {feedback}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
