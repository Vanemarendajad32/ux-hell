export type ApiRequestResult =
  | {
      ok: true;
      status: number;
      statusText: string;
      data: unknown;
    }
  | {
      ok: false;
      status?: number;
      statusText?: string;
      message: string;
      data?: unknown;
    };

export async function requestJson(
  url: string,
  init?: RequestInit,
): Promise<ApiRequestResult> {
  try {
    const response = await fetch(url, init);
    const rawBody = await response.text();
    let data: unknown = null;

    if (rawBody) {
      try {
        data = JSON.parse(rawBody);
      } catch {
        data = {
          message: "Server returned a non-JSON response.",
          body: rawBody,
        };
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        statusText: response.statusText,
        message: `Request failed with status ${response.status} ${response.statusText}.`,
        data,
      };
    }

    return {
      ok: true,
      status: response.status,
      statusText: response.statusText,
      data: data ?? { message: "Request succeeded with an empty response." },
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? `Network error while sending request: ${error.message}`
          : "Network error while sending request.",
    };
  }
}
