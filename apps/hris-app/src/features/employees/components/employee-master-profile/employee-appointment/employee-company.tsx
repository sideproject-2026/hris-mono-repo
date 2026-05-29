import { useState } from 'react'
import { Edit2 } from 'iconsax-reactjs'

import { Button } from '@/components/ui/button'
import CollapsibleContainer from '@/components/custom/containers/collapsible-container'
import EmployeeFormAppointment from './employee-form-appointment'
import EmployeeProvider from '../../employee-provider'
import EmployeePersonalProvider, { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'
import { format, isValid, parseISO } from 'date-fns'

const EmployeeCompanyContent = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { employeePersonalInfo, employeeInitials } = useEmployeeProfileContext()

  const formatDisplayDate = (dateValue: string | Date | undefined) => {
    if (!dateValue) return '---'
    const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue
    return isValid(date) ? format(date, 'yyyy-MM-dd') : '---'
  }
  console.log('employee Data', employeePersonalInfo?.company?.emailAddress)
  const infoFields = [
    { label: 'Employee Code', value: employeePersonalInfo?.company.employeeCode },
    { label: 'Company Email', value: employeePersonalInfo?.company?.emailAddress },
    { label: 'Local No', value: employeePersonalInfo?.company?.localNo },
    { label: 'Designation', value: employeePersonalInfo?.company?.designationName },
    { label: 'Department', value: employeePersonalInfo?.company?.departmentName },
    { label: 'Company', value: employeePersonalInfo?.company?.companyName },
    { label: 'Branch', value: employeePersonalInfo?.company?.branchName },
    { label: 'Manager', value: employeePersonalInfo?.company?.managerName },
    {
      label: 'Accreditation',
      value: employeePersonalInfo?.company?.accreditedDate
        ? formatDisplayDate(employeePersonalInfo?.company?.accreditedDate)
        : '-',
    },
    {
      label: 'Deaccreditation',
      value: employeePersonalInfo?.company?.deAccreditedDate
        ? formatDisplayDate(employeePersonalInfo?.company?.deAccreditedDate)
        : '-',
    },
  ]

  return (
    <>
      <CollapsibleContainer title="Company Information">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {infoFields.map((field) => (
              <div
                key={field.label}
                className="rounded-md border border-border bg-muted/30 px-3 py-2 space-y-1"
              >
                <p className="text-md text-muted-foreground font-normal tracking-wider">
                  {field.label}
                </p>
                <p className="text-md font-semibold uppercase min-h-[1.25rem] truncate">
                  {field.value || '---'}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              className="w-fit text-xs h-9 gap-2 uppercase font-bold"
              onClick={() => setIsEditing(true)}
              type="button"
            >
              <Edit2 variant="Bold" size={18} color="#004663" />
              UPDATE
            </Button>
          </div>
        </div>
      </CollapsibleContainer>

      <EmployeeFormAppointment
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        initialValues={employeeInitials!}
      />
    </>
  )
}



const EmployeeCompay = () => {

  return (
    <EmployeePersonalProvider>
      <EmployeeCompanyContent />
    </EmployeePersonalProvider>
  )
}

export default EmployeeCompanyContent
