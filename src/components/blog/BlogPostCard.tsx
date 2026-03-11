import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, MessageCircle, Heart, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  readTime: number
  views: number
  publishedAt: Date | null
  author: {
    name: string | null
    image: string | null
  }
  categories: Array<{
    name: string
    slug: string
    color: string
  }>
  tags: Array<{
    name: string
    slug: string
  }>
  _count: {
    comments: number
    reactions: number
  }
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date()

  return (
    <article className="blog-card group flex flex-col h-full animate-fadeIn">
      {/* Imagem de capa com Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-[#252525] flex items-center justify-center">
            <span className="text-gray-600 font-mono text-xs">NO_SIGNAL_3D</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />
        
        {/* Categoria Float */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <span 
              key={cat.slug}
              className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#F57C00] text-white blog-glow-orange"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {/* Meta Header */}
        <div className="flex items-center space-x-4 mb-6 text-xs text-gray-500 font-medium tracking-wide">
          <div className="flex items-center">
            <User className="w-3.5 h-3.5 mr-1.5 text-[#F57C00]" />
            <span>{post.author.name || 'Admin'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#F57C00]" />
            <span>{publishedDate.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#F57C00] transition-colors duration-300">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 font-light text-sm leading-relaxed mb-8 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer info & Community Actions */}
        <div className="mt-auto pt-6 border-t border-[#333333] flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-400 group/icon cursor-pointer">
              <Heart className="w-4 h-4 mr-1.5 transition-colors group-hover/icon:text-red-500" />
              <span className="text-xs font-mono">{post._count.reactions}</span>
            </div>
            <div className="flex items-center text-gray-400 group/icon cursor-pointer">
              <MessageCircle className="w-4 h-4 mr-1.5 transition-colors group-hover/icon:text-[#F57C00]" />
              <span className="text-xs font-mono">{post._count.comments}</span>
            </div>
          </div>

          <Link 
            href={`/blog/${post.slug}`}
            className="flex items-center text-xs font-bold uppercase tracking-widest text-white hover:text-[#F57C00] transition-colors group/link"
          >
            Read Post
            <ArrowRight className="ml-2 w-3.5 h-3.5 transform transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}