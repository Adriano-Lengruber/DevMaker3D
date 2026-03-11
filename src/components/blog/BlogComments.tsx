'use client'

import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { MessageCircle, Heart, User, Send, Share2, Lock, ArrowRight } from 'lucide-react'

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    reactions: number
  }
}

interface BlogCommentsProps {
  postId: string
  initialComments: Comment[]
  postSlug: string
}

export function BlogComments({ postId, initialComments, postSlug }: BlogCommentsProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !session) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment, postId })
      })

      if (response.ok) {
        const createdComment = await response.json()
        setComments([createdComment, ...comments])
        setNewComment('')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-bold text-white flex items-center">
          <MessageCircle className="h-5 w-5 mr-3 text-[#F57C00]" />
          Community Feed ({comments.length})
        </h3>
        <div className="h-px flex-grow mx-8 bg-gradient-to-r from-[#333333] to-transparent opacity-50" />
      </div>

      {/* Input de Elite ou Call to Action */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="glass rounded-2xl p-6 border border-[#333333] mb-12 focus-within:border-[#F57C00]/30 transition-all">
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#252525] border border-[#333333] flex items-center justify-center overflow-hidden">
               {session.user?.image ? (
                 <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />
               ) : (
                 <User className="w-5 h-5 text-gray-600" />
               )}
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Hey ${session.user?.name?.split(' ')[0]}, what's on your mind?`}
                rows={3}
                className="w-full bg-transparent border-none text-white placeholder-gray-500 text-sm focus:ring-0 resize-none p-0"
                required
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#333333]">
                 <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                   Markdown Supported
                 </div>
                 <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="flex items-center space-x-2 px-6 py-2 bg-[#F57C00] text-white rounded-xl hover:bg-[#FF8C00] disabled:opacity-50 transition-all font-bold text-xs uppercase tracking-widest blog-glow-orange"
                >
                  {isSubmitting ? 'Transmitting...' : 'Dispatch'}
                  <Send className="w-3.5 h-3.5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass rounded-2xl p-8 border border-[#333333] mb-12 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F57C00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="w-14 h-14 rounded-2xl bg-[#F57C00]/10 flex items-center justify-center mb-6 border border-[#F57C00]/20 shadow-[0_0_20px_rgba(245,124,0,0.1)]">
            <Lock className="w-6 h-6 text-[#F57C00]" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-montserrat)]">Join the Discussion</h4>
          <p className="text-sm text-gray-400 max-w-sm mb-8 font-light italic">
            "Knowledge logic is incomplete without community peer-review."
          </p>
          <button 
            onClick={() => signIn()}
            className="group/auth relative flex items-center justify-center gap-3 px-8 py-3 bg-[#1A1A1A] border border-[#333333] text-white rounded-xl hover:border-[#F57C00]/50 transition-all duration-300 font-bold text-xs uppercase tracking-widest overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#F57C00]/5 translate-x-full group-hover/auth:translate-x-0 transition-transform duration-500" />
            Initialize Identity
            <ArrowRight className="w-4 h-4 group-hover/auth:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Social Thread */}
      <div className="space-y-6">
        {comments.map((comment: Comment) => (
          <div key={comment.id} className="glass rounded-2xl p-6 border border-[#333333] group hover:border-[#F57C00]/20 transition-all duration-500">
            <div className="flex items-start space-x-4">
              {comment.author.image ? (
                <img
                  src={comment.author.image}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 border border-[#333333]"
                />
              ) : (
                <div className="w-10 h-10 bg-[#252525] rounded-full flex items-center justify-center border border-[#333333]">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              )}
              
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                     <span className="text-sm font-bold text-white">{comment.author.name}</span>
                     <span className="w-1 h-1 bg-[#333333] rounded-full" />
                     <span className="text-[10px] font-mono text-gray-500 uppercase">{formatDate(comment.createdAt)}</span>
                  </div>
                  <Share2 className="w-3.5 h-3.5 text-gray-600 cursor-pointer hover:text-white transition-colors" />
                </div>

                <div className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                  {comment.content}
                </div>

                <div className="flex items-center space-x-4">
                   <button className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#252525] hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold font-mono">{comment._count.reactions}</span>
                   </button>
                   <button className="text-[10px] font-bold text-gray-600 hover:text-white uppercase tracking-widest">
                      Reply
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-20 bg-[#1A1A1A]/30 rounded-3xl border border-dashed border-[#333333]">
            <MessageCircle className="h-10 w-10 text-gray-700 mx-auto mb-4" />
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              The silence is heavy
            </h4>
            <p className="text-xs text-gray-600">
              Be the first to initiate contact through the community feed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}