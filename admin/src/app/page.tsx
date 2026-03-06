import { redirect } from "next/navigation";

import { AdminLoginView } from "@/features/auth";
import { getServerAuthToken } from "@/lib/auth-cookie";

export default async function HomePage() {
  const token = await getServerAuthToken();

  if (token) {
    redirect("/dashboard");
  }

  return <AdminLoginView />;
}
