import { useForm } from 'react-hook-form'
import {
  filterSearchEmployeeSchema,
  type FilterSearchEmployee,
} from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { useQuery } from '@tanstack/react-query'
import { initialQueryOptions } from '../hooks/useEmployeeSetup'
import ButtonLoading from '@/components/custom/buttons/button-loading'

import { Setting4 } from 'iconsax-reactjs'
import { useEmployeeContext } from './employee-setup-provider'
import { InputField } from '@/components/custom/inputs'

const EmployeeSetupFilter = () => {
  const { data: initialValue } = useQuery(initialQueryOptions())
  const { onSearch, params } = useEmployeeContext()

  const form = useForm<FilterSearchEmployee>({
    resolver: zodResolver(filterSearchEmployeeSchema),
    defaultValues: {
      fieldName: params?.fieldName || 'firstName',
      fieldValue: params?.fieldValue || '',
      company: params?.company || '',
      branch: params?.branch || '',
      department: params?.department || '',
    },
  })

  const handleSubmit = async (data: FilterSearchEmployee) => {
    onSearch({
      company: data.company ?? '',
      branch: data.branch ?? '',
      department: data.department ?? '',
      fieldName: data.fieldName ?? '',
      fieldValue: data.fieldValue ?? '',
      pageNumber: 1,
      pageSize: params?.pageSize ?? 10,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-row gap-2 w-full relative items-center mt-2"
      >
        <DropdownField
          control={form.control}
          name="fieldName"
          label=""
          placeholder=""
          data={[
            { text: 'FIRST NAME', value: 'firstName' },
            { text: 'LAST NAME', value: 'lastName' },
          ]}
        />
        <InputField
          control={form.control}
          name="fieldValue"
          label=""
          placeholder="SEARCH..."
          baseClassName="w-full!"
        />
        <DropdownField
          control={form.control}
          name="department"
          label=""
          placeholder="DEPARTMENT"
          data={initialValue?.data?.departments || []}
        />
        <DropdownField
          control={form.control}
          name="company"
          label=""
          placeholder="COMPANY"
          data={initialValue?.data?.companies || []}
        />
        <DropdownField
          control={form.control}
          name="branch"
          label=""
          placeholder="BRANCH"
          data={initialValue?.data?.branches || []}
        />
        <ButtonLoading
          type="submit"
          loading={form.formState.isSubmitting}
          text="FILTER"
          textLoading="FILTERI..."
          icon={<Setting4 variant={'Bold'} size={'24px'} color={'#FFFFFF'} />}
          variant="default"
          className="h-10"
        />
      </form>
    </Form>
  )
}

export default EmployeeSetupFilter
