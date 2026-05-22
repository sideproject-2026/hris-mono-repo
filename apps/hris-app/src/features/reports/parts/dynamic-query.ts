import { useAbsentReport, useLuaAttendanceReport, useLUAPerEmployeeReport, useOvertimeReport } from "../hooks/useReport"

const EMPTY_ARRAY: any[] = [];

export const useDynamicQuery = ({ reportId, parameter }: { reportId: string, parameter: any }) => {

   const { data: dailyAttendanceSummaryReport, isLoading: isLuaLoading } = useLuaAttendanceReport({
      dateFrom: parameter?.dateFrom,
      dateTo: parameter?.dateTo,
      department: parameter?.department,
      company: parameter?.company,
      reportId
   });

   const { data: absentReport, isLoading: isAbsentLoading } = useAbsentReport({
      dateFrom: parameter?.dateFrom,
      dateTo: parameter?.dateTo,
      department: parameter?.department,
      company: parameter?.company,
      reportId
   });

   const { data: luaPerEmployeeReport, isLoading: isLuaPerEmployeeLoading } = useLUAPerEmployeeReport({
      reportId,
      employeeId: parameter?.employeeId,
      dateFrom: parameter?.dateFrom,
      dateTo: parameter?.dateTo,
   });

   const { data: overtimeReport, isLoading: isOvertimeLoading } = useOvertimeReport({
      dateFrom: parameter?.dateFrom,
      dateTo: parameter?.dateTo,
      department: parameter?.department,
      company: parameter?.company,
      reportId
   });

   let previewRows: any[] = EMPTY_ARRAY;
   let isLoading = false;

   if (reportId === 'undertime-report') {
      previewRows = dailyAttendanceSummaryReport ?? EMPTY_ARRAY;
      isLoading = isLuaLoading;
   }

   if (reportId === 'absent-report') {
      previewRows = absentReport ?? EMPTY_ARRAY;
      isLoading = isAbsentLoading;
   }

   if (reportId === 'lua-per-employee-report') {
      previewRows = luaPerEmployeeReport ?? EMPTY_ARRAY;
      isLoading = isLuaPerEmployeeLoading;
   }

   if (reportId === 'overtime-report') {
      previewRows = overtimeReport ?? EMPTY_ARRAY;
      isLoading = isOvertimeLoading;
   }
   return { previewRows, isLoading }

}

