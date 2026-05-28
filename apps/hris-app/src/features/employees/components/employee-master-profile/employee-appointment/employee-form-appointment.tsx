import ButtonLoading from '@/components/custom/buttons/button-loading'
import { InputField } from '@/components/custom/inputs'
import ComboboxField from '@/components/custom/inputs/ComboboxField'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { Form } from '@/components/ui/form'
import {
  unifiedEmployeeInfoSchema,
  type UnifiedEmployeeInfoPayload,
} from '@/features/employees/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'iconsax-reactjs'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import EmployeeListAppointment from './employee-list-appointment'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import DatePickerField from '@/components/custom/inputs/DatePickerField'
import { StackRow } from '@/components/custom/layouts'
import { useUpdateEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'

interface EmployeeFormAppointmentProps {
  isOpen: boolean
  onClose: () => void
  initialValues?: Company
}
const EmployeeFormAppointment = ({
  isOpen,
  onClose,
  initialValues,
}: EmployeeFormAppointmentProps) => {
  const { employeeId, employeeInitials } = useEmployeeProfileContext()

  const { mutateAsync: createEmployeeAppointment } =
    useUpdateEmployeeInformationMutation()

  const form = useForm<UnifiedEmployeeInfoPayload>({
    resolver: zodResolver(unifiedEmployeeInfoSchema) as Resolver<UnifiedEmployeeInfoPayload>,
    defaultValues: {
      entityType: 'Company' as const,
      company: {
        emailAddress: '',
        localNo: '',
        designationId: '',
        departmentId: '',
        companyId: '',
        branchId: '',
        managerId: '',
        accreditation: undefined,
        deaccreditation: undefined,
      }
    } as UnifiedEmployeeInfoPayload,
  })

  useEffect(() => {
    if (initialValues) {
      form.reset({
        entityType: 'Company' as const,
        company: {
          emailAddress: initialValues.emailAddress,
          localNo: initialValues.localNo,
          designationId: initialValues.designationId,
          departmentId: initialValues.departmentId,
          companyId: initialValues.companyId,
          branchId: initialValues.branchId,
          managerId: initialValues.managerId,
          accreditation: initialValues.accreditedDate,
          deaccreditation: initialValues.deAccreditedDate,
        }
      } as UnifiedEmployeeInfoPayload)
    }
  }, [initialValues, form])

  const onSubmit = async (data: UnifiedEmployeeInfoPayload) => {
    try {
      await createEmployeeAppointment({ id: employeeId!, data })
      toast.success('Employee appointment added successfully')
      form.reset()
      onClose()
    } catch (error) {
      toast.error('Failed to create employee appointment', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-[600px]!">
        <SheetHeader>
          <SheetTitle>Employee Appointment</SheetTitle>
          <SheetDescription>
            Assign employee to the department, company and etc
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className="space-y-4 p-5 -mt-5">
            <InputField
              control={form.control}
              name="company.emailAddress"
              label="Email Address"
              type="email"
              placeholder="Email Address"
            />
            <InputField
              control={form.control}
              name="company.localNo"
              label="Local No"
              type="text"
              placeholder="Local No"
            />
            <ComboboxField
              control={form.control}
              name="company.designationId"
              label="Designation"
              placeholder="Select Designation"
              data={employeeInitials?.designations}
            />
            <ComboboxField
              control={form.control}
              name="company.departmentId"
              label="Department"
              placeholder="Select Department"
              data={employeeInitials?.departments}
            />
            <DropdownField
              control={form.control}
              name="company.companyId"
              label="Company"
              placeholder="Select Company"
              data={employeeInitials?.companies}
            />
            <DropdownField
              control={form.control}
              name="company.branchId"
              label="Branch"
              placeholder="Select Branch"
              data={employeeInitials?.branches}
            />
            <EmployeeListAppointment
              form={form}
              initialManagerName={initialValues?.managerName}
            />
            <StackRow>
              <DatePickerField
                control={form.control}
                name="company.accreditation"
                label="Accreditation"
                placeholder="Select Accreditation"
              />
              <DatePickerField
                control={form.control}
                name="company.deaccreditation"
                label="Deaccreditation"
                placeholder="Select Deaccreditation"
              />
            </StackRow>
            <ButtonLoading
              loading={form.formState.isSubmitting}
              type="button"
              text="SAVE APPOINTMENT"
              variant="default"
              icon={<Send size={18} variant={'Bold'} />}
              className="h-11 font-normal"
              onClick={form.handleSubmit(onSubmit)}
            />
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EmployeeFormAppointment
