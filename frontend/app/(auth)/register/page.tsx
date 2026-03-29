"use client";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
  type RegisterFormData,
  registerSchema,
} from "@/schemas/register-schema";
import { useRouter } from "next/dist/client/components/navigation";
import { useRef, useState } from "react";

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
  }

  function handleSubmit(e: React.SubmitEvent) {
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
      return;
    }
    setErrors({});
    router.push("/dashboard?registered=true");
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
      email: "",
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
        "😱 Oops! Your form got cleared... temporarily! 🎭 This is a UX dark pattern demo - the primary button tricked you!Remember: always read button text, not just colors. If you actually wanted to clear your form, you'll have to do it manually now. Sorry! 😅",
      );
      setTimeout(() => setNotification(""), 10000);
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
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
          error={errors.username}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          error={errors.email}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          error={errors.password}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          error={errors.confirmPassword}
          className={cn(
            "transition-colors duration-500",
            clearing && "text-transparent",
          )}
        />
        <Button
          type="submit"
          variant="destructive"
          className="w-full uppercase"
        >
          Create account
        </Button>
        <Button
          type="button"
          variant="default"
          className="w-full uppercase mt-2"
          onClick={clearForm}
        >
          Clear form
        </Button>
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
