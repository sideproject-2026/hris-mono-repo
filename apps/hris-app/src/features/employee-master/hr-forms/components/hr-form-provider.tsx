import { createContext, useCallback, useContext } from 'react'
import { PAGINATION_DEFAULTS } from '@/components/custom/grid/types/constants'
import { useQueryStates } from 'nuqs'
import { hrFormSearchInitialParser } from '../types/search'
import { useGetHRForms, queryOptionInitial } from '../hooks/getHRForms'
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { employeeInitialQueryOptions } from '@/features/employee-master/employees/hooks/useEmployee'


type HRFormContextType = {
  hrInitialData: HRInitialTypes
  appointmentInitial: EmployeeInitials
  hrFormsData: PaginatedResponse<HRFormTypes>
  isFetching: boolean
  search: Record<string, any>
  setSearch: (search: Record<string, any>) => void
  onRefresh: () => void
  handlePrevNextPage: (pageNumber: number) => void
  handlePageSizeChange: (pageSize: number) => void
}

const HRFormContext = createContext<HRFormContextType | undefined>(undefined)

export const HRFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [search, setSearch] = useQueryStates(hrFormSearchInitialParser);

  const { data, isFetching } = useGetHRForms({
    pageNumber: search.pageNumber,
    pageSize: search.pageSize
  });

  const queryClient = useQueryClient();

  const { data: initialData } = useQuery(queryOptionInitial());
  const { data: appointmentInitial } = useSuspenseQuery(employeeInitialQueryOptions())

  const handleNextPrevPage = useCallback((_pageNumber: number) => {
    setSearch((prev) => ({
      ...prev,
      pageNumber: _pageNumber,
    }))
  }, [])

  const handlePageSizeChange = useCallback((_pageSize: number) => {
    setSearch((prev) => ({
      ...prev,
      _pageSize,
      pageNumber: 1,
    }))
  }, [])

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['hrForms', search.pageNumber, search.pageSize] })
  }, [search.pageNumber, search.pageSize, queryClient])

  const contextValue: HRFormContextType = {
    search,
    setSearch,
    hrInitialData: initialData as HRInitialTypes,
    appointmentInitial: appointmentInitial as EmployeeInitials,
    hrFormsData: {
      data: data?.data ?? [],
      totalCount: data?.totalCount ?? 0,
      pageSize: data?.pageSize ?? PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE,
      currentPage: data?.currentPage ?? PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER,
      totalPages: data?.totalPages ?? 0,
      firstPage: data?.firstPage ?? 1,
      nextPage: data?.nextPage ?? 1,
      previousPage: data?.previousPage ?? 1,
      lastPage: data?.lastPage ?? 1,
      links: [],
    },
    isFetching,
    handlePrevNextPage: handleNextPrevPage,
    handlePageSizeChange: handlePageSizeChange,
    onRefresh: handleRefresh,
  }

  return (
    <HRFormContext.Provider value={contextValue}>
      {children}
    </HRFormContext.Provider>
  )
}

export const useHRFormContext = () => {
  const context = useContext(HRFormContext)
  if (!context) {
    throw new Error('useHRFormContext must be used within HRFormProvider')
  }
  return context
}

export default HRFormProvider
