import { parseAsInteger } from "nuqs"
import z from "zod"
import { DEFAULT_YEAR } from "./constant"

export const calendarHolidayYearSchema = z.object({
  year: z.number().default(DEFAULT_YEAR),
})

export type CalendarHolidayYearSchema = z.infer<typeof calendarHolidayYearSchema>

// 2. Define the nuqs parser for TanStack Router integration
export const calendarHolidayParser = {
  year: parseAsInteger.withDefault(DEFAULT_YEAR)
}