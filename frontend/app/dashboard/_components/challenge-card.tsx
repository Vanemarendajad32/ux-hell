import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChallengeCardProps = {
  action: ReactNode;
  className?: string;
  description: string;
  difficulty?: string;
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
        "flex h-full flex-col rounded-[1.4rem] border border-rose-200 p-5 shadow-lg",
        className,
      )}
    >
      <div className="space-y-3">
        <h3 className="inline-flex items-center gap-2 text-xl leading-none font-bold tracking-tight text-slate-800">
          {icon}
          {title}
        </h3>
        <p className="text-lg text-slate-700">{description}</p>
        {difficulty && <p className="text-lg text-slate-600">{difficulty}</p>}
      </div>

      <div className="mt-auto border-t border-rose-100 pt-3">{action}</div>
    </article>
  );
}
