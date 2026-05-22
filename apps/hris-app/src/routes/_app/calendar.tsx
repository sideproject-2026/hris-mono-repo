import CalendarComponent from '@/features/calendar/components/calendar-component'
import { calendarHolidayQueryOptions } from '@/features/calendar/hooks/useHolidayCalendar'
import { DEFAULT_YEAR } from '@/features/calendar/types/constant'
import { calendarHolidayParser } from '@/features/calendar/types/search'
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'

export const Route = createFileRoute('/_app/calendar')({
  validateSearch: createStandardSchemaV1(calendarHolidayParser),
  loader: ({ context: { queryClient }, search }) => {
    const selectedYear = search?.year ?? DEFAULT_YEAR
    return queryClient.ensureQueryData(calendarHolidayQueryOptions(selectedYear))
  },
  component: CalendarComponent,
})