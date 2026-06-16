import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Refresh2 } from 'iconsax-reactjs'
import { useEffect } from 'react'

import { attendanceManagementSearchSchema } from '../../types/search'
import { useAttendancePeriodContext } from './attendance-period-provider'
import type { AttendanceManagementQueryState } from '../../types/search'

import { InputField, Form, Button, DropdownField } from '@hris/shared-ui'


const AttendancePeriodSearch = () => {

  const { onSearch, params } = useAttendancePeriodContext()

  const form = useForm<AttendanceManagementQueryState>({
    resolver: zodResolver(attendanceManagementSearchSchema),
    defaultValues: {
      fieldValue: params?.fieldValue || '',
      status: params?.status || '',
    },
  })

  const handleSubmit = (data: AttendanceManagementQueryState) => {
    onSearch?.(data.fieldValue, data.status)
  }

  useEffect(() => {
    form.reset({
      fieldValue: params?.fieldValue,
      status: params?.status,
    })
  }, [params])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="top-0 left-0 flex items-center gap-1 w-full"
      >
        <InputField
          control={form.control}
          name="fieldValue"
          label=""
          placeholder="Search Period"
          baseClassName="font-sans w-[200px]"
          type="text"
        />
        <DropdownField
          control={form.control}
          name="status"
          label=""
          placeholder="Status"
          baseClassName="w-[200px]"
          data={[
            { value: 'Pending', text: 'Pending' },
            { value: 'Posted', text: 'Posted' },
          ]}
        />
        <Button
          className="h-11 w-[40px] mt-2"
          type="submit"
          variant={'outline'}
        >
          <Refresh2 variant={'Bulk'} size={24} color="#004663" />
        </Button>
      </form>
    </Form>
  )
}

export default AttendancePeriodSearch
