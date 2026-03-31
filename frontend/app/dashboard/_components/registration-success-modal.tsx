import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import InfoCard from "./info-card";

type RegistrationSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
};

export default function RegistrationSuccessModal({
  isOpen,
  onClose,
  username,
}: RegistrationSuccessModalProps) {
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
        className="w-full max-w-2xl gap-0 overflow-hidden rounded-[2rem] border border-rose-200 bg-white p-0 shadow-2xl shadow-slate-950/25 sm:max-w-2xl"
        showCloseButton={false}
      >
        <div className="h-1.5 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600" />

        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <div className="max-w-xl">
            <DialogTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Congratulations!
            </DialogTitle>
            <DialogDescription className="mt-3 text-base leading-7 text-slate-600">
              Your account has been created successfully.
            </DialogDescription>
          </div>

          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                className="p-5 shadow-lg shadow-orange-100/50"
                label="Username"
                tone="bg-rose-50"
                value={username}
                valueClassName="mt-3 text-2xl font-semibold text-slate-900"
              />
            </div>
          </section>

          <div className="border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
