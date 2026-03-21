import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-6 py-12 text-slate-900">
      <main className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              The login form will live here. For now, choose where to go next.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="login-username"
                  className="text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <Input
                  id="login-username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/auth/register">Register</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
