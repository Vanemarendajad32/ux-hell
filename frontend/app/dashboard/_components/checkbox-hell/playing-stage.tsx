import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CheckboxOption } from "./types";

type PlayingStageProps = {
  feedback: string;
  movingOffset: { x: number; y: number };
  movingOptionId: string | null;
  onOptionClick: (id: string) => void;
  onSubmit: () => void;
  options: CheckboxOption[];
};

export default function PlayingStage({
  feedback,
  movingOffset,
  movingOptionId,
  onOptionClick,
  onSubmit,
  options,
}: PlayingStageProps) {
  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle>Checkbox Hell</DialogTitle>
        <DialogDescription>
          Goal: find the truest checkbox and set it to true and leave all wrong
          ones unchecked.
        </DialogDescription>
      </DialogHeader>

      <div className="max-h-[45vh] space-y-2 overflow-y-auto rounded-2xl border border-rose-200 bg-white/90 p-3">
        {options.map((option) => {
          const isMoving = option.id === movingOptionId;
          const shownChecked = option.fakeVisual
            ? option.visualChecked
            : option.checked;

          return (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2 text-sm text-slate-800 transition"
              style={
                isMoving
                  ? {
                      transform: `translate(${movingOffset.x}px, ${movingOffset.y}px)`,
                    }
                  : undefined
              }
            >
              <input
                checked={shownChecked}
                className="h-4 w-4 accent-rose-600"
                onChange={() => onOptionClick(option.id)}
                type="checkbox"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      {feedback && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {feedback}
        </p>
      )}

      <div className="flex justify-end">
        <Button onClick={onSubmit} type="button">
          Submit answer
        </Button>
      </div>
    </div>
  );
}
