import ButtonLoading from '@/components/custom/buttons/button-loading'
import { InputField } from '@/components/custom/inputs'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { Form } from '@/components/ui/form'
import {
  unifiedEmployeeInfoSchema,
  type UnifiedEmployeeInfoPayload,
} from '@/features/employees/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, Send } from 'iconsax-reactjs'
import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import EmployeeListAppointment from './employee-list-appointment'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import DatePickerField from '@/components/custom/inputs/DatePickerField'
import { useUpdateEmployeeInformationMutation } from '@/features/employees/hooks/useOtherInfo'
import SwitchInput from '@/components/custom/misc/SwitchInput'
import CollapsibleContainer from '@/components/custom/containers/collapsible-container'
import { Button } from '@/components/ui/button'
import { StackRow } from '@/components/custom/layouts'
import { XIcon } from 'lucide-react'


const EmployeeFormCompany = () => {

  const [isDisabled, setIsDisabled] = useState(true)
  const { employeeId, employeeInitials, employeePersonalInfo } = useEmployeeProfileContext()

  const initialValues = employeePersonalInfo?.company
  const { mutateAsync: createEmployeeAppointment } =
    useUpdateEmployeeInformationMutation()

  const form = useForm<UnifiedEmployeeInfoPayload>({
    resolver: zodResolver(unifiedEmployeeInfoSchema) as Resolver<UnifiedEmployeeInfoPayload>,
    defaultValues: {
      entityType: 'Company' as const,
      companyDelegate: {
        emailAddress: '',
        localNo: '',
        designationId: '',
        departmentId: '',
        companyId: '',
        branchId: '',
        managerId: null,
        accreditation: null,
        deAccreditation: null,
      }
    } as UnifiedEmployeeInfoPayload,
  })

  useEffect(() => {
    if (initialValues) {
      form.reset({
        entityType: 'Company' as const,
        companyDelegate: {
          emailAddress: initialValues.emailAddress,
          localNo: initialValues.localNo,
          designationId: initialValues.designationId,
          departmentId: initialValues.departmentId,
          companyId: initialValues.companyId,
          branchId: initialValues.branchId,
          managerId: initialValues.managerId || null,
          accreditation: initialValues.accreditedDate ? new Date(initialValues.accreditedDate) : null,
          deAccreditation: initialValues.deAccreditedDate ? new Date(initialValues.deAccreditedDate) : null,
        }
      } as UnifiedEmployeeInfoPayload)
    }
  }, [initialValues, form])

  console.log(initialValues)
  const onSubmit = async (data: UnifiedEmployeeInfoPayload) => {
    try {
      await createEmployeeAppointment({ id: employeeId!, data })
      toast.success('Employee company information updated successfully')
      form.reset()
      setIsDisabled(true)
    } catch (error) {
      toast.error('Failed to update employee company information', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  }

  return (
    <CollapsibleContainer title="company information">
      <Form {...form}>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SwitchInput
            inputComponent={
              <InputField
                control={form.control}
                name="companyDelegate.emailAddress"
                label="Company Email"
                baseClassName="w-full"
                disabled={isDisabled}
                placeholder="Ex. it@crossworldmarine.com"
              />
            }
            label="Company Email"
            readMode={isDisabled}
            value={initialValues?.emailAddress}
          />
          <SwitchInput
            inputComponent={
              <InputField
                control={form.control}
                name="companyDelegate.localNo"
                label="Local No"
                baseClassName="w-full"
                disabled={isDisabled}
                placeholder="Ex. 123"
              />
            }
            label="Local No."
            readMode={isDisabled}
            value={initialValues?.localNo}
          />
          <SwitchInput
            inputComponent={
              <DropdownField
                control={form.control}
                name="companyDelegate.designationId"
                label="Designation"
                data={employeeInitials?.designations}
                baseClassName="w-full"
                disabled={isDisabled}
                placeholder="Select Designation"
              />
            }
            label="Designation"
            readMode={isDisabled}
            value={initialValues?.designationName}
          />
          <SwitchInput
            inputComponent={
              <DropdownField
                control={form.control}
                name="companyDelegate.departmentId"
                label="Department"
                data={employeeInitials?.departments}
                baseClassName="w-full"
                disabled={isDisabled}
                placeholder="Select Department"
              />
            }
            label="Department"
            readMode={isDisabled}
            value={initialValues?.departmentName}
          />
          <SwitchInput
            inputComponent={
              <DropdownField
                control={form.control}
                name="companyDelegate.companyId"
                label="Company"
                data={employeeInitials?.companies}
                baseClassName="w-full"
                disabled={isDisabled}
                placeholder="Select Company"
              />
            }
            label="Company"
            readMode={isDisabled}
            value={initialValues?.companyName}
          />
          <SwitchInput
            inputComponent={
              <DropdownField
                control={form.control}
                name="companyDelegate.branchId"
                label="Branch"
                data={employeeInitials?.branches}
                baseClassName="w-full"
                disabled={isDisabled}
                placeholder="Select Branch"
              />
            }
            label="Branch"
            readMode={isDisabled}
            value={initialValues?.branchName}
          />
          <SwitchInput
            inputComponent={
              <EmployeeListAppointment
                form={form}
                initialManagerName={initialValues?.managerName}
              />
            }
            label="Manager"
            readMode={isDisabled}
            value={initialValues?.managerName}
          />

          <SwitchInput
            inputComponent={
              <DatePickerField
                control={form.control}
                name="companyDelegate.accreditation"
                label="Accreditation"
                placeholder="Select Accreditation"
              />
            }
            label="Accreditation"
            readMode={isDisabled}
            value={initialValues?.accreditedDate ? new Date(initialValues.accreditedDate).toLocaleDateString() : undefined}
          />
          <SwitchInput
            inputComponent={
              <DatePickerField
                control={form.control}
                name="companyDelegate.deAccreditation"
                label="Deaccreditation"
                placeholder="Select Deaccreditation"
              />
            }
            label="Deaccreditation"
            readMode={isDisabled}
            value={initialValues?.deAccreditedDate ? new Date(initialValues.deAccreditedDate).toLocaleDateString() : undefined}
          />
        </div>
        <StackRow className='gap-2'>
          {isDisabled ? (
            <Button
              variant={'outline'}
              type="button"
              className='h-11 font-sans uppercase text-sm'
              onClick={() => setIsDisabled(false)} // Set to false to start editing
            >
              <Edit2 variant={'Bold'} size={18} />
              Edit Company Information
            </Button>
          ) : (
            <>
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="button"
                text="Update Company Information"
                variant="outline"
                icon={<Send size={18} variant={'Bold'} />}
                className='h-11 font-sans uppercase text-sm'
                onClick={form.handleSubmit(onSubmit, (errors) => {
                  console.error('Validation errors:', errors)
                  toast.error('Validation failed. Please check the fields.', {
                    description: Object.entries(errors).map(([key, val]) => `${key}: ${val.message || 'Invalid value'}`).join(', ')
                  })
                })}
              />
              <Button
                variant={'destructive'}
                type="button"
                className='h-11 font-sans uppercase text-sm'
                onClick={() => setIsDisabled(true)}
              >
                <XIcon />
                Cancel
              </Button>
            </>
          )}
        </StackRow>
      </Form>
    </CollapsibleContainer >
  )
}

export default EmployeeFormCompany
