import { notFound } from 'next/navigation'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { BlogPostContent } from '@/components/blog/BlogPostContent'
import { BlogPostSidebar } from '@/components/blog/BlogPostSidebar'
import { BlogComments } from '@/components/blog/BlogComments'
import { getBlogPostBySlug, incrementPostViews } from '@/lib/blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Incrementar visualizações
  await incrementPostViews(post.id)

  return (
    <div className="min-h-screen bg-gray-950">
      <BlogHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <BlogPostContent post={post} />
            <BlogComments 
              postId={post.id} 
              initialComments={post.comments} 
              postSlug={params.slug} 
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogPostSidebar post={post} />
          </div>
        </div>
      </div>
    </div>
  )
}