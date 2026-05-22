import { ApiRoutes } from "@/types/api-routes";
import { queryOptions } from "@tanstack/react-query";


const urlBase = 'https://localhost:7109/v1/api';


export function useGetCalendarHolidayOptions() {
  
  return queryOptions({
    queryKey: ["getCalendarHolidayOptions"],
    queryFn: async () => {
      const response = await fetch(`${urlBase}/${ApiRoutes.GETCALENDARHOLIDAY('2025')}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      console.log(data);
      return data;
    },
  });
}