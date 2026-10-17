import "server-only";

import { getRequiredApiBaseUrl } from "@/shared/lib/api-config";

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

function getApiRoot() {
  const apiUrl = getRequiredApiBaseUrl();
  apiUrl.pathname = `${apiUrl.pathname.replace(/\/+$/, "")}/`;

  return apiUrl;
}

export function resolveApiUrl(path: string) {
  return new URL(path.replace(/^\/+/, ""), getApiRoot());
}

export function resolveApiAssetUrl(path: string) {
  return new URL(path, getRequiredApiBaseUrl()).toString();
}

export async function apiGet<T>(
  path: string,
  query?: Record<string, number | string>,
) {
  const url = resolveApiUrl(path);

  for (const [key, value] of Object.entries(query ?? {})) {
    url.searchParams.set(key, String(value));
  }

  let response: Response;

  try {
    response = await fetch(url, { cache: "no-store" });
  } catch {
    throw new ApiClientError("The API service is unavailable.");
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "The API returned an error.";

    throw new ApiClientError(message, response.status);
  }

  if (data === null) {
    throw new ApiClientError("The API returned an invalid response.");
  }

  return data as T;
}
