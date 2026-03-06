import axios from "axios";

import { getServerAuthToken } from "@/lib/auth-cookie";

const DEFAULT_TIMEOUT_MS = 30_000;

function getBackendApiUrl() {
  return (
    process.env.BACKEND_API_URL ||
    "https://completedoc-backend.onrender.com/api/"
  );
}

export function createApiClient(token?: string) {
  const client = axios.create({
    baseURL: getBackendApiUrl(),
    timeout: DEFAULT_TIMEOUT_MS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return client;
}

export async function createServerApiClient() {
  const token = await getServerAuthToken();
  return createApiClient(token ?? undefined);
}
