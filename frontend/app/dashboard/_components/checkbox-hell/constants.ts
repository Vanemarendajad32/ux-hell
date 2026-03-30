import type { ChaosPoolOption, CheckboxOption } from "./types";

export const WINNER_LABEL = "I'm truly not a robot";
export const MAX_OPTIONS = 16;
export const SPAWN_BATCH_SIZE = 3;
export const MOVE_INTERVAL_MS = 900;
export const UNSTABLE_UNCHECK_MS = 900;

export const INITIAL_OPTIONS: CheckboxOption[] = [
  {
    id: "starter-0",
    label: "Do NOT click this one.",
    isCorrect: false,
    checked: false,
    unstable: false,
    fakeVisual: false,
    visualChecked: false,
  },
  {
    id: "starter-1",
    label: "I am definitely not a toaster.",
    isCorrect: false,
    checked: false,
    unstable: false,
    fakeVisual: false,
    visualChecked: false,
  },
  {
    id: "starter-2",
    label: "This one is obviously correct.",
    isCorrect: false,
    checked: false,
    unstable: true,
    fakeVisual: false,
    visualChecked: false,
  },
  {
    id: "starter-3",
    label: "Ignore me, I am harmless.",
    isCorrect: false,
    checked: false,
    unstable: false,
    fakeVisual: true,
    visualChecked: false,
  },
];

export const CHAOS_POOL: ChaosPoolOption[] = [
  {
    label: "I pass all captcha tests in my sleep.",
    isCorrect: false,
    unstable: false,
    fakeVisual: false,
  },
  {
    label: WINNER_LABEL,
    isCorrect: true,
    unstable: false,
    fakeVisual: false,
  },
  {
    label: "I am a verified human bean.",
    isCorrect: false,
    unstable: true,
    fakeVisual: false,
  },
  {
    label: "Visual checkmark only, no promises.",
    isCorrect: false,
    unstable: false,
    fakeVisual: true,
  },
  {
    label: "Totally wrong answer (or is it?).",
    isCorrect: false,
    unstable: false,
    fakeVisual: false,
  },
  {
    label: "This one hates robots.",
    isCorrect: false,
    unstable: true,
    fakeVisual: false,
  },
];
