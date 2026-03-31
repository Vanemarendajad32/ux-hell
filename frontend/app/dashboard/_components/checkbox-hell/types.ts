export type GameStage = "intro" | "playing" | "success";

export type CheckboxOption = {
  id: string;
  label: string;
  isCorrect: boolean;
  checked: boolean;
  unstable: boolean;
  fakeVisual: boolean;
  visualChecked: boolean;
};

export type ChaosPoolOption = {
  label: string;
  isCorrect: boolean;
  unstable: boolean;
  fakeVisual: boolean;
};
