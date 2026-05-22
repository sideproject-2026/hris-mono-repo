import { getEmployeeEmergencyContactQueryOptions } from '@/features/employees/hooks/useEmployee'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'

type EmployeeEmergencyContactContextType = {
  employeeEmergencyContact: EmployeeEmergencyContactTypes[]
  initialData?: EmployeeInitials
  isFetching: boolean
  employeeId?: string
  onRefresh?: () => void
}

const EmployeeEmergencyContactContext = createContext<
  EmployeeEmergencyContactContextType | undefined
>(undefined)

export const useEmployeeEmergencyContactContext = () => {
  const context = useContext(EmployeeEmergencyContactContext)
  if (!context) {
    throw new Error(
      'useEmployeeEmergencyContactContext must be used within EmployeeEmergencyContactProvider',
    )
  }
  return context
}

export const EmployeeEmergencyContactProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { employeeId, employeeInitials } = useEmployeeProfileContext()
  const { data: employeeEmergencyContact, isFetching } = useQuery(
    getEmployeeEmergencyContactQueryOptions(employeeId),
  )

  const queryClient = useQueryClient()

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['employee-emergency-contact', employeeId],
    })
  }

  const contextValue = {
    employeeEmergencyContact: employeeEmergencyContact?.data || [],
    initialData: employeeInitials,
    isFetching: isFetching,
    employeeId,
    onRefresh: handleRefresh,
  }

  return (
    <EmployeeEmergencyContactContext.Provider value={contextValue}>
      {children}
    </EmployeeEmergencyContactContext.Provider>
  )
}

export default EmployeeEmergencyContactProvider
