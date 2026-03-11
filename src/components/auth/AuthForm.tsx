'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Neural mismatch: Passwords do not align.')
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === 'signup') {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        })

        if (response.ok) {
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
          })

          if (result?.ok) {
            router.push('/')
          } else {
            setError('Auth link established, but login failed.')
          }
        } else {
          const errorData = await response.json()
          setError(errorData.message || 'Node rejection: Could not create account.')
        }
      } else {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.ok) {
          router.push('/')
        } else {
          setError('Access Denied: Invalid credentials detected.')
        }
      }
    } catch (error) {
      console.error('Auth crash:', error)
      setError('System failure: Connection interrupted.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-mono text-xs uppercase tracking-tight">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-500 group-focus-within:text-[#F57C00] transition-colors" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full Name"
              className="block w-full pl-11 pr-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F57C00]/50 transition-all font-light"
              required
            />
          </div>
        )}

        <div className="group relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-[#F57C00] transition-colors" />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Neural Email"
            className="block w-full pl-11 pr-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F57C00]/50 transition-all font-light"
            required
          />
        </div>

        <div className="group relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-[#F57C00] transition-colors" />
          </div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Security Token (Password)"
            className="block w-full pl-11 pr-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F57C00]/50 transition-all font-light"
            required
          />
        </div>

        {mode === 'signup' && (
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-[#F57C00] transition-colors" />
            </div>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Validate Password"
              className="block w-full pl-11 pr-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F57C00]/50 transition-all font-light"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full group/btn relative flex items-center justify-center gap-3 px-6 py-4 bg-[#F57C00] text-white rounded-xl hover:bg-[#FF8C00] transition-all duration-300 font-bold text-xs uppercase tracking-widest blog-glow-orange disabled:opacity-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          {isSubmitting ? 'Processing Network...' : (mode === 'signup' ? 'Initialize Account' : 'Establish Session')}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333333]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-mono">
            <span className="bg-[#0F0F0F] px-4 text-gray-500">Neural Sync</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button
             type="button"
             onClick={() => signIn('google')}
             className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white hover:border-[#F57C00]/50 transition-all text-xs font-bold uppercase tracking-widest"
           >
             <Chrome className="w-4 h-4 text-[#F57C00]" />
             Google
           </button>
           <button
             type="button"
             onClick={() => signIn('github')}
             className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white hover:border-[#F57C00]/50 transition-all text-xs font-bold uppercase tracking-widest"
           >
             <Github className="w-4 h-4 text-[#F57C00]" />
             GitHub
           </button>
        </div>

        <div className="mt-8 text-center">
           <button
             type="button"
             onClick={() => router.push(mode === 'signin' ? '/auth/signup' : '/auth/signin')}
             className="text-[10px] text-gray-500 hover:text-[#F57C00] uppercase tracking-widest transition-all font-mono"
           >
             {mode === 'signin' ? 'Need a new identity? register' : 'Existing identity found? sign in'}
           </button>
        </div>
      </form>
    </div>
  )
}