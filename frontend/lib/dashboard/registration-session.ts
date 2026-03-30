import type { RegisteredUserSnapshot } from "@/lib/api/services/auth-service";

const REGISTRATION_SESSION_KEY = "ux-hell.registration";

export function saveRegistrationSession(snapshot: RegisteredUserSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    REGISTRATION_SESSION_KEY,
    JSON.stringify(snapshot),
  );
}

export function readRegistrationSession(): RegisteredUserSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(REGISTRATION_SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as RegisteredUserSnapshot;
  } catch {
    return null;
  }
}
