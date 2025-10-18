import { Link } from '@tanstack/react-router'
import { ArrowRight, Shield, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <div className="w-8 h-8 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white">
              <span className="text-gray-300">MANDARINO</span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Your secure workspace
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Experience the next generation of secure productivity tools. 
            Built with security and simplicity in mind. Sign in to access your workspace or create a new account to get started.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50 text-lg">
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="px-8 py-3 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold rounded-lg transition-colors text-lg">
                  Create Account
                </Button>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Join thousands of users who trust Mandarino for their secure workspace
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Mandarino?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Built with modern security standards and user experience in mind
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="mb-4">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Enterprise Security
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Industry-standard encryption and security practices to keep your data safe and private.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="mb-4">
              <Zap className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Optimized performance and instant responses for a seamless user experience.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="mb-4">
              <Sparkles className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Modern Design
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Clean, intuitive interface that adapts to your workflow and enhances productivity.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of users who trust Mandarino for their daily work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50 text-lg">
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="px-8 py-3 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold rounded-lg transition-colors text-lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
