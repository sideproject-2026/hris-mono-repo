import { useEffect, useMemo, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import {
  employeeAddressSchema,
  type EmployeeAddressSchemaTypes,
} from '../../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '@/components/custom/inputs'
import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Send } from 'iconsax-reactjs'
import { employeeAddressMutation } from '@/features/employees/hooks/useOtherInfo'

import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useEmployeeAddressesContext } from './employee-addresses-provider'
import {
  CITY_MUNICIPALITY_DATA,
  COUNTRY_DATA,
  PROVINCE_DATA,
  REGION_DATA,
} from '@/features/employees/types/constant'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'

interface EmployeeFormAddressesProps {
  trigger?: React.ReactNode
  initialValues?: EmployeeAddressesTypes
}

const EmployeeFormAddresses = ({
  trigger,
  initialValues,
}: EmployeeFormAddressesProps) => {
  const { initialData } = useEmployeeAddressesContext()
  const { mutateAsync } = employeeAddressMutation()
  const { employeeId } = useEmployeeProfileContext()

  const [open, setOpen] = useState(false)

  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      id: initialValues?.id ?? '',
      type: initialValues?.addressType
        ? Number(initialValues.addressType)
        : undefined,
      street: initialValues?.street ?? '',
      region: initialValues?.region ?? '',
      province: initialValues?.province ?? '',
      municipality: initialValues?.municipality ?? '',
      zipCode: initialValues?.zipCode ?? '',
      country: initialValues?.country ?? '',
    }),
    [initialValues],
  )

  const form = useForm<EmployeeAddressSchemaTypes>({
    resolver: zodResolver(
      employeeAddressSchema,
    ) as Resolver<EmployeeAddressSchemaTypes>,
    defaultValues,
  })

  useEffect(() => {
    if (!open) return
    form.reset(defaultValues)
  }, [defaultValues, form, open])

  const onSubmit = async (data: EmployeeAddressSchemaTypes) => {
    try {
      await mutateAsync({ id: employeeId ?? '', data })
      toast.success(
        isEditMode
          ? 'Employee address updated successfully'
          : 'Employee address added successfully',
      )
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error(
        isEditMode
          ? 'Failed to update employee address'
          : 'Failed to create employee address',
        {
          description: getErrorMessage(error),
          style: { color: 'red' },
        },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost">
            <Plus />
            ADD ADDRESS
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Employee Address' : 'Add Employee Address'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update employee address information'
              : 'Add employee address information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <DropdownField
                control={form.control}
                name="type"
                label="Address Type"
                placeholder="Address Type"
                data={initialData?.addressTypes}
              />
              <InputField
                control={form.control}
                name="street"
                label="Street"
                placeholder="Street"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DropdownField
                  control={form.control}
                  name="region"
                  label="Region"
                  placeholder="Region"
                  data={REGION_DATA}
                />
                <DropdownField
                  control={form.control}
                  name="province"
                  label="Province"
                  placeholder="Province/State"
                  data={PROVINCE_DATA}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DropdownField
                  control={form.control}
                  name="municipality"
                  label="City/Municipality"
                  placeholder="City/Municipality"
                  data={CITY_MUNICIPALITY_DATA}
                />
                <InputField
                  control={form.control}
                  name="zipCode"
                  label="Zip Code"
                  placeholder="Portal/Zip Code"
                />
              </div>
              <DropdownField
                control={form.control}
                name="country"
                label="Country"
                placeholder="Country"
                data={COUNTRY_DATA}
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="submit"
                text={isEditMode ? 'Update Address' : 'Save Address'}
                variant="default"
                icon={<Send size={18} variant={'Bold'} />}
                className="h-10"
              />
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 font-normal uppercase"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeFormAddresses
