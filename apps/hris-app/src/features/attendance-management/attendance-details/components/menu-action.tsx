import {
  BrainCogIcon,
  DownloadCloudIcon,
  RefreshCw,
  SaveIcon,
} from 'lucide-react'
import { ExportCircle } from 'iconsax-reactjs'
import { useDetailActionContext } from '../providers/detail-action-provider'
import {
  useDetailExport,
  useManualProcess,
} from '../../hooks/useAttendanceDetail'
import { NavMenu, NavMenuItem, useConfirmationContext, Separator, ConfirmDialogProvider } from '@hris/shared-ui'
import { Route } from '@/routes/_app/attendance-sheet/$id/sheets/$empId'
import { useAttendanceDetailContext } from '../providers/attendance-detail-provider'

const MenuActionContent = () => {
  const { id, empId } = Route.useParams()

  const { form, onSubmit } = useDetailActionContext()
  const { handleDetailSheetExport, isPending } = useDetailExport()
  const { requestConfirmation } = useConfirmationContext()
  const { onRefresh } = useAttendanceDetailContext()
  const navigate = Route.useNavigate()

  const { handleManualProcessClick, isProcessing } = useManualProcess()

  const handleExportClick = () => {
    requestConfirmation({
      title: 'Export Attendance Detail Sheet',
      description:
        'Are you sure you want to export the attendance detail sheet?',
      onConfirm: () => handleDetailSheetExport(id, Number(empId)),
    })
  }

  const handleViewPDFClick = () => {
    navigate({ to: `/attendance-sheet/viewer/${id}/timelog/${empId}` })
  }

  return (
    <>
      <NavMenu className="w-full mb-4">
        <NavMenuItem
          onClick={() => form.handleSubmit(onSubmit)()}
          className="font-semibold uppercase text-sm"
        >
          <SaveIcon className="h-4 w-4" />
          Save
        </NavMenuItem>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <NavMenuItem
          onClick={() =>
            handleManualProcessClick({
              periodId: id,
              employeeId: Number(empId),
            })
          }
          disabled={isProcessing}
        >
          <BrainCogIcon className="size-4" />
          PROCESS
        </NavMenuItem>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <NavMenuItem
          onClick={onRefresh}
          className="font-semibold uppercase text-sm"
        >
          <RefreshCw className="size-4" />
          Refresh
        </NavMenuItem>
        <NavMenuItem
          onClick={handleExportClick}
          disabled={isPending}
          className="font-semibold uppercase text-sm"
        >
          <ExportCircle className="h-4 w-4" />
          Export
        </NavMenuItem>
        <NavMenuItem
          onClick={handleViewPDFClick}
          className="font-semibold uppercase text-sm"
        >
          <DownloadCloudIcon className="h-4 w-4" />
          View PDF
        </NavMenuItem>
      </NavMenu>
    </>
  )
}

const MenuAction = () => {
  return (
    <ConfirmDialogProvider>
      <MenuActionContent />
    </ConfirmDialogProvider>
  )
}

export default MenuAction
