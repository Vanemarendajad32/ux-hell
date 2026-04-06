import { apiClient } from "../client";

export type RegisterUserInput = {
  username: string;
  password: string;
};

export type RegisteredUserSnapshot = {
  username: string;
};

export type LoginUserInput = {
  username: string;
  password: string;
};

export type SessionSnapshot =
  | { authenticated: true; username: string }
  | { authenticated: false; username: null };

export async function registerUser(input: RegisterUserInput) {
  await apiClient.post<void>("/api/auth/register", {
    username: input.username,
    password: input.password,
  });

  return {
    username: input.username,
  } satisfies RegisteredUserSnapshot;
}

export async function loginUser(input: LoginUserInput) {
  await apiClient.post<void>("/api/auth/login", {
    username: input.username,
    password: input.password,
  });
}

export async function logoutUser() {
  await apiClient.post<void>("/api/auth/logout");
}

export async function getSession(): Promise<SessionSnapshot> {
  const session = await apiClient.get<{
    authenticated: boolean;
    username: string | null;
  }>("/api/auth/session");

  if (session.authenticated && session.username) {
    return { authenticated: true, username: session.username };
  }

  return { authenticated: false, username: null };
}
