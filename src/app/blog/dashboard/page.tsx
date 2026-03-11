import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Eye, 
  Settings, 
  LayoutDashboard,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Edit3,
  Trash2,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CreatorDashboard() {
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#F57C00] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Se o usuário for apenas um USER comum, ele não vê o dashboard completo ainda
  const isCreator = session?.user?.role === 'CREATOR' || session?.user?.role === 'ADMIN'

  if (!isCreator) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white">
        <Header />
        <main className="pt-32 pb-20 flex items-center justify-center min-h-[80vh]">
           <div className="container-custom max-w-2xl">
              <div className="glass rounded-[2.5rem] p-12 border border-[#333333] text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#F57C00]/5 rounded-full blur-3xl group-hover:bg-[#F57C00]/15 transition-all duration-1000" />
                
                <div className="w-20 h-20 rounded-3xl bg-[#F57C00]/10 flex items-center justify-center mb-8 mx-auto border border-[#F57C00]/20 shadow-[0_0_40px_rgba(245,124,0,0.1)]">
                  <ShieldCheck className="w-10 h-10 text-[#F57C00]" />
                </div>
                
                <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-montserrat)] uppercase tracking-tight">Unlock <span className="text-[#F57C00]">Creator Protocol</span></h1>
                <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg">
                   Você está autenticado, mas seu perfil ainda não possui permissões de síntese. 
                   Torne-se um criador para compartilhar conhecimento técnico na DevMaker3D.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="w-full sm:w-auto px-10 py-4 bg-[#F57C00] text-white rounded-2xl hover:bg-[#FF8C00] transition-all font-bold text-sm uppercase tracking-widest blog-glow-orange flex items-center justify-center gap-3">
                      Initialize Request
                      <ArrowRight className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => signOut()}
                     className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] border border-[#333333] text-gray-400 rounded-2xl hover:text-white transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3"
                   >
                     Disconnect Session
                     <LogOut className="w-4 h-4" />
                   </button>
                </div>

                <p className="mt-8 text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">Sua solicitação será analisada pelo núcleo administrativo.</p>
              </div>
           </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Dashboard data para CREATORS/ADMINS
  const stats = [
    { label: 'Total Posts', value: '12', icon: FileText, color: 'text-blue-500' },
    { label: 'Neural Reach', value: '1.2k', icon: Eye, color: 'text-[#F57C00]' },
    { label: 'Interactions', value: '84', icon: MessageSquare, color: 'text-green-500' },
    { label: 'Avg Read Time', value: '8m', icon: Clock, color: 'text-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 space-y-8">
              <div className="glass rounded-2xl p-6 border border-[#333333]">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#F57C00]/10 border border-[#F57C00]/20 flex items-center justify-center overflow-hidden">
                    {session?.user?.image ? (
                       <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                       <LayoutDashboard className="w-6 h-6 text-[#F57C00]" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white leading-tight">{session?.user?.name}</h2>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{session?.user?.role || 'Creator'}</span>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link href="/blog/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-[#F57C00]/10 border border-[#F57C00]/20 rounded-xl text-[#F57C00] text-sm font-bold uppercase tracking-widest">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Terminal</span>
                  </Link>
                  <Link href="/blog/dashboard/posts" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#1A1A1A] rounded-xl text-gray-400 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">
                    <FileText className="w-4 h-4" />
                    <span>Manifests</span>
                  </Link>
                  <Link href="/blog/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#1A1A1A] rounded-xl text-gray-400 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">
                    <Settings className="w-4 h-4" />
                    <span>Config</span>
                  </Link>
                </nav>
              </div>

              <div className="glass rounded-2xl p-6 border border-[#333333]">
                 <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Support Hub</h4>
                 <p className="text-[11px] text-gray-400 font-light mb-4">Precisa de ajuda com o editor ou permissões?</p>
                 <button className="w-full py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-[#F57C00]/30 transition-all">Open Transmission</button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow space-y-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl p-6 border border-[#333333] group hover:border-[#F57C00]/20 transition-all"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-4 opacity-50 group-hover:opacity-100 transition-all`} />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-3xl font-bold text-white mb-2">Intellectual <span className="text-[#F57C00]">Control</span></h1>
                   <p className="text-gray-500 text-sm font-light">Gerencie sua base de conhecimento e interações da comunidade.</p>
                </div>
                <Link 
                  href="/blog/new"
                  className="flex items-center space-x-2 px-6 py-3 bg-[#F57C00] text-white rounded-xl hover:bg-[#FF8C00] transition-all font-bold text-xs uppercase tracking-[0.1em] blog-glow-orange"
                >
                  <Plus className="w-4 h-4" />
                  <span>Synthesize Post</span>
                </Link>
              </div>

              {/* Manifests List (Recent Posts) */}
              <div className="glass rounded-3xl border border-[#333333] overflow-hidden">
                <div className="p-6 border-b border-[#333333] flex items-center justify-between bg-white/[0.02]">
                  <h3 className="font-bold text-sm uppercase tracking-widest flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-[#F57C00]" />
                    Recent knowledge manifests
                  </h3>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>Neural growth: +12% this cycle</span>
                  </div>
                </div>

                <div className="divide-y divide-[#333333]">
                  {/* Item do Post */}
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-6 hover:bg-white/[0.01] transition-all flex items-center justify-between group">
                       <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 rounded-xl bg-[#1A1A1A] border border-[#333333] overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-1 group-hover:text-[#F57C00] transition-colors">A Engenharia da Precisão em 3D: Do STL ao Produto Final</h4>
                            <div className="flex items-center space-x-4 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                               <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Mar 12, 2026</span>
                               <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> 432 Views</span>
                               <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> 12 Comments</span>
                               <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                            </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="p-2.5 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:border-[#F57C00]/30 transition-all text-gray-400 hover:text-white">
                             <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:border-red-500/30 transition-all text-gray-400 hover:text-red-500">
                             <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 bg-[#F57C00]/10 border border-[#F57C00]/20 rounded-lg text-[#F57C00] hover:bg-[#F57C00] hover:text-white transition-all">
                             <ExternalLink className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-[#1A1A1A]/50 text-center">
                   <button className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-all">View all transmission history</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
