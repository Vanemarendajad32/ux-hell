export type GameType =
  | "registration"
  | "checkbox-hell"
  | "account-verification"
  | "cursed-volume-slider"
  | "name-input-carousel";

export const gameTypeLabels: Record<GameType, string> = {
  "account-verification": "Account Verification",
  "checkbox-hell": "Robot Test",
  "cursed-volume-slider": "Cursed Volume Slider",
  "name-input-carousel": "Name Input Carousel",
  registration: "Registration",
};

export const gameTypeOrder: GameType[] = [
  "registration",
  "checkbox-hell",
  "cursed-volume-slider",
  "name-input-carousel",
  "account-verification",
];
