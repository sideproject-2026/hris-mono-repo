import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Button,
  ListView,
  ConfirmDialogProvider,
  useConfirmationContext,
} from '@hris/shared-ui'
import { Trash } from 'iconsax-reactjs'
import { useState } from 'react'
import {
  calendarHolidayDeleteMutation,
} from '../hooks/useHolidayCalendar'
import { toast } from 'sonner'
import { getDisplayTextHoliday } from '../types/constant'
import { useHoliday } from './holiday-provider'

interface ListHolidayComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: CalendarHoliday[]
  isFetching?: boolean
  type?: string
  selectedDate?: string
}

const ListHolidayComponentContent = ({
  open,
  onOpenChange,
  data,
  isFetching,
  type,
  selectedDate,
}: ListHolidayComponentProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { mutateAsync } = calendarHolidayDeleteMutation();
  const { requestConfirmation } = useConfirmationContext();
  const { onRefresh } = useHoliday();

  const filteredData = data?.filter((item) => {
    if (!selectedDate) return true

    const itemDate = new Date(item.holidayDate)
    const filterDate = new Date(selectedDate)

    return (
      itemDate.toISOString().split('T')[0] ===
      filterDate.toISOString().split('T')[0]
    )
  })

  const handleDelete = async (id: string) => {
    const confirmed = await requestConfirmation({
      title: "Delete Holiday",
      description: `Are you sure you want to delete ${id} this holiday? This action cannot be undone.`,
      confirmLabel: "Delete",
      variant: "destructive",
      onConfirm: async () => {
        await mutateAsync(id, {
          onSuccess: () => {
            toast.success('Holiday deleted successfully')
            onRefresh?.();
          },
          onError: (error) => {
            toast.error(`Error deleting Holiday: ${error.message}`)
          },
        })
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Holiday Details</DialogTitle>
        <DialogDescription>
          View and manage your holiday calendar events
        </DialogDescription>

        <ListView
          data={filteredData ?? []}
          isLoading={isFetching}
          scrollAreaClassName="h-[222px]"
          header={`Holidays (${filteredData?.length ?? 0})`}
          emptyState={<p>No holidays found.</p>}
          getKey={(holiday, index) => `${holiday.id}-${index}`}
          renderItem={(holiday) => (
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <span className="text-md font-semibold">
                  {[holiday.branch, holiday.holidayName, holiday.holidayDate ? new Date(holiday.holidayDate).toLocaleDateString() : undefined]
                    .filter(Boolean)
                    .join(' - ')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {getDisplayTextHoliday(holiday.holidayType)}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                type="button"
                className="rounded"
                onClick={() => handleDelete(holiday.id)}
              >
                <Trash variant={'Bold'} size={16} color="#004663" />
              </Button>
            </div>
          )}
        />
      </DialogContent>
    </Dialog>
  )
}

const ListHolidayComponent = (props: ListHolidayComponentProps) => (
  <ConfirmDialogProvider>
    <ListHolidayComponentContent {...props} />
  </ConfirmDialogProvider>
)

export default ListHolidayComponent
