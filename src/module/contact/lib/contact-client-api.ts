export type ContactInboxSubmission = {
  company: string | null;
  email: string;
  inbox_subject_id: number;
  message: string;
  name: string;
  phone: string | null;
};

export class ContactApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ContactApiError";
  }
}

function getApiRoot() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    throw new ContactApiError("The contact service is unavailable.");
  }

  let apiUrl: URL;

  try {
    apiUrl = new URL(configuredBaseUrl);
  } catch {
    throw new ContactApiError("The contact service is unavailable.");
  }

  if (
    !["http:", "https:"].includes(apiUrl.protocol) ||
    apiUrl.username ||
    apiUrl.password ||
    apiUrl.search ||
    apiUrl.hash
  ) {
    throw new ContactApiError("The contact service is unavailable.");
  }

  apiUrl.pathname = `${apiUrl.pathname.replace(/\/+$/, "")}/`;

  return apiUrl;
}

function resolveApiUrl(path: string) {
  return new URL(path.replace(/^\/+/, ""), getApiRoot());
}

async function readResponseData(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getErrorMessage(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  return null;
}

export async function submitContactInbox(submission: ContactInboxSubmission) {
  let response: Response;

  try {
    response = await fetch(resolveApiUrl("/inboxes"), {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
  } catch {
    throw new ContactApiError("The API service is unavailable.");
  }

  if (response.status !== 201) {
    const data = await readResponseData(response);
    const fallbackMessage = response.ok
      ? "The API returned an unexpected response."
      : "The API returned an error.";

    throw new ContactApiError(
      getErrorMessage(data) ?? fallbackMessage,
      response.status,
    );
  }
}
