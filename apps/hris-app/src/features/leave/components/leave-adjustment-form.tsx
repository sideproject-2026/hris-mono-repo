import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  leaveAdjustmentSchema,
  type LeaveAdjustmentSchemaType,
} from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Form,
  Separator,
  DropdownField,
  TextareaField,
  ButtonLoading,
  InputField,
} from '@hris/shared-ui'
import { Pen } from 'lucide-react'
import { Send } from 'iconsax-reactjs'
import {
  leaveBalanceAdjustmentMutation,
  leaveBalanceInitialsQueryOptions,
} from '../hooks/useLeave'
import { toast } from 'sonner'
import { formatRequestText, getErrorMessage } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

interface LeaveAdjustmentFormProps {
  employeeId: number
  employeeName: string
}

const LeaveAdjustmentForm = ({
  employeeId,
  employeeName,
}: LeaveAdjustmentFormProps) => {
  const [open, setOpen] = useState(false)

  const { data } = useQuery(leaveBalanceInitialsQueryOptions())

  const { mutateAsync, isPending } = leaveBalanceAdjustmentMutation()

  const form = useForm<LeaveAdjustmentSchemaType>({
    resolver: zodResolver(leaveAdjustmentSchema),
    defaultValues: {
      employeeId: employeeId,
      leaveEntitlement: undefined,
      stockInOut: undefined,
      referenceNo: '',
      quantity: 0,
      remarks: '',
    },
  })

  const onSubmit = (data: LeaveAdjustmentSchemaType) => {
    try {
      mutateAsync(data)
    } catch (error) {
      const errorResponse = getErrorMessage(error)
      toast.error(errorResponse)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Pen className="w-4 h-4" />
          <span className="text-md font-sans">Adjust</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>LEAVE ADJUSTMENT FORM</DialogTitle>
          <DialogDescription>
            You can adjust the leave details here.
          </DialogDescription>
        </DialogHeader>
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-1">
          <span className="text-md font-sans font-semibold truncate uppercase">
            Employee No: {employeeId}
          </span>
          <span className="text-md font-sans font-semibold truncate uppercase">
            Employee Name: {employeeName}
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DropdownField
              control={form.control}
              name="leaveEntitlement"
              label="Leave Entitlement"
              data={formatRequestText(data?.entitlements) ?? []}
              placeholder="Select Leave Entitlement"
            />
            <DropdownField
              control={form.control}
              name="stockInOut"
              label="Stock In/Out"
              data={formatRequestText(data?.stockType) ?? []}
              placeholder="Select Stock In/Out"
            />
            <InputField
              control={form.control}
              name="referenceNo"
              label="Reference No"
              placeholder="Enter Reference No"
            />
            <InputField
              control={form.control}
              name="quantity"
              label="Quantity"
              placeholder="Enter Quantity"
            />
            <TextareaField
              control={form.control}
              name="remarks"
              label="Remarks"
              placeholder="Enter Remarks"
            />
            <ButtonLoading
              type="submit"
              text="Submit Adjustment"
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

export default LeaveAdjustmentForm
