import { useForm } from 'react-hook-form'
import {
  searchLeaveBalanceSchema,
  type SearchLeaveBalanceSchemaType,
} from '../types/search'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@hris/shared-ui'
import { InputField, DropdownField, ButtonLoading } from '@hris/shared-ui'
import { Search } from 'lucide-react'
import { useLeaveContext } from './leave-provider'

const LeaveSearch = () => {
  const { search, setSearch } = useLeaveContext()

  const form = useForm<SearchLeaveBalanceSchemaType>({
    resolver: zodResolver(searchLeaveBalanceSchema),
    defaultValues: {
      fieldName: search.fieldName || 'firstName',
      fieldValue: search.fieldValue ?? '',
    },
  })

  const fieldNameOptions = [
    { value: 'firstName', text: 'First Name' },
    { value: 'lastName', text: 'Last Name' },
    { value: 'empNo', text: 'Employee No' },
  ]
  const onSubmit = (data: SearchLeaveBalanceSchemaType) => {
    setSearch(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2 w-full"
      >
        <DropdownField
          control={form.control}
          name="fieldName"
          label=""
          placeholder="Select Field"
          data={fieldNameOptions}
        />
        <InputField
          control={form.control}
          name="fieldValue"
          label=""
          placeholder="Search Employee"
          baseClassName="w-full"
        />
        <ButtonLoading
          className="rounded-sm h-10"
          type="submit"
          variant={'default'}
          loading={false}
          text=""
          icon={<Search className="stroke-2" />}
        />
      </form>
    </Form>
  )
}

export default LeaveSearch
