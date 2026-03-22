import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be 24 characters or less")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only use letters, numbers, and underscores",
    ),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must include at least one uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must include at least one number",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "Password must include at least one symbol",
    })
    .refine((value) => /\p{Extended_Pictographic}/u.test(value), {
      message: "Password must include at least one emoji",
    }),
  quirk: z.string().trim().min(5, "Tell us a bit more"),
});
