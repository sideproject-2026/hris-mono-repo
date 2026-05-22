import { createFileRoute } from '@tanstack/react-router'
import UserRegister from '@/features/auth/components/UserRegister'

export const Route = createFileRoute('/_login/register')({
  component: UserRegister,
})
