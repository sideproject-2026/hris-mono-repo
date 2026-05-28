import ButtonLoading from '@/components/custom/buttons/button-loading'
import { InputField } from '@/components/custom/inputs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Send } from 'iconsax-reactjs'
import { Plus } from 'lucide-react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  unifiedEmployeeInfoSchema,
  type UnifiedEmployeeInfoPayload,
} from '@/features/employees/types/schema'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'

import { useEffect, useMemo, useState } from 'react'
import TextareaField from '@/components/custom/inputs/TextareaField'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { useUpdateEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'

interface EmployeeFormWorkExperienceProps {
  trigger?: React.ReactNode
  initialValues?: EmployeeWorkExperienceTypes
}

const EmployeeFormWorkExperience = ({
  trigger,
  initialValues,
}: EmployeeFormWorkExperienceProps) => {
  const { employeeId } = useEmployeeProfileContext()

  const { mutateAsync: createWorkExperience } = useUpdateEmployeeInformationMutation()

  const [open, setOpen] = useState(false)
  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      entityType: 'WorkExperience' as const,
      workExperience: {
        companyName: initialValues?.companyName ?? '',
        address: initialValues?.address ?? '',
        jobTitle: initialValues?.jobTitle ?? '',
        startDate: initialValues?.startDate
          ? new Date(initialValues.startDate)
          : new Date(),
        endDate: initialValues?.endDate
          ? new Date(initialValues.endDate)
          : new Date(),
        reason: initialValues?.reason ?? '',
      }
    }),
    [initialValues],
  )

  const form = useForm<UnifiedEmployeeInfoPayload>({
    resolver: zodResolver(
      unifiedEmployeeInfoSchema,
    ) as Resolver<UnifiedEmployeeInfoPayload>,
    defaultValues,
  })

  useEffect(() => {
    if (!open) return
    form.reset(defaultValues as UnifiedEmployeeInfoPayload)
  }, [defaultValues, form, open])

  const onSubmit = async (data: UnifiedEmployeeInfoPayload) => {
    try {
      await createWorkExperience({ id: employeeId ?? '', data })
      toast.success(
        isEditMode
          ? 'Employee work experience updated successfully'
          : 'Employee work experience added successfully',
      )
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error(
        isEditMode
          ? 'Failed to update employee work experience'
          : 'Failed to create employee work experience',
        {
          description: getErrorMessage(error),
          style: { color: 'red' },
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost">
            <Plus />
            ADD WORK EXPERIENCE
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? 'Edit Employee Work Experience'
              : 'Add Employee Work Experience'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update employee work experience information'
              : 'Add employee work experience information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              name="workExperience.companyName"
              control={form.control}
              placeholder="Enter company name"
              label="Company Name"
            />
            <InputField
              name="workExperience.address"
              control={form.control}
              placeholder="Enter address"
              label="Address"
            />
            <InputField
              name="workExperience.jobTitle"
              control={form.control}
              placeholder="Enter job title"
              label="Job Title"
            />
            <div className="flex gap-2">
              <InputField
                name="workExperience.startDate"
                control={form.control}
                placeholder="Enter start date"
                label="Start Date"
                type="date"
                baseClassName="w-full"
              />
              <InputField
                name="workExperience.endDate"
                control={form.control}
                placeholder="Enter end date"
                label="End Date"
                type="date"
                baseClassName="w-full"
              />
            </div>
            <TextareaField
              name="workExperience.reason"
              control={form.control}
              placeholder="Enter reason"
              label="Reason"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="submit"
                text={
                  isEditMode ? 'Update Work Experience' : 'Save Work Experience'
                }
                variant="default"
                icon={<Send size={18} variant={'Bold'} />}
                className="h-10 font-normal uppercase"
              />
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 font-normal uppercase"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeFormWorkExperience
