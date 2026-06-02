import {
  employeeInitialQueryOptions,
  getEmployeeProfilelQueryOptions,
} from '@/features/employees/hooks/useEmployee'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useState,
  type FC,
} from 'react'

type EmployeePersonalContextType = {
  employeeInitials?: EmployeeInitials
  employeePersonalInfo?: EmployeeProfileInfo | undefined | null
  isEmployeeDataFetching?: boolean
  createMode: boolean
  onRefresh?: () => void
  isCaptured?: boolean
  employeeId?: string
}

const EmployeePersonalContext = createContext<
  EmployeePersonalContextType | undefined
>(undefined)

export const EmployeePersonalProvider: FC<{
  children: React.ReactNode
  id?: string
}> = ({ children, id }) => {
  const { data } = useQuery(getEmployeeProfilelQueryOptions(id))
  const [isCaptured, setIsCaptured] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const initialData = queryClient.getQueryData(
    employeeInitialQueryOptions().queryKey,
  )

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['employee-personal', id],
    })
    setIsCaptured((prev) => !prev) // Toggle to trigger re-render if needed
  }, [queryClient, id])

  const contextValue = {
    employeeInitials: initialData,
    employeePersonalInfo: data,
    isEmployeeDataFetching: false,
    createMode: !data,
    onRefresh: handleRefresh,
    isCaptured,
    employeeId: id,
  }

  return (
    <EmployeePersonalContext.Provider value={contextValue}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </EmployeePersonalContext.Provider>
  )
}
export const useEmployeeProfileContext = () => {
  const context = useContext(EmployeePersonalContext)
  if (!context) {
    throw new Error(
      'useEmployeeProfileContext must be used within EmployeePersonalProvider',
    )
  }
  return context
}

export default EmployeePersonalProvider
