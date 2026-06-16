import { useEffect, useMemo, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import {
  unifiedEmployeeInfoSchema,
  type UnifiedEmployeeInfoPayload,
} from '../../../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputField,
  DropdownField,
  ButtonLoading,
  Form,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hris/shared-ui'
import { Send } from 'iconsax-reactjs'
import { useUpdateEmployeeInformationMutation } from '@/features/employee-master/employees/hooks/useOtherInfo'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import {
  CITY_MUNICIPALITY_DATA,
  COUNTRY_DATA,
  PROVINCE_DATA,
  REGION_DATA,
} from '@/features/employee-master/employees/types/constant'
import { Plus } from 'lucide-react'
import { useOtherInformationContext } from '../providers/other-info-provider'


interface EmployeeFormAddressesProps {
  trigger?: React.ReactNode
  initialValues?: EmployeeAddressesTypes
}

const EmployeeFormAddresses = ({
  trigger,
  initialValues,
}: EmployeeFormAddressesProps) => {

  const { initialData, employeeId } = useOtherInformationContext()
  
  const { mutateAsync: createAddress } = useUpdateEmployeeInformationMutation()


  const [open, setOpen] = useState(false)

  const isEditMode = !!initialValues?.id

  const defaultValues = useMemo(
    () => ({
      entityType: 'Address',
      address: {
        type: initialValues?.addressType
          ? Number(initialValues.addressType)
          : undefined,
        street: initialValues?.street ?? '',
        region: initialValues?.region ?? '',
        province: initialValues?.province ?? '',
        municipality: initialValues?.municipality ?? '',
        zipCode: initialValues?.zipCode ?? '',
        country: initialValues?.country ?? '',
      }
    }),
    [initialValues],
  )

  const form = useForm<UnifiedEmployeeInfoPayload>({
    resolver: zodResolver(
      unifiedEmployeeInfoSchema,
    ) as Resolver<UnifiedEmployeeInfoPayload>,
    defaultValues: defaultValues as UnifiedEmployeeInfoPayload
  })

  useEffect(() => {
    if (!open) return
    form.reset(defaultValues as UnifiedEmployeeInfoPayload)
  }, [defaultValues, form, open])

  const onSubmit = async (data: UnifiedEmployeeInfoPayload) => {
    try {
      await createAddress({ id: employeeId ?? '', data })
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
                name="address.type"
                label="Address Type"
                placeholder="Address Type"
                data={initialData?.addressTypes}
              />
              <InputField
                control={form.control}
                name="address.street"
                label="Street"
                placeholder="Street"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DropdownField
                  control={form.control}
                  name="address.region"
                  label="Region"
                  placeholder="Region"
                  data={REGION_DATA}
                />
                <DropdownField
                  control={form.control}
                  name="address.province"
                  label="Province"
                  placeholder="Province/State"
                  data={PROVINCE_DATA}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DropdownField
                  control={form.control}
                  name="address.municipality"
                  label="City/Municipality"
                  placeholder="City/Municipality"
                  data={CITY_MUNICIPALITY_DATA}
                />
                <InputField
                  control={form.control}
                  name="address.zipCode"
                  label="Zip Code"
                  placeholder="Portal/Zip Code"
                />
              </div>
              <DropdownField
                control={form.control}
                name="address.country"
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
