import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useQueryStates } from 'nuqs'
import { requestFormsQueryOptions } from '../hooks/useFormRequest'
import { filterSearchRequestParser } from '../types/search'

import type { FC } from 'react'
import type { SearchRequestFormSchemaType } from '../types/schema'
import type { FormRequestTypes } from '../types/global'

// 1. Ensure FormRequestTypes is imported or defined
type RequestFormContextType = {
  search: SearchRequestFormSchemaType
  setSearch: (value: SearchRequestFormSchemaType) => void
  requestData?: PaginatedResponse<FormRequestTypes> // Assumes this type is imported
  requestDataIsFetching: boolean
  onRefresh: () => void
  handleNextPrevPage?: (pageNumber: number) => void
  handlePageSizeChange?: (pageSize: number) => void
}

const RequestFormContext = createContext<RequestFormContextType | undefined>(
  undefined,
)

const RequestFormProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [search, setSearch] = useQueryStates(filterSearchRequestParser)

  const { data: requestData, isFetching: requestDataIsFetching } = useQuery(
    requestFormsQueryOptions({ params: search, submitted: search.submitted }),
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['request-forms', search] })
  }, [queryClient, search])

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['request-forms', search] })
  }, [queryClient, search])

  const handleSearch = (searchRequest: SearchRequestFormSchemaType) => {
    setSearch((prev) => ({
      ...prev,
      ...searchRequest,
      submitted: true,
      pageNumber: 1,
      pageSize: search.pageSize,
    }))

    setSubmitted(true)
  }

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
        pageNumber: 1, // Reset to first page when page size changes
      }))
    },
    [setSearch],
  )

  const contextValue = {
    requestData,
    requestDataIsFetching,
    onRefresh: handleRefresh,
    handleNextPrevPage,
    handlePageSizeChange,
    search,
    setSearch: handleSearch,
  }

  return (
    <RequestFormContext.Provider value={contextValue}>
      {children}
    </RequestFormContext.Provider>
  )
}

export const useRequestFormContext = () => {
  const context = useContext(RequestFormContext)
  if (!context) {
    throw new Error(
      'useRequestFormContext must be used within RequestFormProvider',
    )
  }
  return context
}

export default RequestFormProvider
