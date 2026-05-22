import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, type FC } from 'react'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { getEmployeeAddressQueryOptions } from '@/features/employees/hooks/useOtherInfo'

type EmployeeAddressesContextType = {
  employeeAddresses?: EmployeeAddressesTypes[]
  initialData?: EmployeeInitials
  isFetching: boolean
  employeeId?: string
  onRefresh?: () => void
}

const EmployeeAddressesContext = createContext<
  EmployeeAddressesContextType | undefined
>(undefined)

const EmployeeAddressesProvider: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { employeeInitials, employeeId, employeePersonalInfo, createMode } =
    useEmployeeProfileContext()

  const { data: employeeAddressInfo, isFetching } = useQuery(
    getEmployeeAddressQueryOptions(employeeId),
  )
  const queryClient = useQueryClient()
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['employee-address', employeeId],
    })
  }

  const contextValue = {
    employeeAddresses: employeeAddressInfo?.data,
    initialData: employeeInitials,
    isFetching: isFetching,
    employeeId,
    onRefresh: handleRefresh,
  }
  return (
    <EmployeeAddressesContext.Provider value={contextValue}>
      {children}
    </EmployeeAddressesContext.Provider>
  )
}

export const useEmployeeAddressesContext = () => {
  const context = useContext(EmployeeAddressesContext)
  if (!context) {
    throw new Error(
      'useEmployeeAddressesContext must be used within EmployeeAddressesProvider',
    )
  }
  return context
}

export default EmployeeAddressesProvider
