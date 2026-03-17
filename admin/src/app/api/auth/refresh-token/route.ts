import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import {
  clearAuthCookies,
  getRefreshTokenFromRequest,
} from "@/lib/auth-cookie";
import {
  getRefreshFailureMessage,
  requestRefreshTokens,
} from "@/lib/server-auth";
import type { BFFRefreshResponse } from "@/features/auth/types";
import { applyTokensToCookies } from "@/lib/token-manager";

export async function POST(request: NextRequest) {
  // Try to get refresh token from cookies first, then from request body
  const refreshTokenFromCookie = getRefreshTokenFromRequest(request);
  const body = (await request.json().catch(() => null)) as {
    refreshToken?: string;
  } | null;
  const refreshToken = refreshTokenFromCookie || body?.refreshToken;

  if (!refreshToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Refresh token is required.",
      },
      { status: 401 },
    );
  }

  try {
    const tokens = await requestRefreshTokens(refreshToken);

    const response = NextResponse.json<BFFRefreshResponse>(
      {
        success: true,
        message: "Tokens refreshed successfully.",
      },
      { status: 200 },
    );

    applyTokensToCookies(response, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return response;
  } catch (error) {
    const { status, data: errorData } = getApiErrorDetails(error);
    const response = NextResponse.json(
      {
        success: false,
        message: getRefreshFailureMessage(error),
        data: errorData,
      },
      { status: status === 200 ? 401 : status },
    );

    clearAuthCookies(response);

    return response;
  }
}
