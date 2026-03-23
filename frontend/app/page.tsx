"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const starShowerConfig = Array.from({ length: 30 }, (_, index) => ({
  id: `star-${index}`,
  left: `${(index * 7) % 100}%`,
  size: 1 + (index % 4),
  opacity: 0.5 + (index % 5) * 0.1,
  animationDelay: `${(index * 120) % 1200}ms`,
  animationDuration: `${2400 + (index % 5) * 300}ms`,
}));

const fireworkConfig = Array.from({ length: 10 }, (_, index) => ({
  id: `firework-${index}`,
  left: `${10 + ((index * 14) % 80)}%`,
  top: `${20 + ((index * 17) % 50)}%`,
  animationDelay: `${index * 260}ms`,
}));

export default function Page() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [greetingPhase, setGreetingPhase] = useState<"win" | "error" | null>(
    null,
  );
  const [swapButtons, setSwapButtons] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const showGreeting = greetingPhase !== null;
  const isErrorPhase = greetingPhase === "error";

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutsRef.current = [];
    };
  }, []);

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
    if (dialogOpen || showGreeting) {
      return;
    }

    setGreetingPhase("win");
    const phaseTimeout = window.setTimeout(() => {
      setGreetingPhase("error");
    }, 4000);
    timeoutsRef.current = [phaseTimeout];
  };

  const handleKeepPlaying = () => {
    timeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    timeoutsRef.current = [];
    setGreetingPhase(null);
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-6 py-12 text-slate-900">
      {showGreeting ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
            isErrorPhase
              ? "bg-black/20 supports-backdrop-filter:backdrop-blur-sm"
              : "bg-gradient-to-br from-rose-800/60 via-orange-800/50 to-amber-800/60"
          }`}
        >
          <div className="absolute inset-0">
            {!isErrorPhase
              ? starShowerConfig.map((item) => (
                  <span
                    key={item.id}
                    className="star-shower"
                    style={{
                      left: item.left,
                      width: `${item.size}px`,
                      height: `${item.size}px`,
                      opacity: item.opacity,
                      animationDelay: item.animationDelay,
                      animationDuration: item.animationDuration,
                    }}
                  />
                ))
              : null}
            {!isErrorPhase
              ? fireworkConfig.map((item) => (
                  <span
                    key={item.id}
                    className="firework"
                    style={{
                      left: item.left,
                      top: item.top,
                      animationDelay: item.animationDelay,
                    }}
                  />
                ))
              : null}
          </div>
          <div
            className={`relative z-10 max-w-sm rounded-3xl border px-8 py-10 text-center shadow-2xl backdrop-blur ${
              isErrorPhase
                ? "border-white/10 bg-slate-900/85 text-slate-100"
                : "border-white/30 bg-white/85"
            }`}
          >
            {!isErrorPhase ? (
              <div className="greeting-sparkline" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            ) : null}
            <h2
              className={`mt-2 text-4xl font-black ${isErrorPhase ? "error-title" : "win-title"}`}
            >
              {greetingPhase === "win"
                ? "Congratulations, you won!"
                : "Oops, something went wrong! Victory is locked."}
            </h2>
            <p
              className={`mt-3 text-sm ${isErrorPhase ? "text-slate-300" : "text-slate-600"}`}
            >
              {greetingPhase === "win"
                ? "Celebrate now, regret later."
                : "You cannot win before you start playing."}
            </p>
            {greetingPhase === "error" ? (
              <Button
                size="lg"
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg hover:shadow-xl"
                onClick={handleKeepPlaying}
              >
                Keep playing
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
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
          <h1 className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-5xl font-bold text-transparent sm:text-7xl">
            UX HELL
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
                    <Link href="/auth/register">
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
                    <Link href="/auth/login">
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
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 rounded-2xl border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-900 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <Link href="/auth/login">
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
                    <Link href="/auth/register">
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
