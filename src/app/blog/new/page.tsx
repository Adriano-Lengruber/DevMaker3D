'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { 
  Plus, 
  Save, 
  Eye, 
  Trash2, 
  Type, 
  Image as ImageIcon, 
  Hash, 
  ChevronLeft,
  Settings,
  X,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NewPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    readTime: 5,
    category: '',
    tags: []
  })

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logic to save post...
    alert('Manifest Synthesis Pending: Logic to be connected with backend.')
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
             <div className="flex items-center space-x-6">
                <Link href="/blog/dashboard" className="p-3 bg-[#1A1A1A] border border-[#333333] rounded-xl text-gray-400 hover:text-white hover:border-[#F57C00]/30 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                   <h1 className="text-3xl font-bold text-white mb-1 uppercase tracking-tight font-[family-name:var(--font-montserrat)]">Synthesize <span className="text-[#F57C00]">Knowledge</span></h1>
                   <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">New Manifest Manifest-2026-X12</p>
                </div>
             </div>
             
             <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-[#1A1A1A] border border-[#333333] text-gray-400 rounded-xl hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
                   <Eye className="w-4 h-4" />
                   <span>Preview Projection</span>
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-8 py-3 bg-[#F57C00] text-white rounded-xl hover:bg-[#FF8C00] transition-all font-bold text-xs uppercase tracking-[0.1em] blog-glow-orange shadow-[0_0_30px_rgba(245,124,0,0.2)]"
                >
                  <Save className="w-4 h-4" />
                  <span>Transmit Post</span>
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Editor Area */}
            <div className="lg:col-span-2 space-y-8">
               <div className="glass rounded-3xl p-8 border border-[#333333] space-y-8">
                  
                  {/* Title Input */}
                  <div className="space-y-4">
                     <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center">
                        <Type className="w-3.5 h-3.5 mr-2 text-[#F57C00]" />
                        Neural Headline
                     </label>
                     <input 
                       type="text" 
                       value={formData.title}
                       onChange={(e) => setFormData({...formData, title: e.target.value})}
                       placeholder="Enter the title of your knowledge manifest..."
                       className="w-full bg-transparent border-none text-4xl font-bold text-white placeholder-gray-800 focus:ring-0 p-0"
                     />
                  </div>

                  {/* Excerpt Input */}
                  <div className="space-y-4">
                     <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center">
                        <BookOpen className="w-3.5 h-3.5 mr-2 text-[#F57C00]" />
                        Executive Summary (Excerpt)
                     </label>
                     <textarea 
                       value={formData.excerpt}
                       onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                       rows={3}
                       placeholder="A technical abstraction of your findings..."
                       className="w-full bg-[#1A1A1A]/30 border border-[#333333] rounded-2xl p-6 text-gray-400 placeholder-gray-700 text-sm focus:outline-none focus:border-[#F57C00]/30 transition-all font-light italic leading-relaxed"
                     />
                  </div>

                  {/* Content Editor Placeholder */}
                  <div className="space-y-4 pt-8 border-t border-[#333333]">
                     <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center">
                          <Hash className="w-3.5 h-3.5 mr-2 text-[#F57C00]" />
                          Full Neural Transmission
                        </label>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-1 rounded">
                           <span>Syntactic Check: ACTIVE</span>
                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        </div>
                     </div>
                     <textarea 
                       value={formData.content}
                       onChange={(e) => setFormData({...formData, content: e.target.value})}
                       rows={20}
                       placeholder="Synthesize your knowledge here. Use Markdown for structured engineering data..."
                       className="w-full bg-transparent border border-dashed border-[#333333] rounded-2xl p-8 text-white placeholder-gray-800 font-light leading-loose focus:outline-none focus:border-[#F57C00]/20 transition-all"
                     />
                  </div>

               </div>
            </div>

            {/* Config & Settings Area */}
            <div className="lg:col-span-1 space-y-8">
               
               {/* Visual Assets */}
               <div className="glass rounded-3xl p-8 border border-[#333333]">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center">
                     <ImageIcon className="w-4 h-4 mr-2 text-[#F57C00]" />
                     Visual Anchor
                  </h3>
                  
                  <div className="w-full aspect-video rounded-2xl bg-[#1A1A1A] border border-dashed border-[#333333] flex flex-col items-center justify-center group hover:border-[#F57C00]/50 transition-all cursor-pointer overflow-hidden p-4 text-center">
                     <Plus className="w-8 h-8 text-gray-700 mb-4 group-hover:text-[#F57C00] transition-colors" />
                     <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors uppercase tracking-widest">Upload Cover Image</p>
                     <p className="text-[10px] text-gray-700 mt-2">Projection Ratio: 16:9 recommended</p>
                  </div>
               </div>

               {/* Meta Config */}
               <div className="glass rounded-3xl p-8 border border-[#333333] space-y-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2 flex items-center">
                     <Settings className="w-4 h-4 mr-2 text-[#F57C00]" />
                     Meta Config
                  </h3>
                  
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Sector (Category)</label>
                        <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#F57C00]/50">
                           <option>Engineering (Mechanical)</option>
                           <option>Artist Core (Design)</option>
                           <option>Material Science (Materials)</option>
                           <option>Future Tech (Advanced)</option>
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Encryption Tags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                           {['PLA', '3DPrint', 'Tutorial'].map((tag, i) => (
                             <span key={i} className="flex items-center bg-[#F57C00]/10 border border-[#F57C00]/20 text-[#F57C00] text-[10px] px-2 py-1 rounded-lg">
                                #{tag}
                                <X className="w-3 h-3 ml-1.5 hover:text-white cursor-pointer" />
                             </span>
                           ))}
                        </div>
                        <input 
                           type="text" 
                           placeholder="Filter knowledge..."
                           className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#F57C00]/50" 
                        />
                     </div>

                     <div className="pt-4 flex items-center justify-between border-t border-[#333333]">
                        <span className="text-[10px] font-mono text-gray-600 uppercase">Auto-save: OK</span>
                        <div className="flex items-center space-x-2">
                           <span className="text-[10px] font-mono text-gray-500">Read Time: 8m</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Neural Optimizations */}
               <div className="glass rounded-3xl p-8 border border-[#333333] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-[#F57C00]/5 rounded-full blur-2xl group-hover:bg-[#F57C00]/10 transition-all duration-700" />
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                     <Sparkles className="w-4 h-4 mr-2 text-[#F57C00]" />
                     Neural Optimizations
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">
                    "AI systems estimate 92% transmission efficiency for this manifest headline."
                  </p>
                  <button className="flex items-center space-x-2 text-[10px] font-bold text-[#F57C00] uppercase tracking-widest hover:text-white transition-all">
                     View SEO Blueprint
                     <ArrowRight className="w-3 h-3" />
                  </button>
               </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
