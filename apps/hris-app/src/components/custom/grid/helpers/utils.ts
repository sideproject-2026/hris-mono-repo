import { PAGINATION_DEFAULTS } from '@/components/custom/grid/types/constants'

type PaginatedPartial<TData> = Partial<PaginatedResponse<TData>> | undefined

export function createPaginatedResponse<TData>(
	payload?: PaginatedPartial<TData>,
): PaginatedResponse<TData> {
	return {
		data: payload?.data ?? [],
		totalCount: payload?.totalCount ?? 0,
		pageSize: payload?.pageSize ?? PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE,
		currentPage: payload?.currentPage ?? PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER,
		totalPages: payload?.totalPages ?? 0,
		firstPage: payload?.firstPage ?? 0,
		nextPage: payload?.nextPage ?? 0,
		previousPage: payload?.previousPage ?? 0,
		lastPage: payload?.lastPage ?? 0,
		links: payload?.links ?? [],
	}
}
