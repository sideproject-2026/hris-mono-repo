import {
  DropdownField,
  DatePickerField,
  SwitchField,
  StackRow,
  Button,
} from '@hris/shared-ui'
import { Trash2 } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { HRFormCreateSchemaType } from '../../types/create-schema'
import { HRFormType, RESIGNATION_TYPE_OPTIONS } from '../../types/enum'
import EmployeeCombobox from './employee-combobox'

interface EmployeeDetailCardProps {
  form: UseFormReturn<HRFormCreateSchemaType>
  index: number
  type: number
  initial?: EmployeeInitials
  canRemove: boolean
  onRemove: () => void
}

const EmployeeDetailCard = ({
  form,
  index,
  type,
  initial,
  canRemove,
  onRemove,
}: EmployeeDetailCardProps) => {
  const ranks = (initial?.ranks ?? []) as SelectionItem<string>[]
  const designations = (initial?.designations ?? []) as SelectionItem<string>[]
  const companies = (initial?.companies ?? []) as SelectionItem<string>[]
  const branches = (initial?.branches ?? []) as SelectionItem<string>[]
  const departments = ([] as SelectionItem<string>[]).concat(
    (initial?.departments as unknown as SelectionItem<string>[]) ?? [],
  )

  const showAssignment =
    type === HRFormType.NewHire ||
    type === HRFormType.Transfer ||
    type === HRFormType.ChangeDesignation

  return (
    <div className="relative border border-gray-300 rounded-xl p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold uppercase tracking-widest text-primary">
          {`Employee #${index + 1}`}
        </span>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>
      <div className="space-y-3">
        <EmployeeCombobox
          form={form}
          name={`details.${index}.employeeId`}
          label="Employee"
          placeholder="Select an employee..."
        />

        {type === HRFormType.NewHire && (
          <StackRow>
            <DatePickerField
              control={form.control}
              name={`details.${index}.dateHired`}
              label="Date Hired"
              placeholder="Select Date Hired"
              baseClassName="w-full"
            />
            <DatePickerField
              control={form.control}
              name={`details.${index}.regularDate`}
              label="Regularization Date"
              placeholder="Select Regularization Date"
              baseClassName="w-full"
            />
          </StackRow>
        )}

        {(type === HRFormType.NewHire ||
          type === HRFormType.ProbationExtension) && (
          <StackRow>
            <DatePickerField
              control={form.control}
              name={`details.${index}.probationStart`}
              label="Probation Start"
              placeholder="Select Probation Start"
              baseClassName="w-full"
            />
            <DatePickerField
              control={form.control}
              name={`details.${index}.probationEnd`}
              label="Probation End"
              placeholder="Select Probation End"
              baseClassName="w-full"
            />
          </StackRow>
        )}

        {type === HRFormType.Regularization && (
          <DatePickerField
            control={form.control}
            name={`details.${index}.regularDate`}
            label="Regularization Date"
            placeholder="Select Regularization Date"
            baseClassName="w-full"
          />
        )}

        {(type === HRFormType.ChangeDesignation ||
          type === HRFormType.Transfer ||
          type === HRFormType.NewHire) && (
          <StackRow>
            <DropdownField
              control={form.control}
              name={`details.${index}.designationId`}
              label="Designation"
              placeholder="Select Designation"
              baseClassName="w-full"
              data={designations}
            />
            <DropdownField
              control={form.control}
              name={`details.${index}.rank`}
              label="Rank"
              placeholder="Select Rank"
              baseClassName="w-full"
              data={ranks}
            />
          </StackRow>
        )}

        {showAssignment && (type === HRFormType.NewHire || type === HRFormType.Transfer) && (
          <>
            <StackRow>
              <DropdownField
                control={form.control}
                name={`details.${index}.companyId`}
                label="Company"
                placeholder="Select Company"
                baseClassName="w-full"
                data={companies}
              />
              <DropdownField
                control={form.control}
                name={`details.${index}.branchId`}
                label="Branch"
                placeholder="Select Branch"
                baseClassName="w-full"
                data={branches}
              />
            </StackRow>
            <DropdownField
              control={form.control}
              name={`details.${index}.departmentId`}
              label="Department"
              placeholder="Select Department"
              baseClassName="w-full"
              data={departments}
            />
            <EmployeeCombobox
              form={form}
              name={`details.${index}.managerId`}
              label="Manager"
              placeholder="Select a manager..."
            />
          </>
        )}

        {type === HRFormType.EndOfService && (
          <>
            <StackRow>
              <DropdownField
                control={form.control}
                name={`details.${index}.resignationType`}
                label="Resignation Type"
                placeholder="Select Resignation Type"
                baseClassName="w-full"
                data={RESIGNATION_TYPE_OPTIONS as unknown as SelectionItem<string>[]}
              />
              <DatePickerField
                control={form.control}
                name={`details.${index}.lastWorkingDay`}
                label="Last Working Day"
                placeholder="Select Last Working Day"
                baseClassName="w-full"
              />
            </StackRow>
            <SwitchField
              control={form.control}
              name={`details.${index}.isEligibleForRehire`}
              label="Eligible for Rehire"
              description="Mark if this employee may be rehired in the future"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default EmployeeDetailCard
