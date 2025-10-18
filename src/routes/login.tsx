import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { LoginForm } from '@/components/auth/login-form'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
}
