export type StatsColumn = {
  id:
    | "game"
    | "last-run"
    | "fastest"
    | "attempts"
    | "clicks"
    | "errors"
    | "frustration";
  label: string;
};

export const statsColumns: StatsColumn[] = [
  { id: "game", label: "Game" },
  { id: "last-run", label: "Last run" },
  { id: "fastest", label: "Fastest" },
  { id: "attempts", label: "Attempts" },
  { id: "clicks", label: "Clicks" },
  { id: "errors", label: "Errors" },
  { id: "frustration", label: "Frustration" },
];
