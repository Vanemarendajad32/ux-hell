import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SuccessStageProps = {
  apiFeedback: string;
  onClose: () => void;
  solvedInSeconds: string;
};

export default function SuccessStage({
  apiFeedback,
  onClose,
  solvedInSeconds,
}: SuccessStageProps) {
  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-emerald-700">
          Name entered
        </DialogTitle>
        <DialogDescription className="text-slate-700">
          You spelled ALEX with a wildly unnecessary carousel and survived the
          product decision.
        </DialogDescription>
      </DialogHeader>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        Solved in <span className="font-bold">{solvedInSeconds}s</span>.
      </div>

      {apiFeedback && (
        <output className="text-xs text-slate-500">{apiFeedback}</output>
      )}

      <div className="flex justify-end">
        <Button onClick={onClose} type="button">
          Continue
        </Button>
      </div>
    </div>
  );
}
