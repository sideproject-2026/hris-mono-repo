import { createFileRoute } from '@tanstack/react-router'

import { SidebarProvider } from '@/components/ui/sidebar'
import { ConfirmDialogProvider } from '@/components/custom/modal/ConfirmDialog'
import AppSideBar from '@/features/layouts/components/app-sidebar'
import Header from '@/features/layouts/components/header'
import { AuthProvider } from '@/features/auth/components/AuthProvider'
import ProtectedOutlet from '@/components/auth/protected-outlet'
import NotFoundErrors from '@/components/custom/misc/NotFoundErrors'
import JobStatusTrackingProvider from '@/components/custom/misc/job-status/JobStatusTracking'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  notFoundComponent: () => (
    <NotFoundErrors
      title="404 - Application not found"
      description="The application you are trying to access does not exist."
    />
  ),
})

function RouteComponent() {
  return (
    <AuthProvider>
      <ConfirmDialogProvider>
        <SidebarProvider>
          <div className="flex w-full h-full">
            <AppSideBar />
            <Header />
            <div className="mt-20 w-full h-full">
              <JobStatusTrackingProvider>
                <ProtectedOutlet />
              </JobStatusTrackingProvider>
            </div>
          </div>
        </SidebarProvider>
      </ConfirmDialogProvider>
    </AuthProvider>
  )
}
