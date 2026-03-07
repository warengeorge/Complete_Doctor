import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_AUTH_TOKEN_COOKIE_NAME =
  "complete_doctor_admin_access_token";

const DEFAULT_AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getAuthTokenFromRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_AUTH_TOKEN_COOKIE_NAME)?.value ?? null;
}

export async function getServerAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_AUTH_TOKEN_COOKIE_NAME)?.value ?? null;
}

export function getTokenCookieMaxAge(token: string) {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return DEFAULT_AUTH_COOKIE_MAX_AGE;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(
      Buffer.from(normalizedPayload, "base64").toString("utf8"),
    ) as { exp?: number };

    if (typeof decodedPayload.exp !== "number") {
      return DEFAULT_AUTH_COOKIE_MAX_AGE;
    }

    const secondsUntilExpiry =
      decodedPayload.exp - Math.floor(Date.now() / 1000);

    return Math.max(secondsUntilExpiry, 0);
  } catch {
    return DEFAULT_AUTH_COOKIE_MAX_AGE;
  }
}

export function setAuthTokenCookie(
  response: NextResponse,
  token: string,
  maxAge = DEFAULT_AUTH_COOKIE_MAX_AGE,
) {
  response.cookies.set({
    name: ADMIN_AUTH_TOKEN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function clearAuthTokenCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_AUTH_TOKEN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}
