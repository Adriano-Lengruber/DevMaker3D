import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, MessageCircle, Heart } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  readTime: number
  views: number
  publishedAt: Date
  author: {
    name: string
    image: string | null
  }
  categories: Array<{
    name: string
    slug: string
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
  return (
    <article className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-orange-500 transition-all duration-300 group">
      {/* Imagem de capa */}
      {post.coverImage && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/categoria/${category.slug}`}
              className="inline-block px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-400 rounded-full hover:bg-orange-500/20 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Título e resumo */}
        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>

        {/* Meta informações */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post._count.comments}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post._count.reactions}</span>
            </div>
          </div>
        </div>

        {/* Botão de leitura */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  )
}