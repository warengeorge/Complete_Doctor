import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getAuthTokenFromRequest } from "@/lib/auth-cookie";

const BACKEND_COURSES_CREATE_PATH =
  process.env.BACKEND_COURSES_CREATE_PATH ?? "/courses/create";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  const token = getAuthTokenFromRequest(request);

  try {
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content type. Multipart form data required.",
          data: null,
        },
        { status: 400 },
      );
    }

    const formData = await request.formData();

    const backendBaseUrl =
      process.env.BACKEND_API_URL ||
      "https://completedoc-backend.onrender.com/api/";
    const normalizedBase = backendBaseUrl.endsWith("/")
      ? backendBaseUrl.slice(0, -1)
      : backendBaseUrl;
    const normalizedPath = BACKEND_COURSES_CREATE_PATH.startsWith("/")
      ? BACKEND_COURSES_CREATE_PATH
      : `/${BACKEND_COURSES_CREATE_PATH}`;
    const url = `${normalizedBase}${normalizedPath}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const payload = await response.json().catch(() => null);
    return NextResponse.json(payload ?? null, { status: response.status });
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
