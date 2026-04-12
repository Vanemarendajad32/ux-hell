import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type RegistrationSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RegistrationSuccessModal({
  isOpen,
  onClose,
}: RegistrationSuccessModalProps) {
  const [progress, setProgress] = useState(3);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setProgress(3);
    const intervalId = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }

        const delta = Math.max(0.08, (100 - prev) * 0.02);
        return Math.min(100, prev + delta);
      });
    }, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || progress < 100) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, onClose, progress]);

  const progressLabel = `${Math.floor(progress)}%`;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="w-full max-w-xl gap-0 overflow-hidden rounded-[2rem] border border-rose-200 bg-white p-0 shadow-2xl shadow-slate-950/25 sm:max-w-xl"
        showCloseButton={false}
      >
        <div className="h-1.5 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600" />

        <div className="space-y-6 px-6 py-7 sm:px-8 sm:py-8">
          <div className="max-w-xl">
            <DialogTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard is loading...
            </DialogTitle>
            <DialogDescription className="mt-3 text-base leading-7 text-slate-600">
              We&apos;re getting everything cozy for you. This may take a
              dramatically unnecessary moment.
            </DialogDescription>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
              <span>Loading Sequence</span>
              <span>{progressLabel}</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full border border-rose-200 bg-rose-50/70 p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 transition-[width] duration-200 ease-out"
                style={{ width: progressLabel }}
              />
            </div>
          </section>

          <div className="border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-rose-700 underline decoration-rose-300 underline-offset-4 transition-colors hover:text-rose-800"
            >
              Click here if you don&apos;t like to wait
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
