import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import {
  clearAuthCookies,
  getAuthTokenFromRequest,
  getRefreshTokenFromRequest,
} from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";
import {
  applyAuthCookies,
  getRefreshFailureMessage,
  requestRefreshTokens,
} from "@/lib/server-auth";
import type { BackendMeResponse, BFFMeResponse } from "@/features/auth/types";

const BACKEND_AUTH_ME_PATH = process.env.BACKEND_AUTH_ME_PATH ?? "/auth/get-me";

/**
 * Fetches current user from backend using provided access token
 */
async function fetchUserFromBackend(
  accessToken: string | null,
): Promise<{ user: unknown; success: boolean; message: string } | null> {
  if (!accessToken) {
    return null;
  }
  const apiClient = createApiClient(accessToken);
  const { data } = await apiClient.get<BackendMeResponse>(BACKEND_AUTH_ME_PATH);
  return {
    user: data.data?.data?.user ?? null,
    success: data.success ?? true,
    message: data.message ?? "Success",
  };
}

export async function GET(request: NextRequest) {
  const accessToken = getAuthTokenFromRequest(request);
  const refreshToken = getRefreshTokenFromRequest(request);
  let refreshedTokens: { accessToken: string; refreshToken: string } | null =
    null;

  // Check authentication status
  if (!accessToken && !refreshToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated.",
      },
      { status: 401 },
    );
  }

  try {
    // If we only have refresh token, refresh first
    let currentAccessToken = accessToken;
    if (!accessToken && refreshToken) {
      refreshedTokens = await requestRefreshTokens(refreshToken);
      currentAccessToken = refreshedTokens.accessToken;
    }

    // Fetch user with current access token
    const result = await fetchUserFromBackend(currentAccessToken);

    if (!result || !result.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to load profile details.",
        },
        { status: 502 },
      );
    }

    const response = NextResponse.json<BFFMeResponse>(
      {
        success: result.success,
        message: result.message,
        data: {
          user: result.user as any,
        },
      },
      { status: 200 },
    );

    if (refreshedTokens) {
      applyAuthCookies(
        response,
        refreshedTokens.accessToken,
        refreshedTokens.refreshToken,
      );
    }

    return response;
  } catch (error) {
    const { status } = getApiErrorDetails(error);

    // If access token expired and we have refresh token, try refreshing
    if (status === 401 && refreshToken) {
      try {
        const refreshedTokens = await requestRefreshTokens(refreshToken);
        const result = await fetchUserFromBackend(refreshedTokens.accessToken);

        if (!result || !result.user) {
          return NextResponse.json(
            {
              success: false,
              message: "Unable to load profile details.",
            },
            { status: 502 },
          );
        }

        const response = NextResponse.json<BFFMeResponse>(
          {
            success: result.success,
            message: result.message,
            data: {
              user: result.user as any,
            },
          },
          { status: 200 },
        );

        applyAuthCookies(
          response,
          refreshedTokens.accessToken,
          refreshedTokens.refreshToken,
        );

        return response;
      } catch (refreshError) {
        const response = NextResponse.json(
          {
            success: false,
            message: getRefreshFailureMessage(refreshError),
          },
          { status: 401 },
        );

        clearAuthCookies(response);

        return response;
      }
    }

    // For other errors or if we don't have refresh token
    const { message: errorMessage, data: errorData } =
      getApiErrorDetails(error);
    const response = NextResponse.json(
      {
        success: false,
        message: errorMessage,
        data: errorData,
      },
      { status: Math.max(status, 400) },
    );

    // Clear cookies on auth errors
    if (status === 401) {
      clearAuthCookies(response);
    }

    return response;
  }
}
