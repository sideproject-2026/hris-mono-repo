import { createContext, Suspense, useContext, type FC } from 'react'
import { workScheduleOptions } from '../hooks/useWorkSchedule'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type WorkScheduleContextType = {
  onRefresh: () => void
  isRefreshing: boolean
  workSchedules: Array<WorkSchedule>
}

const WorkScheduleContext = createContext<WorkScheduleContextType | undefined>(
  undefined,
)

const WorkScheduleProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data = [], isFetching } = useQuery(workScheduleOptions())
  const queryClient = useQueryClient()

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: workScheduleOptions().queryKey })
  }

  const contextValue: WorkScheduleContextType = {
    onRefresh: onRefresh,
    isRefreshing: isFetching,
    workSchedules: data,
  }

  return (
    <WorkScheduleContext.Provider value={contextValue}>
      {children}
    </WorkScheduleContext.Provider>
  )
}

export const useWorkScheduleContext = () => {
  const context = useContext(WorkScheduleContext)
  if (!context) {
    throw new Error(
      'useWorkScheduleContext must be used within a WorkScheduleProvider',
    )
  }
  return context
}

export default WorkScheduleProvider
