'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function BlogHeader() {
  const { data: session } = useSession()

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            DevMaker3D
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/blog"
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/"
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Voltar ao Site
            </Link>
            
            {session ? (
              <>
                {(session.user.role === 'ADMIN' || session.user.role === 'EDITOR') && (
                  <Link
                    href="/blog/admin"
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                >
                  Sair
                </Button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}