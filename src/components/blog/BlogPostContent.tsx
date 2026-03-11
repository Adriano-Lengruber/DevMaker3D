import Image from 'next/image'
import { Calendar, Clock, User, Eye, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  content: string
  coverImage: string | null
  readTime: number
  views: number
  publishedAt: Date | null
  author: {
    name: string | null
    image: string | null
    bio: string | null
    role: string | null
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
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date()

  return (
    <article className="animate-fadeIn">
      {/* Post Header / Hero */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-3 mb-8">
          {post.categories.map((cat) => (
            <span 
              key={cat.slug}
              className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#F57C00]/10 text-[#F57C00] border border-[#F57C00]/20"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-[#333333] text-sm text-gray-500 font-medium tracking-wide">
          <div className="flex items-center space-x-3">
             {post.author.image && (
               <img src={post.author.image} className="w-6 h-6 rounded-full grayscale" alt="" />
             )}
             <span className="text-white">{post.author.name}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-[#F57C00]" />
            <span>{publishedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-[#F57C00]" />
            <span>{post.readTime} min read</span>
          </div>

          <div className="flex items-center ml-auto space-x-6">
             <div className="flex items-center">
               <Eye className="w-4 h-4 mr-2 text-gray-600" />
               <span className="font-mono text-xs">{post.views}</span>
             </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {post.coverImage && (
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-[#333333]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      )}

      {/* Content Area */}
      <div 
        className="prose prose-invert prose-orange max-w-none 
                   prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
                   prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed prose-p:font-light
                   prose-strong:text-white prose-strong:font-bold
                   prose-img:rounded-3xl prose-img:border prose-img:border-[#333333]
                   prose-code:text-[#F57C00] prose-code:bg-[#1A1A1A] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                   prose-a:text-[#F57C00] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Post Footer Actions */}
      <footer className="mt-20 pt-12 border-t border-[#333333]">
        <div className="flex flex-wrap items-center justify-between gap-8">
           <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-[#1A1A1A] border border-[#333333] rounded-2xl hover:border-[#F57C00]/50 transition-all group">
                <Heart className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                <span className="text-sm font-bold text-white">{post._count.reactions}</span>
                <span className="text-xs text-gray-500 font-medium">Reactions</span>
              </button>
              
              <button className="p-3 bg-[#1A1A1A] border border-[#333333] rounded-2xl hover:border-[#F57C00]/50 transition-all text-gray-500 hover:text-white">
                <Share2 className="w-5 h-5" />
              </button>

              <button className="p-3 bg-[#1A1A1A] border border-[#333333] rounded-2xl hover:border-[#F57C00]/50 transition-all text-gray-500 hover:text-white">
                <Bookmark className="w-5 h-5" />
              </button>
           </div>

           <div className="flex flex-wrap gap-2">
             {post.tags.map((tag) => (
               <a
                 key={tag.slug}
                 href={`/blog/tag/${tag.slug}`}
                 className="text-xs font-mono text-gray-500 hover:text-[#F57C00] transition-colors"
               >
                 #{tag.name}
               </a>
             ))}
           </div>
        </div>
      </footer>
    </article>
  )
}