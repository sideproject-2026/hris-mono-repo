import { useState } from 'react'
import { format, formatDate, isValid, parseISO } from 'date-fns'
import { Edit2 } from 'iconsax-reactjs'

import { Button } from '@/components/ui/button'
import CollapsibleContainer from '@/components/custom/containers/collapsible-container'
import EmployeeFormAppointment from '../employee-appointment/employee-form-appointment'

import type { Company } from '@/features/employees/types/global'

interface EmployeeCompanyProps {
  employee?: Company
}

const EmployeeCompany = ({ employee }: EmployeeCompanyProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const formatDisplayDate = (dateValue: string | Date | undefined) => {
    if (!dateValue) return '---'
    const date = typeof dateValue === 'string' ? parseISO(dateValue) : dateValue
    return isValid(date) ? format(date, 'yyyy-MM-dd') : '---'
  }

  const infoFields = [
    { label: 'Employee Code', value: employee?.employeeCode },
    { label: 'Company Email', value: employee?.emailAddress },
    { label: 'Local No', value: employee?.localNo },
    { label: 'Designation', value: employee?.designationName },
    { label: 'Department', value: employee?.departmentName },
    { label: 'Company', value: employee?.companyName },
    { label: 'Branch', value: employee?.branchName },
    { label: 'Manager', value: employee?.managerName },
    {
      label: 'Accreditation',
      value: employee.accreditation
        ? formatDate(employee.accreditation, 'yyyy-MM-dd')
        : '-',
    },
    {
      label: 'Deaccreditation',
      value: employee.deAccreditation
        ? formatDate(employee.deAccreditation, 'yyyy-MM-dd')
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
        initialValues={employee}
      />
    </>
  )
}

export default EmployeeCompany
