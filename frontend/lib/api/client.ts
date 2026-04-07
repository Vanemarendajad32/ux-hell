import { API_BASE_URL } from "./config";

export class ApiError extends Error {
  status?: number;
  statusText?: string;
  data?: unknown;

  constructor(
    message: string,
    options?: { status?: number; statusText?: string; data?: unknown },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options?.status;
    this.statusText = options?.statusText;
    this.data = options?.data;
  }
}

type ApiMethod = "GET" | "POST" | "PUT";

type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  body?: unknown;
};

function buildUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedBaseUrl = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return rawBody;
  }
}

function getErrorMessage(
  status: number,
  statusText: string,
  data: unknown,
): string {
  if (typeof data === "object" && data !== null && "message" in data) {
    const message = data.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return `Request failed with status ${status}${statusText ? ` ${statusText}` : ""}.`;
}

async function request<TResponse>(
  method: ApiMethod,
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const headers = new Headers(options.headers);
  const hasBody = options.body !== undefined;

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(buildUrl(path), {
      ...options,
      method,
      headers,
      credentials: options.credentials ?? "include",
      body: hasBody ? JSON.stringify(options.body) : undefined,
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error
        ? `Network error while sending request: ${error.message}`
        : "Network error while sending request.",
    );
  }

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(response.status, response.statusText, data),
      {
        status: response.status,
        statusText: response.statusText,
        data,
      },
    );
  }

  return data as TResponse;
}

export const apiClient = {
  get<TResponse>(path: string, options?: RequestOptions) {
    return request<TResponse>("GET", path, options);
  },
  post<TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) {
    return request<TResponse>("POST", path, { ...options, body });
  },
  put<TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) {
    return request<TResponse>("PUT", path, { ...options, body });
  },
};
