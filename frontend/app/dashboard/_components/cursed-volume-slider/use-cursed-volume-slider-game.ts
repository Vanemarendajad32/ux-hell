"use client";

import { useCallback, useEffect, useState } from "react";
import {
  finishSession,
  startSession,
  trackClick,
  trackSubmitAttempt,
} from "@/lib/tracking";
import { savePendingAttempt } from "@/lib/tracking/pending-attempt";
import { submitPendingAttempt } from "@/lib/tracking/submit-pending-attempt";
import { START_VOLUME, TARGET_VOLUME } from "./constants";
import { applyVolumeCurse, formatElapsedMs } from "./helpers";
import type { GameStage } from "./types";

export function useCursedVolumeSliderGame(
  isOpen: boolean,
  onAttemptRecorded?: () => void,
) {
  const [stage, setStage] = useState<GameStage>("intro");
  const [sliderValue, setSliderValue] = useState(START_VOLUME);
  const [feedback, setFeedback] = useState("");
  const [apiFeedback, setApiFeedback] = useState("");
  const [completionTimeMs, setCompletionTimeMs] = useState<number | null>(null);

  const resetGame = useCallback(() => {
    setStage("intro");
    setSliderValue(START_VOLUME);
    setFeedback("");
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

  function handleStartGame() {
    startSession();

    try {
      trackClick();
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Tracking session is currently unavailable.",
      );
    }

    setStage("playing");
    setSliderValue(START_VOLUME);
    setFeedback("Release the slider to lock a value. The lock is cursed.");
    setApiFeedback("");
    setCompletionTimeMs(null);
  }

  function handleSliderChange(value: number) {
    if (stage !== "playing") {
      return;
    }

    setSliderValue(value);
  }

  async function handleSliderCommit(rawValue: number) {
    if (stage !== "playing") {
      return;
    }

    try {
      trackClick();
      trackSubmitAttempt();
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Tracking session is currently unavailable.",
      );
    }

    const cursedValue = applyVolumeCurse(rawValue);
    setSliderValue(cursedValue);

    if (cursedValue === TARGET_VOLUME) {
      const payload = finishSession();
      setStage("success");
      setCompletionTimeMs(payload?.completionTimeMs ?? null);
      setFeedback("");

      if (!payload) {
        setApiFeedback(
          "Session finished locally, but no payload was available.",
        );
        return;
      }

      savePendingAttempt("cursed-volume-slider", payload);
      const result = await submitPendingAttempt("cursed-volume-slider");
      onAttemptRecorded?.();

      if (!result.ok) {
        setApiFeedback(
          "Success saved locally, but submitting the attempt failed.",
        );
        return;
      }

      setApiFeedback("Run recorded.");
      return;
    }

    setFeedback(`Released at ${rawValue}%. Settled at ${cursedValue}%.`);
  }
  return {
    apiFeedback,
    currentVolume: sliderValue,
    feedback,
    handleStartGame,
    handleSliderChange,
    handleSliderCommit,
    solvedInSeconds: formatElapsedMs(completionTimeMs),
    stage,
  };
}
