'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, CheckCircle2 } from 'lucide-react'

export function BlogNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    setEmail('')
    
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <div className="glass rounded-3xl p-8 border border-[#333333] relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#F57C00]/10 rounded-full blur-3xl group-hover:bg-[#F57C00]/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-[#F57C00]/10 flex items-center justify-center mb-6 border border-[#F57C00]/20 shadow-[0_0_20px_rgba(245,124,0,0.1)]">
          <Mail className="w-6 h-6 text-[#F57C00]" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-montserrat)]">
          Neural <span className="text-[#F57C00]">Updates</span>
        </h3>
        
        <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
          Receba insights técnicos, novos projetos e as últimas fronteiras da impressão 3D diretamente no seu terminal de entrada.
        </p>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.tech"
                className="w-full bg-[#0F0F0F]/50 border border-[#333333] rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#F57C00]/50 transition-all placeholder:text-gray-600"
                required
              />
              <motion.div 
                 className="absolute right-4 top-1/2 -translate-y-1/2"
                 animate={{ opacity: isSubmitting ? 1 : 0 }}
              >
                <div className="w-4 h-4 border-2 border-[#F57C00] border-t-transparent rounded-full animate-spin" />
              </motion.div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group/btn relative flex items-center justify-center gap-3 px-6 py-4 bg-[#F57C00] text-white rounded-xl hover:bg-[#FF8C00] transition-all duration-300 font-bold text-xs uppercase tracking-widest blog-glow-orange disabled:opacity-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              {isSubmitting ? 'Syncing...' : 'Subscrever Fluxo'}
              <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
            <p className="text-[10px] text-center text-gray-600 font-mono uppercase tracking-tighter mt-4">
              Sem SPAM. Apenas engenharia pura.
            </p>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-6 bg-[#F57C00]/10 border border-[#F57C00]/30 rounded-2xl text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#F57C00] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(245,124,0,0.3)]">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Conexão Estabelecida</h4>
            <p className="text-gray-400 text-xs">Você está agora no loop da DevMaker3D.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
