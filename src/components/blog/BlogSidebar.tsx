import Link from 'next/link'
import { Search, Tag, Folder, TrendingUp } from 'lucide-react'

interface BlogSidebarProps {
  categories?: Array<{
    name: string
    slug: string
    _count: { posts: number }
  }>
  tags?: Array<{
    name: string
    slug: string
    _count: { posts: number }
  }>
  popularPosts?: Array<{
    title: string
    slug: string
    views: number
  }>
}

export function BlogSidebar({ categories = [], tags = [], popularPosts = [] }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Busca */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Search className="h-5 w-5 mr-2 text-orange-500" />
          Buscar
        </h3>
        <input
          type="text"
          placeholder="Buscar posts..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Categorias */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Folder className="h-5 w-5 mr-2 text-orange-500" />
          Categorias
        </h3>
        <div className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/categoria/${category.slug}`}
                className="flex items-center justify-between text-gray-300 hover:text-orange-400 transition-colors py-1"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">({category._count.posts})</span>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Nenhuma categoria disponível</p>
          )}
        </div>
      </div>

      {/* Tags populares */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-orange-500" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="inline-block px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-orange-500/20 hover:text-orange-400 transition-colors"
              >
                #{tag.name}
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Nenhuma tag disponível</p>
          )}
        </div>
      </div>

      {/* Posts populares */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
          Populares
        </h3>
        <div className="space-y-3">
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block text-gray-300 hover:text-orange-400 transition-colors"
              >
                <h4 className="text-sm font-medium mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {post.views} visualizações
                </p>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Nenhum post popular disponível</p>
          )}
        </div>
      </div>
    </div>
  )
}