import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  DropdownField,
  InputField,
  ButtonLoading,
  Button
} from '@hris/shared-ui'
import {
  unifiedEmployeeInfoSchema,
  type UnifiedEmployeeInfoPayload,
} from '@/features/employees/types/schema'
import { Plus } from 'lucide-react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RELATION_DATA } from '@/features/employees/types/constant'
import { Send } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { useUpdateEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'

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
    useUpdateEmployeeInformationMutation()

  const [open, setOpen] = useState(false)
  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      entityType: 'EmergencyContact' as const,
      emergencyContact: {
        relation: initialValues?.relation ?? '',
        contactPerson: initialValues?.contactPerson ?? '',
        address: initialValues?.address ?? '',
        telNo: initialValues?.telNo ?? '',
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
              name="emergencyContact.relation"
              control={form.control}
              data={RELATION_DATA}
              label="Relation"
              placeholder="Select relation"
            />
            <InputField
              name="emergencyContact.contactPerson"
              control={form.control}
              placeholder="Enter contact person"
              label="Contact Person"
            />
            <InputField
              name="emergencyContact.address"
              control={form.control}
              placeholder="Enter address"
              label="Address"
            />
            <InputField
              name="emergencyContact.telNo"
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
