import { createFileRoute } from '@tanstack/react-router'
import { AuthGuard } from '@/components/auth/auth-guard'
import LandingPage from '@/components/landing-page'
import { useIsAuthenticatedQuery } from '@/modules/auth/use-is-authenticated.query'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { data: isAuthenticated, isLoading } = useIsAuthenticatedQuery()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return (
    <AuthGuard fallback={<LandingPage />}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <section className="relative py-20 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <div className="w-8 h-8 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white">
                <span className="text-gray-300">WELCOME TO</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  MANDARINO
                </span>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Your secure workspace
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              You're successfully signed in! This is your protected dashboard where you can access all the features of Mandarino.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Your Dashboard
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <p className="text-lg text-gray-300">
                Welcome back! Your secure workspace is ready to use.
              </p>
              <p className="text-gray-400 mt-4">
                This is a protected page. Only authenticated users can see this content.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  )
}
