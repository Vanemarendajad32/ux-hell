"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAccountVerificationGame } from "./account-verification/use-account-verification-game";
import VerificationPlayingStage from "./account-verification/verification-playing-stage";
import VerificationSuccessStage from "./account-verification/verification-success-stage";

export default function AccountVerificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const game = useAccountVerificationGame(isOpen);

  return (
    <section className="rounded-[1.6rem] border border-rose-200 bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 px-5 py-4 shadow-lg shadow-rose-100/70 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Verification game
          </p>
          <p className="text-sm text-slate-700">
            Your account is safe. Probably. Maybe.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto" variant="default">
              Verify your account
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl">
            {game.stage === "playing" && (
              <VerificationPlayingStage
                activeCode={game.activeCode}
                digits={game.digits}
                feedback={game.feedback}
                onBackspace={game.handleBackspace}
                onDigitInput={game.handleDigitInput}
                onVerify={game.handleVerify}
              />
            )}

            {game.stage === "success" && (
              <VerificationSuccessStage
                apiFeedback={game.apiFeedback}
                onClose={() => setIsOpen(false)}
                solvedInSeconds={game.solvedInSeconds}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
