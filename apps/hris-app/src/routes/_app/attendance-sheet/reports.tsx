import AttendanceReport from '@/features/reports/attendance-reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/attendance-sheet/reports')({
  component: AttendanceReport,
})
