import Link from 'next/link'
import { Pencil, Trash2, Eye, Clock, User, MessageCircle } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  published: boolean
  createdAt: string
  author: {
    name: string
  }
  _count: {
    comments: number
  }
}

interface BlogPostListProps {
  posts: BlogPost[]
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Erro ao excluir post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Erro ao excluir post')
    }
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="admin-card"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {post.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    post.published
                      ? 'bg-green-500 text-green-50'
                      : 'bg-yellow-500 text-yellow-50'
                  }`}
                >
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post._count.comments} comentários</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                title="Ver post"
              >
                <Eye className="h-4 w-4" />
              </Link>

              <Link
                href={`/blog/admin/posts/${post.slug}/edit`}
                className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                title="Editar post"
              >
                <Pencil className="h-4 w-4" />
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Excluir post"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            Nenhum post encontrado
          </div>
          <Link
            href="/blog/admin/posts/new"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Criar primeiro post
          </Link>
        </div>
      )}
    </div>
  )
}