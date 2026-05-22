import { useEffect, useMemo, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import {
  employeeEducationSchema,
  type EmployeeEducationSchemaTypes,
} from '@/features/employees/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { InputField } from '@/components/custom/inputs'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Send } from 'iconsax-reactjs'
import { EDUCATION_DATA } from '@/features/employees/types/constant'

import { employeeEducationMutation } from '@/features/employees/hooks/useOtherInfo'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'

interface EmployeeFormEducationProps {
  trigger?: React.ReactNode
  initialValues?: EmployeeEducationTypes
}

const EmployeeFormEducation = ({
  trigger,
  initialValues,
}: EmployeeFormEducationProps) => {
  const { employeeId, employeeInitials } = useEmployeeProfileContext()
  const { mutateAsync: createEmployeeEducation } = employeeEducationMutation()

  const [open, setOpen] = useState(false)
  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      id: initialValues?.id ?? '',
      level: initialValues?.educationLevel ?? 0,
      school: initialValues?.school ?? '',
      course: initialValues?.course ?? '',
      yearFrom: initialValues?.yearFrom ?? 0,
      yearTo: initialValues?.yearTo ?? 0,
      awards: initialValues?.awards ?? '',
    }),
    [initialValues],
  )

  const form = useForm<EmployeeEducationSchemaTypes>({
    resolver: zodResolver(
      employeeEducationSchema,
    ) as Resolver<EmployeeEducationSchemaTypes>,
    defaultValues,
  })

  useEffect(() => {
    if (!open) return
    form.reset(defaultValues)
  }, [defaultValues, form, open])

  const onSubmit = async (data: EmployeeEducationSchemaTypes) => {
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
              name="level"
              control={form.control}
              data={employeeInitials?.educationalLevels}
              label="Level"
              placeholder="Select level"
            />
            <InputField
              name="school"
              control={form.control}
              placeholder="Enter school"
              label="School"
            />
            <InputField
              name="course"
              control={form.control}
              placeholder="Enter course"
              label="Course"
            />
            <div className="flex gap-2 w-full">
              <InputField
                name="yearFrom"
                control={form.control}
                placeholder="Enter year from"
                label="Year From"
                type="number"
                baseClassName="w-full"
              />
              <InputField
                name="yearTo"
                control={form.control}
                placeholder="Enter year to"
                label="Year To"
                type="number"
                baseClassName="w-full!"
              />
            </div>
            <InputField
              name="awards"
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
