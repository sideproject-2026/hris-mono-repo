import { InputField } from '@/components/custom/inputs'
import DatePickerField from '@/components/custom/inputs/DatePickerField'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { Filter, Loader2, RefreshCcw } from 'lucide-react'

import { type UseFormReturn } from 'react-hook-form'
import EmployeeSearch from './employee-search'

interface DynamicFormReportProps {
  form: UseFormReturn<ResolverShape, any, ResolverShape>
  dynamicParameters: DynamicParameter[]
  onSubmit: (data: ResolverShape) => void
  isLoading?: boolean
}

const DynamicFormReport = ({
  form,
  dynamicParameters,
  onSubmit,
  isLoading,
}: DynamicFormReportProps) => {
  const handleReset = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <form className="space-y-6 -mt-7" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2 md:grid-cols-1">
          {dynamicParameters.map((parameter) => {
            if (parameter.type === 'select') {
              return (
                <DropdownField
                  key={parameter.name}
                  name={parameter.name}
                  control={form.control}
                  label={parameter.label}
                  placeholder={
                    parameter.placeholder ||
                    `Select ${parameter.label.toLowerCase()}`
                  }
                  data={
                    parameter.options?.map((option) => ({
                      text: option.label,
                      value: option.value,
                    })) || []
                  }
                />
              )
            }
            if (parameter.type === 'date') {
              return (
                <DatePickerField
                  key={parameter.name}
                  name={parameter.name}
                  control={form.control}
                  label={parameter.label}
                  placeholder={
                    parameter.placeholder ||
                    `Select ${parameter.label.toLowerCase()}`
                  }
                />
              )
            }
            if (parameter.type === 'text') {
              return (
                <InputField
                  key={parameter.name}
                  name={parameter.name}
                  control={form.control}
                  label={parameter.label}
                  placeholder={
                    parameter.placeholder ||
                    `Enter ${parameter.label.toLowerCase()}`
                  }
                  baseClassName="w-full"
                />
              )
            }
            if (parameter.type === 'special-combobox') {
              const employeeIdValue = form.watch(parameter.name as any)
              return (
                <EmployeeSearch
                  key={parameter.name}
                  label={parameter.label}
                  placeholder={
                    parameter.placeholder ||
                    `Enter ${parameter.label.toLowerCase()}`
                  }
                  employeeId={employeeIdValue}
                  setEmployeeId={(value) =>
                    form.setValue(parameter.name, value as any)
                  }
                />
              )
            }
          })}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="gap-1.5"
            onClick={handleReset}
            disabled={isLoading}
          >
            <RefreshCcw className="size-3.5" aria-hidden="true" />
            Reset
          </Button>
          <Button type="submit" className="gap-1.5" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Filter className="size-3.5" aria-hidden="true" />
            )}
            {isLoading ? 'Generating...' : 'Apply filters'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default DynamicFormReport
