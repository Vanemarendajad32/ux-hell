"use client";

import { Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AttentionIcon from "@/components/icons/attention-icon";
import PlusIcon from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Page() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [swapButtons, setSwapButtons] = useState(false);

  useEffect(() => {
    if (!dialogOpen) {
      return;
    }

    setSwapButtons(false);
    const intervalId = window.setInterval(() => {
      setSwapButtons((prev) => !prev);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [dialogOpen]);

  const handleStartGame = () => {
    if (dialogOpen) {
      return;
    }

    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 text-slate-900">
      <main className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <Image
              src="/ux-hell-logo.svg"
              alt=""
              width={96}
              height={96}
              className="h-24 w-24"
              aria-hidden="true"
            />
          </div>
          <h1 className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-5xl font-bold text-transparent sm:text-7xl">
            <Image
              src="/ux-hell-logo.svg"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12"
              aria-hidden="true"
            />
            <span>UX HELL</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Navigate through the most frustrating UX patterns
          </p>
          <p className="text-sm text-slate-500">
            Can you survive the dark patterns and keep your sanity?
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button
            size="lg"
            className="w-full gap-3 px-8 py-6 text-lg font-bold hover:scale-[1.02]"
            onClick={handleStartGame}
          >
            <Image
              src="/ux-hell-logo.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
              aria-hidden="true"
            />
            START GAME
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            prefixIcon={<Trophy className="h-5 w-5 text-orange-500" />}
            className="mt-3 w-full rounded-2xl border-slate-200 bg-white px-8 py-6 text-lg font-bold text-slate-900 hover:scale-[1.02] hover:shadow-xl"
          >
            <Link href="/leaderboard?from=home">View Leaderboard</Link>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose your path</DialogTitle>
              <DialogDescription>
                Log in to continue or create a new account to start fresh.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              {swapButtons ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="w-full gap-3 rounded-2xl px-6 py-4 text-base font-semibold hover:scale-[1.02]"
                  >
                    <Link href="/register">
                      <PlusIcon />
                      Register
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 rounded-2xl border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-900 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <Link href="/login">
                      <Image
                        src="/ux-hell-logo.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      Log in
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="w-full gap-3 rounded-2xl border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-900 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <Link href="/login">
                      <Image
                        src="/ux-hell-logo.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      Log in
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="w-full gap-3 rounded-2xl px-6 py-4 text-base font-semibold hover:scale-[1.02]"
                  >
                    <Link href="/register">
                      <PlusIcon />
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Card className="mt-8 overflow-hidden border-rose-200 bg-white/90 shadow-2xl backdrop-blur">
          <CardHeader className="flex flex-row items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg">
              <AttentionIcon />
            </div>
            <div>
              <CardTitle className="text-lg">How to Play</CardTitle>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                Quick rules
              </p>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
                Survive the hostile UX patterns without losing your patience.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                Keep your frustration meter low.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                Finish as fast as possible.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
                Learn about dark patterns along the way.
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400">
          Educational game about dark patterns in UX design
        </p>
      </main>
    </div>
  );
}
