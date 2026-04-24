"use client";

import { Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAccountVerificationGame } from "./account-verification/use-account-verification-game";
import VerificationPlayingStage from "./account-verification/verification-playing-stage";
import VerificationSuccessStage from "./account-verification/verification-success-stage";
import ChallengeCard from "./challenge-card";
import { ChallengeDifficulty } from "@/lib/challenge-difficulty";

type AccountVerificationMenuProps = {
  onAttemptRecorded?: () => void;
};

export default function AccountVerificationMenu({
  onAttemptRecorded,
}: AccountVerificationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const game = useAccountVerificationGame(isOpen, onAttemptRecorded);

  return (
    <ChallengeCard
      action={
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="ml-auto flex h-11 w-28 rounded-full text-xl font-bold"
              variant="default"
            >
              Play
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
      }
      className="bg-gradient-to-br from-white via-rose-50/60 to-slate-50 shadow-rose-100/60"
      description="Your account is safe. Maybe."
      difficulty={ChallengeDifficulty.Medium}
      icon={<Lock className="size-7 text-orange-500" />}
      title="Account Verification"
    />
  );
}
