const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiError extends Error {
  statusCode: number;
  data: any;

  constructor(message: string, statusCode: number, data: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: any,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...customConfig } = options;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    (defaultHeaders as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  if (body && !(body instanceof FormData)) {
    config.body = JSON.stringify(body);
  }

  if (body instanceof FormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { "Content-Type": _, ...restHeaders } = defaultHeaders as Record<
      string,
      string
    >;
    config.headers = { ...restHeaders, ...headers };
    config.body = body;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data: any;
  try {
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      // If response is not JSON, try to extract a clean message from HTML
      let cleanMessage = text;

      // If it looks like HTML, try to find text inside <pre> or <body>
      if (text.includes("<!DOCTYPE") || text.includes("<html")) {
        const preMatch = text.match(/<pre>([\s\S]*?)<\/pre>/i);
        if (preMatch) {
          cleanMessage = preMatch[1];
        } else {
          const bodyMatch = text.match(/<body>([\s\S]*?)<\/body>/i);
          if (bodyMatch) {
            cleanMessage = bodyMatch[1];
          }
        }

        // Strip HTML tags
        cleanMessage = cleanMessage.replace(/<[^>]*>/g, " ");

        // Decode common HTML entities
        cleanMessage = cleanMessage
          .replace(/&nbsp;/gi, " ")
          .replace(/&lt;/gi, "<")
          .replace(/&gt;/gi, ">")
          .replace(/&amp;/gi, "&")
          .replace(/&quot;/gi, '"')
          .replace(/&#39;/gi, "'")
          .replace(/&#x27;/gi, "'");

        // Collapse whitespace
        cleanMessage = cleanMessage.replace(/\s+/g, " ").trim();

        // Strip stack traces: take only the part before " at " (covers
        // "ApiError:", "ApiError.badRequest", "Error:", plain messages, etc.)
        if (cleanMessage.includes(" at ")) {
          cleanMessage = cleanMessage.split(" at ")[0].trim();
        }

        // Remove leading error class prefixes like "ApiError:" or "Error:"
        cleanMessage = cleanMessage
          .replace(/^(ApiError|Error)\s*[:.]?\s*/i, "")
          .trim();
      }

      data = { message: cleanMessage || response.statusText };
    }
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new ApiError(
      data.message || `Error ${response.status}: ${response.statusText}`,
      response.status,
      data,
    );
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, "GET", undefined, options),
  post: <T>(endpoint: string, body: any, options?: RequestOptions) =>
    request<T>(endpoint, "POST", body, options),
  put: <T>(endpoint: string, body: any, options?: RequestOptions) =>
    request<T>(endpoint, "PUT", body, options),
  patch: <T>(endpoint: string, body: any, options?: RequestOptions) =>
    request<T>(endpoint, "PATCH", body, options),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, "DELETE", undefined, options),
};
