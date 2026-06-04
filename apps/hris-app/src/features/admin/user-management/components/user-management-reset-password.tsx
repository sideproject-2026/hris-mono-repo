import { InputField } from '@hris/shared-ui'
import { Button } from '@hris/shared-ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hris/shared-ui'
import { Form } from '@hris/shared-ui'
import { Key, Lock } from 'iconsax-reactjs'
import { useForm } from 'react-hook-form'
import {
  userManagementResetPasswordSchema,
  type UserManagementResetPasswordSchema,
} from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { userManagementResetPasswordMutation } from '../hooks/useUserManagement'
import { toast } from 'sonner'
import { Eye, EyeSlash, Magicpen, Send } from 'iconsax-reactjs'
import { useState } from 'react'
import { ButtonLoading } from '@hris/shared-ui'
import { DialogFooter } from '@hris/shared-ui'
import { getErrorMessage } from '@/lib/utils'

interface UserManagementResetPasswordProps {
  userName: string
  fullname: string
}
const UserManagementResetPassword = ({
  userName,
  fullname,
}: UserManagementResetPasswordProps) => {
  const form = useForm<UserManagementResetPasswordSchema>({
    resolver: zodResolver(userManagementResetPasswordSchema),
    defaultValues: {
      userName: userName,
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  const { mutateAsync, isPending } = userManagementResetPasswordMutation()
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const handleGeneratePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const allChars = uppercase + lowercase + numbers

    // Ensure at least one of each category
    let password = ''
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]

    // Fill the rest to reach 12 characters
    for (let i = password.length; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Shuffle the password
    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('')

    form.setValue('newPassword', password)
    form.setValue('newPasswordConfirmation', password)
    setShowPassword(true)
    toast.info('Complex password generated')
  }

  const onSubmit = async (data: UserManagementResetPasswordSchema) => {
    try {
      await mutateAsync(data)
      toast.success('Password reset successfully')
      form.reset()
      setOpen(false)
    } catch (error) {
      toast.error('Failed to reset password', {
        description: getErrorMessage(error),
        style: { color: 'red' },
      })
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-md font-normal w-full">
          <Lock variant="Bulk" size={20} />
          Reset Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription className="text-md font-normal">
            Reset password for <strong className="uppercase">{fullname}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <InputField
                control={form.control}
                name="newPassword"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter or generate password"
              />
              <div className="absolute right-0 top-8 flex items-center pr-1 h-11">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary -mt-2"
                  onClick={handleGeneratePassword}
                  title="Generate Random Password"
                >
                  <Magicpen size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary -mt-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            <div className="relative">
              <InputField
                control={form.control}
                name="newPasswordConfirmation"
                label="Confirm Password"
                type={showPasswordConfirmation ? 'text' : 'password'}
                placeholder="Confirm your password"
              />
              <div className="absolute right-0 top-8 flex items-center pr-1 h-11">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary -mt-2"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? (
                    <EyeSlash size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <ButtonLoading
                variant="default"
                loading={isPending}
                text="Reset Password"
                textLoading="Resetting..."
                icon={<Send variant="Bold" size={20} />}
                type="submit"
                className="w-full h-11"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserManagementResetPassword
