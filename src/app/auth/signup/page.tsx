import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AuthForm } from '@/components/auth/AuthForm'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Criar Conta
          </h1>
          <p className="text-gray-400">
            Registre-se para interagir com o blog
          </p>
        </div>

        <AuthForm mode="signup" />
      </div>
    </div>
  )
}