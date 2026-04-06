import { apiClient } from "../client";

export type RegisterUserInput = {
  username: string;
  password: string;
};

export type RegisteredUserSnapshot = {
  id: number;
  username: string;
};

<<<<<<< ux-hell-24-login-session-logout
=======
export type AuthSession = {
  id: number;
  username: string;
  token: string;
};

>>>>>>> main
export type LoginUserInput = {
  username: string;
  password: string;
};

<<<<<<< ux-hell-24-login-session-logout
export type SessionSnapshot =
  | { authenticated: true; username: string }
  | { authenticated: false; username: null };
=======
export type LoginResponse = {
  token: string;
};
>>>>>>> main

export async function registerUser(input: RegisterUserInput) {
  const response = await apiClient.post<RegisteredUserSnapshot>(
    "/api/auth/register",
    {
      username: input.username,
      password: input.password,
    },
  );

  return response;
}

export async function loginUser(input: LoginUserInput) {
  const response = await apiClient.post<LoginResponse>("/api/auth/login", {
    username: input.username,
    password: input.password,
  });

  return response;
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
