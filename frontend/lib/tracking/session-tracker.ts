import "client-only";
import type { TrackingPayload } from "@/lib/tracking/types";

let currentSession: TrackingPayload | null = null;
let sessionStartMs = 0;

function createSessionId(): string {
  return crypto.randomUUID();
}

function createNewSession(now: number): TrackingPayload {
  return {
    sessionId: createSessionId(),
    startTime: new Date(now).toISOString(),
    completionTimeMs: null,
    clickCount: 0,
    errorCount: 0,
    submitAttempts: 0,
    completed: false,
  };
}

function getCurrentSessionOrThrow(): TrackingPayload {
  if (!currentSession) {
    throw new Error(
      "Tracking session not started. Call startSession() before tracking events.",
    );
  }

  return currentSession;
}

function getTrackableSessionOrThrow(): TrackingPayload {
  const session = getCurrentSessionOrThrow();

  if (session.completed) {
    throw new Error(
      "Tracking session already finished. Call startSession() to begin a new session.",
    );
  }

  return session;
}

export function startSession(): TrackingPayload {
  const now = Date.now();

  currentSession = createNewSession(now);
  sessionStartMs = now;

  return { ...currentSession };
}

export function trackClick(): void {
  const session = getTrackableSessionOrThrow();
  session.clickCount += 1;
}

export function trackError(): void {
  const session = getTrackableSessionOrThrow();
  session.errorCount += 1;
}

export function trackSubmitAttempt(): void {
  const session = getTrackableSessionOrThrow();
  session.submitAttempts += 1;
}

export function finishSession(): TrackingPayload | null {
  if (!currentSession) {
    return null;
  }

  if (!currentSession.completed) {
    currentSession.completed = true;
    currentSession.completionTimeMs = Date.now() - sessionStartMs;
  }

  return { ...currentSession };
}

export function getPayload(): TrackingPayload | null {
  if (!currentSession) {
    return null;
  }

  return { ...currentSession };
}
