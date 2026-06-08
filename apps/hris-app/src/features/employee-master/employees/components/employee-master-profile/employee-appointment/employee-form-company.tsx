import {
  ButtonLoading,
  InputField,
  DropdownField,
  Form,
  SwitchInput,
  CollapsibleContainer,
  Button,
  StackRow,
  DatePickerField
} from '@hris/shared-ui'
import {
  type UnifiedEmployeeInfoPayload,
} from '@/features/employee-master/employees/types/schema'
import { Edit2, Send } from 'iconsax-reactjs'
import { useState } from 'react'
import EmployeeListAppointment from './employee-list-appointment'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { XIcon } from 'lucide-react'
import { useCompanyMutation } from '../../../hooks/mutations/useCompanyMutation'
import { Label } from '@/components/ui/label'


const EmployeeFormCompany = () => {

  const [isDisabled, setIsDisabled] = useState(true)
  const { employeeId, employeeInitials, employeePersonalInfo } = useEmployeeProfileContext()

  
  const {form,onSubmit} = useCompanyMutation({
    id: employeeId, 
    defaultValue: employeePersonalInfo,
    onSuccess: (response) => {
      toast.success('Employee company information updated successfully');
      setIsDisabled(true)
    },
    onError: (error) => {
       toast.error('Failed to update employee company information', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
    })
 

  return (
    <CollapsibleContainer title="company information">
      <Form {...form}>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Label>
            {employeePersonalInfo?.employeeCode}
          </Label>
          <InputField
              control={form.control}
              name="localNo"
              label="Local No"
              baseClassName="w-full"
              disabled={isDisabled}
              placeholder="Ex. 123"
          />
          <DropdownField
            control={form.control}
            name="rank"
            label="Rank"
            data={employeeInitials?.ranks ?? []}
            baseClassName="w-full"
            disabled={isDisabled}
            placeholder="Select Rank"
          />
          <DropdownField
              control={form.control}
              name="designationCode"
              label="Designation"
              data={employeeInitials?.designations ?? []}
              baseClassName="w-full"
              disabled={isDisabled}
              placeholder="Select Designation"
          />
          <DropdownField
            control={form.control}
            name="departmentCode"
            label="Department"
            data={employeeInitials?.departments}
            baseClassName="w-full"
            disabled={isDisabled}
            placeholder="Select Department"
          />
           <DropdownField
              control={form.control}
              name="companyCode"
              label="Company"
              data={employeeInitials?.companies ?? []}
              baseClassName="w-full"
              disabled={isDisabled}
              placeholder="Select Company"
            />

            <DropdownField
              control={form.control}
              name="branch"
              label="Branch"
              data={employeeInitials?.branches ?? []}
              baseClassName="w-full"
              disabled={isDisabled}
              placeholder="Select Branch"
            />

            {/* <EmployeeListAppointment
                form={form}
                initialManagerName={init ?? []}
              /> */}

              <DatePickerField
              control={form.control}
              name="dateHired"
              label="Date Hired"
              placeholder="Select Date Hired"
              disabled={isDisabled}
            />

            <DatePickerField
              control={form.control}
              name="probStartDate"
              label="Prob. Start Date"
              placeholder="Select Prob. Start Date"
              disabled={isDisabled}
            />

            <DatePickerField
              control={form.control}
              name="probEndDate"
              label="Prob. End Date"
              placeholder="Select Prob. End Date"
              disabled={isDisabled}
            />

            <DatePickerField
                control={form.control}
                name="accreditation"
                label="Accreditation"
                placeholder="Select Accreditation"
                disabled={isDisabled}
              />

            <DatePickerField
              control={form.control}
              name="deaccreditation"
              label="Deaccreditation"
              placeholder="Select Deaccreditation"
              disabled={isDisabled}
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
