import Image from "next/image";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md">
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
        <p className="text-sm text-slate-500">
          Existing users can sign in with their username.
        </p>
      </div>

      <form>
        <Input
          autoComplete="username"
          label="username"
          name="identifier"
          required
          type="text"
        />
        <Input
          autoComplete="current-password"
          label="Password"
          name="password"
          required
          type="password"
        />
        <Button
          className="mt-3 w-full gap-3 text-base font-bold hover:scale-[1.02]"
          size="lg"
          type="button"
        >
          <Image
            src="/ux-hell-logo.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
            aria-hidden="true"
          />
          Sign in
        </Button>
      </form>
    </main>
  );
}
