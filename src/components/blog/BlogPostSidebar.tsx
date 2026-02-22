import Image from 'next/image'
import { Calendar, User, Eye, Heart, MessageCircle, Tag } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  publishedAt: Date
  views: number
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

interface BlogPostSidebarProps {
  post: BlogPost
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Sobre o autor */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Sobre o Autor</h3>
        
        <div className="flex items-center space-x-3 mb-4">
          {post.author.image ? (
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-white">{post.author.name}</h4>
            <p className="text-sm text-gray-400">Autor do Blog</p>
          </div>
        </div>

        {post.author.bio && (
          <p className="text-gray-300 text-sm mb-4">{post.author.bio}</p>
        )}

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>{post.views} visualizações</span>
          </div>
        </div>
      </div>

      {/* Estatísticas do post */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Estatísticas</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span>Comentários</span>
            </div>
            <span className="text-white font-medium">{post._count.comments}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="h-4 w-4" />
              <span>Reações</span>
            </div>
            <span className="text-white font-medium">{post._count.reactions}</span>
          </div>
        </div>
      </div>

      {/* Categorias relacionadas */}
      {post.categories.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Tag className="h-5 w-5 mr-2 text-orange-500" />
            Categorias
          </h3>
          
          <div className="space-y-2">
            {post.categories.map((category) => (
              <a
                key={category.slug}
                href={`/blog/categoria/${category.slug}`}
                className="block text-gray-300 hover:text-orange-400 transition-colors py-1"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Posts populares */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Posts Populares</h3>
        
        <div className="space-y-3">
          {/* Aqui você pode adicionar posts populares dinamicamente */}
          <a href="#" className="block text-gray-300 hover:text-orange-400 transition-colors">
            <h4 className="text-sm font-medium mb-1">Como escolher o material certo para sua peça</h4>
            <p className="text-xs text-gray-500">2.5k visualizações</p>
          </a>
          
          <a href="#" className="block text-gray-300 hover:text-orange-400 transition-colors">
            <h4 className="text-sm font-medium mb-1">Dicas de design para impressão 3D</h4>
            <p className="text-xs text-gray-500">1.8k visualizações</p>
          </a>
        </div>
      </div>
    </div>
  )
}