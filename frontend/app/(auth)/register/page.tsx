"use client";

import { useRouter } from "next/dist/client/components/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { getApiErrorMessage } from "@/lib/api/error";
import { registerUser } from "@/lib/api/services/auth-service";
import { saveRegistrationSession } from "@/lib/dashboard/registration-session";
import { cn } from "@/lib/utils";
import {
  type RegisterFormData,
  registerSchema,
} from "@/schemas/register-schema";

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

  const notificationClassName =
    "fixed top-4 right-4 z-50 max-w-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300 border-2 border-white/20";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

      saveRegistrationSession(registrationSnapshot);
      router.push("/dashboard?registered=true");
    } catch (error) {
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
    <main>
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
        Create Account
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Join thousands of users today
      </p>
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
          className="w-full uppercase"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
        <Button
          type="button"
          variant="default"
          className="w-full uppercase mt-2"
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
      {notification && (
        <div className={notificationClassName}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">{notification}</p>
          </div>
        </div>
      )}
    </main>
  );
}
