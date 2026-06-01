import { request } from "@/lib/http"
import { useQuery } from "@tanstack/react-query"

export const useGetHRForms = ({pageNumber,pageSize} : {pageNumber:number,pageSize:number}) => {

   const query = useQuery({
      queryKey: ['hrForms', pageNumber, pageSize],
      queryFn: async () => {
         const url = `hr-form?pageNumber=${pageNumber}&pageSize=${pageSize}`
         const response = await request.get<PaginatedResponse<HRFormTypes>>(url);
         return response;
      }
   })

   return query;
}