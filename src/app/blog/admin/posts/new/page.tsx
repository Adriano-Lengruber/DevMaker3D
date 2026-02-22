import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { BlogAdminHeader } from '@/components/blog/admin/BlogAdminHeader'
import { BlogPostForm } from '@/components/blog/admin/BlogPostForm'

export default async function NewBlogPostPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    redirect('/auth/signin?callbackUrl=/blog/admin/posts/new')
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <BlogAdminHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Criar Novo Post
          </h1>
          <p className="text-gray-400">
            Escreva um novo artigo para o blog
          </p>
        </div>

        <BlogPostForm />
      </div>
    </div>
  )
}