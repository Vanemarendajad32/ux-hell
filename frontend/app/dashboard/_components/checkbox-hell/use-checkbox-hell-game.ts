"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { requestJson } from "@/lib/api/request";
import {
  finishSession,
  startSession,
  type TrackingPayload,
  trackClick,
  trackError,
  trackSubmitAttempt,
} from "@/lib/tracking";
import {
  CHAOS_POOL,
  INITIAL_OPTIONS,
  MAX_OPTIONS,
  MOVE_INTERVAL_MS,
  SPAWN_BATCH_SIZE,
  UNSTABLE_UNCHECK_MS,
  WINNER_LABEL,
} from "./constants";
import { formatMs, isSolved, resetCheckboxStates } from "./helpers";
import type { CheckboxOption, GameStage } from "./types";

export function useCheckboxHellGame(isOpen: boolean) {
  const [stage, setStage] = useState<GameStage>("intro");
  const [options, setOptions] = useState<CheckboxOption[]>(INITIAL_OPTIONS);
  const [winnerTrapTriggered, setWinnerTrapTriggered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [completedPayload, setCompletedPayload] =
    useState<TrackingPayload | null>(null);
  const [apiFeedback, setApiFeedback] = useState("");
  const [movingOptionId, setMovingOptionId] = useState<string | null>(null);
  const [movingOffset, setMovingOffset] = useState({ x: 0, y: 0 });
  const timeoutIdsRef = useRef<number[]>([]);
  const poolIndexRef = useRef(0);

  const solvedInSeconds = useMemo(
    () => formatMs(completedPayload?.completionTimeMs ?? null),
    [completedPayload],
  );

  const runTrackedAction = (action: () => void) => {
    try {
      action();
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Tracking session is currently unavailable.",
      );
    }
  };

  const clearTimers = useCallback(() => {
    for (const timeoutId of timeoutIdsRef.current) {
      window.clearTimeout(timeoutId);
    }
    timeoutIdsRef.current = [];
  }, []);

  const resetGame = useCallback(() => {
    clearTimers();
    setStage("intro");
    setOptions(INITIAL_OPTIONS);
    poolIndexRef.current = 0;
    setWinnerTrapTriggered(false);
    setFeedback("");
    setCompletedPayload(null);
    setApiFeedback("");
    setMovingOptionId(null);
    setMovingOffset({ x: 0, y: 0 });
  }, [clearTimers]);

  useEffect(() => {
    if (!isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  useEffect(() => {
    if (stage !== "playing" || options.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const randomOption = options[Math.floor(Math.random() * options.length)];

      if (!randomOption) {
        return;
      }

      setMovingOptionId(randomOption.id);
      setMovingOffset({
        x: Math.floor(Math.random() * 20) - 10,
        y: Math.floor(Math.random() * 12) - 6,
      });
    }, MOVE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [stage, options]);

  const addChaosOptions = useCallback(() => {
    const poolIndex = poolIndexRef.current;
    poolIndexRef.current += SPAWN_BATCH_SIZE;

    setOptions((previous) => {
      if (previous.length >= MAX_OPTIONS) {
        return previous;
      }

      const nextOptions = [...previous];
      const winnerAlreadyExists = previous.some((option) => option.isCorrect);

      for (let index = 0; index < SPAWN_BATCH_SIZE; index += 1) {
        const poolEntry = CHAOS_POOL[(poolIndex + index) % CHAOS_POOL.length];
        if (poolEntry.label === WINNER_LABEL && winnerAlreadyExists) {
          continue;
        }

        nextOptions.push({
          id: `chaos-${poolIndex + index}-${Date.now()}-${index}`,
          label: poolEntry.label,
          isCorrect: poolEntry.isCorrect,
          checked: false,
          unstable: poolEntry.unstable,
          fakeVisual: poolEntry.fakeVisual,
          visualChecked: false,
        });
      }

      return nextOptions;
    });
  }, []);

  const handleStartGame = () => {
    startSession();
    runTrackedAction(trackClick);
    setStage("playing");
    setFeedback(`Chaos mode activated. Find "${WINNER_LABEL}".`);
    setApiFeedback("");
    addChaosOptions();
  };

  const handleOptionClick = (id: string) => {
    runTrackedAction(trackClick);
    addChaosOptions();

    setOptions((previous) =>
      previous.map((option) => {
        if (option.id !== id) {
          return option;
        }

        if (option.fakeVisual) {
          return {
            ...option,
            visualChecked: !option.visualChecked,
          };
        }

        const updated = {
          ...option,
          checked: !option.checked,
          visualChecked: !option.checked,
        };

        if (updated.isCorrect && updated.checked && !winnerTrapTriggered) {
          setWinnerTrapTriggered(true);
          setFeedback("This is suspicious... try checking it one more time.");
          return {
            ...updated,
            checked: false,
            visualChecked: false,
          };
        }

        if (updated.unstable && updated.checked && !updated.isCorrect) {
          const timeoutId = window.setTimeout(() => {
            setOptions((latest) =>
              latest.map((candidate) =>
                candidate.id === id
                  ? { ...candidate, checked: false, visualChecked: false }
                  : candidate,
              ),
            );
            setFeedback(
              "One checkbox un-checked itself. Very suspicious behavior.",
            );
          }, UNSTABLE_UNCHECK_MS);

          timeoutIdsRef.current.push(timeoutId);
        }

        return updated;
      }),
    );
  };

  const handleSubmit = async () => {
    runTrackedAction(trackClick);
    runTrackedAction(trackSubmitAttempt);

    if (!isSolved(options)) {
      runTrackedAction(trackError);
      setFeedback(
        "Not yet. The robot council rejects this attempt. Checkboxes were reset, try again.",
      );
      setOptions((previous) => resetCheckboxStates(previous));
      return;
    }

    const payload = finishSession();
    setCompletedPayload(payload);
    setStage("success");
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
  };

  return {
    apiFeedback,
    feedback,
    handleOptionClick,
    handleStartGame,
    handleSubmit,
    movingOffset,
    movingOptionId,
    options,
    solvedInSeconds,
    stage,
  };
}
