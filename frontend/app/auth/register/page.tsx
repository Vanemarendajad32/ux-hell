"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function RegisterPage() {
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          <Button type="button" className="w-full" onClick={() => setShowPasswordWarning(false)}>
            Got it
          </Button>
        </DialogContent>
      </Dialog>
      <main className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              The registration form will live here. For now, pick your next step.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="register-username" className="text-sm font-medium text-slate-700">
                  Username
                </label>
                <Input
                  id="register-username"
                  name="username"
                  type="text"
                  placeholder="Pick a username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="register-password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
                <ul className="list-disc space-y-1 pl-4 text-xs text-slate-500">
                  <li>Also include 1 uppercase letter, 1 number, and 1 symbol.</li>
                  <li>Minimum length: 10 characters.</li>
                  <li>Password must include at least one emoji.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <label htmlFor="register-quirk" className="text-sm font-medium text-slate-700">
                  Most embarrassing typo
                </label>
                <Input
                  id="register-quirk"
                  name="quirk"
                  type="text"
                  placeholder="Tell us the worst one"
                  required
                />
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
