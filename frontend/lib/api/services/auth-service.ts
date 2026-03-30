import { apiClient } from "../client";

export type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
};

export type RegisteredUserSnapshot = {
  username: string;
  email: string;
};

export async function registerUser(input: RegisterUserInput) {
  await apiClient.post<void>("/api/auth/register", {
    username: input.username,
    password: input.password,
  });

  return {
    username: input.username,
    email: input.email,
  } satisfies RegisteredUserSnapshot;
}
