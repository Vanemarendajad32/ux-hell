"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChallengeCard from "./challenge-card";
import IntroStage from "./checkbox-hell/intro-stage";
import PlayingStage from "./checkbox-hell/playing-stage";
import SuccessStage from "./checkbox-hell/success-stage";
import { useCheckboxHellGame } from "./checkbox-hell/use-checkbox-hell-game";
import { ChallengeDifficulty } from "@/lib/challenge-difficulty";

type CheckboxHellMenuProps = {
  onAttemptRecorded?: () => void;
};

export default function CheckboxHellMenu({
  onAttemptRecorded,
}: CheckboxHellMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const game = useCheckboxHellGame(isOpen, onAttemptRecorded);

  return (
    <ChallengeCard
      action={
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto flex h-11 w-28 rounded-full text-xl font-bold">
              Play
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl">
            {game.stage === "intro" && (
              <IntroStage onStart={game.handleStartGame} />
            )}
            {game.stage === "playing" && (
              <PlayingStage
                feedback={game.feedback}
                movingOffset={game.movingOffset}
                movingOptionId={game.movingOptionId}
                onOptionClick={game.handleOptionClick}
                onSubmit={game.handleSubmit}
                options={game.options}
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
      className="bg-gradient-to-br from-orange-50/80 via-rose-50/70 to-white shadow-orange-100/60"
      description="Find out if you're a robot"
      difficulty={ChallengeDifficulty.Easy}
      icon={<Bot className="size-7 text-slate-400" />}
      title="Robot Test"
    />
  );
}
