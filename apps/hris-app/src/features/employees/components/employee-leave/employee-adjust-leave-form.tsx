import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DoorOpenIcon, Edit3Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  adjustmentLeaveSchema,
  type AdjustmentLeaveSchemaTypes,
} from '../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdjustLeaveMutation } from '../../hooks/useLeave'
import { Form } from '@/components/ui/form'
import { StackCol } from '@/components/custom/layouts'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { LEAVES_DATA } from '../../types/constant'
import { InputField } from '@/components/custom/inputs'
import TextareaField from '@/components/custom/inputs/TextareaField'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { getErrorMessage } from '@/lib/utils'
import { toast } from 'sonner'
import { Edit2 } from 'iconsax-reactjs'

const EmployeeAdjustLeaveForm = ({
  employeeId,
  employeeName,
}: {
  employeeId: string
  employeeName: string
}) => {
  const { mutateAsync, isPending } = useAdjustLeaveMutation()
  const [open, setOpen] = useState(false)

  const form = useForm<AdjustmentLeaveSchemaTypes>({
    resolver: zodResolver(adjustmentLeaveSchema) as any,
    defaultValues: {
      leaveEntitlement: undefined,
      quantity: 0,
      remarks: '',
    },
  })

  const handleSubmit = async (data: AdjustmentLeaveSchemaTypes) => {
    try {
      await mutateAsync({ employeeId: employeeId, adjustment: data })
      toast.success('Leave adjusted successfully')
      setOpen(false)
    } catch (err) {
      const errorMesage = getErrorMessage(err)
      toast.error(`Failed to adjust leave: ${errorMesage}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start text-md font-normal"
        >
          <Edit2 size={24} color="#004663" variant="Bold" />
          Adjust Leave
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-rose-900 font-medium">{employeeName}</span>{' '}
            <span>Leave Adjustment</span>
          </DialogTitle>
          <DialogDescription>Adjust Leave for {employeeName}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="w-full">
            <StackCol className="w-full" gap="sm">
              <DropdownField
                control={form.control}
                name="leaveEntitlement"
                data={LEAVES_DATA.map((item) => ({
                  value: item.leaveEntitlement.toString(),
                  text: item.name,
                }))}
                label="Leave Entitlement"
                baseClassName="w-full"
              />
              <InputField
                control={form.control}
                name="quantity"
                type="number"
                baseClassName="w-full"
                label="Quantity"
              />
              <TextareaField
                control={form.control}
                name="remarks"
                label="Remarks"
                baseClassName="w-full"
              />
            </StackCol>
          </form>
        </Form>
        <DialogFooter>
          <ButtonLoading
            text="Submit"
            onClick={() => {
              form.handleSubmit(handleSubmit)()
            }}
            loading={isPending}
            textLoading="Submitting"
            variant="default"
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeAdjustLeaveForm
