import { NextResponse } from "next/server";

import { clearAuthCookies } from "@/lib/auth-cookie";
import type { BFFRefreshResponse } from "@/features/auth/types";

/**
 * Logout endpoint - clears auth cookies on client
 * Note: Backend logout call is optional and handled by the client if needed
 */

export async function POST(): Promise<NextResponse<BFFRefreshResponse>> {
  const response = NextResponse.json<BFFRefreshResponse>(
    {
      success: true,
      message: "Logged out successfully.",
    },
    { status: 200 },
  );

  clearAuthCookies(response);

  return response;
}
