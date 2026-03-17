import { AdminLoginView } from "@/features/auth";
import { getServerAuthToken, getServerRefreshToken } from "@/lib/auth-cookie";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const token = await getServerAuthToken();
  const refreshToken = await getServerRefreshToken();
  const hasServerToken = Boolean(token || refreshToken);

  // If already authenticated, redirect to dashboard immediately
  if (hasServerToken) {
    redirect("/dashboard");
  }

  return <AdminLoginView />;
}
