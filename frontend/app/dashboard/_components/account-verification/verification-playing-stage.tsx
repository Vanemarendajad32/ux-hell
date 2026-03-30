import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OTP_SLOT_IDS, PHONE_MASK } from "./constants";

type VerificationPlayingStageProps = {
  activeCode: string;
  digits: string[];
  feedback: string;
  onBackspace: (index: number, onFocus: (nextIndex: number) => void) => void;
  onDigitInput: (
    index: number,
    digit: string,
    onFocus: (nextIndex: number) => void,
  ) => void;
  onVerify: () => void;
};

export default function VerificationPlayingStage({
  activeCode,
  digits,
  feedback,
  onBackspace,
  onDigitInput,
  onVerify,
}: VerificationPlayingStageProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusIndex = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle>Account Verification</DialogTitle>
        <DialogDescription>
          We sent a verification code{" "}
          <span className="font-semibold text-slate-800">{activeCode}</span> to
          your phone number {PHONE_MASK}.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          Enter the code below:
        </p>
        <div className="grid grid-cols-6 gap-2">
          {OTP_SLOT_IDS.map((slotId, index) => (
            <input
              key={slotId}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              className="h-12 rounded-xl border border-orange-200 bg-white px-0 text-center text-lg font-semibold text-slate-900 shadow-sm outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              inputMode="numeric"
              maxLength={1}
              onChange={(event) => {
                const digit = event.target.value.replace(/\D/g, "").slice(-1);
                onDigitInput(index, digit, focusIndex);
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace") {
                  event.preventDefault();
                  onBackspace(index, focusIndex);
                }
              }}
              type="text"
              value={digits[index] ?? ""}
            />
          ))}
        </div>
      </div>

      {feedback && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {feedback}
        </p>
      )}

      <div className="flex justify-end">
        <Button onClick={onVerify} type="button">
          Verify
        </Button>
      </div>
    </div>
  );
}
