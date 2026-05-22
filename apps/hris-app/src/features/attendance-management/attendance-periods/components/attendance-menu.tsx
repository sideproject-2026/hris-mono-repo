import { FileText, MoreHorizontal, PencilIcon, StampIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'

import { useDeleteAttendancePeriodMutation, useDtrProcessAttendance, useDtrProcessMutation, usePostPeriodMutation } from '../../hooks/useAttendanceProcess'
import { useAttendancePeriodContext } from './attendance-period-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ROUTE } from '@/types/router'
import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'
import { useJobStatusTrackingContext } from '@/components/custom/misc/job-status/JobStatusTracking'



/* 
  * Hook: useDeletePeriod
  * Description: Custom hook to handle the deletion of an attendance period with confirmation dialog.
  * Params:
  * - id: string - The ID of the attendance period to be deleted.
  * Returns:
  * - handleDelete: Function - Function to trigger the deletion process.
  * - isDeleteLoading: boolean - Loading state of the deletion process.
*/
const useDeletePeriod = ({ id }: { id: string }) => {

  const { onRefresh } = useAttendancePeriodContext()
  const { mutateAsync, isPending } = useDeleteAttendancePeriodMutation();
  const {requestConfirmation} = useConfirmationContext();


  const handleDelete = async () => {

   const confirmed = await requestConfirmation({
    title: "Delete Attendance Period",
    description: `Are you sure you want to delete ${id} this attendance period? This action cannot be undone.`,
    confirmLabel: "Delete",
    variant: "destructive",
    onConfirm:  async () => {
       await mutateAsync(id, {
        onSuccess: () => {
          toast.success('Attendance Period deleted successfully')
          onRefresh()
        },
        onError: (error) => {
          toast.error(`Error deleting Attendance Period: ${error.message}`)
        },
      })
    }
   });
  }

  return { handleDelete, isDeleteLoading: isPending };
}


const useProcessAttendance = ({id}: {id:string}) => {

  const { mutateAsync, isPending } = useDtrProcessMutation();
  const { onRefresh } = useAttendancePeriodContext();
  const {requestConfirmation} = useConfirmationContext();

  const {setJobId} = useJobStatusTrackingContext();

  const handleProcess = async () => {
    const confirmed = await requestConfirmation({
      title: "Process Attendance",
      description: `Are you sure you want to process attendance for period ${id}?`,
      confirmLabel: "Process",
      onConfirm: async () => {
        try {
          const response = await mutateAsync({periodId: id,ids: []});
          setJobId(response.jobId);
          toast.success('Attendance processing started successfully');
          onRefresh();
        } 
        catch (error: any) {
          toast.error(`Error processing attendance: ${error.message}`);
        }

      }
    });
  }

  return { handleProcess, isProcessing: isPending };
  
}


const usePostPeriod = ({id}: {id:string}) => {

  const {mutateAsync, isPending} = usePostPeriodMutation();
  const {requestConfirmation} = useConfirmationContext();
  const {onRefresh} = useAttendancePeriodContext();

  const handlePost = async (isPosted:boolean) => {
    const confirmed = await requestConfirmation({
      title: `${isPosted ? "Unpost" : "Post"} Attendance Period`,
      description: `Are you sure you want to ${isPosted ? "unpost" : "post"} attendance for period ${id}? This action cannot be undone.`,
      confirmLabel: `${isPosted ? "Unpost" : "Post"}`,
      onConfirm: async () => {
        try {
          const response = await mutateAsync({periodId: id});
          toast.success(`Attendance period ${isPosted ? "unposted" : "posted"} successfully`);
          onRefresh();
        }catch (error: any) {
          toast.error(`Error ${isPosted ? "unposting" : "posting"} attendance period: ${error.message}`);
        }
      }
    });
  }

  return {handlePost, isPosting: isPending};
}

/**
 * Component: PeriodActionsDropdownMenu
 * Description: Dropdown menu for actions related to an attendance period. 
 * TODO: (Done) 
 * - ✅ Implement Dropdown menu with options to view attendance sheet, process attendance, post period, edit period, and delete period.
 * - ✅ Integrate delete functionality with confirmation dialog and mutation hook.
 * - ✅ Ensure proper styling and accessibility features are in place. 
 */

export const PeriodActionsDropdownMenu = ({data} : {data: AttendancePeriod}) => {

  const { handleDelete, isDeleteLoading } = useDeletePeriod({ id: data.id });
  const {handleProcess, isProcessing} = useDtrProcessAttendance();
  const {handlePost, isPosting} = usePostPeriod({id: data.id});
   const { onRefresh } = useAttendancePeriodContext();

  const disabledButton = isDeleteLoading || isProcessing || isPosting;
  const postLabel = data.posted ? "Unpost Period" : "Post Period";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={disabledButton}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenu>
          <DropdownMenuItem asChild>
            <Link to={ROUTE.ATTENDANCE_SHEET_ROUTE(data.id)}>
              <FileText className="h-4 w-4" />
              <span>View Attendance Sheet</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm py-2 font-semibold w-full">
              Period Actions
            </DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => handleProcess(data.id,() => onRefresh())} 
              disabled={data.posted || data.isAutomate || isProcessing}>
              <FileText className="h-4 w-4" />
              <span>Process Attendance</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePost(data.posted)}>
              <StampIcon className="h-4 w-4" />
              <span>{postLabel}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-800" onClick={handleDelete} disabled={data.posted}>
            <TrashIcon className="h-4 w-4 text-red-800 " />
            <span>Delete Period</span>
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
