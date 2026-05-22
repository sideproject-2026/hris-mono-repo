import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState } from 'react'
import {
  getListDashboardCalendarBirthday,
  getListDashboardCalendarHoliday,
} from '../../hooks/useDashboard'

type DashboardCalendarContextType = {
  calendarData: DashboardCalendarHoliday[]
  calendarBirthdayData: DashboardCalendarBirthday[]
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
}

const DashboardCalendarContext = createContext<
  DashboardCalendarContextType | undefined
>(undefined)

export const DashboardCalendarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const { data: holidays } = useQuery(
    getListDashboardCalendarHoliday({
      month: currentMonth ? currentMonth.getMonth() + 1 : 0,
      year: currentMonth ? currentMonth.getFullYear() : 0,
    }),
  )

  const { data: birthdays } = useQuery(
    getListDashboardCalendarBirthday({
      month: currentMonth ? currentMonth.getMonth() + 1 : 0,
    }),
  )

  return (
    <DashboardCalendarContext.Provider
      value={{
        calendarData: holidays || [],
        calendarBirthdayData: birthdays || [],
        date,
        setDate,
        currentMonth,
        setCurrentMonth,
      }}
    >
      {children}
    </DashboardCalendarContext.Provider>
  )
}

export const useDashboardCalendar = () => {
  const context = useContext(DashboardCalendarContext)
  if (!context) {
    throw new Error(
      'useDashboardCalendar must be used within a DashboardCalendarProvider',
    )
  }
  return context
}

export default DashboardCalendarProvider
