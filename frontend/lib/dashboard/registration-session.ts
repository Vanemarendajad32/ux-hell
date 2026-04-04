import type { AuthSession } from "@/lib/api/services/auth-service";

const REGISTRATION_SESSION_KEY = "ux-hell.registration";

export function saveRegistrationSession(snapshot: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    REGISTRATION_SESSION_KEY,
    JSON.stringify(snapshot),
  );
}

export function readRegistrationSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(REGISTRATION_SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthSession;
  } catch {
    return null;
  }
}
