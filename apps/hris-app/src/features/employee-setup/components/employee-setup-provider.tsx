import { useQueryStates } from 'nuqs'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FC,
} from 'react'
import {
  filterSearchEmployeeParser,
  type FilterSearchEmployeeType,
} from '../types/search'
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { employeeQueryOptions } from '../hooks/useEmployeeSetup'

type EmployeeContextType = {
  onRefresh: () => void
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSearch: (filterValue: FilterSearchEmployeeType) => void
  isFetching?: boolean
  data?: PaginatedResponse<EmployeeSetupTypes>
  fieldValue?: string
  status?: string
  params?: Partial<FilterSearchEmployeeType>
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined,
)

const EmployeeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submitted, setSubmitted] = useState(false)
  const [params, setParams] = useQueryStates(filterSearchEmployeeParser)

  const { data: response, isFetching } = useQuery(
    employeeQueryOptions({ params: params, submitted: params.submitted }),
  )

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['setup', params] })
  }, [params, queryClient])

  const handlePageChange = useCallback(
    (page: number) => setParams({ pageNumber: page }),
    [setParams],
  )
  const handlePageSizeChange = useCallback(
    (pageSize: number) => setParams({ pageSize: pageSize }),
    [setParams],
  )
  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['setup', params] })
  }, [params, queryClient])

  const handleSearch = useCallback(
    (filterValue: FilterSearchEmployeeType) => {
      setParams({
        ...params,
        ...filterValue,
        pageNumber: 1,
        pageSize: params.pageSize,
        submitted: true,
      })
      setSubmitted(true)
    },
    [setParams, params],
  )

  const valueContext: EmployeeContextType = {
    onRefresh: handleRefresh,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    onSearch: handleSearch,
    isFetching: isFetching,
    data: response,
    params: params,
  }

  return (
    <EmployeeContext.Provider value={valueContext}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error(
      'useEmployeeContext must be used within an EmployeeProvider',
    )
  }
  return context
}

export default EmployeeProvider
