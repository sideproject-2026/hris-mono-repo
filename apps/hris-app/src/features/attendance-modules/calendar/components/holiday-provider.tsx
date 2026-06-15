import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
} from 'react'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { calendarHolidayQueryOptions } from '../hooks/useHolidayCalendar'
import type { HolidaySchema } from '../types/schema'
import { calendarHolidayParser } from '../types/search'



interface HolidayContextType {
  year: number
  setYear: (value: number) => void
  data: any
  features: any[]
  isFetching: boolean
  dialogState: {
    open: boolean
    type: 'create' | 'view'
    selectedHoliday: HolidaySchema | null
  }
  selectedDate: string | null
  openCreateDialog: () => void
  openViewDialog: (holiday: any) => void
  closeDialog: () => void
  handleChangeDate: (value: number) => void
  onRefresh?: () => void
}

const HolidayContext = createContext<HolidayContextType | undefined>(undefined)

export const HolidayProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [year, setYear] = useQueryState('year', calendarHolidayParser.year)

  const queryClient = useQueryClient()

  const { data, isFetching } = useSuspenseQuery(
    calendarHolidayQueryOptions(year),
  )

  // 3. Dialog & UI State
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [dialogState, setDialogState] = useState<{
    open: boolean
    type: 'create' | 'view'
    selectedHoliday: HolidaySchema | null
  }>({ open: false, type: 'create', selectedHoliday: null })

  // 4. Mapped Features
  const features = useMemo(
    () =>
      data?.data?.map((item: any) => ({
        id: item.id,
        name: item?.holidayName ?? '',
        startAt: item?.holidayDate ?? new Date(),
        endAt: item?.holidayDate ?? new Date(),
        status: {
          id: item?.holidayType ?? '',
          name: item?.holidayType ?? '',
          color: item?.holidayType === 'Regular' ? '#008000' : '#E8A922', // Simplified for brevity
        },
        isActive: item?.isActive ?? false,
        feature: item,
      })) ?? [],
    [data?.data],
  )

  // 5. Handlers
  const openCreateDialog = useCallback(() => {
    setDialogState({ open: true, type: 'create', selectedHoliday: null })
  }, [])

  const openViewDialog = useCallback((feature: any) => {
    setSelectedDate(feature.feature.holidayDate)
    setDialogState({ open: true, type: 'view', selectedHoliday: feature })
  }, [])

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, open: false }))
  }, [])

  const handleChangeDate = useCallback((value: number) => {
    setYear(value)
  }, [])
 
  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['holiday-calendar', year] })
  }, [queryClient, year])

  return (
    <HolidayContext.Provider
      value={{
        data,
        features,
        isFetching,
        dialogState,
        selectedDate,
        openCreateDialog,
        openViewDialog,
        closeDialog,
        handleChangeDate,
        onRefresh: handleRefresh,
        year,
        setYear,
      }}
    >
      {children}
    </HolidayContext.Provider>
  )
}

export const useHoliday = () => {
  const context = useContext(HolidayContext)
  if (!context)
    throw new Error('useHoliday must be used within HolidayProvider')
  return context
}

