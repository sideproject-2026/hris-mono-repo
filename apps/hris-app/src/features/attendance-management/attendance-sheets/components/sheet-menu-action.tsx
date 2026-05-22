import {
  BrainCogIcon,
  DatabaseBackup,
  FileTextIcon,
  MenuIcon,
  RecycleIcon,
  RefreshCcwIcon,
  SheetIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { Link } from '@tanstack/react-router'

import {
  useAttendanceExport,
  useDeleteSheetMutation,
  useDtrProcessAttendance,
  useDtrProcessMutation,
  useRecreateSheetMutation,
} from '../../hooks/useAttendanceProcess'
import { usePeriodSheetContext } from './sheet-provider'
import { Button } from '@/components/ui/button'

import { useConfirmationContext } from '@/components/custom/modal/ConfirmDialog'

import { NavMenu, NavMenuItem } from '@/components/custom/misc/NavMenu'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ROUTE } from '@/types/router'
import { useJobStatusTrackingContext } from '@/components/custom/misc/job-status/JobStatusTracking'

import {
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import AdjustmentDialog from './adjustments/adjustment-dialog'
import { useManualProcess } from '../../hooks/useAttendanceDetail'

export const useRecreateSheet = ({
  periodId,
  onRefresh,
}: {
  periodId: string
  onRefresh: () => void
}) => {
  const { mutateAsync: recreate } = useRecreateSheetMutation()
  const { requestConfirmation } = useConfirmationContext()

  const handleRecreateSheet = async () => {
    const confirmed = await requestConfirmation({
      title: 'Recreate Attendance Sheets',
      description: `Are you sure you want to recreate attendance sheets for this period? This will overwrite existing sheets.`,
      confirmLabel: 'Recreate',
      onConfirm: async () => {
        await recreate(
          { periodId },
          {
            onSuccess: () => {
              ;(toast.success('Attendance Sheets recreated successfully'),
                onRefresh())
            },
          },
        )
      },
    })
  }

  return { handleRecreateSheet }
}

const useDtrProcess = ({
  periodId,
  onRefresh,
}: {
  periodId: string
  onRefresh: () => void
}) => {
  const { mutateAsync: processDtr } = useDtrProcessMutation()
  const { requestConfirmation } = useConfirmationContext()
  const { setJobId } = useJobStatusTrackingContext()

  const handleProcessDtr = async () => {
    const confirmed = await requestConfirmation({
      title: 'DTR Processing',
      description: `Are you sure you want to process DTR for this attendance period?`,
      confirmLabel: 'Process',
      onConfirm: async () => {
        await processDtr(
          { periodId, ids: [] },
          {
            onSuccess: (response) => {
              toast.success('DTR processing started successfully')
              setJobId(response.jobId)
              onRefresh()
            },
          },
        )
      },
    })
  }

  return { handleProcessDtr }
}

export const SheetMenuAction = ({ sheet }: { sheet: AttendanceSheet }) => {
  const { requestConfirmation } = useConfirmationContext()
  const { mutateAsync, isPending } = useDeleteSheetMutation()
  const { onRefresh, period } = usePeriodSheetContext()
  const { handleManualProcessClick } = useManualProcess()

  const handleDeleteSheet = async () => {
    const fullName = `${sheet.avatar.lastName} ${sheet.avatar.firstName}`
    const confirmed = await requestConfirmation({
      title: 'Delete Timesheet',
      description: `Are you sure you want to delete ${fullName} timesheet? This action cannot be undone.`,
      confirmLabel: 'Delete',
      variant: 'destructive',
      onConfirm: async () => {
        await mutateAsync(
          { periodId: period.id, sheetIds: [sheet.id] },
          {
            onSuccess: () => {
              toast.success('Timesheet deleted successfully')
              onRefresh()
            },
          },
        )
      },
    })
  }

  const disableActions = period.isAutomate || period.posted || isPending
  return (
    <>
      {!period.posted && (
        <div className="flex flex-row  items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild disabled={disableActions}>
                  <Link
                    to={ROUTE.ATTENDANCE_DETAIL_ROUTE(
                      period.id,
                      sheet.employeeNumber,
                    )}
                    preload="intent"
                  >
                    <ViewIcon className="h-4 w-4" />
                    <span className="ml-2">View Details</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const fullName = `${sheet.avatar.lastName} ${sheet.avatar.firstName}`
                    handleManualProcessClick({
                      periodId: period.id,
                      employeeId: sheet.employeeNumber,
                      subtitle: fullName,
                      callback: () => onRefresh(),
                    })
                  }}
                >
                  <BrainCogIcon className="size-4" />
                  <span className="ml-2">Single Process</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={handleDeleteSheet}
                  disabled={disableActions}
                >
                  <Trash2Icon className="h-4 w-4 text-red-500" />
                  <span className="ml-2">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to={'/attendance-sheet/viewer/$id/timelog/$empid'}
                    params={{
                      id: period.id,
                      empid: sheet.employeeNumber.toString(),
                    }}
                    preload="intent"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    <span className="ml-2">View PDF</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <AdjustmentDialog
                    initialValue={{
                      employeeId: sheet.employeeNumber,
                      periodId: period.id,
                      employeeName: `${sheet.avatar.firstName} ${sheet.avatar.middleName} ${sheet.avatar.lastName}`,
                      default: {
                        regularOT: sheet.regularOvertimeAdjustment,
                        restDayOT: sheet.restdayOvertimeAdjustment,
                        holidayOT: sheet.holidayOvertimeAdjustment,
                        absent: sheet.absentAdjustment,
                        period: '',
                      },
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full"
                      disabled={disableActions}
                    >
                      <DatabaseBackup className="h-4 w-4" />
                      <span>Adjustment</span>
                    </Button>
                  </AdjustmentDialog>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  )
}

export const SheetMainMenu = () => {
  const { period, onRefresh } = usePeriodSheetContext()

  const { handleRecreateSheet } = useRecreateSheet({
    periodId: period.id,
    onRefresh,
  })
  const { handleAttendanceSheetExport, isPending: exportPending } =
    useAttendanceExport()
  const { handleProcess, isProcessing } = useDtrProcessAttendance()

  const { requestConfirmation } = useConfirmationContext()

  const handleExportSheets = () => {
    requestConfirmation({
      title: 'Export Attendance Sheets',
      description: `Do you want to export attendance sheets for this period?`,
      confirmLabel: 'Export',
      onConfirm: async () => {
        await handleAttendanceSheetExport(period.id)
      },
    })
  }

  const disableActions = period.isAutomate || period.posted

  return (
    <NavMenu className="w-full mb-4 justify-between">
      <div className="flex-row items-center w-full h-full flex flex-1">
        <NavMenuItem
          onClick={handleRecreateSheet}
          disabled={disableActions}
          muted={disableActions}
          className="font-semibold uppercase text-sm"
        >
          <RecycleIcon className="h-4 w-4" />
          Re-Create Sheet
        </NavMenuItem>
        <NavMenuItem
          onClick={() => handleProcess(period.id, () => onRefresh())}
          disabled={disableActions || isProcessing}
          muted={disableActions || isProcessing}
          className="font-semibold uppercase text-sm"
        >
          <DatabaseBackup className="h-4 w-4" />
          <span>Process</span>
        </NavMenuItem>

        <Separator orientation="vertical" />
        <NavMenuItem
          onClick={onRefresh}
          className="font-semibold uppercase text-sm"
        >
          <RefreshCcwIcon className="h-4 w-4" />
          Refresh
        </NavMenuItem>
      </div>
      <div className="flex-row items-center h-full flex">
        <NavMenuItem
          onClick={handleExportSheets}
          disabled={exportPending}
          className="font-semibold uppercase text-sm"
        >
          <SheetIcon className="h-4 w-4" />
          Export
        </NavMenuItem>
        <NavMenuItem
          onClick={handleExportSheets}
          disabled={exportPending}
          className="font-semibold uppercase text-sm"
        >
          <SheetIcon className="h-4 w-4" />
          Import
        </NavMenuItem>
      </div>
    </NavMenu>
  )
}
