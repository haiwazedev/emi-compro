export class ApiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiConfigurationError";
  }
}

export function getRequiredApiBaseUrl() {
  const configuredBaseUrl = process.env.API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    throw new ApiConfigurationError(
      "API_BASE_URL must be set to the API origin.",
    );
  }

  let apiUrl: URL;

  try {
    apiUrl = new URL(configuredBaseUrl);
  } catch {
    throw new ApiConfigurationError(
      "API_BASE_URL must be a valid absolute HTTP or HTTPS URL.",
    );
  }

  if (
    !["http:", "https:"].includes(apiUrl.protocol) ||
    apiUrl.username ||
    apiUrl.password ||
    apiUrl.search ||
    apiUrl.hash
  ) {
    throw new ApiConfigurationError(
      "API_BASE_URL must be an HTTP or HTTPS URL without credentials, a query, or a fragment.",
    );
  }

  return apiUrl;
}
