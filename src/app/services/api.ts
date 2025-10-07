const API_URL = "https://localhost:7016/api";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  let url = `${API_URL}${endpoint}`;

  if (options.params) {
    const query = new URLSearchParams(options.params as Record<string, string>).toString();
    url += `?${query}`;
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Erro na requisição");
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body), ...options }),

  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body), ...options }),

  patch: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body), ...options }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { method: "DELETE", ...options }),
};