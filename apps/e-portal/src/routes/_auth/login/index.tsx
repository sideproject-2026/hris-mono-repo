import Login from '@/features/auth/components/login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login/')({
  component: Login
})

