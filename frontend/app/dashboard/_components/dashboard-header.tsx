"use client";

import { ChevronDown, UserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/services/auth-service";
import { clearRegistrationSession } from "@/lib/dashboard/registration-session";
import { clearPendingAttempt } from "@/lib/tracking/pending-attempt";

type DashboardHeaderProps = {
  username: string;
};

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutUser();
    } finally {
      clearRegistrationSession();
      clearPendingAttempt();
      router.push("/");
    }
  }

  return (
    <header className="px-2.5 py-2 sm:px-5 sm:py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-[2rem] leading-none font-bold tracking-tight text-slate-900 sm:text-[2.2rem]">
          <Image
            src="/ux-hell-logo.svg"
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 sm:h-9 sm:w-9"
            aria-hidden="true"
          />
          <span>UX HELL</span>
        </p>

        <details className="group relative">
          <summary className="list-none">
            <span className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-rose-100 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-md shadow-orange-100/60 transition-colors hover:bg-rose-50/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100 sm:min-h-0 sm:px-3 sm:py-2 sm:text-sm">
              <UserRound className="size-3.5 text-rose-400 sm:size-4" />
              {username}
              <ChevronDown className="size-3.5 text-slate-500 transition-transform group-open:rotate-180 sm:size-4" />
            </span>
          </summary>

          <div className="absolute top-full right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-rose-100 bg-white py-1 shadow-xl shadow-orange-100/70">
            <button
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-rose-600 transition-colors hover:bg-rose-50"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </details>
      </div>
    </header>
  );
}
