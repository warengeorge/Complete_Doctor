import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getAuthTokenFromRequest } from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";

const BACKEND_COURSES_PATH = process.env.BACKEND_COURSES_PATH ?? "/courses";

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ courseId: string; moduleId: string }> },
) {
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    const { courseId, moduleId } = await params;
    const response = await apiClient.get(
      `${BACKEND_COURSES_PATH}/${courseId}/modules/${moduleId}/lessons`,
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
