import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import type { WorkScheduleFormValue } from "../types/schema";
import { request } from "@/lib/http"
import { ApiRoutes } from "@/types/api-routes"
import { useConfirmationContext } from "@hris/shared-ui";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useWorkScheduleContext } from "../components/work-schedule-provider";


export const useGetWorkSchedules = () => {
   return useQuery({
      queryKey: ['work-schedules'],
      queryFn: async () => {
         const response = await request.get<APIResponse<Array<WorkSchedule>>>(ApiRoutes.SCHEDULES.LIST);
         return response;
      }
   })
}

export const workScheduleOptions = () => {
   return queryOptions({
      queryKey: ['work-schedules'],
      queryFn: async () => {
         const response = await request.get<APIResponse<Array<WorkSchedule>>>(ApiRoutes.SCHEDULES.LIST);
         return response;
      },
      select: (response) => response?.data ?? [],
   })
}

export const useWorkScheduleMutations = () => {
   return useMutation({
      mutationFn: async ({ id, data }: { id?: string, data: WorkScheduleFormValue }) => {
         if (id) {
            const response = await request.put(ApiRoutes.SCHEDULES.BY_ID(id), data);
            return response;
         } else {
            const response = await request.post(ApiRoutes.SCHEDULES.LIST, data);
            return response;
         }
      },
   })
}
export const useDeleteWorkSchedule = () => {

   const { onRefresh } = useWorkScheduleContext();
   const { mutateAsync, isPending } = useMutation({
      mutationFn: async (id: string) => {
         const response = await request.del(ApiRoutes.SCHEDULES.BY_ID(id));
         return response;
      }
   });

   const { requestConfirmation } = useConfirmationContext();

   const handleDelete = async (id: string) => {
      requestConfirmation({
         title: 'Delete Work Schedule',
         description: 'Are you sure you want to delete this work schedule? This action cannot be undone.',
         confirmLabel: 'Delete',
         cancelLabel: 'Cancel',
         async onConfirm() {
            try {
               await mutateAsync(id);
               onRefresh();
               toast.success('Work schedule deleted successfully');
            }
            catch (error) {
               console.error(error);
               toast.error(`Failed to delete work schedule : ${getErrorMessage(error)}`);
            }
         },
      });
   }

   return { handleDelete, isDeleting: isPending };

}
