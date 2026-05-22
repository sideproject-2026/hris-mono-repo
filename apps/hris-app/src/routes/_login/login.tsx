import { createFileRoute } from '@tanstack/react-router'
import LoginComponent from '@/features/auth/components/LoginComponent'


export const Route = createFileRoute('/_login/login')({
  component: LoginComponent,
})

