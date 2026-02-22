'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
      setError('As senhas não coincidem')
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === 'signup') {
        // Criar conta
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        })

        if (response.ok) {
          // Fazer login automaticamente após registro
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
          })

          if (result?.ok) {
            router.push('/')
          } else {
            setError('Erro ao fazer login após registro')
          }
        } else {
          const errorData = await response.json()
          setError(errorData.message || 'Erro ao criar conta')
        }
      } else {
        // Fazer login
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.ok) {
          router.push('/')
        } else {
          setError('Email ou senha inválidos')
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError('Erro ao processar solicitação')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-md text-red-500 text-sm">
          {error}
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Seu nome completo"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Senha
        </label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Sua senha"
          required
        />
      </div>

      {mode === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirmar Senha
          </label>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirme sua senha"
            required
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Processando...' : (mode === 'signup' ? 'Criar Conta' : 'Entrar')}
      </Button>

      <div className="text-center text-sm text-gray-400">
        {mode === 'signin' ? (
          <>
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/signup')}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              Criar conta
            </button>
          </>
        ) : (
          <>
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/signin')}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              Entrar
            </button>
          </>
        )}
      </div>
    </form>
  )
}