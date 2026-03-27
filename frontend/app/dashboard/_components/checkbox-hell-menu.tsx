"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IntroStage from "./checkbox-hell/intro-stage";
import PlayingStage from "./checkbox-hell/playing-stage";
import SuccessStage from "./checkbox-hell/success-stage";
import { useCheckboxHellGame } from "./checkbox-hell/use-checkbox-hell-game";

export default function CheckboxHellMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const game = useCheckboxHellGame(isOpen);

  return (
    <section className="rounded-[1.6rem] border border-orange-200 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 px-5 py-4 shadow-lg shadow-orange-100/70 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
            Mini game
          </p>
          <p className="text-sm text-slate-700">
            Ready for the next challenge?
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              Find out if you&apos;re a robot
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
      </div>
    </section>
  );
}
