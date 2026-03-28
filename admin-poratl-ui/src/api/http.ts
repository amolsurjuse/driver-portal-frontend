type RequestOptions = RequestInit & {
  token?: string | null;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function requestJson<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(url, {
    ...rest,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function requestVoid(url: string, options: RequestOptions = {}): Promise<void> {
  await requestJson<void>(url, options);
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as
      | { message?: string; details?: string[] }
      | string
      | null;

    if (typeof payload === 'string' && payload.trim()) {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      if (Array.isArray(payload.details) && payload.details.length > 0) {
        return payload.details[0] ?? response.statusText;
      }
      if (payload.message) {
        return payload.message;
      }
    }
  } catch {
    // Fall back to the status text below.
  }

  return response.statusText || 'Request failed';
}
