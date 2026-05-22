import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Send, Add } from 'iconsax-reactjs'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import ButtonLoading from '@/components/custom/buttons/button-loading'

import {
  requestFormSchema,
  type RequestFormSchemaType,
  type RequestFormPayloadType,
} from '../types/schema'
import {
  requestFormInitialsQueryOptions,
  useRequestFormMutation,
} from '../hooks/useFormRequest'
import DateTimePickerField from '@/components/custom/inputs/DateTimePicker'
import DropdownField from '@/components/custom/inputs/DropdownField'
import ComboboxField from '@/components/custom/inputs/ComboboxField'
import TextareaField from '@/components/custom/inputs/TextareaField'
import LeaveBalance from './leave-balance'
import DatePickerField from '@/components/custom/inputs/DatePickerField'
import { InputField } from '@/components/custom/inputs'
import { formatRequestText, getErrorMessage } from '@/lib/utils'
import { format } from 'date-fns'
import { PlusIcon } from 'lucide-react'

const RequestForm = () => {
  const { data } = useQuery(requestFormInitialsQueryOptions())
  const { mutateAsync, isPending } =
    useRequestFormMutation<RequestFormPayloadType>()

  const form = useForm<RequestFormSchemaType>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      employeeId: undefined,
      requestFor: undefined,
      requestLeaveType: undefined,
      leavePeriodType: undefined,
      requestOBType: undefined,
      requestTimeType: undefined,
      dateFrom: new Date(),
      dateTo: new Date(),
      purpose: '',
      referenceNo: '',
      lateFiling: false,
    },
  })

  const selectedRequestFor = useWatch({
    control: form.control,
    name: 'requestFor',
  })

  const employeeId = useWatch({
    control: form.control,
    name: 'employeeId',
  })

  const leaveType = useWatch({
    control: form.control,
    name: 'requestLeaveType',
  })

  // Reset dependent fields when the category changes
  useEffect(() => {
    const fieldsToReset: (keyof RequestFormSchemaType)[] = [
      'requestLeaveType',
      'leavePeriodType',
      'requestOBType',
      'requestTimeType',
    ]
    fieldsToReset.forEach((field) => form.setValue(field, undefined))
  }, [selectedRequestFor, form])

  const onSubmit = async (values: RequestFormSchemaType) => {
    try {
      const dataToSend = {
        ...values,
        dateFrom: values.dateFrom
          ? format(new Date(values.dateFrom), "yyyy-MM-dd'T'HH:mm:ss")
          : undefined,
        dateTo: values.dateTo
          ? format(new Date(values.dateTo), "yyyy-MM-dd'T'HH:mm:ss")
          : undefined,
      }

      await mutateAsync(dataToSend)

      toast.success('Request submitted successfully')
      form.reset()
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  // Helper to render type-specific fields
  const renderConditionalFields = () => {
    const type = Number(selectedRequestFor)
    const apiData = data?.data

    switch (type) {
      case 1:
        return (
          <div className="grid grid-cols-2 gap-3">
            <DateTimePickerField
              control={form.control}
              name="dateFrom"
              label="From"
            />
            <DateTimePickerField
              control={form.control}
              name="dateTo"
              label="To"
            />
          </div>
        )
      case 2: // Leave
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <DropdownField
                control={form.control}
                name="requestLeaveType"
                label="Leave Type"
                data={apiData?.requestLeaveTypes || []}
              />
              <DropdownField
                control={form.control}
                name="leavePeriodType"
                label="Period Type"
                data={formatRequestText(apiData?.requestLeavePeriodTypes) || []}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <DatePickerField
                control={form.control}
                name="dateFrom"
                label="From"
              />
              <DatePickerField
                control={form.control}
                name="dateTo"
                label="To"
              />
            </div>
          </>
        )
      case 3: // OB
        return (
          <>
            <DropdownField
              control={form.control}
              name="requestOBType"
              label="OB Type"
              data={apiData?.requestOBTypes || []}
            />
            <div className="grid grid-cols-2 gap-3">
              <DateTimePickerField
                control={form.control}
                name="dateFrom"
                label="From"
              />
              <DateTimePickerField
                control={form.control}
                name="dateTo"
                label="To"
              />
            </div>
          </>
        )
      case 4: // Time Adjustment
        return (
          <>
            <DropdownField
              control={form.control}
              name="requestTimeType"
              label="Time Type"
              data={formatRequestText(apiData?.requestTimeTypes) || []}
            />
            <div className="grid grid-cols-2 gap-3">
              <DateTimePickerField
                control={form.control}
                name="dateFrom"
                label="From"
              />
              <DateTimePickerField
                control={form.control}
                name="dateTo"
                label="To"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="font-sans text-sm uppercase font-semibold"
        >
          <PlusIcon className="size-4" />
          Create Request
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Request Form</DialogTitle>
          <DialogDescription>
            Fill up the required fields to submit your request.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ComboboxField
              control={form.control}
              name="employeeId"
              label="Requested By"
              data={data?.data.employees || []}
            />

            <DropdownField
              control={form.control}
              name="requestFor"
              label="Request For"
              data={formatRequestText(data?.data.requestForTypes) || []}
              placeholder="Select category"
            />

            {renderConditionalFields()}

            <TextareaField
              control={form.control}
              name="purpose"
              label="Purpose"
              placeholder="Enter your reason..."
            />

            <InputField
              control={form.control}
              name="referenceNo"
              label="Reference No"
              placeholder="Enter reference number"
            />

            {selectedRequestFor == 2 && leaveType && (
              <LeaveBalance
                employeeId={employeeId}
                requestLeaveType={leaveType}
              />
            )}

            <ButtonLoading
              type="submit"
              text="Submit Request"
              variant="default"
              icon={<Send variant="Bold" size="20px" />}
              loading={isPending}
              className="w-full h-11"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RequestForm
