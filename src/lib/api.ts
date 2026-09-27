import type { ApiResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const payload = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (!res.ok) {
    throw new ApiError(payload?.message ?? "Request failed", res.status);
  }
  if (!payload) {
    throw new ApiError("Empty response", res.status);
  }
  return payload;
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 401 && retry && !path.startsWith("/auth/")) {
    const refreshed = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (refreshed.ok) {
      return api<T>(path, options, false);
    }
  }

  return parseResponse<T>(res);
}
