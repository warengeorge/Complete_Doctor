import { bffClient, getApiErrorMessage } from "@/lib/api-client";

import type { AuthRouteResponse, AuthSessionData, LoginInput } from "../types";

export async function loginRequest(input: LoginInput) {
  try {
    const { data } = await bffClient.post<AuthRouteResponse<AuthSessionData>>(
      "/auth/login",
      input,
    );

    if (!data.success || !data.data?.user) {
      throw new Error(data.message || "Unable to sign in.");
    }

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to sign in."));
  }
}

export async function logoutRequest() {
  try {
    const { data } = await bffClient.post<AuthRouteResponse<null>>(
      "/auth/logout",
    );

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to log out."));
  }
}
