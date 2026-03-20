import { NextRequest, NextResponse } from "next/server";

import { getApiErrorDetails } from "@/lib/api-client";
import { getAuthTokenFromRequest } from "@/lib/auth-cookie";
import { createApiClient } from "@/lib/server-api-client";

const BACKEND_CATEGORIES_PATH =
  process.env.BACKEND_CATEGORIES_PATH ?? "/categories";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Let Axios set multipart headers (with boundary) automatically.
      const response = await apiClient.post(BACKEND_CATEGORIES_PATH, formData);
      return NextResponse.json(response.data, { status: response.status });
    }

    const body = (await request.json().catch(() => null)) as {
      name?: string;
      slug?: string;
      description?: string;
    } | null;

    const response = await apiClient.post(BACKEND_CATEGORIES_PATH, {
      name: body?.name?.trim() ?? "",
      slug: body?.slug?.trim() ?? "",
      description: body?.description?.trim() || undefined,
    });

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

export async function GET(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  const apiClient = createApiClient(token ?? undefined);

  try {
    const { searchParams } = request.nextUrl;
    const page = searchParams.get("page") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "10";

    const response = await apiClient.get(BACKEND_CATEGORIES_PATH, {
      params: {
        page,
        pageSize,
      },
    });

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
