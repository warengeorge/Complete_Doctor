import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getAuthTokenFromRequest } from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";

const BACKEND_COURSES_PATH = process.env.BACKEND_COURSES_PATH ?? "/courses";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    const { courseId } = await params;
    const response = await apiClient.get(`${BACKEND_COURSES_PATH}/${courseId}`);

    return NextResponse.json(response.data, { status: response.status });
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    const { courseId } = await params;
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      try {
        const formData = await request.formData();
        const backendBaseUrl =
          process.env.BACKEND_API_URL ||
          "https://completedoc-backend.onrender.com/api/";
        const normalizedBase = backendBaseUrl.endsWith("/")
          ? backendBaseUrl.slice(0, -1)
          : backendBaseUrl;
        const normalizedPath = BACKEND_COURSES_PATH.startsWith("/")
          ? BACKEND_COURSES_PATH
          : `/${BACKEND_COURSES_PATH}`;
        const url = `${normalizedBase}${normalizedPath}/${courseId}`;

        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        });

        if (!response.ok) {
          const responseText = await response.text();
          console.error(
            `Backend error ${response.status}:`,
            responseText.substring(0, 200),
          );
          return NextResponse.json(
            {
              success: false,
              message: `Backend returned ${response.status}`,
              data: null,
            },
            { status: response.status },
          );
        }

        const payload = await response.json().catch((err) => {
          console.error("Failed to parse response JSON:", err);
          return null;
        });

        return NextResponse.json(payload ?? null, { status: response.status });
      } catch (formError) {
        console.error("Multipart form data error:", formError);
        throw formError;
      }
    }

    const body = await request.json().catch(() => ({}));

    const response = await apiClient.patch(
      `${BACKEND_COURSES_PATH}/${courseId}`,
      body,
    );

    return NextResponse.json(response.data, { status: response.status });
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
