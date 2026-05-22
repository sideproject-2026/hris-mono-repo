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
import {
  employeeEmergencyContactSchema,
  type EmployeeEmergencyContactSchemaTypes,
} from '@/features/employees/types/schema'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { RELATION_DATA } from '@/features/employees/types/constant'
import { InputField } from '@/components/custom/inputs'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Send } from 'iconsax-reactjs'
import { employeeEmergencyContactMutation } from '@/features/employees/hooks/useEmployee'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'

interface EmployeeFormEmergencyProps {
  trigger?: React.ReactNode
  initialValues?: EmployeeEmergencyContactTypes
}

const EmployeeFormEmergency = ({
  trigger,
  initialValues,
}: EmployeeFormEmergencyProps) => {
  const { employeeId } = useEmployeeProfileContext()
  const { mutateAsync: createEmergencyContact } =
    employeeEmergencyContactMutation()

  const [open, setOpen] = useState(false)
  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      id: initialValues?.id ?? '',
      relation: initialValues?.relation ?? '',
      contactPerson: initialValues?.contactPerson ?? '',
      address: initialValues?.address ?? '',
      telNo: initialValues?.telNo ?? '',
    }),
    [initialValues],
  )

  const form = useForm<EmployeeEmergencyContactSchemaTypes>({
    resolver: zodResolver(employeeEmergencyContactSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!open) return
    form.reset(defaultValues)
  }, [defaultValues, form, open])

  const onSubmit = async (data: EmployeeEmergencyContactSchemaTypes) => {
    try {
      await createEmergencyContact({ id: employeeId ?? '', data })
      toast.success(
        isEditMode
          ? 'Employee emergency contact updated successfully'
          : 'Employee emergency contact added successfully',
      )
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error(
        isEditMode
          ? 'Failed to update employee emergency contact'
          : 'Failed to create employee emergency contact',
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
            ADD EMERGENCY CONTACT
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? 'Edit Employee Emergency Contact'
              : 'Add Employee Emergency Contact'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update employee emergency contact information'
              : 'Add employee emergency contact information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DropdownField
              name="relation"
              control={form.control}
              data={RELATION_DATA}
              label="Relation"
              placeholder="Select relation"
            />
            <InputField
              name="contactPerson"
              control={form.control}
              placeholder="Enter contact person"
              label="Contact Person"
            />
            <InputField
              name="address"
              control={form.control}
              placeholder="Enter address"
              label="Address"
            />
            <InputField
              name="telNo"
              control={form.control}
              placeholder="Enter tel no or mobile no"
              label="Tel No / Mobile No."
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="submit"
                text={
                  isEditMode
                    ? 'Update Emergency Contact'
                    : 'Save Emergency Contact'
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

export default EmployeeFormEmergency
