import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import NotFoundErrors from '@/components/custom/misc/NotFoundErrors'
import InternalError from '@/components/custom/misc/InternalError'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { name: 'description', content: 'Attendance Management Application' },
        { title: 'Attendance Management Application' },
      ],
    }),
    component: RootComponent,
    notFoundComponent: () => {
      return (
        <NotFoundErrors
          title="404 - Page Not Found"
          description="The page you are looking for does not exist."
        />
      )
    },
    errorComponent: () => {
      return (
        <InternalError
          title="An error occurred"
          description="Sorry, something went wrong while loading the page."
        />
      )
    },
  },
)

function RootComponent() {
  return (
    <>
      <NuqsAdapter>
        <Outlet />
        <Toaster />
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </NuqsAdapter>
    </>
  )
}
