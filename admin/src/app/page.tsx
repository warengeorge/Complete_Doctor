import { AdminLoginView, AuthGuard } from "@/features/auth";
import { getServerAuthToken } from "@/lib/auth-cookie";

export default async function HomePage() {
  const token = await getServerAuthToken();
  return (
    <>
      <AuthGuard hasServerToken={Boolean(token)} mode="public" />
      <AdminLoginView />
    </>
  );
}
