import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import {
  Home,
  Menu,
  X,
  LogIn,
  LogOut,
  Loader2,
} from 'lucide-react'
import { useIsAuthenticatedQuery } from '@/modules/auth/use-is-authenticated.query'
import { useSignoutMutation } from '@/modules/auth/use-signout-mutation'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { data: isAuthenticated, isLoading } = useIsAuthenticatedQuery()
  const signoutMutation = useSignoutMutation()

  const handleSignOut = async () => {
    try {
      await signoutMutation.mutateAsync()
      navigate({ to: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <>
      <header className="p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/">
              <img
                src="/tanstack-word-logo-white.svg"
                alt="TanStack Logo"
                className="h-10"
              />
            </Link>
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Button variant="ghost" size="sm" disabled>
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          ) : isAuthenticated ? (
            <>
      
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                disabled={signoutMutation.isPending}
              >
                {signoutMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          {/* Authentication Links */}
          <div className="border-b border-gray-700 my-4"></div>
          
          {!isLoading && (
            <>
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                  activeProps={{
                    className:
                      'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                  }}
                >
                  <LogIn size={20} />
                  <span className="font-medium">Sign In</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                  disabled={signoutMutation.isPending}
                >
                  {signoutMutation.isPending ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <LogOut size={20} />
                  )}
                  <span className="font-medium">Sign Out</span>
                </button>
              )}
            </>
          )}

          <div className="border-b border-gray-700 my-4"></div>

          
        </nav>
      </aside>
    </>
  )
}
