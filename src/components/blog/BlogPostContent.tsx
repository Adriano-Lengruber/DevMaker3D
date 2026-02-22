import Image from 'next/image'
import { Calendar, Clock, User, Eye, Heart, MessageCircle } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  content: string
  coverImage: string | null
  readTime: number
  views: number
  publishedAt: Date
  author: {
    name: string
    image: string | null
    bio: string | null
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

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      {/* Imagem de capa */}
      {post.coverImage && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

      <div className="p-8">
        {/* Meta informações */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min de leitura</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{post.views} visualizações</span>
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((category) => (
            <span
              key={category.slug}
              className="inline-block px-3 py-1 text-sm font-medium bg-orange-500/10 text-orange-400 rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-white mb-6">
          {post.title}
        </h1>

        {/* Conteúdo */}
        <div 
          className="prose prose-invert prose-orange max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-800">
          {post.tags.map((tag) => (
            <a
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="inline-block px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-orange-500/20 hover:text-orange-400 transition-colors"
            >
              #{tag.name}
            </a>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span>{post._count.comments} comentários</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <Heart className="h-4 w-4" />
              <span>{post._count.reactions} reações</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}