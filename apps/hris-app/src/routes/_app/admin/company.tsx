import CompanyPage from '@/features/admin/company/components/company-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/company')({
  component: CompanyPage,
})
