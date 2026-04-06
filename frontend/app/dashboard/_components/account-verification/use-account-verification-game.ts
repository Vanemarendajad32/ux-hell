"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  finishSession,
  startSession,
  trackClick,
  trackError,
  trackSubmitAttempt,
} from "@/lib/tracking";
import { savePendingAttempt } from "@/lib/tracking/pending-attempt";
import { submitPendingAttempt } from "@/lib/tracking/submit-pending-attempt";
import {
  EXPIRATION_MAX_MS,
  EXPIRATION_MIN_MS,
  OCCASIONAL_RESET_PROBABILITY,
  OCCASIONAL_SHUFFLE_PROBABILITY,
  OTP_LENGTH,
  WRONG_DIGIT_PROBABILITY,
} from "./constants";
import {
  createOtpCode,
  emptyOtpDigits,
  formatMs,
  getInputLagMs,
  nextFocusIndex,
  pickFocusStrategy,
  pickWrongDigit,
  randomInt,
} from "./helpers";
import type { VerificationStage } from "./types";

export function useAccountVerificationGame(
  isOpen: boolean,
  onAttemptRecorded?: () => void,
) {
  const [stage, setStage] = useState<VerificationStage>("playing");
  const [activeCode, setActiveCode] = useState<string>(createOtpCode());
  const [digits, setDigits] = useState<string[]>(emptyOtpDigits());
  const [feedback, setFeedback] = useState("");
  const [apiFeedback, setApiFeedback] = useState("");
  const [completionTimeMs, setCompletionTimeMs] = useState<number | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);
  const stageRef = useRef<VerificationStage>("playing");
  const hasSessionStartedRef = useRef(false);

  const solvedInSeconds = useMemo(
    () => formatMs(completionTimeMs),
    [completionTimeMs],
  );

  const clearTimers = useCallback(() => {
    for (const timeoutId of timeoutIdsRef.current) {
      window.clearTimeout(timeoutId);
    }
    timeoutIdsRef.current = [];
  }, []);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

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

  const scheduleTimeout = useCallback((callback: () => void, ms: number) => {
    const timeoutId = window.setTimeout(callback, ms);
    timeoutIdsRef.current.push(timeoutId);
  }, []);

  const ensureSessionStarted = useCallback(() => {
    if (hasSessionStartedRef.current) {
      return;
    }

    startSession();
    hasSessionStartedRef.current = true;
  }, []);

  const applyOccasionalReset = useCallback(() => {
    if (Math.random() > OCCASIONAL_RESET_PROBABILITY) {
      return;
    }

    setDigits((previous) => {
      const next = [...previous];

      if (Math.random() < OCCASIONAL_SHUFFLE_PROBABILITY) {
        const first = randomInt(0, OTP_LENGTH - 1);
        let second = randomInt(0, OTP_LENGTH - 1);
        if (first === second) {
          second = (second + 1) % OTP_LENGTH;
        }

        const tmp = next[first];
        next[first] = next[second];
        next[second] = tmp;
        setFeedback("Tiny sync issue... a couple of digits moved.");
        return next;
      }

      const clearCount = randomInt(1, 2);
      for (let index = 0; index < clearCount; index += 1) {
        const target = randomInt(0, OTP_LENGTH - 1);
        next[target] = "";
      }
      setFeedback("Network hiccup. Some digits were cleared.");
      return next;
    });
  }, []);

  const expireCode = useCallback(() => {
    if (stageRef.current !== "playing") {
      return;
    }

    setFeedback("Code expired. Sending a new one...");
    const nextCode = createOtpCode();
    setActiveCode(nextCode);
    scheduleTimeout(() => {
      setFeedback("New code sent.");
    }, 700);
  }, [scheduleTimeout]);

  const scheduleExpiration = useCallback(() => {
    if (stageRef.current !== "playing") {
      return;
    }

    const expiresInMs = randomInt(EXPIRATION_MIN_MS, EXPIRATION_MAX_MS);
    scheduleTimeout(() => {
      if (stageRef.current !== "playing") {
        return;
      }
      expireCode();
      scheduleExpiration();
    }, expiresInMs);
  }, [expireCode, scheduleTimeout]);

  const resetGame = useCallback(() => {
    clearTimers();
    setStage("playing");
    setActiveCode(createOtpCode());
    setDigits(emptyOtpDigits());
    setFeedback("");
    setApiFeedback("");
    setCompletionTimeMs(null);
    hasSessionStartedRef.current = false;
  }, [clearTimers]);

  useEffect(() => {
    if (!isOpen) {
      resetGame();
      return;
    }

    setStage("playing");
    scheduleExpiration();

    return () => {
      clearTimers();
    };
  }, [clearTimers, isOpen, resetGame, scheduleExpiration]);

  const handleDigitInput = (
    index: number,
    typedDigit: string,
    onFocus: (nextIndex: number) => void,
  ) => {
    if (!typedDigit) {
      return;
    }

    ensureSessionStarted();
    runTrackedAction(trackClick);

    const lagMs = getInputLagMs();
    scheduleTimeout(() => {
      const shouldCorrupt = Math.random() < WRONG_DIGIT_PROBABILITY;
      const digitToInsert = shouldCorrupt
        ? pickWrongDigit(typedDigit)
        : typedDigit;

      setDigits((previous) => {
        const next = [...previous];
        next[index] = digitToInsert;
        return next;
      });

      if (shouldCorrupt) {
        setFeedback("Input latency spike detected. Please continue.");
      }

      applyOccasionalReset();

      const strategy = pickFocusStrategy();
      const focusIndex = nextFocusIndex(index, strategy);
      scheduleTimeout(() => {
        onFocus(focusIndex);
      }, 20);
    }, lagMs);
  };

  const handleBackspace = (
    index: number,
    onFocus: (nextIndex: number) => void,
  ) => {
    ensureSessionStarted();
    runTrackedAction(trackClick);

    setDigits((previous) => {
      const next = [...previous];
      if (next[index]) {
        next[index] = "";
        return next;
      }

      const previousIndex = Math.max(index - 1, 0);
      next[previousIndex] = "";
      scheduleTimeout(() => onFocus(previousIndex), 10);
      return next;
    });
  };

  const handleVerify = async () => {
    ensureSessionStarted();
    runTrackedAction(trackClick);
    runTrackedAction(trackSubmitAttempt);

    const enteredCode = digits.join("");
    if (enteredCode !== activeCode) {
      runTrackedAction(trackError);
      setFeedback("Invalid code. Please try again.");
      return;
    }

    const payload = finishSession();
    setStage("success");
    clearTimers();
    setCompletionTimeMs(payload?.completionTimeMs ?? null);
    setFeedback("");

    if (!payload) {
      setApiFeedback("Session finished locally, but no payload was available.");
      return;
    }

    savePendingAttempt("account-verification", payload);
    const result = await submitPendingAttempt("account-verification");
    onAttemptRecorded?.();

    if (!result.ok) {
      setApiFeedback(
        "Success saved locally, but submitting the attempt failed.",
      );
      return;
    }

    setApiFeedback("Run recorded.");
  };

  return {
    activeCode,
    apiFeedback,
    digits,
    feedback,
    handleBackspace,
    handleDigitInput,
    handleVerify,
    solvedInSeconds,
    stage,
  };
}
