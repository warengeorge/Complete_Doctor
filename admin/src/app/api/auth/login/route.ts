import { NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getTokenCookieMaxAge, setAuthTokenCookie } from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";
import type { BackendLoginResponse, LoginInput } from "@/features/auth/types";

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

    const token = data.data?.data?.token;
    const user = data.data?.data?.user ?? null;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Login succeeded but no token was returned by the backend.",
        },
        { status: 502 },
      );
    }

    const response = NextResponse.json({
      success: data.success ?? true,
      message: data.message ?? "Login successful.",
      data: {
        user,
      },
    });

    setAuthTokenCookie(response, token, getTokenCookieMaxAge(token));

    return response;
  } catch (error) {
    const { status, message, data } = getApiErrorDetails(error);

    return NextResponse.json(
      {
        success: false,
        message,
        data,
      },
      { status },
    );
  }
}
