import { createFileRoute } from '@tanstack/react-router'
import DepartmentPage from '@/features/admin/department/components/department-page'

export const Route = createFileRoute('/_app/admin/department')({
  component: DepartmentPage,
})
