/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMessageStore } from "@/store/useMessageStore";
import { getToken } from "@clerk/nextjs";

const BACKEND_URL = "http://localhost:9999";

export interface ApiCallOptions {
  header?: Record<string, string>;
  body?: any;
  method?: string;
}

/**
 * Basic API call function that returns the full response data.
 * Defaults method to 'POST' if body is present and no method is specified.
 */
export async function apiCallFull(
  endpoint: string,
  options: ApiCallOptions = {},
) {
  const token = await getToken();
  console.log("token:", token);
  const { header, body, method } = options;

  const isFormData = body instanceof FormData;
  const finalMethod = method || (body ? "POST" : "GET");

  const authorization = token ? { authorization: `Bearer ${token}` } : null;
  const headers: Record<string, string> = { ...header, ...authorization };

  // Only set application/json if not FormData
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: finalMethod,
      headers,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/pdf")) {
      return await response.blob();
    }

    const data = await response.json();
    return {
      ...data,
      success: response.ok,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
}

/**
 * API call function with internal success check.
 * If success is true, returns the 'data' field.
 * If success is false, sets the error message in useMessageStore and returns null.
 */
export async function apiCall(endpoint: string, options: ApiCallOptions = {}) {
  const result = await apiCallFull(endpoint, options);

  if (result.success) {
    return result.data;
  } else {
    const { setMessage, setType } = useMessageStore.getState();
    setMessage(result.message || "An error occurred");
    setType("error");
    return null;
  }
}
