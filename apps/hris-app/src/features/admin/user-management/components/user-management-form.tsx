import { Suspense, useEffect } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import {
  userManagementSchema,
  type UserManagementSchema,
} from '../types/schema'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Loader2, PlusIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import UserManagementSearch from './user-management-search'
import { InputField } from '@/components/custom/inputs'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  getUserManagementInitialOptions,
  userManagementMutation,
  userManagementUpdateMutation,
} from '../hooks/useUserManagement'
import { toast } from 'sonner'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { Send } from 'iconsax-reactjs'
import { getErrorMessage } from '@/lib/utils'

const UserManagementFormContent = ({
  form,
  isEdit = false,
}: {
  form: UseFormReturn<UserManagementSchema>
  isEdit?: boolean
}) => {
  const { data: initials } = useSuspenseQuery(getUserManagementInitialOptions())

  const departments = initials.departments.map((item) => ({
    value: item.text,
    text: item.text,
  }))

  const companies = initials.companies.map((item) => ({
    value: item.text,
    text: item.text,
  }))

  const designations = initials.designations.map((item) => ({
    value: item.text,
    text: item.text,
  }))

  const { control } = form

  return (
    <div className="space-y-4 p-4 -mt-5">
      {!isEdit && <UserManagementSearch form={form} />}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          control={control}
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
        />
        <InputField
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
        />
      </div>
      <DropdownField
        control={control}
        name="jobTitle"
        label="Job Title"
        placeholder="Select job title"
        data={designations}
      />
      <div className="grid grid-cols-2 gap-4">
        <DropdownField
          control={control}
          name="department"
          label="Department"
          placeholder="Select department"
          data={departments}
        />
        <DropdownField
          control={control}
          name="companyName"
          label="Company"
          placeholder="Select company"
          data={companies}
        />
      </div>
      <InputField
        control={control}
        name="userName"
        label="Username"
        placeholder="Enter username"
        disabled={isEdit}
      />
      {!isEdit && (
        <InputField
          control={control}
          name="password"
          label="Password"
          placeholder={isEdit ? 'Enter new password' : 'Enter password'}
          type="password"
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          control={control}
          name="emailAddress"
          label="Email Address"
          placeholder="Enter email address"
        />
        <InputField
          control={control}
          name="userLevel"
          label="User Level"
          placeholder="Enter user level"
          type="number"
        />
      </div>
    </div>
  )
}

interface UserManagementFormProps {
  initialValues?: UserManagementSchema
  trigger?: React.ReactNode
}

const UserManagementForm = ({
  initialValues,
  trigger,
}: UserManagementFormProps) => {
  const { mutateAsync: createMutate, isPending: isCreating } =
    userManagementMutation()
  const { mutateAsync: updateMutate, isPending: isUpdating } =
    userManagementUpdateMutation()

  const isEdit = !!initialValues
  const isPending = isCreating || isUpdating

  const form = useForm<UserManagementSchema>({
    resolver: zodResolver(userManagementSchema),
    defaultValues: {
      userName: '',
      password: '',
      employeeId: 0,
      firstName: '',
      lastName: '',
      companyName: '',
      department: '',
      jobTitle: '',
      photo: '',
      userLevel: 0,
      emailAddress: '',
      userRoles: ['User'],
    } as any,
  } as any)

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues)
    }
  }, [initialValues, form])

  const { handleSubmit } = form

  const onSubmit = async (values: UserManagementSchema) => {
    try {
      if (isEdit && initialValues?.userName) {
        await updateMutate({ data: values })
        toast.success('User updated successfully')
      } else {
        await createMutate(values)
        toast.success('User created successfully')
      }
    } catch (error) {
      toast.error(isEdit ? 'Failed to update user' : 'Failed to create user', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button
            variant={'ghost'}
            className="font-sans text-sm uppercase font-semibold"
          >
            <PlusIcon className="size-4" />
            Create User
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="!max-w-[550px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit User' : 'User Management'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update user information in the system.'
              : 'Add a new user to the system.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-20">
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <UserManagementFormContent form={form} isEdit={isEdit} />
            </Suspense>
            <SheetFooter className="p-4">
              <ButtonLoading
                variant="default"
                textLoading={isEdit ? 'Updating...' : 'Creating...'}
                loading={isPending}
                text={isEdit ? 'Update Account' : 'Create Account'}
                type="submit"
                icon={<Send variant="Bold" size={24} />}
                className="w-fit -mt-4 h-10"
              />
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default UserManagementForm
