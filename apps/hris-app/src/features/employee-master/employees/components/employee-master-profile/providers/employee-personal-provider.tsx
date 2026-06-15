import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
} from 'react'
import type { EmployeeModel } from '../../../types/model'
import {
  employeeInitialQueryOptions,
  getEmployeeProfilelQueryOptions,
} from '../../../hooks/useEmployee'

type EmployeePersonalContextType = {
  employeeInitials?: EmployeeInitials
  employeePersonalInfo?: EmployeeModel | undefined | null
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


  
  const { data } = useSuspenseQuery(getEmployeeProfilelQueryOptions(id))
  const { data: initialData } = useSuspenseQuery(employeeInitialQueryOptions())
  const [isCaptured, setIsCaptured] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['employee-personal', id] })
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
      {children}
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
