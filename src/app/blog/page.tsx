import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { generateSEOMetadata } from '@/components/shared/SEO'
import { getBlogPosts, getBlogCategories, getBlogTags, getPopularBlogPosts } from '@/lib/blog'

export const metadata = generateSEOMetadata({
  title: 'Blog DevMaker3D | Impressão 3D, Engenharia e Arte',
  description: 'Fique por dentro das novidades da impressão 3D, guias de engenharia e tutoriais de fabricação digital na DevMaker3D.',
})

export default async function BlogPage() {
  const { posts, pagination } = await getBlogPosts()
  const categories = await getBlogCategories()
  const tags = await getBlogTags()
  const popularPosts = await getPopularBlogPosts()

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="grid-pattern absolute inset-0 opacity-10 pointer-events-none" />
        
        {/* Blog Hero Section */}
        <section className="container-custom relative mb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-orange">
              Intellectual <br />
              <span className="text-white">Universe 3D</span>
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Explore o nexo entre engenharia de precisão e alma artística. Informações, 
              técnicas e a comunidade maker em um só lugar.
            </p>
          </div>
        </section>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post as any} />
                ))}
              </div>
              
              {posts.length === 0 && (
                <div className="text-center py-20 glass rounded-3xl">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Nenhum post encontrado
                  </h3>
                  <p className="text-gray-400">
                    Nossos engenheiros estão preparando algo especial. Volte em breve!
                  </p>
                </div>
              )}
              
              {/* Paginação */}
              {pagination.pages > 1 && (
                <div className="flex justify-center mt-16">
                  <div className="flex space-x-3">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <a
                        key={page}
                        href={`/blog?page=${page}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                          page === pagination.page
                            ? 'bg-[#F57C00] text-white blog-glow-orange'
                            : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#252525] border border-[#333333]'
                        }`}
                      >
                        {page}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-12">
              <BlogSidebar 
                categories={categories}
                tags={tags}
                popularPosts={popularPosts}
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}