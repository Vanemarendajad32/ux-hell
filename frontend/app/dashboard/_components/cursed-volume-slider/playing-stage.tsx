import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TARGET_VOLUME } from "./constants";

type PlayingStageProps = {
  currentVolume: number;
  feedback: string;
  onSliderChange: (value: number) => void;
  onSliderCommit: (value: number) => void;
};

const infoCardClassName =
  "rounded-2xl border border-rose-200 bg-white/90 p-4 shadow-sm shadow-rose-100/60";

export default function PlayingStage({
  currentVolume,
  feedback,
  onSliderChange,
  onSliderCommit,
}: PlayingStageProps) {
  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle>Cursed Volume Slider</DialogTitle>
        <DialogDescription>
          Set the volume to exactly <span className="font-semibold">50%</span>.
          The slider follows your drag, then betrays you when you let go.
        </DialogDescription>
      </DialogHeader>

      <section className="rounded-[1.75rem] border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 p-4 shadow-lg shadow-orange-100/40">
        <div className="grid gap-3">
          <div className={infoCardClassName}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
              Target
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {TARGET_VOLUME}%
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-orange-100 bg-white/90 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Current output
              </p>
              <p className="mt-2 text-5xl font-bold tracking-tight text-slate-900">
                {currentVolume}%
              </p>
            </div>

            <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              Exact match only
            </div>
          </div>

          <div className="mt-5">
            <div className="relative rounded-full bg-slate-100 px-3 py-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-7 w-px -translate-y-1/2 border-l-2 border-dashed border-rose-500"
                style={{ left: `${TARGET_VOLUME}%` }}
              />
              <input
                aria-label="Volume slider"
                className="h-3 w-full cursor-pointer accent-rose-600"
                max={100}
                min={0}
                onChange={(event) =>
                  onSliderChange(Number(event.currentTarget.value))
                }
                onKeyUp={(event) => {
                  if (
                    event.key.startsWith("Arrow") ||
                    event.key === "Home" ||
                    event.key === "End" ||
                    event.key === "PageUp" ||
                    event.key === "PageDown"
                  ) {
                    onSliderCommit(Number(event.currentTarget.value));
                  }
                }}
                onPointerUp={(event) =>
                  onSliderCommit(Number(event.currentTarget.value))
                }
                step={1}
                type="range"
                value={currentVolume}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </section>

      {feedback && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {feedback}
        </p>
      )}
    </div>
  );
}
