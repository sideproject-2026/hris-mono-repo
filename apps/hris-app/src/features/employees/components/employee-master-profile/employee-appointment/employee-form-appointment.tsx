import ButtonLoading from '@/components/custom/buttons/button-loading'
import { InputField } from '@/components/custom/inputs'
import ComboboxField from '@/components/custom/inputs/ComboboxField'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { Form } from '@/components/ui/form'
import { employeeAppointmentMutation } from '@/features/employees/hooks/useEmployee'
import {
  employeeAppointmentSchema,
  type EmployeeAppointmentSchemaTypes,
} from '@/features/employees/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'iconsax-reactjs'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
    employeeAppointmentMutation()

  const form = useForm<EmployeeAppointmentSchemaTypes>({
    resolver: zodResolver(employeeAppointmentSchema),
    defaultValues: {
      emailAddress: '',
      localNo: '',
      designationId: undefined,
      departmentId: undefined,
      companyId: undefined,
      branchId: undefined,
      managerId: '',
      accreditation: undefined,
      deaccreditation: undefined,
    },
  })

  useEffect(() => {
    if (initialValues) {
      form.reset({
        emailAddress: initialValues.emailAddress,
        localNo: initialValues.localNo,
        designationId: initialValues.designationId,
        departmentId: initialValues.departmentId,
        companyId: initialValues.companyId,
        branchId: initialValues.branchId,
        managerId: initialValues.managerId,
        accreditation: initialValues.accreditedDate,
        deaccreditation: initialValues.deAccreditedDate,
      })
    }
  }, [initialValues, form])

  const onSubmit = async (data: EmployeeAppointmentSchemaTypes) => {
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
              name="emailAddress"
              label="Email Address"
              type="email"
              placeholder="Email Address"
            />
            <InputField
              control={form.control}
              name="localNo"
              label="Local No"
              type="text"
              placeholder="Local No"
            />
            <ComboboxField
              control={form.control}
              name="designationId"
              label="Designation"
              placeholder="Select Designation"
              data={employeeInitials?.designations}
            />
            <ComboboxField
              control={form.control}
              name="departmentId"
              label="Department"
              placeholder="Select Department"
              data={employeeInitials?.departments}
            />
            <DropdownField
              control={form.control}
              name="companyId"
              label="Company"
              placeholder="Select Company"
              data={employeeInitials?.companies}
            />
            <DropdownField
              control={form.control}
              name="branchId"
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
                name="accreditation"
                label="Accreditation"
                placeholder="Select Accreditation"
              />
              <DatePickerField
                control={form.control}
                name="deaccreditation"
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
