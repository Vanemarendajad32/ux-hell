import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { extraChallenges } from "../_lib/challenges";
import AccountVerificationMenu from "./account-verification-menu";
import ChallengeCard from "./challenge-card";
import CheckboxHellMenu from "./checkbox-hell-menu";

export default function Challenges() {
  return (
    <section className="rounded-[2rem] border border-rose-200 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 p-4 shadow-xl shadow-rose-100/50 sm:p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
          Challenges
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
          Choose your next test
        </h2>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <CheckboxHellMenu />
        <AccountVerificationMenu />

        {extraChallenges.map((challenge) => {
          const Icon = challenge.icon;

          return (
            <ChallengeCard
              key={challenge.title}
              action={
                <Button
                  className={cn(
                    "ml-auto flex h-11 w-28 rounded-full text-xl font-bold",
                    challenge.buttonVariant === "secondary" &&
                      "border border-slate-200 bg-slate-100 text-slate-500 shadow-none",
                  )}
                  type="button"
                  variant={challenge.buttonVariant}
                >
                  {challenge.actionLabel}
                </Button>
              }
              className={challenge.toneClassName}
              description={challenge.description}
              difficulty={challenge.difficulty}
              icon={<Icon className={cn("size-7", challenge.iconClassName)} />}
              title={challenge.title}
            />
          );
        })}
      </div>
    </section>
  );
}
