import type { NextResponse } from "next/server";
import {
  ADMIN_AUTH_TOKEN_COOKIE_NAME,
  ADMIN_AUTH_REFRESH_TOKEN_COOKIE_NAME,
  getTokenCookieMaxAge,
  setAuthTokenCookie,
  setRefreshTokenCookie,
} from "./auth-cookie";
import type { TokenPair } from "@/features/auth/types";

/**
 * Token Manager - Centralized token handling and validation
 * Handles token extraction, validation, and cookie operations
 */

export function extractTokensFromResponse(data: unknown): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  if (!data || typeof data !== "object") {
    return { accessToken: null, refreshToken: null };
  }

  const obj = data as Record<string, unknown>;

  // Handle nested data structure from backend
  let tokenData = obj;
  if ("data" in obj && obj.data && typeof obj.data === "object") {
    const nestedData = obj.data as Record<string, unknown>;
    if (
      "data" in nestedData &&
      nestedData.data &&
      typeof nestedData.data === "object"
    ) {
      tokenData = nestedData.data as Record<string, unknown>;
    }
  }

  return {
    accessToken:
      (typeof tokenData.token === "string" && tokenData.token) ||
      (typeof tokenData.accessToken === "string" && tokenData.accessToken) ||
      null,
    refreshToken:
      (typeof tokenData.refreshToken === "string" && tokenData.refreshToken) ||
      null,
  };
}

export function applyTokensToCookies(
  response: NextResponse,
  tokens: TokenPair,
): void {
  const { accessToken, refreshToken } = tokens;

  if (accessToken) {
    setAuthTokenCookie(
      response,
      accessToken,
      getTokenCookieMaxAge(accessToken),
    );
  }

  if (refreshToken) {
    setRefreshTokenCookie(
      response,
      refreshToken,
      getTokenCookieMaxAge(refreshToken),
    );
  }
}

export function validateTokenPair(
  tokens: Partial<TokenPair>,
): tokens is TokenPair {
  return Boolean(tokens.accessToken && tokens.refreshToken);
}

export function hasValidTokens(
  accessToken: string | null,
  refreshToken: string | null,
): boolean {
  return Boolean(accessToken || refreshToken);
}

export function shouldRefreshToken(
  accessToken: string | null,
  refreshToken: string | null,
): boolean {
  return !accessToken && Boolean(refreshToken);
}
