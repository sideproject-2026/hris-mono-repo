import { createContext, useCallback, useContext } from 'react'
import { employeesListQueryOptions } from '../../../hooks/useEmployee'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useQueryStates } from 'nuqs'
import {
  employeeSearchInitialParser,
  type EmployeeSearchTypes,
} from '../../../types/search'
import { PAGINATION_DEFAULTS } from '@/components/custom/grid/types/constants'
import type { EmployeeListModel } from '../../../types/model'
import { useEmployeeList } from '../../../hooks/queries/useEmployeeList'

type EmployeeContextType = {
  employeesData: PaginatedResponse<EmployeeListModel>
  isFetching: boolean
  search: Record<string, any>
  setSearch: (search: Record<string, any>) => void
  onRefresh: () => void
  handlePrevNextPage: (pageNumber: number) => void
  handlePageSizeChange: (pageSize: number) => void
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined,
)

export const EmployeeListProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  
  const {
    query: {data: employees,isFetching},
    handleNextPrevPage,
    handlePageSizeChange,
    handleRefresh,search,setSearch} = useEmployeeList();
  
  
  

  const contextValue = {
    search,
    setSearch,
    employeesData: employees ?? {
      data: [],
      totalCount: 0,
      pageSize: PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE,
      currentPage: PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER,
      totalPages: 0,
      firstPage: 1,
      nextPage: 1,
      previousPage: 1,
      lastPage: 1,
      links: [],
    },
    isFetching,
    handlePrevNextPage: handleNextPrevPage,
    handlePageSizeChange: handlePageSizeChange,
    onRefresh: handleRefresh,
  }

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployeeContext must be used within EmployeeProvider')
  }
  return context
}

export default EmployeeListProvider
