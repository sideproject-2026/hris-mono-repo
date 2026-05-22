import LeavePage from '@/features/leave/components/leave-page'
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import { searchLeaveBalanceParser } from '@/features/leave/types/search'

export const Route = createFileRoute('/_app/leave')({
  validateSearch: createStandardSchemaV1(searchLeaveBalanceParser, {
    partialOutput: true,
  }),
  component: LeavePage,
})
