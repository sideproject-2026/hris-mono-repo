import { useForm } from 'react-hook-form'
import { ArrowCircleRight2, LockCircle, UserOctagon } from 'iconsax-reactjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '../schema/auth-schema'
import type { AuthFormValues } from '../schema/auth-schema'
import { Form } from '@/components/ui/form'


import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

import ButtonLoading from '@hris/shared-ui/buttons/button-loading'
import { InputField } from '@hris/shared-ui'
import { useLogin } from '../hooks/useAuth'

const LoginComponent = () => {
  const { handleLogin, isPending } = useLogin()

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className="w-full h-full flex flex-col gap-2 rounded-md p-5 relative"
    >
      <span className="text-muted-foreground font-sans text-md">
        Please login your credential to continue
      </span>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <InputField
            control={form.control}
            name="username"
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
          <ButtonLoading
            type="submit"
            text="Login"
            textLoading="Logging In..."
            icon={
              <ArrowCircleRight2 variant="Bold" size={'24px'} color="#FFFFFF" />
            }
            loading={isPending}
            className="bg-primary font-sans font-semibold uppercase rounded-md text-white w-full flex items-center justify-center h-11"
            variant={'default'}
          />
        </form>
      </Form>
      <div className="flex flex-row gap-1 text-md text-muted-foreground font-sans mt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 font-sans font-medium">
          Register here
        </Link>
      </div>
    </motion.div>
  )
}

export default LoginComponent
