import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  StackCol,
  DialogDescription,
} from '@hris/shared-ui'

import { cn } from '@/lib/utils'
import { FilterSearch } from 'iconsax-reactjs'

export type AttendanceFilterValue = {
  status?: 'Posted' | 'Pending' | ''
  periodFrom?: Date
  periodTo?: Date
}

type AttendanceFilterProps = {
  value?: AttendanceFilterValue
  onChange?: (value: AttendanceFilterValue) => void
}

const AttendanceFilter = ({ value, onChange }: AttendanceFilterProps) => {
  const [open, setOpen] = useState(false)
  const [filterValue, setFilterValue] = useState<AttendanceFilterValue>({
    status: '',
    periodFrom: undefined,
    periodTo: undefined,
    ...value,
  })

  useEffect(() => {
    setFilterValue({
      status: value?.status || '',
      periodFrom: value?.periodFrom,
      periodTo: value?.periodTo,
    })
  }, [value?.status, value?.periodFrom, value?.periodTo])

  const handleChange = (nextValue: AttendanceFilterValue) => {
    setFilterValue(nextValue)
  }

  const handleApplyFilter = () => {
    onChange?.(filterValue)
    setOpen(false)
  }

  const handleClearFilter = () => {
    const clearedValue: AttendanceFilterValue = {
      status: '',
      periodFrom: undefined,
      periodTo: undefined,
    }
    setFilterValue(clearedValue)
    onChange?.(clearedValue)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="font-semibold uppercase text-sm"
        >
          <FilterSearch size={'32px'} variant="Bold" color="#004663" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>Attendance Filter</DialogTitle>
          <DialogDescription>You can filter the data based on the status and the period.</DialogDescription>
        </DialogHeader>

        <StackCol className="w-full py-2" gap="sm">
          <StackCol gap="xs" className="w-full">
            <span className="text-md text-muted-foreground">Status</span>
            <Select
              value={filterValue.status || ''}
              onValueChange={(status: 'Posted' | 'Pending') =>
                handleChange({ ...filterValue, status })
              }
            >
              <SelectTrigger className="mt-1 w-full h-11!">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Posted">Posted</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </StackCol>

          <StackCol gap="xs" className="w-full">
            <span className="text-md text-muted-foreground">Period From</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-between font-normal h-11',
                    !filterValue.periodFrom && 'text-muted-foreground',
                  )}
                >
                  {filterValue.periodFrom
                    ? format(filterValue.periodFrom, 'MMM dd, yyyy')
                    : 'Select date'}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterValue.periodFrom}
                  onSelect={(periodFrom) =>
                    handleChange({ ...filterValue, periodFrom: periodFrom })
                  }
                />
              </PopoverContent>
            </Popover>
          </StackCol>

          <StackCol gap="xs" className="w-full">
            <span className="text-md text-muted-foreground">Period To</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-between font-normal h-11',
                    !filterValue.periodTo && 'text-muted-foreground',
                  )}
                >
                  {filterValue.periodTo
                    ? format(filterValue.periodTo, 'MMM dd, yyyy')
                    : 'Select date'}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterValue.periodTo}
                  onSelect={(periodTo) =>
                    handleChange({ ...filterValue, periodTo: periodTo })
                  }
                />
              </PopoverContent>
            </Popover>
          </StackCol>
        </StackCol>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="h-11 font-sans text-md font-normal"
            onClick={handleClearFilter}
          >
            Clear
          </Button>
          <Button
            type="button"
            className="h-11 font-sans text-md font-normal"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AttendanceFilter
