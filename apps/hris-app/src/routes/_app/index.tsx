import DashboardPage from '@/features/dashboard/components/dashboard-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: DashboardPage,
})
