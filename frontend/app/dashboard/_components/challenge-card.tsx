import type { ReactNode } from "react";
import {
  CHALLENGE_DIFFICULTY_LABELS,
  type ChallengeDifficulty,
} from "@/lib/challenge-difficulty";
import { cn } from "@/lib/utils";

type ChallengeCardProps = {
  action: ReactNode;
  className?: string;
  description: string;
  difficulty?: ChallengeDifficulty;
  icon: ReactNode;
  title: string;
};

export default function ChallengeCard({
  action,
  className,
  description,
  difficulty,
  icon,
  title,
}: ChallengeCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.4rem] border border-rose-200 p-4 shadow-lg sm:p-5",
        className,
      )}
    >
      <div className="space-y-3">
        <h3 className="inline-flex items-center gap-2 text-lg leading-none font-bold tracking-tight text-slate-800 sm:text-xl">
          {icon}
          {title}
        </h3>
        <p className="text-base text-slate-700 sm:text-lg">{description}</p>
        {difficulty && (
          <p className="text-base text-slate-600 sm:text-lg">
            Difficulty: {CHALLENGE_DIFFICULTY_LABELS[difficulty]}
          </p>
        )}
      </div>

      <div className="mt-auto border-t border-rose-100 pt-3">{action}</div>
    </article>
  );
}
