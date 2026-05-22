import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useGetRequestDetailOptions } from '../../hooks/useAttendanceDetail'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Stack, StackCol, StackRow } from '@/components/custom/layouts'
import InputLabels from '@/components/custom/labels/InputLabels'
import { formatDate } from 'date-fns'

const LeaveRequestComponent = ({ request }: { request?: LeaveRequest }) => {
  return (
    <StackCol gap="sm">
      <InputLabels
        label="Leave Type"
        text={request?.requestLeaveType || 'N/A'}
      />
      <InputLabels label="Leave Period" text={request?.leavePeriod || 'N/A'} />
      <InputLabels
        label="Paid Leave"
        text={request?.paidLeave ? 'Yes' : 'No'}
      />
      <StackRow gap="sm" className="w-full">
        <InputLabels
          label="Date From"
          text={
            request?.from
              ? formatDate(new Date(request.from), 'MMMM dd, yyyy')
              : 'N/A'
          }
        />
        <InputLabels
          label="Date To"
          text={
            request?.to
              ? formatDate(new Date(request.to), 'MMMM dd, yyyy')
              : 'N/A'
          }
        />
      </StackRow>
    </StackCol>
  )
}

const TimeRequestComponent = ({ request }: { request?: TrRequest }) => {
  return (
    <StackCol gap="sm" className="w-full">
      <InputLabels
        label="Time Request Type"
        text={request?.timeRequestType || 'N/A'}
      />
      <InputLabels
        label="Time Request Date"
        text={
          request?.trDate
            ? formatDate(new Date(request.trDate), 'MMMM dd, yyyy')
            : 'N/A'
        }
      />
      <StackRow gap="sm" className="w-full">
        <InputLabels
          label="Time In"
          text={request?.timeIn ? request.timeIn : 'N/A'}
        />
        <InputLabels
          label="Time Out"
          text={request?.timeOut ? request.timeOut : 'N/A'}
        />
      </StackRow>
    </StackCol>
  )
}

const OBRequestComponent = ({ request }: { request?: ObRequest }) => {
  return (
    <StackCol gap="sm" className="w-full">
      <InputLabels label="OB Type" text={request?.obType ?? 'N/A'} />
      <InputLabels
        label="OB Date From"
        text={
          request?.from
            ? formatDate(new Date(request.from), 'MMMM dd, yyyy')
            : 'N/A'
        }
      />

      <InputLabels
        label="OB Date To"
        text={
          request?.to
            ? formatDate(new Date(request.to), 'MMMM dd, yyyy')
            : 'N/A'
        }
      />
    </StackCol>
  )
}

const OTRequestComponent = ({ request }: { request?: OtRequest }) => {
  return (
    <StackCol gap="sm" className="w-full">
      <InputLabels
        label="OT Date"
        text={
          request?.otDate
            ? formatDate(new Date(request.otDate), 'MMMM dd, yyyy')
            : 'N/A'
        }
      />
      <InputLabels
        label="OT Date"
        text={
          request?.otDate
            ? formatDate(new Date(request.otDate), 'MMMM dd, yyyy')
            : 'N/A'
        }
      />
      <InputLabels
        label="OT Time In"
        text={request?.timeIn ? request.timeIn : 'N/A'}
      />
      <InputLabels
        label="OT Time Out"
        text={request?.timeOut ? request.timeOut : 'N/A'}
      />
    </StackCol>
  )
}

interface RequestDetailProps {
  detailId?: string
  day?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const RequestDetail = ({
  detailId,
  day,
  open,
  onOpenChange,
}: RequestDetailProps) => {
  const { data, isFetching, refetch } = useQuery(
    useGetRequestDetailOptions(detailId),
  )

  const [selectedRequest, setSelectedRequest] = useState<RequestDetail | null>(
    null,
  )

  useEffect(() => {
    if (open && detailId) {
      refetch()
    }
  }, [detailId])

  const handleSelectRequest = (requestNo: string) => {
    const request = data?.find((req) => req.requestNo === requestNo) || null
    setSelectedRequest(request)
  }

  const requestNos = data?.map((req) => req.requestNo) || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Detail</DialogTitle>
          <DialogDescription>
            Attendance request details for {day}
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Stack orientation="col" gap="sm">
            <StackCol gap="sm">
              <label className="text-md text-muted-foreground">
                Request Number
              </label>
              <Select
                onValueChange={handleSelectRequest}
                value={selectedRequest?.requestNo || ''}
              >
                <SelectTrigger className="w-full min-w-[460px] max-w-48 h-11!">
                  <SelectValue
                    className="w-full"
                    placeholder="Select a request"
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {requestNos.map((no) => (
                    <SelectItem className="w-full" key={no} value={no}>
                      {no}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </StackCol>
            <StackCol gap="sm">
              <InputLabels
                label="Request Type"
                text={selectedRequest?.requestFor || 'N/A'}
              />
            </StackCol>
            <InputLabels
              label="Reason"
              text={selectedRequest?.purpose || 'N/A'}
            />
            {selectedRequest && selectedRequest.requestFor === 'LEAVE' && (
              <LeaveRequestComponent
                request={selectedRequest.leaveRequest as LeaveRequest}
              />
            )}
            {selectedRequest &&
              selectedRequest.requestFor === 'TIME_REQUEST' && (
                <TimeRequestComponent
                  request={selectedRequest.trRequest as TrRequest}
                />
              )}
            {selectedRequest &&
              selectedRequest.requestFor === 'OFFICIAL_BUSINESS' && (
                <OBRequestComponent
                  request={selectedRequest.obRequest as ObRequest}
                />
              )}
            {selectedRequest && selectedRequest.requestFor === 'OT' && (
              <OTRequestComponent
                request={selectedRequest.otRequest as OtRequest}
              />
            )}
          </Stack>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RequestDetail
