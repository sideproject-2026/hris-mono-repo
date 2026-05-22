import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { getEmployeeEducationQueryOptions } from '@/features/employees/hooks/useOtherInfo'

type EmployeeEducationContextType = {
  employeeEducation: EmployeeEducationTypes[]
  initialData?: EmployeeInitials
  isFetching: boolean
  employeeId?: string
  onRefresh?: () => void
}

const EmployeeEducationContext =
  createContext<EmployeeEducationContextType | null>(null)

const EmployeeEducationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { employeeId, employeeInitials } = useEmployeeProfileContext()
  const { data: employeeEducation, isFetching } = useQuery(
    getEmployeeEducationQueryOptions(employeeId),
  )

  const queryClient = useQueryClient()
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['employee-education', employeeId],
    })
  }

  const contextValue = {
    employeeEducation: employeeEducation?.data || [],
    isFetching,
    employeeId,
    initialData: employeeInitials,
    onRefresh: handleRefresh,
  }

  return (
    <EmployeeEducationContext.Provider value={contextValue}>
      {children}
    </EmployeeEducationContext.Provider>
  )
}

export const useEmployeeEducationContext = () => {
  const context = useContext(EmployeeEducationContext)
  if (!context) {
    throw new Error(
      'useEmployeeEducationContext must be used within EmployeeEducationProvider',
    )
  }
  return context
}

export default EmployeeEducationProvider
