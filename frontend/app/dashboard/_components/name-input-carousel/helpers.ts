import { ALPHABET, TARGET_NAME } from "./constants";

export function createEmptySlots(): string[] {
  return Array.from({ length: TARGET_NAME.length }, () => "");
}

export function getLetterIndex(letter: string): number {
  const index = ALPHABET.indexOf(letter);

  return index === -1 ? 0 : index;
}

export function getWrappedLetterIndex(
  currentIndex: number,
  direction: -1 | 1,
): number {
  return (currentIndex + direction + ALPHABET.length) % ALPHABET.length;
}

export function buildProgressLetters(
  lockedLetters: string[],
  activeIndex: number,
  activeLetter: string,
): string[] {
  return lockedLetters.map((letter, index) => {
    if (index === activeIndex) {
      return activeLetter;
    }

    return letter || "•";
  });
}

export function formatElapsedMs(ms: number | null): string {
  if (ms === null) {
    return "--";
  }

  return (ms / 1000).toFixed(1);
}
