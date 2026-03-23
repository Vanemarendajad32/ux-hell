import { z } from "zod";

export const trackingPayloadSchema = z.object({
  sessionId: z.string().min(1),
  startTime: z.string().datetime(),
  completionTimeMs: z.number().int().nonnegative().nullable(),
  clickCount: z.number().int().nonnegative(),
  errorCount: z.number().int().nonnegative(),
  submitAttempts: z.number().int().nonnegative(),
  completed: z.boolean(),
});

export type TrackingPayloadInput = z.infer<typeof trackingPayloadSchema>;
