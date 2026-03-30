import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type VerificationSuccessStageProps = {
  apiFeedback: string;
  onClose: () => void;
  solvedInSeconds: string;
};

export default function VerificationSuccessStage({
  apiFeedback,
  onClose,
  solvedInSeconds,
}: VerificationSuccessStageProps) {
  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-emerald-700">
          SUCCESS!
        </DialogTitle>
        <DialogDescription className="text-slate-700">
          Account verified. Your patience survived the OTP storm, and that is
          honestly impressive.
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
          Close
        </Button>
      </div>
    </div>
  );
}
