import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Setting4 } from 'iconsax-reactjs'
import { useQuery } from '@tanstack/react-query'
import * as z from 'zod'
import { useEffect } from 'react'
import { usePeriodSheetContext } from './sheet-provider'

import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'

import { initialQueryOptions } from '@/features/employee-setup/hooks/useEmployeeSetup'

import { Button } from '@/components/ui/button'
import InputField from '@/components/custom/inputs/InputField'
import { PAGINATION_DEFAULTS } from '@/components/custom/grid/types/constants'
import {
  filterSearchSheetSchema,
  type FilterSearchAttendanceType,
} from '../../types/search'

const SheetFilter = () => {
  const { data: initialValue, isPending } = useQuery(initialQueryOptions())
  const { search, onSearchChange } = usePeriodSheetContext()

  const form = useForm<FilterSearchAttendanceType>({
    resolver: zodResolver(filterSearchSheetSchema),
    defaultValues: {
      fieldValue: '',
      department: '',
      company: '',
      branch: '',
    },
  })

  useEffect(() => {
    form.reset({
      fieldValue: search.fieldValue || '',
      department: search.department || '',
      company: search.company || '',
      branch: search.branch || '',
    })
  }, [search])

  if (isPending) return <div>Loading...</div>

  const handleSubmit = (data: FilterSearchAttendanceType) => {
    onSearchChange?.({
      branch: data.branch || '',
      company: data.company || '',
      department: data.department || '',
      fieldValue: data.fieldValue || '',
    })
  }

  return (
    <div className="w-full flex flex-rows mb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex items-center gap-2 "
        >
          <InputField
            control={form.control}
            name="fieldValue"
            label=""
            placeholder="Search Employee"
            baseClassName="font-sans flex-1"
            type="text"
          />
          <DropdownField
            control={form.control}
            name="department"
            label=""
            placeholder="Department"
            data={initialValue?.data?.departments || []}
            baseClassName="font-sans"
          />
          <DropdownField
            control={form.control}
            name="company"
            label=""
            placeholder="Company"
            data={initialValue?.data?.companies || []}
            baseClassName="font-sans"
          />
          <DropdownField
            control={form.control}
            name="branch"
            label=""
            placeholder="Branch"
            data={initialValue?.data?.branches || []}
            baseClassName="font-sans"
          />
          <Button className="h-10 w-[50px]" type="submit" variant={'outline'}>
            <Setting4 variant={'Bold'} size={'24px'} color={'#004663'} />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SheetFilter
