import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { CalendarIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { workScheduleSchema } from '../types/schema'
import { useWorkScheduleMutations } from '../hooks/useWorkSchedule'
import type { WorkScheduleFormValue } from '../types/schema'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@hris/shared-ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@hris/shared-ui'
import { Input } from '@hris/shared-ui'
import { Form } from '@hris/shared-ui'
import { InputField } from '@hris/shared-ui'
import { ButtonLoading } from '@hris/shared-ui'

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

interface WorkScheduleFormProps {
  mode?: 'create' | 'edit'
  initialData?: WorkSchedule | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const WorkScheduleForm = ({
  mode = 'create',
  initialData = null,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: WorkScheduleFormProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const { mutateAsync, isPending } = useWorkScheduleMutations()
  const queryClient = useQueryClient()

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOnOpenChange || setInternalOpen

  const form = useForm({
    resolver: zodResolver(workScheduleSchema),
    defaultValues: {
      code: '',
      title: '',
      description: '',
      workScheduleDetails: DAYS_OF_WEEK.map((day) => ({
        scheduleDay: day,
        breakTime: 1,
        timeIn: '09:00',
        timeOut: '18:00',
        fixedSchedule: false,
        active: true,
      })),
    },
  })

  useEffect(() => {
    if (initialData) {
      console.log('Setting form values with initial data:', initialData)
      form.reset({
        code: initialData.code,
        title: initialData.title,
        description: initialData.description,
        workScheduleDetails: initialData.workDetails.map((detail) => ({
          scheduleDay: detail.scheduleDay,
          breakTime: detail.breakTime,
          timeIn: detail.timeIn,
          timeOut: detail.timeOut,
          fixedSchedule: detail.fixedSchedule,
          active: detail.active,
        })),
      })
    }
  }, [initialData, form])

  const {
    register,
    formState: { errors },
  } = form

  const onSubmit = async (data: WorkScheduleFormValue) => {
    await mutateAsync(
      { id: initialData?.id, data: data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['work-schedules'] })
          toast.success(
            `Work schedule ${mode === 'edit' ? 'updated' : 'created'} successfully`,
          )
          setOpen(false)
          form.reset()
        },
        onError: (error: any) => {
          console.log(error)
          toast.error(
            `Error ${mode === 'edit' ? 'updating' : 'creating'} work schedule: ${error.message}`,
          )
        },
      },
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-fit md:max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AlertDialogHeader className="w-[650px]">
              <AlertDialogTitle>
                {mode === 'edit' ? 'Edit' : 'Create'} Work Schedule
              </AlertDialogTitle>
              <AlertDialogDescription>
                Set the work schedule for each day of the week. Enter time in
                24-hour format (e.g., 09:00, 18:00).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <InputField
                control={form.control}
                name="code"
                placeholder="e.g., WS-001"
                label="Code *"
              />
              <InputField
                control={form.control}
                name="title"
                placeholder="e.g., Standard Work Schedule "
                label="Title *"
              />
              <InputField
                control={form.control}
                name="description"
                placeholder="e.g., Standard Work Schedule "
                label="Description *"
              />
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Day</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead>Time Out</TableHead>
                    <TableHead className="w-[100px]">Break (hrs)</TableHead>
                    <TableHead className="w-[80px] text-center">
                      Fixed
                    </TableHead>
                    <TableHead className="w-[80px] text-center">
                      Active
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DAYS_OF_WEEK.map((day, index) => (
                    <TableRow key={day}>
                      <TableCell className="font-medium">{day}</TableCell>
                      <TableCell>
                        <Input
                          type="time"
                          {...register(`workScheduleDetails.${index}.timeIn`)}
                          className="w-full"
                        />
                        {errors.workScheduleDetails?.[index]?.timeIn && (
                          <span className="text-xs text-red-500">
                            {errors.workScheduleDetails[index].timeIn.message}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="time"
                          {...register(`workScheduleDetails.${index}.timeOut`)}
                          className="w-full"
                        />
                        {errors.workScheduleDetails?.[index]?.timeOut && (
                          <span className="text-xs text-red-500">
                            {errors.workScheduleDetails[index].timeOut.message}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.5"
                          min="0"
                          max="8"
                          {...register(
                            `workScheduleDetails.${index}.breakTime`,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          {...register(
                            `workScheduleDetails.${index}.fixedSchedule`,
                          )}
                          className="h-4 w-4 cursor-pointer"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          {...register(`workScheduleDetails.${index}.active`)}
                          className="h-4 w-4 cursor-pointer"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <ButtonLoading
                type='submit'
                loading={isPending}
                text={mode === 'edit' ? 'Update Schedule' : 'Save Schedule'}
                icon={<CalendarIcon className="size-4" />}
              />
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default WorkScheduleForm
