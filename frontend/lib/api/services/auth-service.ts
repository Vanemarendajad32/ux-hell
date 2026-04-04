import { apiClient } from "../client";

export type RegisterUserInput = {
  username: string;
  password: string;
};

export type RegisteredUserSnapshot = {
  id: number;
  username: string;
};

export type AuthSession = {
  id: number;
  username: string;
  token: string;
};

export type LoginUserInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

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
