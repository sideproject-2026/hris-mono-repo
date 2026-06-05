import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CalendarCog } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  employeeBatchLeaveSetupSchema,
  type EmployeeBatchLeaveSetupSchemaTypes,
} from '../../types/schema'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/custom/inputs'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Calendar2, Send } from 'iconsax-reactjs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { employeeInitialQueryOptions } from '../../hooks/useEmployee'
import { useQuery } from '@tanstack/react-query'
import { StackRow } from '@/components/custom/layouts'
import { employeesLeaveMutation } from '../../hooks/useLeave'
import { LEAVES_DATA } from '../../types/constant'

const getLeaveName = (id: number) => {
  switch (id) {
    case 1:
      return 'Vacation Leave'
    case 2:
      return 'Sick Leave'
    case 3:
      return 'Maternity Leave'
    case 4:
      return 'Paternity Leave'
    case 5:
      return 'Bereavement Leave'
    case 6:
      return 'Solo Parent Leave'
    default:
      return 'Other Leave'
  }
}

const EmployeeLeaveSetupForm = () => {
  const { data: initialData } = useQuery(employeeInitialQueryOptions())
  const { mutateAsync: createLeave } = employeesLeaveMutation()

  const form = useForm<EmployeeBatchLeaveSetupSchemaTypes>({
    resolver: zodResolver(employeeBatchLeaveSetupSchema) as any,
    defaultValues: {
      type: undefined,
      classification: undefined,
      year: new Date().getFullYear(),
      entitlements: LEAVES_DATA,
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const { fields } = useFieldArray({
    control,
    name: 'entitlements',
  })

  const onSubmit = async (data: EmployeeBatchLeaveSetupSchemaTypes) => {
    try {
      await createLeave(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="font-sans text-sm uppercase font-semibold"
        >
          <Calendar2 size={'32px'} variant="Bold" color="#004663" /> Leave Setup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Leave Setup</DialogTitle>
          <DialogDescription>
            You can setup the leave for the employee here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DropdownField
              control={control}
              name="type"
              label="Employee Type *"
              data={initialData?.types}
              placeholder="Select Type"
              baseClassName="w-full"
            />
            <DropdownField
              control={control}
              name="classification"
              label="Classification *"
              data={initialData?.classes}
              placeholder="Select Classification"
              baseClassName="w-full"
            />

            <InputField
              control={control}
              name="year"
              placeholder="e.g., 2022"
              label="Year Setup *"
              type="number"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-md text-muted-foreground font-normal">
                    Leave Entitlements
                  </TableHead>
                  <TableHead className="w-[200px] text-md text-muted-foreground font-normal">
                    Opening Balance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell className="text-md text-primary whitespace-nowrap">
                      {getLeaveName(field.leaveEntitlement)}
                      <input
                        type="hidden"
                        {...register(`entitlements.${index}.leaveEntitlement`)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        {...register(`entitlements.${index}.openingBalance`, {
                          valueAsNumber: true,
                        })}
                        className="w-full"
                      />
                      {errors.entitlements?.[index]?.openingBalance && (
                        <span className="text-xs text-red-500">
                          {errors.entitlements[index]?.openingBalance?.message}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ButtonLoading
              type="submit"
              text="Save Leave Setup"
              textLoading="Saving..."
              icon={<Send variant="Bold" size={16} color="#fff" />}
              className="h-10"
              loading={isSubmitting}
              disabled={isSubmitting}
              variant="default"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeLeaveSetupForm
