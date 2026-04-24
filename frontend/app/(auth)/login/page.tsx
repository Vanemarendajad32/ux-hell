"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PlusIcon from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { getApiErrorMessage } from "@/lib/api/error";
import { loginUser } from "@/lib/api/services/auth-service";
import BackButton from "@/components/ui/back-button";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [swapButtons, setSwapButtons] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSwapButtons((prev) => !prev);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await loginUser({
        username: form.username,
        password: form.password,
      });
      router.push("/dashboard");
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex items-center justify-center">
          <Image
            src="/ux-hell-logo.svg"
            alt=""
            width={72}
            height={72}
            className="h-[4.5rem] w-[4.5rem]"
            aria-hidden="true"
          />
        </div>
        <h1 className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Return to UX Hell and pick up where your survival run left off.
        </p>
      </div>

      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <Input
          autoComplete="username"
          label="Username"
          name="username"
          required
          type="text"
          value={form.username}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Input
          autoComplete="current-password"
          label="Password"
          name="password"
          required
          type="password"
          value={form.password}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <div className="mt-3 grid gap-2">
          {swapButtons ? (
            <>
              <Button
                asChild
                size="lg"
                className="w-full gap-3 text-base font-bold hover:scale-[1.02]"
              >
                <Link href="/register">
                  <PlusIcon />
                  Register
                </Link>
              </Button>
              <Button
                className="w-full gap-3 text-base font-bold hover:scale-[1.02]"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                <Image
                  src="/ux-hell-logo.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </>
          ) : (
            <>
              <Button
                className="w-full gap-3 text-base font-bold hover:scale-[1.02]"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                <Image
                  src="/ux-hell-logo.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full gap-3 text-base font-bold hover:scale-[1.02]"
              >
                <Link href="/register">
                  <PlusIcon />
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
        {submitError ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        ) : null}
      </form>
    </main>
  );
}
