import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  employeeMovementSchema,
  type EmployeeMovementSchemaTypes,
} from '../../../types/schema'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/custom/inputs'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Send } from 'iconsax-reactjs'
import {
  employeeInitialQueryOptions,
  employeeMovementMutation,
} from '../../../hooks/useEmployee'
import { useEffect } from 'react'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { EMPLOYEE_MOVEMENT_STATUS_DATA } from '../../../types/constant'
import { StackRow, StackCol } from '@/components/custom/layouts'
import { toast } from 'sonner'
import TextareaField from '@/components/custom/inputs/TextareaField'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

interface EmployeeMovementFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: string
  preSelectedType?: number
}

const EmployeeMovementForm = ({
  open,
  onOpenChange,
  employeeId,
  preSelectedType,
}: EmployeeMovementFormProps) => {
  const { data: initialData } = useSuspenseQuery(employeeInitialQueryOptions())

  const { mutateAsync: createMovement } = employeeMovementMutation()

  const form = useForm<EmployeeMovementSchemaTypes>({
    resolver: zodResolver(employeeMovementSchema),
    defaultValues: {
      employeeId: employeeId,
      type: preSelectedType ?? 0,
      dateFrom: new Date(),
      dateTo: new Date(),
      description: '',
      designationFrom: '',
      designationTo: '',
      companyFrom: '',
      companyTo: '',
      departmentFrom: '',
      departmentTo: '',
      branchFrom: '',
      branchTo: '',
    },
  })

  const selectedType = form.watch('type')

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    if (employeeId) {
      setValue('employeeId', employeeId)
    }
    if (open) {
      reset({
        employeeId: employeeId,
        type: preSelectedType ?? 0,
        dateFrom: new Date(),
        dateTo: new Date(),
        description: '',
        designationFrom: '',
        designationTo: '',
        companyFrom: '',
        companyTo: '',
        departmentFrom: '',
        departmentTo: '',
        branchFrom: '',
        branchTo: '',
      })
    }
  }, [employeeId, setValue, open, reset])

  const onSubmit = async (data: EmployeeMovementSchemaTypes) => {
    try {
      await createMovement({ employeeId, data })
      onOpenChange(false)
      toast.success('Movement created successfully')
      reset()
    } catch (error) {
      toast.error('Failed to create movement')
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-[600px]!">
        <SheetHeader>
          <SheetTitle>Employee Movement Form</SheetTitle>
          <SheetDescription>
            Add the movement/appointment details for this employee.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className="space-y-4 p-4 -mt-7">
            <DropdownField
              control={form.control}
              name="type"
              label="Select a movement type *"
              data={
                (EMPLOYEE_MOVEMENT_STATUS_DATA?.map((item) => ({
                  ...item,
                  value: item.value.toString(),
                })) as any) ?? []
              }
            />

            <>
              <StackRow gap="md">
                <InputField
                  control={form.control}
                  name="dateFrom"
                  label="Date From *"
                  type="date"
                  baseClassName="w-full"
                />
                <InputField
                  control={control as any}
                  name="dateTo"
                  label="Date To *"
                  type="date"
                  baseClassName="w-full"
                />
              </StackRow>
              <TextareaField
                control={form.control}
                name="description"
                label="Description *"
                placeholder="Enter movement description"
              />
            </>
            {selectedType == 6 && (
              <StackRow className="w-full">
                <DropdownField
                  control={form.control}
                  name="designationFrom"
                  label="Designation From"
                  data={initialData?.designations}
                  placeholder="Select designation from"
                  baseClassName="w-full"
                />
                <DropdownField
                  control={form.control}
                  name="designationTo"
                  label="Designation To"
                  data={initialData?.designations}
                  placeholder="Select designation to"
                  baseClassName="w-full"
                />
              </StackRow>
            )}
            {selectedType == 2 ||
              (selectedType == 7 && (
                <StackCol className="w-full">
                  <StackRow className="w-full">
                    <DropdownField
                      control={form.control}
                      name="designationFrom"
                      label="Designation From"
                      data={initialData?.designations}
                      placeholder="Select designation from"
                      baseClassName="w-full"
                    />
                    <DropdownField
                      control={form.control}
                      name="designationTo"
                      label="Designation To"
                      data={initialData?.designations}
                      placeholder="Select designation to"
                      baseClassName="w-full"
                    />
                  </StackRow>
                  <StackRow className="w-full">
                    <DropdownField
                      control={form.control}
                      name="departmentFrom"
                      label="Department From"
                      data={initialData?.departments}
                      placeholder="Select department from"
                      baseClassName="w-full"
                    />
                    <DropdownField
                      control={form.control}
                      name="departmentTo"
                      label="Department To"
                      data={initialData?.departments}
                      placeholder="Select department to"
                      baseClassName="w-full"
                    />
                  </StackRow>
                  <StackRow className="w-full">
                    <DropdownField
                      control={form.control}
                      name="companyFrom"
                      label="Company From"
                      data={initialData?.companies}
                      placeholder="Select company from"
                      baseClassName="w-full"
                    />
                    <DropdownField
                      control={form.control}
                      name="companyTo"
                      label="Company To"
                      data={initialData?.companies}
                      placeholder="Select company to"
                      baseClassName="w-full"
                    />
                  </StackRow>
                  <StackRow className="w-full">
                    <DropdownField
                      control={form.control}
                      name="branchFrom"
                      label="Branch From"
                      data={initialData?.branches}
                      placeholder="Select branch from"
                      baseClassName="w-full"
                    />
                    <DropdownField
                      control={form.control}
                      name="branchTo"
                      label="Branch To"
                      data={initialData?.branches}
                      placeholder="Select branch to"
                      baseClassName="w-full"
                    />
                  </StackRow>
                </StackCol>
              ))}
            <ButtonLoading
              type="button"
              text="Save Movement"
              textLoading="Saving..."
              icon={<Send variant="Bold" size={16} color="#fff" />}
              className="h-10"
              loading={isSubmitting}
              disabled={isSubmitting}
              variant="default"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EmployeeMovementForm
