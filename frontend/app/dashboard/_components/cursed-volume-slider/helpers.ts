import { CURSE_SHIFT, MAX_VOLUME, TARGET_VOLUME } from "./constants";

export function applyVolumeCurse(rawValue: number): number {
  if (rawValue <= TARGET_VOLUME) {
    return Math.min(rawValue + CURSE_SHIFT, MAX_VOLUME);
  }

  return Math.max(rawValue - CURSE_SHIFT, 0);
}

export function formatElapsedMs(ms: number | null): string {
  if (ms === null) {
    return "--";
  }

  return (ms / 1000).toFixed(1);
}
