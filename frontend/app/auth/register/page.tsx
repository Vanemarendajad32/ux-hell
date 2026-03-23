"use client";

import { useRef, useState } from "react";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/register-schema";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [success, setSuccess] = useState("");

  const blockedPasswordRef = useRef<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
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
      setSuccess("");
      return;
    }
    setErrors({});
    setSuccess("User registered successfully!");
  }

  function isPasswordTaken(password: string): boolean {
    if (!password) return false;
    if (blockedPasswordRef.current === password) return true;
    return blockedPasswordRef.current === null;
  }

  return (
    <div className="flex  items-center justify-center h-full">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 w-[550px] relative border border-rose-200">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
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
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />
          <Button type="submit" className="w-full uppercase">
            Create account
          </Button>
        </form>
        {success && (
          <p className="mt-4 text-green-600 font-medium">{success}</p>
        )}
      </div>
    </div>
  );
}
