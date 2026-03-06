import { NextResponse } from "next/server";

import { clearAuthTokenCookie } from "@/lib/auth-cookie";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  clearAuthTokenCookie(response);

  return response;
}
