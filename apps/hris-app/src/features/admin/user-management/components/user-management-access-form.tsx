import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  userManagementAccessSchema,
  type UserManagementAccessSchema,
} from '../types/schema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Key, Send } from 'iconsax-reactjs'
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import {
  getUserManagementInitialOptions,
  userManagementRolesAccessMutation,
} from '../hooks/useUserManagement'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useSuspenseQuery } from '@tanstack/react-query'
import CheckboxField from '@/components/custom/inputs/CheckboxField'
import { USER_MANAGEMENT_APP_CHECKLIST } from '../types/constant'
import { StackCol } from '@/components/custom/layouts'
import { Label } from '@/components/ui/label'
import { UserAvatarCell } from '@/components/custom/grid/columns/column-type'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/utils'

interface UserManagementAccessFormProps {
  userInfo: UserManagement
  userName: string
  roleNames?: string[] | Array<SelectionItem<string>>
  accessNames?: string[] | Array<SelectionItem<string>>
}

const UserManagementAccessForm = ({
  userInfo,
  userName,
  roleNames = [],
  accessNames = [],
}: UserManagementAccessFormProps) => {
  const { data: initials } = useSuspenseQuery(getUserManagementInitialOptions())
  const { mutateAsync, isPending } = userManagementRolesAccessMutation()

  // Helper to normalize input to string array
  const normalizeToValueArray = (
    data: string[] | Array<SelectionItem<string>>,
  ): string[] => {
    if (data.length === 0) return []
    if (typeof data[0] === 'string') return data as string[]
    return (data as Array<SelectionItem<string>>).map((item) => item.value)
  }

  const form = useForm<UserManagementAccessSchema>({
    resolver: zodResolver(userManagementAccessSchema),
    defaultValues: {
      roleNames: normalizeToValueArray(roleNames),
      accessNames: normalizeToValueArray(accessNames),
    },
  })

  const { handleSubmit } = form

  const onSubmit = async (data: UserManagementAccessSchema) => {
    try {
      await mutateAsync({ data, userName })
      toast.success('User access updated successfully')
    } catch (error) {
      toast.error('Failed to update user access', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-md font-normal justify-start">
          <Key variant="Bold" size={20} />
          Roles & Access
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[550px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Management Roles & Access</DialogTitle>
          <DialogDescription>
            Manage roles and application access for <strong>{userName}</strong>.
          </DialogDescription>
        </DialogHeader>
        <StackCol className="rounded-md border border-border bg-primary p-3">
          <Label className="text-md font-normal uppercase text-white">
            Employee Name
          </Label>
          <UserAvatarCell
            name={userInfo.firstName + ' ' + userInfo.lastName}
            avatarUrl={userInfo.photo}
            description={userInfo.jobTitle}
            className="text-sm uppercase font-semibold text-white"
          />
        </StackCol>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-20">
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <CheckboxField
                control={form.control}
                name="roleNames"
                label="Roles"
                data={initials.roles}
              />
              <CheckboxField
                control={form.control}
                name="accessNames"
                label="Applications Access"
                data={USER_MANAGEMENT_APP_CHECKLIST}
              />
            </Suspense>
            <DialogFooter>
              <ButtonLoading
                variant="default"
                textLoading="CREATING..."
                loading={isPending}
                text="CREATE ACCESS"
                type="submit"
                icon={<Send variant="Bold" size={24} />}
                className="h-10 w-full"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserManagementAccessForm
