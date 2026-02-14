import { AppHeader } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        {/* Header - Full Width at top */}
        <AppHeader />

        {/* Sidebar and Content */}
        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset className="flex-1">
            <main className="flex-1 p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
