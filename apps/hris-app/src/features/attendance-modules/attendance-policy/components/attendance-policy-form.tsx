import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { BookIcon, XIcon } from 'lucide-react'
import { toast } from 'sonner'
import { attendancePolicySchema } from '../types/schema'
import { useAttendancePolicyMutation } from '../hooks/useAttendancePolicy'
import type { AttendancePolicyFormValue } from '../types/schema'
import {
  InputField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  ButtonLoading,
  Switch,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@hris/shared-ui'

interface AttendancePolicyFormProps {
  mode?: 'create' | 'edit'
  initialData?: AttendancePolicy | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const AttendancePolicyForm = ({
  mode,
  initialData,
  open,
  onOpenChange,
}: AttendancePolicyFormProps) => {
  const { mutateAsync, isPending } = useAttendancePolicyMutation()

  const form = useForm<AttendancePolicyFormValue>({
    resolver: zodResolver(attendancePolicySchema),
    defaultValues: {
      name: '',
      description: '',
      lateThresholdMinutes: 0,
      undertimeThresholdMinutes: 0,
      absenceThreshold: 0,
      halfdayThreshold: 0,
      overTimeLimit: 0,
      holidayOTLimit: 0,
      specialOTLimit: 0,
      isActive: true,
    },
  })

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      console.log(initialData)
      form.reset({
        name: initialData.name,
        description: initialData.description,
        lateThresholdMinutes: initialData.lateThresholdMinutes,
        undertimeThresholdMinutes: initialData.undertimeThresholdMinutes,
        absenceThreshold: initialData.absenceThreshold,
        halfdayThreshold: initialData.halfdayThreshold,
        overTimeLimit: initialData.overTimeLimit,
        holidayOTLimit: initialData.holidayOTLimit,
        specialOTLimit: initialData.specialOTLimit,
        isActive: initialData.isActive,
      })
    } else {
      form.reset({
        name: '',
        description: '',
        lateThresholdMinutes: 0,
        undertimeThresholdMinutes: 0,
        absenceThreshold: 0,
        halfdayThreshold: 0,
        overTimeLimit: 0,
        holidayOTLimit: 0,
        specialOTLimit: 0,
        isActive: true,
      })
    }
  }, [mode, initialData, form])

  const handleSubmit = async (data: AttendancePolicyFormValue) => {
    await mutateAsync(
      { id: initialData?.id, data },
      {
        onSuccess: () => {
          toast.success(
            `Attendance policy ${mode === 'edit' ? 'updated' : 'created'} successfully.`,
          )
          onOpenChange?.(false)
        },
        onError: (error) => {
          console.error('Error submitting attendance policy form:', error)
          toast.error(
            'Failed to submit attendance policy form. Please try again.',
          )
        },
      },
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-fit md:max-w-xl overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <SheetHeader>
              <SheetTitle>
                {mode === 'edit' ? 'Edit' : 'Create'} Attendance Policy
              </SheetTitle>
              <SheetDescription>
                Set up the details for the attendance policy.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col gap-4 -mt-3 p-4">
              {/* Form Fields Here */}
              <InputField
                control={form.control}
                name="name"
                label="Policy Name *"
                placeholder="e.g., Standard Attendance Policy"
                baseClassName="w-full"
              />
              <InputField
                control={form.control}
                name="description"
                label="Policy Description"
                placeholder="e.g., Description of the attendance policy"
                baseClassName="w-full"
              />
              <InputField
                control={form.control}
                name="absenceThreshold"
                label="Absence Threshold (Hours)"
                baseClassName="w-full"
                type="number"
              />
              <InputField
                control={form.control}
                name="halfdayThreshold"
                label="Halfday Threshold (Hours)"
                baseClassName="w-full"
                type="number"
              />
              <InputField
                control={form.control}
                name="lateThresholdMinutes"
                label="Late Threshold (Minutes)"
                baseClassName="w-full"
                type="number"
              />
              <InputField
                control={form.control}
                name="undertimeThresholdMinutes"
                label="Undertime Threshold (Minutes)"
                baseClassName="w-full"
                type="number"
              />
              <InputField
                control={form.control}
                name="overTimeLimit"
                label="Overtime Limit (Hours)"
                baseClassName="w-full"
                type="number"
              />
              <InputField
                control={form.control}
                name="holidayOTLimit"
                label="Holiday Overtime Limit (Hours)"
                baseClassName="w-full"
                type="number"
              />
              <InputField
                control={form.control}
                name="specialOTLimit"
                label="Special Overtime Limit (Hours)"
                baseClassName="w-full"
                type="number"
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active Status</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Enable or disable this attendance policy
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="flex flex-row gap-2 -mt-4">
              <ButtonLoading
                type="submit"
                className="bg-green-700 text-white text-sm px-2 rounded-sm py-2"
                loading={isPending}
                text={mode === 'edit' ? 'Update' : 'Create'}
                icon={<BookIcon className="size-4" />}
              />
              <SheetClose
                type="button"
                className="bg-rose-700 text-white text-sm px-2 rounded-sm py-2 flex items-center gap-2"
              >
                <XIcon className="size-4" />
                Cancel
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default AttendancePolicyForm
