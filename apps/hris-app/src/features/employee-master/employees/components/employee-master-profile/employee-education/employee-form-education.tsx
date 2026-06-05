import { useEffect, useMemo, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import {
  unifiedEmployeeInfoSchema,
  type UnifiedEmployeeInfoPayload,
} from '@/features/employee-master/employees/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  DropdownField,
  InputField,
  ButtonLoading,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@hris/shared-ui'
import { Plus } from 'lucide-react'
import { Send } from 'iconsax-reactjs'

import { useUpdateEmployeeInformationMutation } from '@/features/employee-master/employees/hooks/useOtherInfo'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useOtherInformationContext } from '../other-information-provider'


interface EmployeeFormEducationProps {
  trigger?: React.ReactNode
  initialValues?: EmployeeEducationTypes
}

const EmployeeFormEducation = ({
  trigger,
  initialValues,
}: EmployeeFormEducationProps) => {
  const { employeeId, initialData } = useOtherInformationContext()
  const { mutateAsync: createEmployeeEducation } = useUpdateEmployeeInformationMutation()

  const [open, setOpen] = useState(false)
  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      entityType: 'Education' as const,
      education: {
        level: initialValues?.educationLevel ? Number(initialValues.educationLevel) : undefined,
        school: initialValues?.school ?? '',
        course: initialValues?.course ?? '',
        yearFrom: initialValues?.yearFrom ? Number(initialValues.yearFrom) : undefined,
        yearTo: initialValues?.yearTo ? Number(initialValues.yearTo) : undefined,
        awards: initialValues?.awards ?? '',
      }
    }),
    [initialValues],
  )

  const form = useForm<UnifiedEmployeeInfoPayload>({
    resolver: zodResolver(
      unifiedEmployeeInfoSchema,
    ) as Resolver<UnifiedEmployeeInfoPayload>,
    defaultValues: defaultValues as UnifiedEmployeeInfoPayload,
  })

  useEffect(() => {
    if (!open) return
    form.reset(defaultValues as UnifiedEmployeeInfoPayload)
  }, [defaultValues, form, open])

  const onSubmit = async (data: UnifiedEmployeeInfoPayload) => {
    try {
      await createEmployeeEducation({ id: employeeId ?? '', data })
      toast.success(
        isEditMode
          ? 'Employee education updated successfully'
          : 'Employee education added successfully',
      )
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error(
        isEditMode
          ? 'Failed to update employee education'
          : 'Failed to create employee education',
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
            ADD EDUCATION
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Education' : 'Add Education'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update education information'
              : 'Add education information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <DropdownField
              name="education.level"
              control={form.control}
              data={initialData?.educationalLevels}
              label="Level"
              placeholder="Select level"
            />
            <InputField
              name="education.school"
              control={form.control}
              placeholder="Enter school"
              label="School"
            />
            <InputField
              name="education.course"
              control={form.control}
              placeholder="Enter course"
              label="Course"
            />
            <div className="flex gap-2 w-full">
              <InputField
                name="education.yearFrom"
                control={form.control}
                placeholder="Enter year from"
                label="Year From"
                type="number"
                baseClassName="w-full"
              />
              <InputField
                name="education.yearTo"
                control={form.control}
                placeholder="Enter year to"
                label="Year To"
                type="number"
                baseClassName="w-full!"
              />
            </div>
            <InputField
              name="education.awards"
              control={form.control}
              placeholder="Enter awards"
              label="Awards"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="submit"
                text={isEditMode ? 'Update Education' : 'Save Education'}
                variant="default"
                icon={<Send size={18} variant={'Bold'} />}
                className="h-10"
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

export default EmployeeFormEducation
