//const BASE_URL = "http://localhost:3000/api/v1";
const BASE_URL = "http://51.20.246.245:4200/api/v1";
interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export const apiGet = <T>(endpoint: string, headers?: any): Promise<T> =>
  apiFetch<T>(endpoint, { headers: headers ? headers : {}, method: "GET" });

export const apiPost = <T>(
  endpoint: string,
  body: any,
  headers?: any
): Promise<T> =>
  apiFetch<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers ? headers : {},
  });

export const apiPut = <T>(endpoint: string, body: any): Promise<T> =>
  apiFetch<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const apiDelete = <T>(endpoint: string, headers?: any): Promise<T> =>
  apiFetch<T>(endpoint, { method: "DELETE" });
