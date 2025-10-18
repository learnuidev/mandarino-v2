import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { LoginForm } from '@/components/auth/login-form'
import { RegisterForm } from '@/components/auth/register-form'
import { useIsAuthenticatedQuery } from '@/modules/auth/use-is-authenticated.query'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthPage,
})

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const navigate = useNavigate()
  const { data: isAuthenticated } = useIsAuthenticatedQuery()

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    navigate({ to: '/' })
    return null
  }

  if (isLogin) {
    return <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
  } else {
    return <RegisterForm isLogin={isLogin} setIsLogin={setIsLogin} />
  }
}
