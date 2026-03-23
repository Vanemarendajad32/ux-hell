import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters"),
    ),

    email: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.email("Invalid email").max(50, "Email cannot exceed 50 characters"),
    ),

    password: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z
        .string()
        .min(8, "Minimum 8 characters")
        .max(50, "Password cannot exceed 50 characters"),
    ),

    confirmPassword: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string(),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
