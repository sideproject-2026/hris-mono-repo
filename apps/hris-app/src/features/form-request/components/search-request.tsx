import {
  searchRequestFormSchema,
  type SearchRequestFormSchemaType,
} from '../types/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '@/components/custom/inputs/InputField'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Form } from '@/components/ui/form'
import { Search, SearchIcon } from 'lucide-react'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { requestFormInitialsQueryOptions } from '../hooks/useFormRequest'
import { useQuery } from '@tanstack/react-query'
import { formatRequestText, getErrorMessage } from '@/lib/utils'
import { useRequestFormContext } from './request-form-provider'

const SearchRequest = () => {
  const { data } = useQuery(requestFormInitialsQueryOptions())

  const { search, setSearch } = useRequestFormContext()

  const form = useForm<SearchRequestFormSchemaType>({
    resolver: zodResolver(searchRequestFormSchema),
    defaultValues: {
      fieldValue: search.fieldValue ?? '',
      fieldName: search.fieldName || 'firstName',
      requestFor: search.requestFor ?? '',
    },
  })

  const handleSubmit = (data: SearchRequestFormSchemaType) => {
    setSearch(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-row gap-2 mt-2"
      >
        <DropdownField
          control={form.control}
          name="fieldName"
          label=""
          placeholder="Select Field"
          data={[
            { value: 'requestNo', text: 'REQUEST NO' },
            { value: 'firstName', text: 'FIRST NAME' },
            { value: 'lastName', text: 'LAST NAME' },
          ]}
        />
        <InputField
          control={form.control}
          name="fieldValue"
          label=""
          placeholder="SEARCH..."
          baseClassName="w-full"
        />
        <DropdownField
          control={form.control}
          name="requestFor"
          label=""
          placeholder="REQUEST FOR"
          data={formatRequestText(data?.data?.requestForTypes) ?? []}
        />
        <div>
          <ButtonLoading
            className="h-10"
            type="submit"
            variant={'outline'}
            loading={false}
            text="Search"
            icon={<SearchIcon />}
          />
        </div>
      </form>
    </Form>
  )
}

export default SearchRequest
