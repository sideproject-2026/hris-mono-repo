import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type FC,
  type ReactNode,
} from 'react'
import { leaveBalanceQueryOptions } from '../hooks/useLeave'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { SearchLeaveBalanceSchemaType } from '../types/search'
import { useQueryStates } from 'nuqs'
import { searchLeaveBalanceParser } from '../types/search'

type LeaveContextType = {
  search: SearchLeaveBalanceSchemaType
  setSearch: (value: SearchLeaveBalanceSchemaType) => void
  leaveData?: PaginatedResponse<LeaveTypes>
  leaveDataIsFetching: boolean
  onRefresh?: () => void
  handleNextPrevPage?: (pageNumber: number) => void
  handlePageSizeChange?: (pageSize: number) => void
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined)

const LeaveProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useQueryStates(searchLeaveBalanceParser)

  const {
    data: leaveData,
    isFetching: leaveDataIsFetching,
    refetch,
  } = useQuery(leaveBalanceQueryOptions(search))

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['leave-balance', search] })
  }, [queryClient, search])

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['leave-balance', search] })
  }, [queryClient, search])

  const handleNextPrevPage = useCallback(
    (pageNumber: number) => {
      setSearch((prev) => ({
        ...prev,
        pageNumber,
      }))
    },
    [setSearch],
  )

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      setSearch((prev) => ({
        ...prev,
        pageSize,
        pageNumber: 1,
      }))
    },
    [setSearch],
  )

  const contextValue = {
    leaveData,
    leaveDataIsFetching,
    search,
    setSearch,
    onRefresh: handleRefresh,
    handleNextPrevPage,
    handlePageSizeChange,
  }

  return (
    <LeaveContext.Provider value={contextValue}>
      {children}
    </LeaveContext.Provider>
  )
}

export const useLeaveContext = () => {
  const context = useContext(LeaveContext)
  if (!context) {
    throw new Error('useLeaveContext must be used within a LeaveProvider')
  }
  return context
}

export default LeaveProvider
