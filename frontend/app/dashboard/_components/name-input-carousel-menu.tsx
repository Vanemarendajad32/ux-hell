"use client";

import { Keyboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChallengeCard from "./challenge-card";
import IntroStage from "./name-input-carousel/intro-stage";
import PlayingStage from "./name-input-carousel/playing-stage";
import SuccessStage from "./name-input-carousel/success-stage";
import { useNameInputCarouselGame } from "./name-input-carousel/use-name-input-carousel-game";
import { ChallengeDifficulty } from "@/lib/challenge-difficulty";

type NameInputCarouselMenuProps = {
  onAttemptRecorded?: () => void;
};

export default function NameInputCarouselMenu({
  onAttemptRecorded,
}: NameInputCarouselMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const game = useNameInputCarouselGame(isOpen, onAttemptRecorded);

  return (
    <ChallengeCard
      action={
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto flex h-11 w-28 rounded-full text-xl font-bold">
              Play
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[calc(100%-1rem)] gap-3 overflow-hidden p-4 sm:max-w-md sm:p-5">
            {game.stage === "intro" && (
              <IntroStage onStart={game.handleStartGame} />
            )}

            {game.stage === "playing" && (
              <PlayingStage
                activeIndex={game.activeIndex}
                activeLetter={game.activeLetter}
                feedback={game.feedback}
                feedbackTone={game.feedbackTone}
                nextLetter={game.nextLetter}
                onConfirmLetter={game.handleConfirmLetter}
                onMoveBack={game.handleMoveBack}
                onRestart={game.handleRestart}
                onShiftLetter={game.handleShiftLetter}
                previousLetter={game.previousLetter}
                progressLetters={game.progressLetters}
              />
            )}

            {game.stage === "success" && (
              <SuccessStage
                apiFeedback={game.apiFeedback}
                onClose={() => setIsOpen(false)}
                solvedInSeconds={game.solvedInSeconds}
              />
            )}
          </DialogContent>
        </Dialog>
      }
      className="bg-gradient-to-br from-white via-orange-50/70 to-rose-50 shadow-rose-100/60"
      description="Enter ALEX with a premium character carousel that nobody should ever have approved"
      difficulty={ChallengeDifficulty.Easy}
      icon={<Keyboard className="size-7 text-rose-600" />}
      title="Name Input Carousel"
    />
  );
}
