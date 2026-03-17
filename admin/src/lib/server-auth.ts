import type { NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import {
  getTokenCookieMaxAge,
  setAuthTokenCookie,
  setRefreshTokenCookie,
} from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";
import type { BackendRefreshResponse } from "@/features/auth/types";

const BACKEND_REFRESH_TOKEN_PATH =
  process.env.BACKEND_REFRESH_TOKEN_PATH ?? "/auth/refresh-token";

export async function requestRefreshTokens(refreshToken: string) {
  const apiClient = createApiClient();
  const { data } = await apiClient.post<BackendRefreshResponse>(
    BACKEND_REFRESH_TOKEN_PATH,
    {
      refreshToken,
    },
  );

  const accessToken = data.data?.data?.accessToken;
  const nextRefreshToken = data.data?.data?.refreshToken;

  if (!accessToken || !nextRefreshToken) {
    throw new Error(
      data.message || "Refresh token succeeded but no tokens were returned.",
    );
  }

  return {
    accessToken,
    refreshToken: nextRefreshToken,
  };
}

export function applyAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  setAuthTokenCookie(response, accessToken, getTokenCookieMaxAge(accessToken));
  setRefreshTokenCookie(
    response,
    refreshToken,
    getTokenCookieMaxAge(refreshToken),
  );
}

export function getRefreshFailureMessage(error: unknown) {
  const { message } = getApiErrorDetails(error);
  return message || "Session expired. Please sign in again.";
}
