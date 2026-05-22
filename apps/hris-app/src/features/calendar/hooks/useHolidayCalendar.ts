import { request } from "@/lib/http";
import { queryOptions, useMutation } from "@tanstack/react-query"
import type { HolidaySchema } from "../types/schema";
import { format } from "date-fns";

export const calendarHolidayQueryOptions = (year: number) => {
	return queryOptions({
		queryKey: ['holiday-calendar', year],
		queryFn: async () => {
			let url = `/calendars/${year}`;
			const response = await request.get<ApiResponse<CalendarHoliday[]>>(url);
			return response;
		},
		enabled: year !== undefined
	})
}

export const calendarHolidayDeleteMutation = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const url = `/calendars/${id}`;
			const response = await request.del(url);
			return response;
		}
	})
}

export const calendarHolidayCreateMutation = () => {
	return useMutation({
		mutationFn: async (data: HolidaySchema) => {
			const payload = {
				...data,
				holidayDate: data.holidayDate ? format(new Date(data.holidayDate), 'yyyy-MM-dd') : undefined,
			}

			const response = await request.post('/calendars', payload);
			return response;
		}
	})
}




export const calendarHolidayInitials = () => {
	return queryOptions({
		queryKey: ['holiday-calendar-initials'],
		queryFn: async () => {
			const url = '/calendars/initial';
			const response = await request.get<ApiResponse<CalendarInitial>>(url);
			return response;
		},
	})
}