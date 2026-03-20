import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getAuthTokenFromRequest } from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";

const BACKEND_CATEGORIES_PATH =
  process.env.BACKEND_CATEGORIES_PATH ?? "/categories";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    const { categoryId } = await params;
    const body = (await request.json().catch(() => null)) as {
      name?: string;
      slug?: string;
      description?: string;
    } | null;

    const response = await apiClient.patch(
      `${BACKEND_CATEGORIES_PATH}/${categoryId}`,
      {
        name: body?.name?.trim(),
        slug: body?.slug?.trim(),
        description: body?.description?.trim(),
      },
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
      { status: Math.max(status, 500) },
    );
  }
}
