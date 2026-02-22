import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { BlogAdminHeader } from '@/components/blog/admin/BlogAdminHeader'
import { BlogPostList } from '@/components/blog/admin/BlogPostList'
import { getBlogPosts } from '@/lib/blog'

export default async function BlogAdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    redirect('/auth/signin?callbackUrl=/blog/admin')
  }

  const { posts } = await getBlogPosts({ limit: 50 })

  return (
    <div className="min-h-screen bg-gray-950">
      <BlogAdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Administração do Blog
          </h1>
          <p className="text-gray-400">
            Gerencie posts, comentários e configurações do blog
          </p>
        </div>

        <BlogPostList posts={posts} />
      </div>
    </div>
  )
}