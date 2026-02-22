'use client'

import { useState } from 'react'
import { MessageCircle, Heart, ThumbsUp, Laugh, Wow, Sad, Angry, User } from 'lucide-react'

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    image: string | null
  }
  reactions: Array<{
    type: string
    userId: string
  }>
  _count: {
    reactions: number
  }
}

interface BlogCommentsProps {
  postId: string
  initialComments: Comment[]
  postSlug: string
}

const REACTIONS = [
  { type: 'like', emoji: '👍', label: 'Curtir' },
  { type: 'love', emoji: '❤️', label: 'Amei' },
  { type: 'laugh', emoji: '😂', label: 'Engraçado' },
  { type: 'wow', emoji: '😮', label: 'Surpreso' },
  { type: 'sad', emoji: '😢', label: 'Triste' },
  { type: 'angry', emoji: '😠', label: 'Irritado' }
]

export function BlogComments({ postId, initialComments, postSlug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userReactions, setUserReactions] = useState<Record<string, string>>({})

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          postId
        })
      })

      if (response.ok) {
        const createdComment = await response.json()
        setComments([createdComment, ...comments])
        setNewComment('')
        alert('Comentário enviado com sucesso! Ele será revisado antes de ser publicado.')
      } else {
        alert('Erro ao enviar comentário. Tente novamente.')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Erro ao enviar comentário.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReaction = async (commentId: string, reactionType: string) => {
    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reactionType,
          commentId
        })
      })

      if (response.ok) {
        // Atualizar reações localmente
        const result = await response.json()
        if (result.message === 'Reaction removed') {
          setUserReactions(prev => {
            const newReactions = { ...prev }
            delete newReactions[commentId]
            return newReactions
          })
        } else {
          setUserReactions(prev => ({
            ...prev,
            [commentId]: reactionType
          }))
        }
      }
    } catch (error) {
      console.error('Error handling reaction:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
        <MessageCircle className="h-6 w-6 mr-2 text-orange-500" />
        Comentários ({comments.length})
      </h3>

      {/* Formulário de comentário */}
      <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Deixe seu comentário..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          required
        />
        
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
          </button>
        </div>
      </form>

      {/* Lista de comentários */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-author">
              {comment.author.image ? (
                <img
                  src={comment.author.image}
                  alt={comment.author.name}
                  className="comment-author-avatar"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
              )}
              
              <span className="comment-author-name">{comment.author.name}</span>
              <span className="comment-date">{formatDate(comment.createdAt)}</span>
            </div>

            <div className="comment-content mb-4">
              {comment.content}
            </div>

            {/* Reações */}
            <div className="flex items-center space-x-2">
              {REACTIONS.map((reaction) => {
                const isActive = userReactions[comment.id] === reaction.type
                return (
                  <button
                    key={reaction.type}
                    onClick={() => handleReaction(comment.id, reaction.type)}
                    className={`reaction-button ${
                      isActive ? 'active' : ''
                    }`}
                    title={reaction.label}
                  >
                    <span className="emoji">{reaction.emoji}</span>
                    <span className="text-sm">
                      {comment.reactions.filter(r => r.type === reaction.type).length}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-300 mb-2">
              Seja o primeiro a comentar!
            </h4>
            <p className="text-gray-400">
              Compartilhe suas ideias e experiências sobre este post.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}