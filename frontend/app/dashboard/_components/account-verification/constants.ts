import type { FocusStrategy } from "./types";

export const OTP_LENGTH = 6;
export const PHONE_MASK = "xxx-xxx-xxxx";
export const OTP_SLOT_IDS = [
  "otp-slot-0",
  "otp-slot-1",
  "otp-slot-2",
  "otp-slot-3",
  "otp-slot-4",
  "otp-slot-5",
] as const;

export const INPUT_LAG_MIN_MS = 100;
export const INPUT_LAG_MAX_MS = 300;
export const WRONG_DIGIT_PROBABILITY = 0.14;

export const EXPIRATION_MIN_MS = 10000;
export const EXPIRATION_MAX_MS = 30000;

export const OCCASIONAL_RESET_PROBABILITY = 0.08;
export const OCCASIONAL_SHUFFLE_PROBABILITY = 0.5;

export const focusStrategyWeights: Array<{
  type: FocusStrategy;
  threshold: number;
}> = [
  { type: "next", threshold: 0.68 },
  { type: "stay", threshold: 0.8 },
  { type: "skip", threshold: 0.92 },
  { type: "back", threshold: 1 },
];
