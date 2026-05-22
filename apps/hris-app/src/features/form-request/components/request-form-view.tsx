import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Eye, Calendar, FileText, Tag } from 'lucide-react'
import {
  DGridColumns,
  DGridProvider,
  DGridRows,
  DGridTable,
} from '@/components/custom/grid/DataGrid'
import type { FormRequestTypes } from '../types/global'
import { avatarUrl, formatLongDate, getDisplayText } from '@/lib/utils'
import { COLUMN_CONFIG } from './request-form-view-columns'
import { Separator } from '@/components/ui/separator'

interface RequestFormViewProps {
  data?: FormRequestTypes
}

const RequestFormView = ({ data }: RequestFormViewProps) => {
  const requestType = data?.requestFor?.toUpperCase() || ''

  const columns = useMemo(() => {
    if (!requestType) return []
    return COLUMN_CONFIG[requestType] || []
  }, [requestType])

  const getRequestDetails = (request: FormRequestTypes | undefined) => {
    if (!request) return []
    const mapper: Record<string, any> = {
      LEAVE: request.leaveRequest,
      OFFICIAL_BUSINESS: request.obRequest,
      OT: request.otRequest,
      TIME_REQUEST: request.trRequest,
    }
    const detail = mapper[request.requestFor.toUpperCase()]
    return detail ? [detail] : []
  }

  const gridData = useMemo(() => {
    return getRequestDetails(data)
  }, [data])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 h-auto py-2"
        >
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-md font-normal">View Form</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[100vw] lg:max-w-4xl p-5 overflow-hidden border border-zinc-200">
        <DialogHeader>
          <div className="flex items-center gap-5">
            <div className="space-y-1 text-left">
              <DialogTitle className="font-bold tracking-tight text-foreground">
                Request Details
              </DialogTitle>
              <DialogDescription className="text-sm opacity-80">
                Review the details submitted for this specific request.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
          {/* Top Section - Employee & Quick Brief */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-secondary border rounded-md p-5 flex items-center gap-5 transition-all hover:shadow-md">
              <Avatar className="h-16 w-16 border-2 border-white dark:border-zinc-800 shadow-sm">
                <AvatarImage
                  src={avatarUrl(data?.employeeId?.toString() || '')}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {data?.employeeProfile?.firstName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-500 tracking-wider mb-1">
                  REQUESTED BY
                </span>
                <span className="font-semibold text-[1.05rem] text-foreground leading-tight">
                  {data?.employeeProfile?.firstName}{' '}
                  {data?.employeeProfile?.lastName}
                </span>
                <span className="text-sm text-muted-foreground uppercase mt-0.5 font-medium">
                  {data?.employeeProfile?.designation || 'N/A'}
                </span>
              </div>
            </div>

            <div className="border border-zinc-200 rounded-md p-5 grid grid-cols-2 gap-5 transition-all hover:shadow-md relative overflow-hidden">
              <div className="flex flex-col gap-1.5 z-10">
                <span className="text-sm font-medium text-muted-foreground uppercase">
                  Request Number
                </span>
                <span className="font-semibold text-lg text-foreground">
                  {data?.requestNo || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 z-10">
                <span className="text-sm font-medium text-muted-foreground uppercase">
                  Type
                </span>
                <span className="font-semibold text-lg text-foreground uppercase">
                  {getDisplayText(data?.requestFor ?? '')?.toString()}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 mt-1 z-10">
                <span className="text-sm font-medium text-muted-foreground uppercase">
                  Filed On
                </span>
                <span className="font-medium text-sm text-foreground uppercase">
                  {data?.requestDate
                    ? formatLongDate(data.requestDate.toString())
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          {/* Grid Section */}
          <div className="w-full flex-1">
            <h4 className="text-md font-medium text-zinc-500 tracking-wider mb-4 flex items-center gap-2 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Request Payload Profile
            </h4>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-zinc-950">
              <DGridProvider
                data={gridData}
                columns={columns}
                type="basic"
                emptyMessage="No detailed data found for this request."
                stickyFirstColumn
              >
                <DGridTable>
                  <DGridColumns />
                  <DGridRows />
                </DGridTable>
              </DGridProvider>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto min-w-[120px] font-semibold border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              CLOSE
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RequestFormView
