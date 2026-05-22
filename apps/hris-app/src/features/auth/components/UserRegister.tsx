import ButtonLoading from '@/components/custom/buttons/button-loading'
import { InputField } from '@/components/custom/inputs'
import { motion } from 'framer-motion'
import {
  ArrowCircleRight2,
  LockCircle,
  Personalcard,
  UserOctagon,
} from 'iconsax-reactjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema, type RegisterFormValues } from '../schema/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelfRegisterMutation } from '../hooks/useAuth'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { IdCardIcon, LockIcon, MailIcon, MailXIcon } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Link } from '@tanstack/react-router'

const UserRegister = () => {
  const { mutateAsync: registerAsync, isPending } = useSelfRegisterMutation()
  const [viewMessage, setViewMessage] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      userName: '',
      password: '',
      emailAddress: '',
      confirmPassword: '',
    },
  })

  const handleLogin = async (data: RegisterFormValues) => {
    try {
      var response = await registerAsync(data)
      toast.success('Register success')
      setViewMessage(true)
    } catch (error) {
      var errorMessage = getErrorMessage(error)
      toast.error(`Login failed: ${errorMessage}`)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className="w-full h-full flex flex-col gap-2 rounded-md p-5 relative"
    >
      <span className="text-gray-400 font-poppins text-md">
        Register your account
      </span>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <InputField
            control={form.control}
            name="employeeId"
            label=""
            type="text"
            baseClassName="w-full"
            placeholder="Enter your employee id"
            icon={<Personalcard size={'24px'} variant="Bold" color="#a6a6a6" />}
          />
          <InputField
            control={form.control}
            name="userName"
            label=""
            type="text"
            baseClassName="w-full"
            placeholder="Enter your username"
            icon={<UserOctagon variant="Bold" size={'24px'} color="#a6a6a6" />}
          />
          <InputField
            control={form.control}
            name="password"
            label=""
            type="password"
            baseClassName="w-full"
            placeholder="Enter your password"
            icon={<LockCircle variant="Bold" size={'24px'} color="#a6a6a6" />}
          />
          <InputField
            control={form.control}
            name="confirmPassword"
            label=""
            type="password"
            baseClassName="w-full"
            placeholder="Confirm your password"
            icon={<LockCircle variant="Bold" size={'24px'} color="#a6a6a6" />}
          />
          <InputField
            control={form.control}
            name="emailAddress"
            label=""
            type="email"
            baseClassName="w-full"
            placeholder="Enter your email address"
            icon={<MailIcon className="size-5" color="#a6a6a6" />}
          />

          <ButtonLoading
            type="submit"
            text="Register"
            icon={
              <ArrowCircleRight2 variant="Bold" size={'24px'} color="#FFFFFF" />
            }
            loading={isPending}
            className="bg-blue-800 font-poppins p-3 font-normal rounded-md text-white w-full flex gap-1 items-center justify-center h-11"
            variant={'default'}
          />
        </form>
      </Form>
      {viewMessage && (
        <div className="bg-amber-500 w-full  p-2 rounded-md">
          <p className="text-white font-poppins text-sm text-center">
            User Successfully Registered. Please coordinate with IT Department
            for account activation.
          </p>
        </div>
      )}

      <div className="flex flex-row gap-1 text-sm text-gray-500 font-poppins mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-poppins font-medium">
          Login here
        </Link>
      </div>
    </motion.div>
  )
}

export default UserRegister
