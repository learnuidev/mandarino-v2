import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { RegisterForm } from '@/components/auth/register-form'
import { useIsAuthenticatedQuery } from '@/modules/auth/use-is-authenticated.query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useSignoutMutation } from '@/modules/auth/use-signout-mutation'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { data: isAuthenticated, isLoading } = useIsAuthenticatedQuery()
  const [isLogin, setIsLogin] = useState(false)
  const signoutMutation = useSignoutMutation()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    )
  }

  // If user is already authenticated, show a friendly message
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-semibold text-center">
              You're Already Signed In!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Looks like you're already logged in to your Mandarino account. 
              You can access your workspace directly.
            </p>
            
            <div className="space-y-3">
              <Link to="/">
                <Button className="w-full">
                  Go to Your Workspace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <p className="text-sm text-muted-foreground">
                Not you?{' '}
                <button
                  onClick={async () => {
                    try {
                      await signoutMutation.mutateAsync()
                      setIsLogin(false) // Stay on registration page after sign out
                    } catch (error) {
                      console.error('Sign out error:', error)
                    }
                  }}
                  className="text-primary hover:underline"
                  disabled={signoutMutation.isPending}
                >
                  {signoutMutation.isPending ? 'Signing out...' : 'Sign out first'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If user wants to login instead of register
  if (isLogin) {
    return <RegisterForm isLogin={isLogin} setIsLogin={setIsLogin} />
  }

  return <RegisterForm isLogin={isLogin} setIsLogin={setIsLogin} />
}
