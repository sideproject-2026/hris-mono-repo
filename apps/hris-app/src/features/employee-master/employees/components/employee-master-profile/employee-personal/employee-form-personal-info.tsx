import WebCamCapture from '@/features/employee-master/employees/components/employee-master-profile/employee-personal/camera/webcam-capture'
import {
  InputField,
  GroupContainer,
  DropdownField,
  Form,
  NavMenu,
  Separator,
  ButtonLoading,
  Button,
  StackCol,
  StackRow,
  CollapsibleContainer,
  DatePickerField,
  Input,
} from '@hris/shared-ui'


import { toast } from 'sonner'
import { PREFIX_DATA, RELIGION_DATA, COUNTRY_DATA } from '../../../types/constant'
import { Send } from 'iconsax-reactjs'
import { Calendar, X } from 'lucide-react'
import { useEmployeeProfileContext } from '../providers/employee-personal-provider'

import { ROUTE } from '@/types/router'
import { memo, useEffect, useState } from 'react'
import { getErrorMessage } from '@/lib/utils'

import { useNavigate } from '@tanstack/react-router'
import ViewPhoto from './camera/view-photo'
import { useEmployeeMutation } from '../../../hooks/mutations/useEmployeeMutation'
import { mapEmployeeToFormValues } from '../../../hooks/queries/useEmployee'
import { Controller } from 'react-hook-form'



const EmployeeFormPersonalInfo = () => {

  const {
    employeeInitials,
    employeePersonalInfo: info,
    isCaptured,
    createMode,
    employeeId,
  } = useEmployeeProfileContext()

  const navigate = useNavigate()

  const { onSubmit,form} = useEmployeeMutation({
    defaultValue: info,
    onSuccess: (response) => {
      toast.success('Employee setup created/update successfully')
      if (createMode) {
        const id = response?.data ?? "";
        navigate({
          to: ROUTE.EMPLOYEE_PROFILE_ROUTE(id!),
        })
      }
    },
    onError: (error) => {
      toast.error('Failed to create employee setup', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  })

  useEffect(() => {
      if (info) {
        const mapEmployee = mapEmployeeToFormValues(info)
        form.reset(mapEmployee)
      }
    }, [info])



  
  const [isEditing, setIsEditing] = useState(false)

  
  
 
  const isDisabled = !!info && !isEditing
  const showFields = !createMode && !isEditing

  const getButtonText = () => {
    if (!info) return 'SAVE EMPLOYEE PROFILE'
    return isEditing ? 'UPDATE EMPLOYEE PROFILE' : 'EDIT EMPLOYEE PROFILE'
  }


  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-2 -mt-2 w-full"
      >
        <StackRow gap="sm" className="w-full">
          <StackCol>
            {showFields && (
              <>
                <StackCol className="w-[350px]" gap="sm">
                  <GroupContainer title="profile picture">
                    <ViewPhoto
                      employeeId={info?.id || ''}
                      hasPhoto={isCaptured}
                    />
                    <WebCamCapture />
                  </GroupContainer>
                </StackCol>
                {/* <EmployeeStatus employeeSummary={info!} /> */}
              </>
            )}
          </StackCol>
          <StackCol className="w-full">
            <NavMenu className="bg-transparent">
              <ButtonLoading
                loading={form.formState.isSubmitting}
                icon={<Send variant="Bold" size={24} color="#004663" />}
                type={!info || isEditing ? 'submit' : 'button'}
                variant="ghost"
                text={getButtonText()}
                onClick={(e) => {
                  if (info && !isEditing) {
                    e.preventDefault()
                    setIsEditing(true)
                  }
                }}
              />
              <Separator orientation="vertical" />
              {isEditing && (
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  type="button"
                  className="text-md font-normal"
                >
                  <X />
                  CLOSE
                </Button>
              )}
            </NavMenu>

            {/* Employee Information*/}

            <CollapsibleContainer
              title="employment information"
              baseClassName="w-full"
            >
              <StackRow className="mt-5" gap="sm">
                <DropdownField
                  control={form.control}
                  name="type"
                  label="Employee Type"
                  valueType='string'
                  data={employeeInitials?.types ?? []}
                  baseClassName="w-full"
                  placeholder={`${form.getValues()}`}
                  disabled={isDisabled}
                />

                {/* <InputField
                control={form.control}
                name="type"
                /> */}
             
              </StackRow>
            </CollapsibleContainer>
            <CollapsibleContainer
              title="personal information"
              baseClassName="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full items-center mt-5">
                <DropdownField
                  control={form.control}
                  name="prefix"
                  label="Prefix"
                  placeholder="Select Prefix"
                  data={PREFIX_DATA}
                  baseClassName="w-[120px]"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="lastName"
                  label="Last Name *"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Last Name"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="firstName"
                  label="First Name *"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter First Name"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="middleName"
                  label="Middle Name *"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Middle Name"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="suffix"
                  label="Suffix"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Suffix"
                  disabled={isDisabled}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full items-center">
                <DropdownField
                  control={form.control}
                  name="gender"
                  label="Gender *"
                  placeholder="Select Gender"
                  data={employeeInitials?.genders ?? []}
                  baseClassName="w-full"
                  disabled={isDisabled}
                />
                <DatePickerField
                  control={form.control}
                  name="birthday"
                  label="Date of Birth *"
                  baseClassName="w-full"
                  placeholder="Select Date of Birth"
                  disabled={isDisabled}
                  icon={<Calendar variant="Bold" size={16} />}
                />
                <InputField
                  control={form.control}
                  name="birthPlace"
                  label="Place of Birth *"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Place of Birth"
                  disabled={isDisabled}
                />
                <DropdownField
                  control={form.control}
                  name="nationality"
                  label="Nationality *"
                  data={employeeInitials?.nationalities ?? []}
                  baseClassName="w-full"
                  placeholder="Select Nationality"
                  disabled={isDisabled}
                />
                <DropdownField
                  control={form.control}
                  name="religion"
                  label="Religion *"
                  data={RELIGION_DATA}
                  baseClassName="w-full"
                  placeholder="Select Religion"
                  disabled={isDisabled}
                />
                <DropdownField
                  control={form.control}
                  name="maritalStatus"
                  label="Civil Status *"
                  valueType='int'
                  data={employeeInitials?.civilStatus ?? []}
                  baseClassName="w-full"
                  placeholder="Select Civil Status"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="bloodType"
                  label="Blood Type"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Blood Type"
                  disabled={isDisabled}
                />
              </div>
            </CollapsibleContainer>
            <CollapsibleContainer
              title="contact information"
              baseClassName="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-center mt-5">
                <InputField
                  control={form.control}
                  name="phoneNumber"
                  label="Telephone No"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Primary Telephone Number. (ex. 02-8123-4567)"
                  disabled={isDisabled}
                />

                <InputField
                  control={form.control}
                  name="mobileNumber"
                  label="Mobile No"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Mobile Number. (ex. 0912-345-6789)"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="emailAddress"
                  label="Personal Email Address"
                  type="email"
                  baseClassName="w-full"
                  placeholder="Enter Personal Email Address. (ex. [EMAIL_ADDRESS])"
                  disabled={isDisabled}
                />
                <DropdownField
                  control={form.control}
                  name="country"
                  label="Country *"
                  data={COUNTRY_DATA}
                  baseClassName="w-full"
                  placeholder="Select Country"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="region"
                  label="Region *"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Region"
                  disabled={isDisabled}
                />
              </div>
            </CollapsibleContainer>
            <CollapsibleContainer
              title="spouse information"
              baseClassName="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-center mt-5">
                <InputField
                  control={form.control}
                  name="spouseName"
                  label="Spouse Full Name"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Spouse Full Name"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="spouseJobTitle"
                  label="Spouse job Title"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Spouse Job Title"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="spouseCompany"
                  label="Spouse Company"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Spouse Company"
                  disabled={isDisabled}
                />
                <DatePickerField
                  control={form.control}
                  name="spouseBirthday"
                  label="Spouse Date of Birth"
                  baseClassName="w-full"
                  placeholder="Select Spouse Date of Birth"
                  disabled={isDisabled}
                  icon={<Calendar variant="Bold" size={16} />}
                />
              </div>
            </CollapsibleContainer>
            <CollapsibleContainer
              title="government information"
              baseClassName="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-center mt-5">
                <InputField
                  control={form.control}
                  name="sssNo"
                  label="SSS Number"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter SSS Number. ex. 00-000000-0"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="tinNo"
                  label="TIN Number"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter TIN Number. ex. 000-000-000"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="philHealthNo"
                  label="PhilHealth Number"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter PhilHealth Number. ex. 00-00000000-0"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="pagIbigNo"
                  label="Pagibig Number"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Pagibig Number. ex. 000000000000"
                  disabled={isDisabled}
                />
                <InputField
                  control={form.control}
                  name="passportNo"
                  label="Passport Number"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Passport Number. ex. A1234567"
                  disabled={isDisabled}
                />
                <DatePickerField
                  control={form.control}
                  name="passportExpiry"
                  label="Expiry Date"
                  baseClassName="w-full"
                  placeholder="Select Expiry Date"
                  disabled={isDisabled}
                  icon={<Calendar size={16} />}
                />
                <InputField
                  control={form.control}
                  name="bankAccountNo"
                  label="Payroll Account No"
                  type="text"
                  baseClassName="w-full"
                  placeholder="Enter Payroll Account No. ex. 000000000000"
                  disabled={isDisabled}
                />
              </div>
            </CollapsibleContainer>
          </StackCol>
        </StackRow>
      </form>
    </Form>
  )
}

export default memo(EmployeeFormPersonalInfo)
