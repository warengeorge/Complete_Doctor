import axios from "axios";

export const bffClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function getApiErrorDetails(error: unknown) {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 500,
      message: getApiErrorMessage(error),
      data: error.response?.data ?? null,
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }

  return {
    status: 500,
    message: "Unexpected server error.",
    data: null,
  };
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Request failed.",
) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "message" in responseData &&
      typeof responseData.message === "string"
    ) {
      return responseData.message;
    }

    return error.message || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
