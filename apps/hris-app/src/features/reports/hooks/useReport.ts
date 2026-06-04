import { request } from '@/lib/http'
import { ApiRoutes } from '@/types/api-routes'
import type { PaginatedResponse } from '@hris/shared-ui'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

export const useLuaAttendanceReport = ({
  dateFrom,
  dateTo,
  company,
  department,
  reportId,
}: {
  dateFrom: string | Date,
  dateTo: string | Date,
  department?: string,
  company?: string,
  reportId: string,

}) => {
  return useQuery({
    queryKey: ['tardiness-reports', dateFrom, dateTo, department, company],
    queryFn: async () => {
      let url = ApiRoutes.ATTENDANCE_REPORTS.TARDINESS

      const fDateFrom = dateFrom instanceof Date ? format(dateFrom, 'yyyy-MM-dd') : dateFrom
      const fDateTo = dateTo instanceof Date ? format(dateTo, 'yyyy-MM-dd') : dateTo

      if (fDateFrom && fDateTo) {
        url += `?dateFrom=${fDateFrom}&dateTo=${fDateTo}`
      }

      if (department) {
        url += `&department=${department}`
      }

      if (company) {
        url += `&company=${company}`
      }

      const response =
        await request.get<ApiResponse<{ details: DailyAttendanceSummaryReport[] }>>(url)
      return response
    },
    enabled: (reportId === 'tardiness-report' || reportId === 'undertime-report') && !!dateFrom && !!dateTo,
    select: (data) => data.data.details.map((item) => {
      const row: Record<string, string> = {};
      Object.keys(item).forEach((key) => {
        row[key] = item[key] ?? '';
      });
      return row;
    })
  })
}

export const useAbsentReport = ({
  dateFrom,
  dateTo,
  company,
  department,
  reportId,
}: {
  dateFrom: string | Date,
  dateTo: string | Date,
  department?: string,
  company?: string,
  reportId: string,

}) => {
  return useQuery({
    queryKey: ['absent-reports', dateFrom, dateTo, department, company],
    queryFn: async () => {
      let url = ApiRoutes.ATTENDANCE_REPORTS.ABSENT

      const fDateFrom = dateFrom instanceof Date ? format(dateFrom, 'yyyy-MM-dd') : dateFrom
      const fDateTo = dateTo instanceof Date ? format(dateTo, 'yyyy-MM-dd') : dateTo

      if (fDateFrom && fDateTo) {
        url += `?dateFrom=${fDateFrom}&dateTo=${fDateTo}`
      }

      if (department) {
        url += `&department=${department}`
      }

      if (company) {
        url += `&company=${company}`
      }

      const response =
        await request.get<ApiResponse<AbsentReportTypes[]>>(url)
      return response
    },
    enabled: reportId === 'absent-report' && !!dateFrom && !!dateTo,
    select: (data) => data.data.map((item) => {
      const row: Record<string, string> = {};
      Object.keys(item).forEach((key) => {
        row[key] = item[key] ?? '';
      });
      return row;
    })
  })
}

export const useLUAPerEmployeeReport = ({
  reportId,
  employeeId,
  dateFrom,
  dateTo,
}: {
  reportId: string
  employeeId: number | string
  dateFrom: string | Date
  dateTo: string | Date
}) => {
  return useQuery({
    queryKey: ['lua-per-employee-report', employeeId, dateFrom, dateTo],
    queryFn: async () => {
      let url = ApiRoutes.ATTENDANCE_REPORTS.LUA_PER_EMPLOYEE

      const fDateFrom =
        dateFrom instanceof Date ? format(dateFrom, 'yyyy-MM-dd') : dateFrom
      const fDateTo =
        dateTo instanceof Date ? format(dateTo, 'yyyy-MM-dd') : dateTo

      if (fDateFrom && fDateTo) {
        url += `?dateFrom=${fDateFrom}&dateTo=${fDateTo}`
      }

      if (employeeId) {
        url += `&employeeId=${employeeId}`
      }

      const response =
        await request.get<ApiResponse<LUAPerEmployeeTypes[]>>(url)
      return response
    },
    enabled:
      reportId === 'lua-per-employee-report' &&
      !!employeeId &&
      !!dateFrom &&
      !!dateTo,
    select: (data) => {
      // Ensure we have data and it's either an array or has a details property
      const results = Array.isArray(data.data) ? data.data : data.data ? [data.data] : []

      return results.flatMap((item: any) => {
        // Handle case where API might have nested details or represent a single record
        const details = Array.isArray(item.details) ? item.details : []

        return details.map((detail) => ({
          ...detail,
          employeeName: item.employeeName,
          department: item.department,
          company: item.company,
          period: item.period,
          date:
            detail.date && detail.date.includes('T')
              ? format(new Date(detail.date), 'MMM dd, yyyy')
              : detail.date || '',
          scheduleTimeIn: detail.scheduleTimeIn || '',
          scheduleTimeOut: detail.scheduleTimeOut || '',
          timeIn: detail.timeIn || '',
          timeOut: detail.timeOut || '',
        }))
      })
    },
  })
}


export const useOvertimeReport = ({ dateFrom, dateTo, department, company, reportId }: { dateFrom: Date | string, dateTo: Date | string, department: string, company: string, reportId: string }) => {
  return useQuery({
    queryKey: ['overtime-reports', dateFrom, dateTo, department, company],
    queryFn: async () => {
      let url = ApiRoutes.ATTENDANCE_REPORTS.OVERTIME

      const fDateFrom = dateFrom instanceof Date ? format(dateFrom, 'yyyy-MM-dd') : dateFrom
      const fDateTo = dateTo instanceof Date ? format(dateTo, 'yyyy-MM-dd') : dateTo

      if (fDateFrom && fDateTo) {
        url += `?dateFrom=${fDateFrom}&dateTo=${fDateTo}`
      }

      if (department) {
        url += `&department=${department}`
      }

      if (company) {
        url += `&company=${company}`
      }

      const response =
        await request.get<ApiResponse<{ details: OvertimeReportTypes[] }>>(url)
      return response
    },
    enabled: reportId === 'overtime-report' && !!dateFrom && !!dateTo,
    select: (data) => data.data.details.map((item) => {
      const row: Record<string, string> = {};
      Object.keys(item).forEach((key) => {
        row[key] = item[key] ?? '';
      });
      return row;
    })
  })
}

export const employeeListQueryOptions = () => {
  return queryOptions({
    queryKey: ['employee-list'],
    queryFn: async () => {

    },
  })
}

export const reportInitialQueryOptions = () => {
  return queryOptions({
    queryKey: ['report-initial'],
    queryFn: async () => {
      let url = ApiRoutes.EMPLOYEES.INITIAL;
      const response = await request.get<APIResponse<ReportInitial>>(url);
      return response.data;
    },
    enabled: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}



export const employeesActiveReportQueryOptions = ({ fullName }: { fullName: string }) => {
  return queryOptions({
    queryKey: ['employees-active', fullName],
    queryFn: async () => {
      let url = `${ApiRoutes.EMPLOYEE_SETUP.LIST}?fieldName=fullname&fieldValue=${fullName}&pageSize=1000&pageNumber=1`;
      const response = await request.get<ApiResponse<PaginatedResponse<AttendeeInfo>>>(url);
      return response.data;
    },
    enabled: fullName.length > 0,
    select: (data) => data.data,
  })
}
