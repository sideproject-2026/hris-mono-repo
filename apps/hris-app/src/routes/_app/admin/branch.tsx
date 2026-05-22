import BranchPage from '@/features/admin/branch/components/branch-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/branch')({
  component: BranchPage,
})
