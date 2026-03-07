import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthGuard } from "@/features/auth";
import { getServerAuthToken } from "@/lib/auth-cookie";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getServerAuthToken();

  if (!token) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AuthGuard hasServerToken={true} mode="protected" />
      <div className="flex min-h-screen w-full flex-col">
        {/* Header - Full Width at top */}
        <AppHeader />

        {/* Sidebar and Content */}
        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset className="min-w-0 flex-1">
            <div className="mx-auto flex w-full flex-1 justify-center bg-[#FAFAFA] px-4 py-4 sm:px-6 sm:py-6">
              <div className="w-full">{children}</div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
