"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/register-schema";

type FieldErrors = {
  username?: string;
  password?: string;
  quirk?: string;
};

export default function RegisterPage() {
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      username: String(formData.get("username") ?? ""),
      password: String(formData.get("password") ?? ""),
      quirk: String(formData.get("quirk") ?? ""),
    };
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !errors[key as keyof FieldErrors]) {
          errors[key as keyof FieldErrors] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    if (!hasSubmittedOnce) {
      setShowPasswordWarning(true);
      setHasSubmittedOnce(true);
      return;
    }

    setShowPasswordWarning(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-6 py-12 text-slate-900">
      <Dialog open={showPasswordWarning} onOpenChange={setShowPasswordWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password already taken</DialogTitle>
            <DialogDescription>
              Choose a new password. User "Alex Doe" already has that password.
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            className="w-full"
            onClick={() => setShowPasswordWarning(false)}
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
      <main className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              The registration form will live here. For now, pick your next
              step.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="register-username"
                  className="text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <Input
                  id="register-username"
                  name="username"
                  type="text"
                  placeholder="Pick a username"
                  autoComplete="username"
                  aria-invalid={Boolean(fieldErrors.username)}
                  aria-describedby={
                    fieldErrors.username ? "register-username-error" : undefined
                  }
                  required
                />
                {fieldErrors.username ? (
                  <p
                    id="register-username-error"
                    className="text-xs text-rose-600"
                  >
                    {fieldErrors.username}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="register-password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={
                    fieldErrors.password ? "register-password-error" : undefined
                  }
                  required
                />
                {fieldErrors.password ? (
                  <p
                    id="register-password-error"
                    className="text-xs text-rose-600"
                  >
                    {fieldErrors.password}
                  </p>
                ) : null}
                <ul className="list-disc space-y-1 pl-4 text-xs text-slate-500">
                  <li>
                    Also include 1 uppercase letter, 1 number, and 1 symbol.
                  </li>
                  <li>Minimum length: 10 characters.</li>
                  <li>Password must include at least one emoji.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="register-quirk"
                  className="text-sm font-medium text-slate-700"
                >
                  Most embarrassing typo
                </label>
                <Input
                  id="register-quirk"
                  name="quirk"
                  type="text"
                  placeholder="Tell us the worst one"
                  aria-invalid={Boolean(fieldErrors.quirk)}
                  aria-describedby={
                    fieldErrors.quirk ? "register-quirk-error" : undefined
                  }
                  required
                />
                {fieldErrors.quirk ? (
                  <p
                    id="register-quirk-error"
                    className="text-xs text-rose-600"
                  >
                    {fieldErrors.quirk}
                  </p>
                ) : null}
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/auth/login">Log in</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
