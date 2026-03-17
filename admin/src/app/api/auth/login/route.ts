import { NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { createApiClient } from "@/lib/server-api-client";
import {
  extractTokensFromResponse,
  applyTokensToCookies,
} from "@/lib/token-manager";
import type {
  BackendLoginResponse,
  BFFLoginResponse,
  LoginInput,
} from "@/features/auth/types";

const BACKEND_LOGIN_PATH = process.env.BACKEND_LOGIN_PATH ?? "/auth/login";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LoginInput | null;

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      {
        success: false,
        message: "Email and password are required.",
      },
      { status: 400 },
    );
  }

  try {
    const apiClient = createApiClient();
    const { data } = await apiClient.post<BackendLoginResponse>(
      BACKEND_LOGIN_PATH,
      {
        email: body.email,
        password: body.password,
      },
    );

    // Extract user data from nested backend response
    const user = data.data?.data?.user;
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Login failed: No user data returned by backend.",
        },
        { status: 502 },
      );
    }

    // Extract tokens from backend response
    const { accessToken, refreshToken } = extractTokensFromResponse(
      data.data?.data,
    );
    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Login failed: No access token returned by backend.",
        },
        { status: 502 },
      );
    }

    // Build response
    const response = NextResponse.json<BFFLoginResponse>(
      {
        success: true,
        message: data.message ?? "Login successful.",
        data: {
          user,
        },
      },
      { status: 200 },
    );

    // Apply tokens to cookies
    applyTokensToCookies(response, {
      accessToken,
      refreshToken: refreshToken ?? "",
    });

    return response;
  } catch (error) {
    const { status, message, data: errorData } = getApiErrorDetails(error);

    return NextResponse.json(
      {
        success: false,
        message,
        data: errorData,
      },
      { status: Math.max(status, 500) },
    );
  }
}
