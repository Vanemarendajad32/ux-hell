"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { getApiErrorMessage } from "@/lib/api/error";
import { loginUser, registerUser } from "@/lib/api/services/auth-service";
import { saveRegistrationSession } from "@/lib/dashboard/registration-session";
import {
  finishSession,
  getPayload,
  startSession,
  trackClick,
  trackError,
  trackSubmitAttempt,
} from "@/lib/tracking";
import { savePendingAttempt } from "@/lib/tracking/pending-attempt";
import { submitPendingAttempt } from "@/lib/tracking/submit-pending-attempt";
import { cn } from "@/lib/utils";
import {
  type RegisterFormData,
  registerSchema,
} from "@/schemas/register-schema";
import PlusIcon from "@/components/icons/plus-icon";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blockedPasswordRef = useRef<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [notification, setNotification] = useState("");
  const hasSessionStartedRef = useRef(false);

  const notificationClassName =
    "absolute inset-x-4 top-20 z-50 mx-auto max-w-sm rounded-lg border-2 border-white/20 bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white shadow-lg animate-in slide-in-from-top-2 duration-300 sm:inset-x-auto sm:right-4 sm:left-auto";

  function ensureSessionStarted() {
    if (hasSessionStartedRef.current) return;

    try {
      const existing = getPayload();

      // Kasuta ainult pooleliolevat sessionit
      if (existing && !existing.completed) {
        hasSessionStartedRef.current = true;
        return;
      }

      // Kui puudub või on juba lõpetatud -> alusta uus
      startSession();
      hasSessionStartedRef.current = true;
    } catch {
      // best-effort
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    ensureSessionStarted();
    try {
      trackClick();
    } catch {
      // Tracking is best-effort and should not block registration.
    }
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ensureSessionStarted();
    try {
      trackSubmitAttempt();
    } catch {
      // Tracking is best-effort and should not block registration.
    }

    const result = registerSchema.safeParse(form);
    let newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};

      for (const issue of result.error.issues) {
        if (issue.path.length > 0) {
          const field = issue.path[0] as string;
          if (!fieldErrors[field]) fieldErrors[field] = [];
          fieldErrors[field].push(issue.message);
        }
      }
      newErrors = {
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      };
    }

    if (!newErrors.password && isPasswordTaken(form.password)) {
      newErrors.password =
        "Password already used by user AwesomeUser123. Choose a different one.";
      blockedPasswordRef.current = form.password;
    }

    if (Object.keys(newErrors).length > 0) {
      try {
        trackError();
      } catch {
        // Tracking is best-effort and should not block registration.
      }
      setErrors(newErrors);
      setSubmitError("");
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const registrationSnapshot = await registerUser({
        username: form.username,
        password: form.password,
      });

      await loginUser({
        username: form.username,
        password: form.password,
      });

      saveRegistrationSession({
        ...registrationSnapshot,
      });

      const payload = finishSession();
      if (payload) {
        savePendingAttempt("registration", payload);
      }

      await submitPendingAttempt("registration");
      router.push("/dashboard?registered=true");
    } catch (error) {
      try {
        trackError();
      } catch {
        // Tracking is best-effort and should not block registration.
      }
      const errorMessage = getApiErrorMessage(error);

      if (errorMessage === "Username already exists") {
        setErrors((prev) => ({
          ...prev,
          username: errorMessage,
        }));
        setSubmitError("");
        return;
      }

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function isPasswordTaken(password: string): boolean {
    if (!password) return false;
    if (blockedPasswordRef.current === password) return true;
    return blockedPasswordRef.current === null;
  }

  function clearForm() {
    ensureSessionStarted();
    try {
      trackClick();
    } catch {
      // Tracking is best-effort and should not block registration.
    }
    const originalForm = { ...form };
    setForm({
      username: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    blockedPasswordRef.current = null;
    setClearing(true);
    setTimeout(() => {
      setForm(originalForm);
      setClearing(false);
      setNotification(
        "😱 Oops! Your form was cleared... temporarily! This is a UX dark pattern demo 🎭 The primary button tricked you—always read the text, not just the color. If you meant to clear it, you’ll have to do it manually now. Sorry! 😅",
      );
      setTimeout(() => setNotification(""), 15000);
    }, 2000);
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
          Create account
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Enter UX Hell properly equipped for the forms that fight back.
        </p>
      </div>
      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <Input
          label="Username"
          name="username"
          error={errors.username}
          onChange={handleChange}
          required
          type="text"
          value={form.username}
          disabled={isSubmitting}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Input
          label="Password"
          name="password"
          error={errors.password}
          onChange={handleChange}
          required
          type="password"
          value={form.password}
          disabled={isSubmitting}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          error={errors.confirmPassword}
          onChange={handleChange}
          required
          type="password"
          value={form.confirmPassword}
          disabled={isSubmitting}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Button
          type="submit"
          variant="destructive"
          size="lg"
          className="w-full gap-3 text-base font-bold hover:scale-[1.02]"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
      
            <PlusIcon />
          {isSubmitting ? "Creating..." : "Register"}
        </Button>
        <Button
          type="button"
          variant="default"
          size="lg"
          className="w-full gap-3 text-base font-bold hover:scale-[1.02] mt-2"
          onClick={clearForm}
          disabled={isSubmitting}
        >
          Clear form
        </Button>
        {submitError ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        ) : null}
      </form>
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center w-full">
          <hr className="flex-1 border-slate-200" />
          <span className="mx-4 text-slate-500 text-sm">Already have an account?</span>
          <hr className="flex-1 border-slate-200" />
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full gap-3 text-base font-bold hover:scale-[1.02]"
          onClick={() => router.push('/login')}
        >
          <span className="flex items-center gap-2">
            <Image
              src="/ux-hell-logo.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden="true"
            />
            Login
          </span>
        </Button>
      </div>
      {notification && (
        <div className={notificationClassName}>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white animate-pulse"></div>
            <p className="flex-1 text-sm font-medium">{notification}</p>
            <button
              type="button"
              className="shrink-0 rounded-full px-2 py-1 text-sm font-bold leading-none text-white/90 transition hover:bg-white/15 hover:text-white"
              aria-label="Close notification"
              onClick={() => setNotification("")}
            >
              X
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
