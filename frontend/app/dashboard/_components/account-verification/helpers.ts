import {
  focusStrategyWeights,
  INPUT_LAG_MAX_MS,
  INPUT_LAG_MIN_MS,
  OTP_LENGTH,
} from "./constants";
import type { FocusStrategy } from "./types";

export function createOtpCode(): string {
  return Array.from({ length: OTP_LENGTH }, () =>
    Math.floor(Math.random() * 10).toString(),
  ).join("");
}

export function emptyOtpDigits(): string[] {
  return Array.from({ length: OTP_LENGTH }, () => "");
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getInputLagMs(): number {
  return randomInt(INPUT_LAG_MIN_MS, INPUT_LAG_MAX_MS);
}

export function pickWrongDigit(typedDigit: string): string {
  const digit = randomInt(0, 9).toString();
  if (digit === typedDigit) {
    return ((Number(digit) + 1) % 10).toString();
  }

  return digit;
}

export function pickFocusStrategy(): FocusStrategy {
  const roll = Math.random();
  return (
    focusStrategyWeights.find((entry) => roll <= entry.threshold)?.type ??
    "next"
  );
}

export function nextFocusIndex(
  currentIndex: number,
  strategy: FocusStrategy,
): number {
  if (strategy === "skip") {
    return Math.min(currentIndex + 2, OTP_LENGTH - 1);
  }
  if (strategy === "back") {
    return Math.max(currentIndex - 1, 0);
  }
  if (strategy === "stay") {
    return currentIndex;
  }

  return Math.min(currentIndex + 1, OTP_LENGTH - 1);
}

export function formatMs(ms: number | null): string {
  if (ms === null) {
    return "0.00";
  }

  return (ms / 1000).toFixed(2);
}
