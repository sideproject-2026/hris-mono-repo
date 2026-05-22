import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { getEmployeeWorkExperienceQueryOptions } from '@/features/employees/hooks/useOtherInfo'

type EmployeeWorkExperienceContextType = {
  employeeWorkExperience: EmployeeWorkExperienceTypes[]
  initialData?: EmployeeInitials
  isFetching: boolean
  employeeId?: string
  onRefresh?: () => void
}

const EmployeeWorkExperienceContext =
  createContext<EmployeeWorkExperienceContextType | null>(null)

export const EmployeeWorkExperienceProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { employeeId, employeeInitials } = useEmployeeProfileContext()
  const { data: employeeWorkExperience } = useQuery(
    getEmployeeWorkExperienceQueryOptions(employeeId),
  )
  const queryClient = useQueryClient()
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['employee-work-experience', employeeId],
    })
  }

  const contextValue = {
    employeeWorkExperience: employeeWorkExperience?.data || [],
    initialData: employeeInitials,
    isFetching: false,
    employeeId,
    onRefresh: handleRefresh,
  }
  return (
    <EmployeeWorkExperienceContext.Provider value={contextValue}>
      {children}
    </EmployeeWorkExperienceContext.Provider>
  )
}

export const useEmployeeWorkExperience = () => {
  const context = useContext(EmployeeWorkExperienceContext)
  if (!context) {
    throw new Error(
      'useEmployeeWorkExperience must be used within an EmployeeWorkExperienceProvider',
    )
  }
  return context
}

export default EmployeeWorkExperienceProvider
