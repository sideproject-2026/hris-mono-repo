import { createContext, useCallback, useContext, useEffect } from 'react'

import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { useQueryStates } from 'nuqs'
import { getAttendanceSheetsOptions } from '../../hooks/useAttendanceProcess'
import {
  filterSearchSheetParser,
  type FilterSearchAttendanceType,
} from '../../types/search'

import type { FC } from 'react'

type SheetContextType = {
  onRefresh: () => void
  sheets?: Array<AttendanceSheet>
  period: AttendancePeriod
  loading?: boolean
  search: FilterSearchAttendanceType
  onSearchChange?: (search: FilterSearchAttendanceType) => void
}

const PeriodSheetContext = createContext<SheetContextType | undefined>(
  undefined,
)

export const PeriodSheetProvider: FC<{
  children: React.ReactNode
  paramId: string
}> = ({ children, paramId }) => {
  const [search, setSearch] = useQueryStates(filterSearchSheetParser)
  const { data, isFetching } = useSuspenseQuery(
    getAttendanceSheetsOptions({ id: paramId, filter: search }),
  )

  const queryClient = useQueryClient()

  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [
        'attendance-sheets',
        paramId,
        search.fieldValue,
        search.department,
        search.company,
        search.branch,
      ],
    })
  }, [queryClient, paramId, search])

  const onSearchChange = useCallback(
    (newSearch: FilterSearchAttendanceType) => {
      setSearch((prev) => ({
        ...prev,
        ...newSearch,
      }))
    },
    [setSearch],
  )

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['attendance-sheets', paramId, search],
    })
  }, [paramId, search])

  const contextValue = {
    onRefresh,
    sheets: data?.sheets || [],
    period: data || {},
    loading: isFetching,
    search,
    onSearchChange,
  }

  return (
    <PeriodSheetContext.Provider value={contextValue}>
      {children}
    </PeriodSheetContext.Provider>
  )
}

export const usePeriodSheetContext = () => {
  const context = useContext(PeriodSheetContext)
  if (!context) {
    throw new Error('useSheetContext must be used within a SheetProvider')
  }
  return context
}
