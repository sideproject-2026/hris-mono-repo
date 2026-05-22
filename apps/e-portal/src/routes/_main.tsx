import { createFileRoute } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/layouts/components/app-sidebar";
import Header from "@/features/layouts/header";

import {AuthProvider} from "@cwmsi/auth-package";
import ProtectedOutlet from "@/components/shared/protected-outlet";
import UserProvider from "@/features/auth/provider/user-provider";

export const Route = createFileRoute("/_main")({
  component: Layout,
});

function Layout() {
  
  return (
    <AuthProvider storageKey="auth-storage-key">
      <UserProvider>
        <div className="w-full h-screen">
            <SidebarProvider>
              <Header />
              <AppSidebar />
              <SidebarInset className="flex flex-col overflow-y-auto">
                <main className="flex-1 overflow-y-auto p-2 md:p-2 bg-slate-50/50 dark:bg-slate-900/50 mt-17">
                  <ProtectedOutlet />
                </main>
              </SidebarInset>
            </SidebarProvider>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}
