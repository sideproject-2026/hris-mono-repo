import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { getAttendanceDetailOptions } from '../../hooks/useAttendanceDetail'
import type { FC } from 'react'

interface AttendanceDetailContextType {
  onRefresh: () => void
  period?: AttendancePeriod | undefined
  sheets?: Array<AttendanceSheet>
  dtrStatuses: SelectionItem<string>[]
  loading: boolean
  employeeNumber?: number
  periodId?: string
}

const AttendanceDetailContext = createContext<
  AttendanceDetailContextType | undefined
>(undefined)

const AttendanceDetailProvider: FC<{
  children: React.ReactNode
  periodId: string
  employeeNumber: number
}> = ({ children, periodId, employeeNumber }) => {
  const { data, isFetching } = useSuspenseQuery(
    getAttendanceDetailOptions({ periodId, employeeNo: employeeNumber }),
  )
  const queryClient = useQueryClient()

  const onRefresh = useCallback(() => {
    // Refetch the query
    queryClient.invalidateQueries({
      queryKey: getAttendanceDetailOptions({
        periodId,
        employeeNo: employeeNumber,
      }).queryKey,
    })
  }, [queryClient, periodId, employeeNumber])

  const valueContext: AttendanceDetailContextType = useMemo(
    () => ({
      onRefresh,
      period: data.period,
      sheets: data?.period.sheets,
      dtrStatuses: data.dtrStatuses,
      loading: isFetching,
      employeeNumber,
      periodId,
    }),
    [onRefresh, data, isFetching, employeeNumber, periodId],
  )

  return (
    <AttendanceDetailContext.Provider value={valueContext}>
      <Suspense fallback={<div>Loading attendance details...</div>}>
        {children}
      </Suspense>
    </AttendanceDetailContext.Provider>
  )
}

export default AttendanceDetailProvider

export const useAttendanceDetailContext = () => {
  const context = useContext(AttendanceDetailContext)
  if (!context) {
    throw new Error(
      'useAttendanceDetailContext must be used within a AttendanceDetailProvider',
    )
  }
  return context
}
