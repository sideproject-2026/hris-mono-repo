import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  ButtonLoading,
  DatePickerField,
  DropdownField,
  InputField,
} from '@hris/shared-ui'
import { holidaySchema, type HolidaySchema } from '../types/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
  calendarHolidayInitials,
  calendarHolidayCreateMutation,
} from '../hooks/useHolidayCalendar'
import { Send } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { formatHolidayTypeText } from '../types/constant'
import { useHoliday } from './holiday-provider'

interface CreateHolidayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  id?: string // Add id prop for editing
}

const CreateHoliday = ({ open, onOpenChange, id }: CreateHolidayProps) => {
  const { data } = useQuery(calendarHolidayInitials())
  const { mutateAsync: createAsync, isPending } =
    calendarHolidayCreateMutation()
  const { onRefresh } = useHoliday()

  const form = useForm<HolidaySchema>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
      holidayType: '',
      holidayDate: new Date(),
      branch: '',
    },
  })

  const onSubmit = async (values: HolidaySchema) => {
    try {
      await createAsync(values)
      toast.success('Holiday submitted successfully')
      form.reset()
      onOpenChange(false)
      onRefresh?.()
    } catch (error) {
      console.error('Error submitting holiday:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Holiday</DialogTitle>
          <DialogDescription>
            You can create holiday events here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField
              label="Name"
              name="name"
              placeholder="Enter name"
              control={form.control}
            />
            <DropdownField
              label="Type"
              name="holidayType"
              placeholder="Select type"
              control={form.control}
              data={formatHolidayTypeText(data?.data?.holidayTypes) ?? []}
            />
            <DatePickerField
              control={form.control}
              label="Holiday Date"
              name="holidayDate"
              placeholder="Select a date"
            />
            <DropdownField
              label="Branch"
              name="branch"
              placeholder="Select branch"
              control={form.control}
              data={data?.data?.branches ?? []}
            />

            <ButtonLoading
              text={'Create'}
              loading={isPending}
              textLoading={'Creating...'}
              type="submit"
              className="w-full mt-4 h-10 font-sans text-sm"
              icon={<Send variant="Bold" size="20px" />}
              variant="default"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateHoliday
