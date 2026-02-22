import { BlogHeader } from '@/components/blog/BlogHeader'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { getBlogPosts, getBlogCategories, getBlogTags, getPopularBlogPosts } from '@/lib/blog'

export default async function BlogPage() {
  const { posts, pagination } = await getBlogPosts()
  const categories = await getBlogCategories()
  const tags = await getBlogTags()
  const popularPosts = await getPopularBlogPosts()

  return (
    <div className="min-h-screen bg-gray-950">
      <BlogHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
            
            {posts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Nenhum post encontrado
                </h3>
                <p className="text-gray-400">
                  Volte em breve para novos conteúdos sobre impressão 3D!
                </p>
              </div>
            )}
            
            {/* Paginação */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <a
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`px-3 py-2 rounded-md ${
                        page === pagination.page
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
          <div className="lg:col-span-1">
            <BlogSidebar 
              categories={categories}
              tags={tags}
              popularPosts={popularPosts}
            />
          </div>
        </div>
      </div>
    </div>
  )
}