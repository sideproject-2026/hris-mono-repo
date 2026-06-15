import { createContext, useCallback, useContext } from 'react'
import { useQueryStates } from 'nuqs'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { attendanceManagementQueryParsers } from '../../types/search'
import { getAttendancePeriodOptions } from '../../hooks/useAttendanceProcess'
import type { AttendanceManagementQueryState } from '../../types/search'

import type { FC } from 'react'

type AttendancePeriodContextType = {
  onRefresh: () => void
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onDelete?: (attendancePeriodId: string) => void
  onSearch?: (fieldValue: string, status: string) => void
  onFilterChange?: (filters: {
    status?: string
    periodFrom?: string
    periodTo?: string
  }) => void
  isFetching?: boolean
  attendancePeriods?: PaginatedResponse<AttendancePeriod>
  fieldValue?: string
  status?: string
  params?: AttendanceManagementQueryState
}

const AttendancePeriodContext = createContext<
  AttendancePeriodContextType | undefined
>(undefined)

const AttendancePeriodProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useQueryStates(attendanceManagementQueryParsers)
  const queryClient = useQueryClient()

  const { data: attendancePeriods, isFetching } = useSuspenseQuery(
    getAttendancePeriodOptions({
      pageSize: params.pageSize,
      pageNumber: params.pageNumber,
      fieldValue: params.fieldValue,
      status: params.status,
      periodFrom: params.periodFrom,
      periodTo: params.periodTo,
    }),
  )

  const handleSearch = useCallback(
    (fieldValue: string, status: string) => {
      setParams((prev) => ({ params, fieldValue, status }))
      queryClient.invalidateQueries({
        queryKey: ['attendance-periods', params],
      })
    },
    [setParams, queryClient, params],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setParams({ pageNumber: page })
    },
    [setParams],
  )

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      setParams({ pageSize: pageSize })
    },
    [setParams],
  )

  const handleFilterChange = useCallback(
    ({
      status,
      periodFrom,
      periodTo,
    }: {
      status?: string
      periodFrom?: string
      periodTo?: string
    }) => {
      setParams({
        pageNumber: 1,
        status: status || '',
        periodFrom: periodFrom || '',
        periodTo: periodTo || '',
      })
    },
    [setParams],
  )

  const handleRefresh = useCallback(() => {
    // Implement refresh logic if needed
    queryClient.invalidateQueries({ queryKey: ['attendance-periods', params] })
  }, [queryClient, params])

  const contentValue = {
    onRefresh: handleRefresh,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    onSearch: handleSearch,
    onFilterChange: handleFilterChange,
    params,
    isFetching,
    attendancePeriods,
  }

  return (
    <AttendancePeriodContext.Provider value={contentValue}>
      {children}
    </AttendancePeriodContext.Provider>
  )
}

export const useAttendancePeriodContext = () => {
  const context = useContext(AttendancePeriodContext)
  if (!context) {
    throw new Error(
      'useAttendancePeriodContext must be used within AttendancePeriodProvide',
    )
  }
  return context
}

export default AttendancePeriodProvider
