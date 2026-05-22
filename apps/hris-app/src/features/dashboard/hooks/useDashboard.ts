import { request } from "@/lib/http"
import { queryOptions } from "@tanstack/react-query"

export const getListDashboardCalendarHoliday = ({ month, year }: { month: number, year: number }) => {
    return queryOptions({
        queryKey: ['dashboard-calendar-holiday', month, year],
        queryFn: () => {
            let url = `dashboards/calendars/${year}/${month}`
            const response = request.get<ApiResponse<DashboardCalendarHoliday[]>>(url)
            return response
        },
        enabled: !!month && !!year,
        select: (data) => data.data
    })
}

export const getListDashboardCalendarBirthday = ({ month }: { month: number }) => {
    return queryOptions({
        queryKey: ['dashboard-calendar-birthday', month],
        queryFn: () => {
            let url = `dashboards/employee-birthdays/${month}`
            const response = request.get<ApiResponse<DashboardCalendarBirthday[]>>(url)
            return response
        },
        enabled: !!month,
        select: (data) => data.data.sort((a, b) => new Date(a.birthDate).getDate() - new Date(b.birthDate).getDate())
    })
}

export const getListDashboardSummary = () => {
    return queryOptions({
        queryKey: ['dashboard-summary'],
        queryFn: () => {
            let url = `dashboards/employee-type-count`
            const response = request.get<DashboardSummary>(url)
            return response
        },
    })
}

export const getListDashboardProbitionary = ({ month, year }: { month: number, year: number }) => {
    return queryOptions({
        queryKey: ['dashboard-probitionary', month, year],
        queryFn: () => {
            let url = `dashboards/probationary-employees?month=${month}&year=${year}`
            const response = request.get<DashboardProbitionaryTypes[]>(url)
            return response
        },
        enabled: !!month && !!year,
    })
}

export const getListDashboardResignation = ({ month, year }: { month: number, year: number }) => {
    return queryOptions({
        queryKey: ['dashboard-resignation', month, year],
        queryFn: () => {
            let url = `dashboards/resignation-employees?month=${month}&year=${year}`
            const response = request.get<DashboardResignationTypes[]>(url)
            return response
        },
        enabled: !!month && !!year,
    })
}