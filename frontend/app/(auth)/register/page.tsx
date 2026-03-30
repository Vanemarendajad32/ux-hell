"use client";

import { useRouter } from "next/dist/client/components/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { getApiErrorMessage } from "@/lib/api/error";
import { registerUser } from "@/lib/api/services/auth-service";
import { saveRegistrationSession } from "@/lib/dashboard/registration-session";
import {
  type RegisterFormData,
  registerSchema,
} from "@/schemas/register-schema";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blockedPasswordRef = useRef<string | null>(null);

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
        email: fieldErrors.email?.[0],
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
        email: form.email,
        password: form.password,
      });

      saveRegistrationSession(registrationSnapshot);
      router.push("/dashboard?registered=true");
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function isPasswordTaken(password: string): boolean {
    if (!password) return false;
    if (blockedPasswordRef.current === password) return true;
    return blockedPasswordRef.current === null;
  }

  return (
    <main>
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
        Create Account
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Join thousands of users today
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          error={errors.username}
          onChange={handleChange}
          required
          type="text"
          value={form.username}
        />
        <Input
          label="Email"
          name="email"
          error={errors.email}
          onChange={handleChange}
          required
          type="email"
          value={form.email}
        />
        <Input
          label="Password"
          name="password"
          error={errors.password}
          onChange={handleChange}
          required
          type="password"
          value={form.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          error={errors.confirmPassword}
          onChange={handleChange}
          required
          type="password"
          value={form.confirmPassword}
        />
        <Button type="submit" className="w-full uppercase">
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
        {submitError ? (
          <p className="mt-4 text-sm text-red-600">{submitError}</p>
        ) : null}
      </form>
    </main>
  );
}
