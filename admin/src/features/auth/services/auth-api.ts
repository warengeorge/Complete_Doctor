import { bffClient, getApiErrorMessage } from "@/lib/api-client";
import type { BFFLoginResponse, BFFMeResponse, LoginInput } from "../types";

/**
 * Auth API Service - Client-side auth requests to BFF
 * All responses go through the BFF (Backend-For-Frontend) layer
 */

export async function loginRequest(
  input: LoginInput,
): Promise<BFFLoginResponse> {
  try {
    const { data } = await bffClient.post<BFFLoginResponse>(
      "/auth/login",
      input,
    );

    if (!data.success) {
      throw new Error(data.message || "Unable to sign in.");
    }

    if (!data.data?.user) {
      throw new Error("Login failed: No user data received.");
    }

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to sign in."));
  }
}

export async function getMeRequest(): Promise<BFFMeResponse> {
  try {
    const { data } = await bffClient.get<BFFMeResponse>("/auth/me");

    if (!data.success) {
      throw new Error(data.message || "Unable to load profile details.");
    }

    if (!data.data?.user) {
      throw new Error("Profile fetch failed: No user data received.");
    }

    return data;
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, "Unable to load profile details."),
    );
  }
}

export async function logoutRequest(): Promise<void> {
  try {
    await bffClient.post("/auth/logout", {});
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to log out."));
  }
}
