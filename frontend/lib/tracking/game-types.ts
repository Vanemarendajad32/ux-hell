export type GameType =
  | "registration"
  | "checkbox-hell"
  | "account-verification"
  | "unknown";

export const gameTypeLabels: Record<GameType, string> = {
  "account-verification": "Account Verification",
  "checkbox-hell": "Robot Test",
  registration: "Registration",
  unknown: "Unknown",
};

export const gameTypeOrder: GameType[] = [
  "registration",
  "checkbox-hell",
  "account-verification",
  "unknown",
];
