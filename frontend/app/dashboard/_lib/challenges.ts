import type { LucideIcon } from "lucide-react";
import { RefreshCcw, Type } from "lucide-react";

export type ExtraChallenge = {
  actionLabel: "Play" | "???";
  buttonVariant: "default" | "secondary";
  description: string;
  difficulty?: string;
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  toneClassName: string;
};

export const extraChallenges: ExtraChallenge[] = [
  {
    actionLabel: "???",
    buttonVariant: "secondary",
    description: "Enter text while the UI fights back",
    difficulty: "Difficulty: Easy 🤪",
    icon: Type,
    iconClassName: "text-slate-500",
    title: "Type Like a Human",
    toneClassName:
      "bg-gradient-to-br from-slate-50 via-white to-rose-50/40 shadow-orange-100/50",
  },
  {
    actionLabel: "???",
    buttonVariant: "secondary",
    description: "New challenges will appear when you least expect them",
    icon: RefreshCcw,
    iconClassName: "text-slate-500",
    title: "More Coming Soon",
    toneClassName:
      "bg-gradient-to-br from-white via-slate-50 to-rose-50/50 shadow-rose-100/50",
  },
];
