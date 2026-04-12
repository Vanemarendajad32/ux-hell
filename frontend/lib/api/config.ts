const DEFAULT_API_BASE_URL = "http://localhost:8080";
const envUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_BASE_URL =
  envUrl !== undefined
    ? envUrl.trim() || DEFAULT_API_BASE_URL
    : DEFAULT_API_BASE_URL;
