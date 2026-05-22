import { createFileRoute } from '@tanstack/react-router'
import DesignationPage from '@/features/admin/designation/components/designation-page'

export const Route = createFileRoute('/_app/admin/designation')({
  component: DesignationPage,
})
