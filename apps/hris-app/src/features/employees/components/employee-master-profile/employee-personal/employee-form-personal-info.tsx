import WebCamCapture from '@/features/employees/components/employee-master-profile/employee-personal/camera/webcam-capture'
import GroupContainer from '@/components/custom/containers/group-container'
import { InputField } from '@/components/custom/inputs'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { Form } from '@/components/ui/form'
import {
  employeePersonalInfoSchema,
  type EmployeePersonalInfoTypes,
} from '@/features/employees/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PREFIX_DATA, RELIGION_DATA } from '../../../types/constant'
import { NavMenu } from '@/components/custom/misc/NavMenu'

import { Building, Personalcard, RepeatCircle, Send } from 'iconsax-reactjs'
import { Separator } from '@hris/shared-ui'
import { Button } from '@hris/shared-ui'
import { X } from 'lucide-react'
import { employeePersonalMutation } from '@/features/employees/hooks/useEmployee'
import { useEmployeeProfileContext } from './employee-personal-provider'

import { ROUTE } from '@/types/router'
import { memo, useEffect, useState } from 'react'
import { getErrorMessage } from '@/lib/utils'

import { useNavigate } from '@tanstack/react-router'
import EmployeeCompany from './employee-company'
import ViewPhoto from './camera/view-photo'
import SwitchInput from '@/components/custom/misc/SwitchInput'
import { formatDate } from 'date-fns'
import StackCol from '@/components/custom/layouts/StackCol'
import { StackRow } from '@/components/custom/layouts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EmployeeMovementButtons from '../employee-movement/employee-movement-buttons'
import EmployeeMovementGrid from '../employee-movement/employee-movement-grid'
import EmployeeStatus from './employee-status'
import ButtonLoading from '@hris/shared-ui/buttons/button-loading'
import CollapsibleContainer from '@/components/custom/containers/collapsible-container'

const EmployeeFormPersonalInfo = () => {
  const {
    employeeInitials,
    employeePersonalInfo,
    isCaptured,
    createMode,
    employeeId,
  } = useEmployeeProfileContext()
  const { mutateAsync: createEmployeePersonalInfo } = employeePersonalMutation()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const [empClassLabel, setEmpClassLabel] = useState('')
  const [empTypeLabel, setEmpTypeLabel] = useState('')
  const [empGenderLabel, setEmpGenderLabel] = useState('')
  const [empNationalityLabel, setEmpNationalityLabel] = useState('')
  const [empCivilStatusLabel, setEmpCivilStatusLabel] = useState('')

  const form = useForm<EmployeePersonalInfoTypes>({
    resolver: zodResolver(employeePersonalInfoSchema),
    defaultValues: {
      type: undefined,
      classification: undefined,
      prefix: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      gender: undefined,
      dateOfBirth: new Date(),
      placeOfBirth: '',
      nationality: '',
      religion: '',
      civilStatus: undefined,
      bloodType: '',
      primaryTelNo: '',
      secondaryTelNo: '',
      mobileNo: '',
      personalEmailAddress: '',
      spouseFullName: '',
      spouseJobTitle: '',
      spouseDateOfBirth: undefined,
      sssNo: '',
      tinNo: '',
      philhealthNo: '',
      pagIbigNo: '',
      passportNo: '',
      issueDate: undefined,
      expiryDate: undefined,
      payrollAccountNo: '',
      dateHired: new Date().toLocaleDateString('en-CA') as any,
    },
  })

  useEffect(() => {
    if (employeeInitials && employeePersonalInfo) {
      const classification = employeeInitials.classes.find(
        (e) => e.value === employeePersonalInfo?.classification,
      )
      const type = employeeInitials.types.find(
        (e) => e.value === employeePersonalInfo?.type,
      )
      const gender = employeeInitials.genders.find(
        (e) => e.value === employeePersonalInfo?.gender,
      )
      const nationality = employeeInitials.nationalities.find(
        (e) => e.value === employeePersonalInfo?.nationality,
      )

      const civilStatus = employeeInitials.civilStatus.find(
        (e) => e.value === employeePersonalInfo?.civilStatus,
      )

      setEmpNationalityLabel(nationality?.text || '')
      setEmpClassLabel(classification?.text || '')
      setEmpTypeLabel(type?.text || '')
      setEmpGenderLabel(gender?.text || '')
      setEmpCivilStatusLabel(civilStatus?.text || '')
    }
  }, [employeeInitials, employeePersonalInfo])

  useEffect(() => {
    if (!createMode && employeePersonalInfo) {
      form.reset({
        classification: employeePersonalInfo.classification,
        type: employeePersonalInfo.type,
        dateHired: employeePersonalInfo.dateHire,
        prefix: employeePersonalInfo.name.prefix,
        lastName: employeePersonalInfo.name.lastName,
        firstName: employeePersonalInfo.name.firstName,
        middleName: employeePersonalInfo.name.middleName,
        suffix: employeePersonalInfo.name.suffix,
        gender: employeePersonalInfo.gender,
        dateOfBirth: employeePersonalInfo.birth.dateOfBirth,
        placeOfBirth: employeePersonalInfo.birth.placeOfBirth,
        nationality: employeePersonalInfo.nationality,
        religion: employeePersonalInfo.religion,
        civilStatus: employeePersonalInfo.civilStatus,
        bloodType: employeePersonalInfo.bloodType,
        primaryTelNo: employeePersonalInfo.contact.primaryTelNo,
        secondaryTelNo: employeePersonalInfo.contact.secondaryTelNo,
        mobileNo: employeePersonalInfo.contact.mobileNo,
        personalEmailAddress: employeePersonalInfo.contact.personalEmailAddress,
        spouseFullName: employeePersonalInfo.spouse.fullName,
        spouseJobTitle: employeePersonalInfo.spouse.jobTitle,
        spouseDateOfBirth: employeePersonalInfo.spouse.dateOfBirth,
        sssNo: employeePersonalInfo.governmentId.sssNo,
        tinNo: employeePersonalInfo.governmentId.tinNo,
        philhealthNo: employeePersonalInfo.governmentId.philhealthNo,
        pagIbigNo: employeePersonalInfo.governmentId.pagIbigNo,
        payrollAccountNo: employeePersonalInfo.governmentId.payrollAccountNo,
        passportNo: employeePersonalInfo.governmentId.passportNo,
        issueDate: employeePersonalInfo.governmentId.issueDate,
        expiryDate: employeePersonalInfo.governmentId.expiryDate,
      })
    }
  }, [createMode, employeePersonalInfo])

  console.log("employeePersonalInfo", form.watch('dateHired'))
  const isDisabled = !!employeePersonalInfo && !isEditing
  const showFields = !createMode && !isEditing
  const getButtonText = () => {
    if (!employeePersonalInfo) return 'SAVE EMPLOYEE PROFILE'
    return isEditing ? 'UPDATE EMPLOYEE PROFILE' : 'EDIT EMPLOYEE PROFILE'
  }

  const onSubmit = async (data: EmployeePersonalInfoTypes) => {
    try {
      const response = await createEmployeePersonalInfo({
        id: employeeId,
        data,
      })
      const id = response?.id
      navigate({
        to: ROUTE.EMPLOYEE_PROFILE_ROUTE(id),
      })
      toast.success('Employee setup created successfully')
    } catch (error) {
      toast.error('Failed to create employee setup', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-2 -mt-2 w-full"
      >
        <NavMenu>
          <ButtonLoading
            loading={form.formState.isSubmitting}
            icon={<Send variant="Bold" size={24} color="#004663" />}
            type={!employeePersonalInfo || isEditing ? 'submit' : 'button'}
            variant="ghost"
            text={getButtonText()}
            onClick={(e) => {
              if (employeePersonalInfo && !isEditing) {
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

          {showFields && <EmployeeMovementButtons type={form.watch('type')} />}
        </NavMenu>
        <StackRow gap="sm" className="w-full">
          <StackCol>
            {showFields && (
              <>
                <StackCol className="w-[350px]" gap="sm">
                  <GroupContainer title="profile picture">
                    <ViewPhoto
                      employeeId={employeePersonalInfo?.id || ''}
                      hasPhoto={isCaptured}
                    />
                    <WebCamCapture />
                  </GroupContainer>
                </StackCol>
                <EmployeeStatus active={employeePersonalInfo?.active!} />
              </>
            )}
          </StackCol>
          <Tabs defaultValue="employee" className="w-full">
            <TabsList className="w-full h-10">
              <TabsTrigger
                value="employee"
                className="uppercase text-md font-normal data-[state=active]:bg-primary data-[state=active]:text-white gap-1"
              >
                <Personalcard variant="Bold" size={18} />
                employee information
              </TabsTrigger>
              {showFields && (
                <>
                  <TabsTrigger
                    value="company-information"
                    className="uppercase text-md font-normal data-[state=active]:bg-primary data-[state=active]:text-white gap-1"
                  >
                    <Building variant="Bold" size={18} />
                    company information
                  </TabsTrigger>
                  <TabsTrigger
                    value="movement-information"
                    className="uppercase text-md font-normal data-[state=active]:bg-primary data-[state=active]:text-white gap-1"
                  >
                    <RepeatCircle variant="Bold" size={18} />
                    movement information
                  </TabsTrigger>
                </>
              )}
            </TabsList>
            <TabsContent value="employee" className="w-full">
              <StackCol className="w-full" gap="sm">
                <CollapsibleContainer
                  title="employment information"
                  baseClassName="w-full"
                >
                  <StackRow className="mt-5" gap="sm">
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="classification"
                          label="Employee Class"
                          data={employeeInitials?.classes}
                          baseClassName="w-full"
                          disabled={isDisabled}
                          placeholder="Select Employee Class"
                        />
                      }
                      label="Employee Class"
                      readMode={isDisabled}
                      value={empClassLabel}
                    />
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="type"
                          label="Employee Type"
                          data={employeeInitials?.types}
                          baseClassName="w-full"
                          disabled={isDisabled}
                          placeholder="Select Employee Type"
                        />
                      }
                      label="Employee Type"
                      readMode={isDisabled}
                      value={empTypeLabel}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="dateHired"
                          label="Date Hired"
                          placeholder="Enter Date Hired"
                          baseClassName="w-full"
                          type="date"
                          disabled={isDisabled}
                        />
                      }
                      label="Date Hired"
                      readMode={isDisabled}
                      value={
                        form.watch('dateHired')
                          ? formatDate(
                            new Date(form.watch('dateHired') as any),
                            'MMM-dd-yyyy',
                          )
                          : ''
                      }
                    />
                  </StackRow>
                </CollapsibleContainer>
                <CollapsibleContainer
                  title="personal information"
                  baseClassName="w-full"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full items-center mt-5">
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="prefix"
                          label="Prefix"
                          placeholder="Select Prefix"
                          data={PREFIX_DATA}
                          baseClassName="w-[120px]"
                          disabled={isDisabled}
                        />
                      }
                      label="Prefix"
                      readMode={isDisabled}
                      value={form.watch('prefix')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="lastName"
                          label="Last Name *"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Last Name"
                          disabled={isDisabled}
                        />
                      }
                      label="Last Name *"
                      readMode={isDisabled}
                      value={form.watch('lastName')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="firstName"
                          label="First Name *"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter First Name"
                          disabled={isDisabled}
                        />
                      }
                      label="First Name *"
                      readMode={isDisabled}
                      value={form.watch('firstName')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="middleName"
                          label="Middle Name *"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Middle Name"
                          disabled={isDisabled}
                        />
                      }
                      label="Middle Name *"
                      readMode={isDisabled}
                      value={form.watch('middleName')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="suffix"
                          label="Suffix"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Suffix"
                          disabled={isDisabled}
                        />
                      }
                      label="Suffix"
                      readMode={isDisabled}
                      value={form.watch('suffix')}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full items-center">
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="gender"
                          label="Gender *"
                          placeholder="Select Gender"
                          data={employeeInitials?.genders}
                          baseClassName="w-full"
                          disabled={isDisabled}
                        />
                      }
                      label="Gender *"
                      readMode={isDisabled}
                      value={empGenderLabel}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="dateOfBirth"
                          label="Date of Birth *"
                          baseClassName="w-full"
                          placeholder="Select Date of Birth"
                          type="date"
                          disabled={isDisabled}
                        />
                      }
                      label="Date of Birth *"
                      readMode={isDisabled}
                      value={form.watch('dateOfBirth')?.toString()}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="placeOfBirth"
                          label="Place of Birth *"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Place of Birth"
                          disabled={isDisabled}
                        />
                      }
                      label="Place of Birth *"
                      readMode={isDisabled}
                      value={form.watch('placeOfBirth')}
                    />
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="nationality"
                          label="Nationality *"
                          data={employeeInitials?.nationalities}
                          baseClassName="w-full"
                          placeholder="Select Nationality"
                          disabled={isDisabled}
                        />
                      }
                      label="Nationality *"
                      readMode={isDisabled}
                      value={empNationalityLabel}
                    />
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="religion"
                          label="Religion *"
                          data={RELIGION_DATA}
                          baseClassName="w-full"
                          placeholder="Select Religion"
                          disabled={isDisabled}
                        />
                      }
                      label="Religion *"
                      readMode={isDisabled}
                      value={form.watch('religion')}
                    />
                    <SwitchInput
                      inputComponent={
                        <DropdownField
                          control={form.control}
                          name="civilStatus"
                          label="Civil Status *"
                          data={employeeInitials?.civilStatus}
                          baseClassName="w-full"
                          placeholder="Select Civil Status"
                          disabled={isDisabled}
                        />
                      }
                      label="Civil Status *"
                      readMode={isDisabled}
                      value={empCivilStatusLabel}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="bloodType"
                          label="Blood Type"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Blood Type"
                          disabled={isDisabled}
                        />
                      }
                      label="Blood Type"
                      readMode={isDisabled}
                      value={form.watch('bloodType')}
                    />
                  </div>
                </CollapsibleContainer>
                <CollapsibleContainer
                  title="contact information"
                  baseClassName="w-full"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-center mt-5">
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="primaryTelNo"
                          label="Primary Telephone No"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Primary Telephone Number. (ex. 02-8123-4567)"
                          disabled={isDisabled}
                        />
                      }
                      label="Primary Telephone No"
                      readMode={isDisabled}
                      value={form.watch('primaryTelNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="secondaryTelNo"
                          label="Secondary Telephone No"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Secondary Telephone Number. (ex. 02-8123-4567)"
                          disabled={isDisabled}
                        />
                      }
                      label="Secondary Telephone No"
                      readMode={isDisabled}
                      value={form.watch('secondaryTelNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="mobileNo"
                          label="Mobile No"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Mobile Number. (ex. 0912-345-6789)"
                          disabled={isDisabled}
                        />
                      }
                      label="Mobile No"
                      readMode={isDisabled}
                      value={form.watch('mobileNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="personalEmailAddress"
                          label="Personal Email Address"
                          type="email"
                          baseClassName="w-full"
                          placeholder="Enter Personal Email Address. (ex. [EMAIL_ADDRESS])"
                          disabled={isDisabled}
                        />
                      }
                      label="Personal Email Address"
                      readMode={isDisabled}
                      value={form.watch('personalEmailAddress')}
                    />
                  </div>
                </CollapsibleContainer>
                <CollapsibleContainer
                  title="spouse information"
                  baseClassName="w-full"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-center mt-5">
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="spouseFullName"
                          label="Spouse Full Name"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Spouse Full Name"
                          disabled={isDisabled}
                        />
                      }
                      label="Spouse Full Name"
                      readMode={isDisabled}
                      value={form.watch('spouseFullName')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="spouseJobTitle"
                          label="Spouse Job Title"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Spouse Job Title"
                          disabled={isDisabled}
                        />
                      }
                      label="Spouse Job Title"
                      readMode={isDisabled}
                      value={form.watch('spouseJobTitle')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="spouseDateOfBirth"
                          label="Spouse Date of Birth"
                          type="date"
                          baseClassName="w-full"
                          placeholder="Select Spouse Date of Birth"
                          disabled={isDisabled}
                        />
                      }
                      label="Spouse Date of Birth"
                      readMode={isDisabled}
                      value={form.watch('spouseDateOfBirth')}
                    />
                  </div>
                </CollapsibleContainer>
                <CollapsibleContainer
                  title="government information"
                  baseClassName="w-full"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-center mt-5">
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="sssNo"
                          label="SSS Number"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter SSS Number. ex. 00-000000-0"
                          disabled={isDisabled}
                        />
                      }
                      label="SSS Number"
                      readMode={isDisabled}
                      value={form.watch('sssNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="tinNo"
                          label="TIN Number"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter TIN Number. ex. 000-000-000"
                          disabled={isDisabled}
                        />
                      }
                      label="TIN Number"
                      readMode={isDisabled}
                      value={form.watch('tinNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="philhealthNo"
                          label="PhilHealth Number"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter PhilHealth Number. ex. 00-00000000-0"
                          disabled={isDisabled}
                        />
                      }
                      label="PhilHealth Number"
                      readMode={isDisabled}
                      value={form.watch('philhealthNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="pagIbigNo"
                          label="Pagibig Number"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Pagibig Number. ex. 000000000000"
                          disabled={isDisabled}
                        />
                      }
                      label="Pagibig Number"
                      readMode={isDisabled}
                      value={form.watch('pagIbigNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="passportNo"
                          label="Passport Number"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Passport Number. ex. A1234567"
                          disabled={isDisabled}
                        />
                      }
                      label="Passport Number"
                      readMode={isDisabled}
                      value={form.watch('passportNo')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="issueDate"
                          label="Issue Date"
                          type="date"
                          baseClassName="w-full"
                          placeholder="Select Issue Date"
                          disabled={isDisabled}
                        />
                      }
                      label="Issue Date"
                      readMode={isDisabled}
                      value={form.watch('issueDate')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="expiryDate"
                          label="Expiry Date"
                          type="date"
                          baseClassName="w-full"
                          placeholder="Select Expiry Date"
                          disabled={isDisabled}
                        />
                      }
                      label="Expiry Date"
                      readMode={isDisabled}
                      value={form.watch('expiryDate')}
                    />
                    <SwitchInput
                      inputComponent={
                        <InputField
                          control={form.control}
                          name="payrollAccountNo"
                          label="Payroll Account No"
                          type="text"
                          baseClassName="w-full"
                          placeholder="Enter Payroll Account No. ex. 000000000000"
                          disabled={isDisabled}
                        />
                      }
                      label="Payroll Account No"
                      readMode={isDisabled}
                      value={form.watch('payrollAccountNo')}
                    />
                  </div>
                </CollapsibleContainer>
              </StackCol>
            </TabsContent>
            {showFields && (
              <>
                <TabsContent value="company-information" className="space-y-2">
                  <EmployeeCompany employee={employeePersonalInfo?.company} />
                </TabsContent>
                <TabsContent value="movement-information" className="space-y-2">
                  <EmployeeMovementGrid employeeId={employeeId ?? ''} />
                </TabsContent>
              </>
            )}
          </Tabs>
        </StackRow>
      </form>
    </Form>
  )
}

export default memo(EmployeeFormPersonalInfo)
