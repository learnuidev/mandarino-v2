import { createFileRoute } from '@tanstack/react-router'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSignoutMutation } from '@/modules/auth/use-signout-mutation'
import { useGetAuthUserQuery } from '@/modules/auth/use-get-auth-user.query'
import { Loader2, LogOut, User } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/protected')({
  component: ProtectedPage,
})

function ProtectedPage() {
  const navigate = useNavigate()
  const signoutMutation = useSignoutMutation()
  const { data: user, isLoading: userLoading } = useGetAuthUserQuery()

  const handleSignOut = async () => {
    try {
      await signoutMutation.mutateAsync()
      navigate({ to: '/auth' })
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <AuthGuard
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => navigate({ to: '/auth' })}
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      }
    >
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Protected Page</h1>
            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={signoutMutation.isPending}
            >
              {signoutMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Sign Out
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
              <CardDescription>
                Your authenticated user information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading user information...</span>
                </div>
              ) : user ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">User ID</label>
                    <p className="font-mono text-sm">{user.sub}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{user.email}</p>
                  </div>
                  {user.email_verified !== undefined && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email Verified</label>
                      <p>{user.email_verified ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p>Unable to load user information.</p>
              )}
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to the Protected Area!</CardTitle>
                <CardDescription>
                  This page is only accessible to authenticated users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You have successfully signed in and can now access protected content. 
                  The authentication state is managed by AWS Cognito and persisted across page refreshes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
