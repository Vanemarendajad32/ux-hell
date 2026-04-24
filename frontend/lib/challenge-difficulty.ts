// Central enum for challenge difficulties
export enum ChallengeDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export const CHALLENGE_DIFFICULTY_LABELS: Record<ChallengeDifficulty, string> = {
  [ChallengeDifficulty.Easy]: "Easy 😅",
  [ChallengeDifficulty.Medium]: "Medium 🤪",
  [ChallengeDifficulty.Hard]: "Hard 😈",
};
