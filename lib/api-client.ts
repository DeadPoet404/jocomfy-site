const BASE_URL = process.env.NEXT_PUBLIC_SMS_API_URL || 'http://localhost:5000/api';
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('portal_token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}), ...options.headers };
  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem('portal_token');
    if (typeof window !== 'undefined') window.location.href = '/portal/login';
  }
  return response.json();
}
