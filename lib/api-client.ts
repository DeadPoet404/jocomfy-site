const BASE_URL = process.env.NEXT_PUBLIC_SMS_API_URL || "/api";

let refreshing: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (refreshing) return refreshing;

  refreshing = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });

      return response.ok;
    } catch {
      return false;
    } finally {
      setTimeout(() => {
        refreshing = null;
      }, 0);
    }
  })();

  return refreshing;
}

function requestHeaders(options: RequestInit): Headers {
  const headers = new Headers(options.headers);
  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  const path = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const url = `${BASE_URL.replace(/\/$/, "")}${path}`;

  const send = () =>
    fetch(url, {
      ...options,
      headers: requestHeaders(options),
      credentials: "include",
    });

  let response = await send();

  if (
    response.status === 401 &&
    path !== "/auth/login" &&
    path !== "/auth/refresh"
  ) {
    if (await tryRefresh()) {
      response = await send();
    }
  }

  if (
    response.status === 401 &&
    typeof window !== "undefined"
  ) {
    window.dispatchEvent(
      new Event("portal:unauthorized")
    );
  }

  return response.json().catch(() => ({
    success: false,
    message:
      `The school server returned HTTP ${response.status}.`,
  }));
}
