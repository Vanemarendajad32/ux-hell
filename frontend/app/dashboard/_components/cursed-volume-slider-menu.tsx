"use client";

import { Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChallengeDifficulty } from "@/lib/challenge-difficulty";
import ChallengeCard from "./challenge-card";
import IntroStage from "./cursed-volume-slider/intro-stage";
import PlayingStage from "./cursed-volume-slider/playing-stage";
import SuccessStage from "./cursed-volume-slider/success-stage";
import { useCursedVolumeSliderGame } from "./cursed-volume-slider/use-cursed-volume-slider-game";

type CursedVolumeSliderMenuProps = {
  onAttemptRecorded?: () => void;
};

export default function CursedVolumeSliderMenu({
  onAttemptRecorded,
}: CursedVolumeSliderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const game = useCursedVolumeSliderGame(isOpen, onAttemptRecorded);

  return (
    <ChallengeCard
      action={
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto flex h-11 w-28 rounded-full text-xl font-bold">
              Play
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
            {game.stage === "intro" && (
              <IntroStage onStart={game.handleStartGame} />
            )}

            {game.stage === "playing" && (
              <PlayingStage
                currentVolume={game.currentVolume}
                feedback={game.feedback}
                onSliderChange={game.handleSliderChange}
                onSliderCommit={game.handleSliderCommit}
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
      className="bg-gradient-to-br from-white via-amber-50/70 to-rose-50 shadow-rose-100/60"
      description="Hit exactly 50% before the slider corrects you"
      difficulty={ChallengeDifficulty.Easy}
      icon={<Volume2 className="size-7 text-rose-600" />}
      title="Cursed Volume Slider"
    />
  );
}
