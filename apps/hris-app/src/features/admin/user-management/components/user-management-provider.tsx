import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useCallback, useContext } from 'react'
import { getUserManagementInfoOptions } from '../hooks/useUserManagement'
import { PAGINATION_DEFAULTS } from '@hris/shared-ui'
import { useQueryStates } from 'nuqs'
import { userManagementSearchInitialParser } from '../types/search'

type UserManagementContextType = {
  userManagementData: PaginatedResponse<UserManagement>
  isFetching: boolean
  onRefresh: () => void
  handlePrevNextPage: (pageNumber: number) => void
  handlePageSizeChange: (pageSize: number) => void
}

const UserManagementContext = createContext<
  UserManagementContextType | undefined
>(undefined)

export const UserManagementProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [search, setSearch] = useQueryStates(userManagementSearchInitialParser)
  const { data: userManagement, isFetching } = useQuery(
    getUserManagementInfoOptions(search),
  )

  const queryClient = useQueryClient()

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['user-management-info', search.pageNumber, search.pageSize],
    })
  }, [queryClient, search.pageNumber, search.pageSize])

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
    userManagementData: userManagement ?? {
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
    onRefresh: handleRefresh,
    handlePrevNextPage: handleNextPrevPage,
    handlePageSizeChange: handlePageSizeChange,
  }
  return (
    <UserManagementContext.Provider value={contextValue}>
      {children}
    </UserManagementContext.Provider>
  )
}

export const useUserManagementContext = () => {
  const context = useContext(UserManagementContext)
  if (!context) {
    throw new Error(
      'useUserManagementContext must be used within UserManagementProvider',
    )
  }
  return context
}

export default UserManagementProvider
