import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { BlogAdminHeader } from '@/components/blog/admin/BlogAdminHeader'
import { BlogPostForm } from '@/components/blog/admin/BlogPostForm'
import prisma from '@/lib/prisma'

interface EditBlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    redirect('/auth/signin?callbackUrl=/blog/admin')
  }

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      tags: true,
      category: true
    }
  })

  if (!post) {
    notFound()
  }

  const postData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    published: post.published,
    categoryId: post.categoryId,
    tags: post.tags.map(tag => tag.name)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <BlogAdminHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Editar Post
          </h1>
          <p className="text-gray-400">
            Atualize as informações do post
          </p>
        </div>

        <BlogPostForm post={postData} />
      </div>
    </div>
  )
}