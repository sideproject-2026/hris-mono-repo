import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EmployeeFilterSchemaTypes } from "../../types/schema";
import { ApiRoutes } from "@/types/api-routes";
import { request } from "@/lib/http";
import type { EmployeeListModel } from "../../types/model";
import { useQueryStates } from "nuqs";
import { employeeSearchInitialParser } from "../../types/search";
import { useCallback } from "react";


export const queryKey = (params: EmployeeFilterSchemaTypes)  => ['employees-list', JSON.stringify(params)] 

export const useEmployeeList = () => {
   
   const [search, setSearch] = useQueryStates(employeeSearchInitialParser)
   const queryClient = useQueryClient()
   
   var query = useQuery(queryOptionEmployeeList({params: search}));

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
   
     const handleRefresh = useCallback(() => {
       queryClient.invalidateQueries({ queryKey: queryKey(search) })
     }, [queryClient])



   return {query,
         search,
         setSearch,
         handleNextPrevPage,
         handlePageSizeChange,
         handleRefresh}

}


const queryOptionEmployeeList = ({ params }: { params: EmployeeFilterSchemaTypes }) => {
   return queryOptions({
      queryKey: queryKey(params),
      queryFn: async () => {

         let url = ApiRoutes.EMPLOYEES.LIST;
         if (params?.pageSize && params.pageNumber) {
            url += url.includes('?')
               ? `&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
               : `?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
         }

         if (params?.employeeType) {
            url += url.includes('?')
               ? `&employeeType=${params.employeeType}`
               : `?employeeType=${params.employeeType}`
         }
         if (params?.employeeClass) {
            url += url.includes('?')
               ? `&employeeClass=${params.employeeClass}`
               : `?employeeClass=${params.employeeClass}`
         }
         if (params?.company) {
            url += url.includes('?')
               ? `&company=${params.company}`
               : `?company=${params.company}`
         }
         if (params?.branch) {
            url += url.includes('?')
               ? `&branch=${params.branch}`
               : `?branch=${params.branch}`
         }
         if (params?.department) {
            url += url.includes('?')
               ? `&department=${params.department}`
               : `?department=${params.department}`
         }
         if (params?.fieldName && params.fieldValue) {
            url += url.includes('?')
               ? `&fieldName=${params.fieldName}&fieldValue=${params.fieldValue}`
               : `?fieldName=${params.fieldName}&fieldValue=${params.fieldValue}`
         }

         const response = await request.get<APIResponse<PaginatedResponse<EmployeeListModel>>>(url);
         return response.data
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
   })
}

