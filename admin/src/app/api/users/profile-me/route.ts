import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import {
  clearAuthCookies,
  getAuthTokenFromRequest,
  getRefreshTokenFromRequest,
} from "@/lib/auth-cookie";
import { applyTokensToCookies } from "@/lib/token-manager";
import {
  getRefreshFailureMessage,
  requestRefreshTokens,
} from "@/lib/server-auth";

const BACKEND_PROFILE_ME_PATH =
  process.env.BACKEND_PROFILE_ME_PATH ?? "/users/profile-me";

function getBackendApiUrl() {
  return (
    process.env.BACKEND_API_URL ||
    "https://completedoc-backend.onrender.com/api/"
  );
}

function buildBackendUrl(path: string) {
  const base = getBackendApiUrl().replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${base}/${normalizedPath}`;
}

function cloneFormData(source: FormData) {
  const clone = new FormData();
  for (const [key, value] of source.entries()) {
    if (value instanceof File) {
      clone.append(key, value, value.name);
    } else {
      clone.append(key, value);
    }
  }
  return clone;
}

async function sendProfileUpdate(
  accessToken: string,
  payload: FormData,
) {
  const response = await fetch(buildBackendUrl(BACKEND_PROFILE_ME_PATH), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: payload,
  });

  const data = (await response.json().catch(() => null)) as
    | {
        success?: boolean;
        message?: string;
        data?: { data?: unknown } | unknown;
      }
    | null;

  return { response, data };
}

export async function PATCH(request: NextRequest) {
  const accessToken = getAuthTokenFromRequest(request);
  const refreshToken = getRefreshTokenFromRequest(request);

  if (!accessToken && !refreshToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authenticated.",
      },
      { status: 401 },
    );
  }

  const incomingFormData = await request.formData();

  let refreshedTokens: { accessToken: string; refreshToken: string } | null =
    null;
  let currentAccessToken = accessToken;

  if (!currentAccessToken && refreshToken) {
    refreshedTokens = await requestRefreshTokens(refreshToken);
    currentAccessToken = refreshedTokens.accessToken;
  }

  try {
    const { response, data } = await sendProfileUpdate(
      currentAccessToken as string,
      cloneFormData(incomingFormData),
    );

    if (!response.ok) {
      throw Object.assign(new Error(data?.message || "Request failed."), {
        status: response.status,
        data,
      });
    }

    const profile =
      (data as any)?.data?.data ??
      (data as any)?.data?.profile ??
      (data as any)?.data ??
      null;

    const bffResponse = NextResponse.json(
      {
        success: data?.success ?? true,
        message: data?.message ?? "Profile updated successfully.",
        data: { profile },
      },
      { status: response.status },
    );

    if (refreshedTokens) {
      applyTokensToCookies(bffResponse, {
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken,
      });
    }

    return bffResponse;
  } catch (error) {
    const { status, message, data } = getApiErrorDetails(error);

    if (status === 401 && refreshToken) {
      try {
        const nextTokens = await requestRefreshTokens(refreshToken);
        const { response, data: retryData } = await sendProfileUpdate(
          nextTokens.accessToken,
          cloneFormData(incomingFormData),
        );

        if (!response.ok) {
          throw Object.assign(
            new Error(retryData?.message || "Request failed."),
            { status: response.status, data: retryData },
          );
        }

        const profile =
          (retryData as any)?.data?.data ??
          (retryData as any)?.data?.profile ??
          (retryData as any)?.data ??
          null;

        const successResponse = NextResponse.json(
          {
            success: retryData?.success ?? true,
            message: retryData?.message ?? "Profile updated successfully.",
            data: { profile },
          },
          { status: response.status },
        );

        applyTokensToCookies(successResponse, {
          accessToken: nextTokens.accessToken,
          refreshToken: nextTokens.refreshToken,
        });

        return successResponse;
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

    const response = NextResponse.json(
      {
        success: false,
        message,
        data,
      },
      { status: Math.max(status, 400) },
    );

    if (status === 401) {
      clearAuthCookies(response);
    }

    return response;
  }
}
