import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useTransition } from "react";
import { toast } from "sonner";
import type { AdjustmentFormValues, AttendancePeriodFormValues, OvertimePendingFormValues } from "../types/schema";
import { request } from "@/lib/http";
import { useConfirmationContext, useJobStatusTrackingContext } from "@hris/shared-ui";
import type { FilterSearchAttendanceType } from "../types/search";

export const useAttendanceExport = () => {
   const [isPending, startTransition] = useTransition();

   const handleAttendanceSheetExport = async (periodId: string) => {
      startTransition(async () => {
         try {
            const url = `/attendances/export/sheets/${periodId}`;
            await request.exportExcel(url, `Attendance_Sheets_${periodId}.xlsx`);
            toast.success("Attendance sheets exported successfully.");
         } catch (error) {
            console.error("Error exporting attendance sheets:", error);
            toast.error("Failed to export attendance sheets. Please try again.");
         }

      });
   }

   return { handleAttendanceSheetExport, isPending };
}

export const getAttendanceSheetsOptions = ({ id, filter }: { id: string, filter?: FilterSearchAttendanceType }) => {
   return queryOptions({
      queryKey: ['attendance-sheets', id, filter?.fieldValue, filter?.department, filter?.company, filter?.branch],
      queryFn: async () => {
         let url = `/attendances/periods/${id}/sheets`;
         if (filter) {
            const params = new URLSearchParams();
            if (filter.fieldValue) {
               params.append('fieldName', "fullname");
               params.append('fieldValue', filter.fieldValue);
            }
            if (filter.department) {
               params.append('department', filter.department);
            }
            if (filter.company) {
               params.append('company', filter.company);
            }
            if (filter.branch) {
               params.append('branch', filter.branch);
            }
            //add query params to url
            url += `?${params.toString()}`;
         }

         const response = await request.get<ApiResponse<AttendancePeriod>>(url);
         return response;
      },
      select: (data) => {
         return {
            ...data.data,
            posted: data.data.status.toLowerCase() === 'posted',
         }
      },
   })
}

export const useDeleteSheetMutation = () => {
   return useMutation({
      mutationFn: async ({ periodId, sheetIds }: { periodId: string; sheetIds: Array<string> }) => {
         const response = await request.fullDelete(`/attendances/periods/${periodId}/sheets`, { sheetIds });
         return response;
      }
   })
}

export const useRecreateSheetMutation = () => {
   return useMutation({
      mutationFn: async ({ periodId }: { periodId: string }) => {
         const response = await request.post('/attendances/periods/recreate-sheet', { periodId });
         return response;
      },
   })
}

export const useDtrProcessMutation = () => {
   return useMutation({
      mutationFn: async ({ periodId, ids }: { periodId: string; ids: Array<number> }) => {
         const response = await request.post<JobStatus>('/queues/attendances/dtr-process', { periodId, ids, preProcess: false });
         return response;
      }
   })
}


export const useDeleteAttendancePeriodMutation = () => {
   return useMutation({
      mutationFn: async (attendancePeriodId: string) => {
         const response = await request.del(`/attendances/periods/${attendancePeriodId}`);
         return response;
      }
   })
}

export const useCreateAttendancePeriodMutation = () => {
   return useMutation({
      mutationFn: async (newPeriod: AttendancePeriodFormValues) => {
         const omitIds = ({ employeeIds, periodStart, periodEnd, ...rest }: AttendancePeriodFormValues) => rest;
         const ids = newPeriod.employeeIds?.map(item => item.employeeId) ?? [];
         const periodStart = formatDate(newPeriod.periodStart, 'yyyy-MM-dd');
         const periodEnd = formatDate(newPeriod.periodEnd, 'yyyy-MM-dd');

         const transformData = {
            ...omitIds(newPeriod),
            ids: ids,
            periodStart,
            periodEnd,
         }

         const response = await request.post<JobStatus>('queues/periods/create', transformData);
         return response;
      },
   })
}

export const usePeriodPropertyUpdateMutation = () => {
   return useMutation({
      mutationFn: async ({ periodId, property, value }: { periodId: string; property: string; value: any }) => {
         const response = await request.patch(`/attendances/periods/${periodId}`, { fieldName: property, fieldValue: value ? 'true' : 'false' });
         return response;
      }
   });
}

export const usePostPeriodMutation = () => {
   return useMutation({
      mutationFn: async ({ periodId }: { periodId: string }) => {
         const response = await request.put(`/attendances/periods/${periodId}/post`);
         return response;
      }
   })
}

export const getPeriodInitialOptions = () => {
   return queryOptions({
      queryKey: ['initial-attendance-periods'],
      queryFn: async () => {
         const response = await request.get<APIResponse<PeriodInitialType>>('/attendances/periods/initial');
         return response;
      },
      select: (data) => {
         return {
            employeeTypes: data.data.employeeTypes ?? [],
            companies: data.data.companies ?? [],
         }
      },
   });
}

/**
 * Attendance period options with query params for pagination and filtering
 * @param params Query parameters for filtering and pagination
 * 
 * @returns Query options for fetching attendance periods
 */
export const getAttendancePeriodOptions = (params?: AttendancePeriodQueryParams) => {
   return queryOptions({
      queryKey: ['attendance-periods', params],
      queryFn: async () => {

         let url = `/attendances/periods`;

         if (params?.pageSize && params.pageNumber) {
            url += url.includes('?') ? `&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}` : `?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;
         }
         if (params?.status) {
            url += url.includes('?') ? `&status=${params.status}` : `?status=${params.status}`;
         }
         if (params?.fieldValue) {
            url += url.includes('?') ? `&fieldValue=${params.fieldValue}` : `?fieldValue=${params.fieldValue}`;
         }
         if (params?.periodFrom) {
            url += url.includes('?') ? `&periodFrom=${params.periodFrom}` : `?periodFrom=${params.periodFrom}`;
         }
         if (params?.periodTo) {
            url += url.includes('?') ? `&periodTo=${params.periodTo}` : `?periodTo=${params.periodTo}`;
         }

         const response = await request.get<PaginatedResponse<AttendancePeriod>>(url);
         return response;
      },
      select: (data) => {
         return {
            ...data,
            data: data.data.map((period) => ({
               ...period,
               posted: period.status.toLowerCase() === 'posted',
            })),
         };
      }
   })
}

export const getListEmployeeOptions = ({ name }: { name: string }) => {

   return queryOptions({
      queryKey: ['employees', name],
      queryFn: async () => {
         const url = `/setup?fieldName=fullname&fieldValue=${name}&pageSize=1000&pageNumber=1`;
         const response = await request.get<PaginatedResponse<AttendeeInfo>>(url);
         return response;
      },
      enabled: name.length > 0,
      select: (data) => data.data,
   });
}


export const useDtrProcessAttendance = () => {
   const { mutateAsync, isPending } = useMutation({
      mutationFn: async ({ periodId, ids }: { periodId: string; ids: Array<number> }) => {
         const response = await request.post<JobStatus>('/queues/attendances/dtr-process', { periodId, ids, preProcess: false });
         return response;
      }
   });

   const { requestConfirmation } = useConfirmationContext();
   const { setJobId } = useJobStatusTrackingContext();

   const handleProcess = async (periodId: string, onConfirmCallback?: () => void) => {
      await requestConfirmation({
         title: "Process Attendance",
         description: `Are you sure you want to process attendance for period ${periodId}?`,
         confirmLabel: "Process",
         onConfirm: async () => {
            try {
               const response = await mutateAsync({ periodId, ids: [] });
               setJobId(response.jobId);
               toast.success('Attendance processing started successfully');
               if (onConfirmCallback) onConfirmCallback();
            }
            catch (error: any) {
               toast.error(`Error processing attendance: ${error.message}`);
            }
         }
      });
   }

   return { handleProcess, isProcessing: isPending };

}

export const useGetPendingOTQuery = ({ formValue, isSubmit }: { formValue: OvertimePendingFormValues | null, isSubmit: boolean }) => {
   const { employeeId, dateFrom, dateTo } = formValue || {};
   return useQuery({
      queryKey: ['pending-overtime-adjustments', employeeId, dateFrom, dateTo],
      queryFn: async () => {
         const data = {
            employeeId: employeeId || 0,
            fromDate: dateFrom ? formatDate(dateFrom, 'yyyy-MM-dd') : '',
            toDate: dateTo ? formatDate(dateTo, 'yyyy-MM-dd') : '',
            requestFor: 1 //OT
         }
         const response = await request.post<APIResponse<Array<OvertimePending>>>('/form-request/pending', data);
         return response.data;
      },
      enabled: isSubmit && !!employeeId && !!dateFrom && !!dateTo,
   });
}


export const useAdjustmentMutation = () => {
   return useMutation({
      mutationFn: async ({ periodId, employeeId, data }: { periodId: string; employeeId: number; data: AdjustmentFormValues }) => {
         const url = `/attendances/periods/${periodId}/${employeeId}/adjustment`;
         const response = await request.put(url, {
            regularOvertimeAdjustment: data.regularOT,
            restDayOvertimeAdjustment: data.restDayOT,
            holidayOvertimeAdjustment: data.holidayOT,
            absentAdjustment: data.absent,
         });
         return response;
      }
   });
}

