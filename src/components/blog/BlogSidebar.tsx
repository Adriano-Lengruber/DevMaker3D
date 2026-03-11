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
    <div className="space-y-10 animate-fadeIn">
      {/* Busca */}
      <div className="glass rounded-2xl p-6 border border-[#333333]">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center">
          <Search className="h-4 w-4 mr-2 text-[#F57C00]" />
          Search Knowledge
        </h3>
        <div className="relative group">
          <input
            type="text"
            placeholder="Engenharia 3D..."
            className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#333333] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F57C00]/50 transition-all"
          />
        </div>
      </div>

      {/* Categorias */}
      <div className="glass rounded-2xl p-6 border border-[#333333]">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center">
          <Folder className="h-4 w-4 mr-2 text-[#F57C00]" />
          Knowledge Hub
        </h3>
        <div className="space-y-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/categoria/${category.slug}`}
                className="flex items-center justify-between text-gray-400 hover:text-white transition-all text-sm group"
              >
                <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                <span className="w-6 h-6 flex items-center justify-center bg-[#252525] rounded-md text-[10px] text-gray-500 font-mono group-hover:bg-[#F57C00]/20 group-hover:text-[#F57C00]">
                  {category._count.posts}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-xs italic">Aguardando categorização...</p>
          )}
        </div>
      </div>

      {/* Populares */}
      <div className="glass rounded-2xl p-6 border border-[#333333]">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-[#F57C00]" />
          Trending Topics
        </h3>
        <div className="space-y-6">
          {popularPosts.length > 0 ? (
            popularPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3">
                   <span className="text-xl font-bold text-[#333333] group-hover:text-[#F57C00]/30 transition-colors">
                    0{index + 1}
                   </span>
                   <div>
                    <h4 className="text-sm font-medium text-gray-300 leading-snug group-hover:text-white transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1 font-mono uppercase">
                      {post.views} units found
                    </p>
                   </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-xs italic">Explorando tendências...</p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="glass rounded-2xl p-6 border border-[#333333]">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center">
          <Tag className="h-4 w-4 mr-2 text-[#F57C00]" />
          Technical Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="px-3 py-1.5 text-[11px] bg-[#252525] text-gray-400 rounded-lg hover:bg-[#F57C00] hover:text-white transition-all border border-transparent hover:blog-glow-orange"
              >
                #{tag.name}
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-xs italic">Aguardando indexação...</p>
          )}
        </div>
      </div>
    </div>
  )
}