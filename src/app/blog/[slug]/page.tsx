import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BlogPostContent } from '@/components/blog/BlogPostContent'
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

  // Incrementar visualizações (silencioso)
  incrementPostViews(post.id).catch(console.error)

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="grid-pattern absolute inset-0 opacity-10 pointer-events-none" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              <BlogPostContent post={post as any} />
              
              <div className="mt-20">
                <BlogComments 
                  postId={post.id} 
                  initialComments={post.comments as any} 
                  postSlug={params.slug} 
                />
              </div>
            </div>

            {/* Sidebar do Post (pode ser a sidebar geral ou uma específica) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                 <div className="glass rounded-2xl p-6 border border-[#333333]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                      Author Intelligence
                    </h3>
                    <div className="flex items-center space-x-4">
                      {post.author.image && (
                        <img 
                          src={post.author.image} 
                          alt={post.author.name || ''} 
                          className="w-12 h-12 rounded-full border border-[#F57C00]/30"
                        />
                      )}
                      <div>
                        <p className="text-sm font-bold text-white leading-none">
                          {post.author.name}
                        </p>
                        <p className="text-[10px] text-[#F57C00] uppercase mt-1">
                          {post.author.role}
                        </p>
                      </div>
                    </div>
                    {post.author.bio && (
                      <p className="text-xs text-gray-400 mt-4 leading-relaxed line-clamp-3">
                        {post.author.bio}
                      </p>
                    )}
                 </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}