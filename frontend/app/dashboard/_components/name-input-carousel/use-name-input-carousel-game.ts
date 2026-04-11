"use client";

import { useCallback, useEffect, useState } from "react";
import { requestJson } from "@/lib/api/request";
import {
  finishSession,
  startSession,
  trackClick,
  trackError,
  trackSubmitAttempt,
} from "@/lib/tracking";
import { ALPHABET, TARGET_NAME } from "./constants";
import {
  buildProgressLetters,
  createEmptySlots,
  formatElapsedMs,
  getLetterIndex,
  getWrappedLetterIndex,
} from "./helpers";
import type { FeedbackTone, NameInputCarouselStage } from "./types";

function createInitialFeedback() {
  return "Spell ALEX one character at a time. Keyboard access has been discontinued.";
}

export function useNameInputCarouselGame(isOpen: boolean) {
  const [stage, setStage] = useState<NameInputCarouselStage>("intro");
  const [lockedLetters, setLockedLetters] =
    useState<string[]>(createEmptySlots);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<FeedbackTone>("neutral");
  const [apiFeedback, setApiFeedback] = useState("");
  const [completionTimeMs, setCompletionTimeMs] = useState<number | null>(null);

  const resetGame = useCallback(() => {
    setStage("intro");
    setLockedLetters(createEmptySlots());
    setActiveIndex(0);
    setActiveLetterIndex(0);
    setFeedback("");
    setFeedbackTone("neutral");
    setApiFeedback("");
    setCompletionTimeMs(null);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetGame();
      return;
    }

    resetGame();
  }, [isOpen, resetGame]);

  const activeLetter = ALPHABET[activeLetterIndex];
  const previousLetter = ALPHABET[getWrappedLetterIndex(activeLetterIndex, -1)];
  const nextLetter = ALPHABET[getWrappedLetterIndex(activeLetterIndex, 1)];
  const progressLetters = buildProgressLetters(
    lockedLetters,
    activeIndex,
    activeLetter,
  );

  function setOutcome(message: string, tone: FeedbackTone) {
    setFeedback(message);
    setFeedbackTone(tone);
  }

  function runTrackedAction(action: () => void) {
    try {
      action();
    } catch (error) {
      setOutcome(
        error instanceof Error
          ? error.message
          : "Tracking session is currently unavailable.",
        "warning",
      );
    }
  }

  function handleStartGame() {
    startSession();
    runTrackedAction(trackClick);
    setStage("playing");
    setLockedLetters(createEmptySlots());
    setActiveIndex(0);
    setActiveLetterIndex(0);
    setFeedback(createInitialFeedback());
    setFeedbackTone("neutral");
    setApiFeedback("");
    setCompletionTimeMs(null);
  }

  function handleShiftLetter(direction: -1 | 1) {
    runTrackedAction(trackClick);
    setActiveLetterIndex((currentIndex) =>
      getWrappedLetterIndex(currentIndex, direction),
    );
  }

  function handleMoveBack() {
    runTrackedAction(trackClick);

    if (activeIndex === 0) {
      setOutcome(
        "Already at slot 1. The carousel refuses to simplify anything.",
        "warning",
      );
      return;
    }

    const previousIndex = activeIndex - 1;
    const previousLetterValue = lockedLetters[previousIndex] || "A";
    setActiveIndex(previousIndex);
    setActiveLetterIndex(getLetterIndex(previousLetterValue));
    setOutcome(
      `Back to slot ${previousIndex + 1}. Corrections still happen one awkward slot at a time.`,
      "neutral",
    );
  }

  function handleRestart() {
    runTrackedAction(trackClick);
    setLockedLetters(createEmptySlots());
    setActiveIndex(0);
    setActiveLetterIndex(0);
    setOutcome(
      "Restarted. The normal keyboard remains heroically unavailable.",
      "neutral",
    );
  }

  async function handleConfirmLetter() {
    runTrackedAction(trackClick);
    runTrackedAction(trackSubmitAttempt);

    const nextLetters = [...lockedLetters];
    nextLetters[activeIndex] = activeLetter;
    setLockedLetters(nextLetters);

    if (activeIndex < TARGET_NAME.length - 1) {
      const nextIndex = activeIndex + 1;
      const nextValue = nextLetters[nextIndex] || "A";
      setActiveIndex(nextIndex);
      setActiveLetterIndex(getLetterIndex(nextValue));
      setOutcome(
        activeLetter === TARGET_NAME[activeIndex]
          ? `${activeLetter} saved in slot ${activeIndex + 1}. Now edit slot ${nextIndex + 1}.`
          : `${activeLetter} saved in slot ${activeIndex + 1}. Expected ${TARGET_NAME[activeIndex]}.`,
        activeLetter === TARGET_NAME[activeIndex] ? "success" : "warning",
      );
      return;
    }

    const builtName = nextLetters.join("");
    if (builtName !== TARGET_NAME) {
      runTrackedAction(trackError);
      setOutcome(
        `Built ${builtName}. The wheel still expects ALEX. Use Back to repair it.`,
        "warning",
      );
      return;
    }

    const payload = finishSession();
    setStage("success");
    setCompletionTimeMs(payload?.completionTimeMs ?? null);
    setFeedback("");

    if (!payload) {
      setApiFeedback("Session finished locally, but no payload was available.");
      return;
    }

    const result = await requestJson("/api/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      setApiFeedback(
        "Success saved locally, but sending tracking payload failed.",
      );
      return;
    }

    setApiFeedback("Run recorded. Tracking payload accepted by /api/tracking.");
  }

  return {
    activeIndex,
    activeLetter,
    apiFeedback,
    feedback,
    feedbackTone,
    handleConfirmLetter,
    handleMoveBack,
    handleRestart,
    handleStartGame,
    handleShiftLetter,
    nextLetter,
    previousLetter,
    progressLetters,
    solvedInSeconds: formatElapsedMs(completionTimeMs),
    stage,
  };
}
