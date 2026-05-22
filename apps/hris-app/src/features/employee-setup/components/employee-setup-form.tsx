import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { employeeSetupSchema, type EmployeeSetupValues } from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useQuery } from '@tanstack/react-query'
import {
  initialQueryOptions,
  useCreateUpdateMutationAsync,
} from '../hooks/useEmployeeSetup'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Edit2, Send } from 'iconsax-reactjs'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

interface EmployeeSetupFormProps {
  id: string
  fullName: string
  department: string
  scheduleId: string
  attendancePolicyId: string
}
const EmployeeSetupForm = ({
  id,
  scheduleId,
  attendancePolicyId,
  fullName,
  department,
}: EmployeeSetupFormProps) => {
  const { data } = useQuery({
    ...initialQueryOptions(),
    select: (response) => response.data,
  })

  const { mutateAsync: updateEmployeeSetup, isPending } =
    useCreateUpdateMutationAsync()

  const form = useForm<EmployeeSetupValues>({
    resolver: zodResolver(employeeSetupSchema),
    defaultValues: {
      scheduleId: scheduleId,
      attendancePolicyId: attendancePolicyId,
    },
  })

  const onSubmit = async (data: EmployeeSetupValues) => {
    try {
      await updateEmployeeSetup({ id: id, data })
      toast.success('Employee setup updated successfully')
    } catch (error) {
      toast.error('Failed to update employee setup')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Edit2 size="20px" variant="Bold" />
          <span className="text-md font-sans font-normal">
            Edit Schedule & Policy
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Employee Setup Schedule & Policy Form</DialogTitle>
          <DialogDescription>
            Setup employee schedule and policy for employee
          </DialogDescription>
        </DialogHeader>
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Employee Information</p>
          <div className="flex flex-row gap-2">
            <p className="text-sm font-medium">
              {fullName} {'-'}
            </p>
            <p className="text-xs text-muted-foreground font-semibold">
              {department}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DropdownField
              control={form.control}
              name="scheduleId"
              label="Schedule"
              data={data?.workSchedules || []}
            />
            <DropdownField
              control={form.control}
              name="attendancePolicyId"
              label="Policy"
              data={data?.policies || []}
            />

            <ButtonLoading
              type="submit"
              text="Save Setup"
              variant="default"
              icon={<Send variant="Bold" size="20px" />}
              loading={isPending}
              className="w-full h-11"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeSetupForm
