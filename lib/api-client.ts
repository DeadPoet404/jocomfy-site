const BASE_URL = process.env.NEXT_PUBLIC_SMS_API_URL || 'http://localhost:5000/api';

// INT-005b: the SMS access token lives 15 min; the refresh token (7d, rotating,
// single-use) is held in localStorage and rotates through POST /auth/refresh.
// refreshing is a module-level single-flight promise: a dashboard firing 3
// concurrent 401s triggers exactly ONE refresh call; the others await it.
let refreshing: Promise<boolean> | null = null;

function tryRefresh(): Promise<boolean> {
  if (!refreshing) {
    refreshing = (async () => {
      const rt = localStorage.getItem('portal_refresh');
      if (!rt) return false;
      try {
        const res = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // INT-005c: NO credentials here — the shared localhost cookie jar may hold
          // a staff-console session; sending it lets that session hijack rotation.
          body: JSON.stringify({ refreshToken: rt }),
        });
        const json = await res.json().catch(() => null);
        if (res.ok && json?.success && json.data?.accessToken) {
          localStorage.setItem('portal_token', json.data.accessToken);
          if (json.data.refreshToken) localStorage.setItem('portal_refresh', json.data.refreshToken);
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        // release the single-flight after all awaiters have attached
        setTimeout(() => { refreshing = null; }, 0);
      }
    })();
  }
  return refreshing;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const doFetch = () => {
    const token = localStorage.getItem('portal_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };
    return fetch(`${BASE_URL}${endpoint}`, { ...options, headers, credentials: 'include' });
  };

  let response = await doFetch();

  // Any 401 (expired, invalidated, or tampered token) gets exactly one
  // refresh-and-retry before we give up and force re-authentication.
  if (response.status === 401 && !endpoint.startsWith('/auth/')) {
    if (await tryRefresh()) {
      response = await doFetch();
    }
  }

  if (response.status === 401) {
    localStorage.removeItem('portal_token');
    localStorage.removeItem('portal_refresh');
    if (typeof window !== 'undefined') window.location.href = '/portal/login';
  }
  return response.json();
}
