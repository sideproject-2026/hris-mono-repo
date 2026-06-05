import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { DoorOpenIcon } from 'lucide-react'

import { useFieldArray, useForm } from 'react-hook-form'
import {
  type EmployeeSingleSchemaTypes,
  employeeSingleSetupSchema,
} from '../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { LEAVES_DATA } from '../../types/constant'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { StackCol } from '@/components/custom/layouts'
import InputLabels from '@/components/custom/labels/InputLabels'

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

const EmployeeOBForm = ({ employeeId }: { employeeId: string }) => {
  const { register, control, handleSubmit, formState, watch, reset } =
    useForm<EmployeeSingleSchemaTypes>({
      resolver: zodResolver(employeeSingleSetupSchema) as any,
      defaultValues: {
        year: new Date().getFullYear(),
        entitlements: LEAVES_DATA,
      },
    })

  const { fields } = useFieldArray({
    control,
    name: 'entitlements',
  })

  const onSubmit = () => {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-2 text-md font-normal"
          size={'sm'}
        >
          <DoorOpenIcon className="mr-2 size-4" />
          Opening Balance
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Opening Balance</DialogTitle>
          <DialogDescription>
            Add Opening Balance for this employee
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StackCol>
            <InputLabels label="Year" text={watch('year')} />
          </StackCol>
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
                    <Input
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
                    {formState.errors.entitlements?.[index]?.openingBalance && (
                      <span className="text-xs text-red-500">
                        {
                          formState.errors.entitlements[index]?.openingBalance
                            ?.message
                        }
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeOBForm
