import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getAuthTokenFromRequest } from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";

const BACKEND_COURSES_PATH = process.env.BACKEND_COURSES_PATH ?? "/courses";

export async function GET(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    const { searchParams } = request.nextUrl;
    const page = searchParams.get("page") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "10";

    const params = {
      page,
      pageSize,
      ...Object.fromEntries(searchParams.entries()),
    };

    const response = await apiClient.get(BACKEND_COURSES_PATH, { params });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const { status, message, data } = getApiErrorDetails(error);

    return NextResponse.json(
      {
        success: false,
        message,
        data,
      },
      { status: Math.max(status, 500) },
    );
  }
}
