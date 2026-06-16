import {
  Form,
  DropdownField,
  DatePickerField,
  TextareaField,
  ButtonLoading,
  Button,
  StackRow,
  PageContainer,
  HeaderContainer,
  HeaderText,
  HeaderBackButton,
  GroupContainer,
} from '@hris/shared-ui'
import DropZoneField from '@/components/custom/inputs/DropZoneField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Plus, XIcon } from 'lucide-react'
import { Send } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { employeeInitialQueryOptions } from '@/features/employee-master/employees/hooks/useEmployee'
import {
  hrFormCreateSchema,
  type HRFormCreateSchemaType,
} from '../../types/create-schema'
import { HR_FORM_TYPE_OPTIONS } from '../../types/enum'
import { useCreateHRForm } from '../../hooks/useCreateHRForm'
import EmployeeDetailCard from './employee-detail-card'

const emptyDetail = {
  employeeId: '',
  isEligibleForRehire: false,
}

const HRFormCreate = () => {
  const navigate = useNavigate()
  const { data: initial } = useQuery(employeeInitialQueryOptions())
  const { mutateAsync: createHRForm } = useCreateHRForm()

  const form = useForm<HRFormCreateSchemaType>({
    resolver: zodResolver(hrFormCreateSchema) as any,
    defaultValues: {
      type: undefined,
      effectiveDate: new Date(),
      justification: '',
      attachment: null,
      details: [emptyDetail],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
  })

  const type = form.watch('type')

  const onSubmit = async (data: HRFormCreateSchemaType) => {
    try {
      await createHRForm(data)
      toast.success('Employee Action Request created successfully')
      navigate({ to: '/hr-forms' })
    } catch (error) {
      console.error(error)
      toast.error('Failed to create Employee Action Request')
    }
  }

  return (
    <div className="w-full h-full">
      <HeaderContainer loading={false}>
        <HeaderText
          title="New Employee Action Request"
          subtitle="File an action for one or more employees (hire, transfer, promotion, etc.)"
        >
          <HeaderBackButton to="/hr-forms" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={false}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl"
          >
            <GroupContainer title="Request Details">
              <DropdownField
                control={form.control}
                name="type"
                label="Type"
                placeholder="Select Type"
                baseClassName="w-full"
                data={HR_FORM_TYPE_OPTIONS as unknown as SelectionItem<string>[]}
              />
              <StackRow>
                <DatePickerField
                  control={form.control}
                  name="effectiveDate"
                  label="Effective Date"
                  placeholder="Select Effective Date"
                  baseClassName="w-full"
                />
              </StackRow>
              <TextareaField
                control={form.control}
                name="justification"
                label="Justification"
                placeholder="Enter Justification"
                baseClassName="w-full"
              />
              <DropZoneField
                control={form.control}
                name="attachment"
                label="Attachment"
                type="file"
              />
            </GroupContainer>

            {type !== undefined && (
              <GroupContainer title="Employees">
                <div className="flex items-center justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => append(emptyDetail)}
                    className="font-sans text-sm uppercase"
                  >
                    <Plus className="size-4" /> Add Employee
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <EmployeeDetailCard
                    key={field.id}
                    form={form}
                    index={index}
                    type={type}
                    initial={initial}
                    canRemove={fields.length > 1}
                    onRemove={() => remove(index)}
                  />
                ))}
              </GroupContainer>
            )}

            <StackRow className="gap-1">
              <ButtonLoading
                loading={false}
                text="Cancel"
                variant="outline"
                className="h-11 bg-red-500 text-white"
                type="button"
                icon={<XIcon />}
                onClick={() => navigate({ to: '/hr-forms' })}
              />
              <ButtonLoading
                loading={form.formState.isSubmitting}
                text="Submit Request"
                variant="outline"
                className="h-11"
                type="submit"
                icon={<Send variant="Bold" size={24} />}
              />
            </StackRow>
          </form>
        </Form>
      </PageContainer>
    </div>
  )
}

export default HRFormCreate
