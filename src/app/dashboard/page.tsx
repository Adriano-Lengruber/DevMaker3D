'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Package, 
  FileText, 
  Download, 
  Clock, 
  Box, 
  Zap, 
  Activity, 
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { redirect } from 'next/navigation';

const RECENT_SCANS = [
  { id: 1, name: 'Engrenagem_Helicoidal_v1.stl', date: 'Há 2 horas', status: 'Sintetizado', volume: '45.2cm³' },
  { id: 2, name: 'Chassis_Drone_v2.stl', date: 'Ontem', status: 'Sintetizado', volume: '112.5cm³' },
  { id: 3, name: 'Suporte_Monitor.stl', date: '3 dias atrás', status: 'Erro na Malha', volume: '-' },
];

const RECENT_ORDERS = [
  { id: 'ORD-9821', product: 'Precision Nozzle Set', status: 'Em Trânsito', date: '10/03/2026' },
  { id: 'ORD-9805', product: 'PLA Silk Gold (1kg)', status: 'Entregue', date: '05/03/2026' },
];

export default function UserDashboard() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/');
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Activity className="w-8 h-8 text-[#F57C00] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col md:flex-row pt-24">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-[#333333] p-6 space-y-8">
           <div className="flex flex-col items-center text-center p-6 glass rounded-3xl border border-[#333333]">
              <div className="relative w-20 h-20 mb-4">
                 <div className="absolute inset-0 bg-[#F57C00]/20 rounded-full blur-xl animate-pulse" />
                 {session?.user?.image ? (
                   <Image 
                     src={session.user.image} 
                     alt="Profile" 
                     fill 
                     className="rounded-full border-2 border-[#F57C00] object-cover" 
                   />
                 ) : (
                   <div className="w-full h-full rounded-full border-2 border-[#F57C00] bg-[#1A1A1A] flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-600" />
                   </div>
                 )}
              </div>
              <h3 className="text-white font-bold">{session?.user?.name}</h3>
              <p className="text-[10px] font-mono text-[#F57C00] uppercase tracking-widest mt-1">Nível de Acesso: Operator</p>
           </div>

           <nav className="space-y-1">
              {[
                { name: 'Visão Geral', icon: Zap, active: true },
                { name: 'Meus Projetos', icon: Package },
                { name: 'Marketplace', icon: Box, href: '/marketplace' },
                { name: 'Histórico de Scans', icon: Activity },
                { name: 'Configurações', icon: Settings },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href || '#'}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all text-sm group ${
                    item.active 
                      ? 'bg-[#F57C00] text-white shadow-[0_0_20px_rgba(245,124,0,0.3)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-[#F57C00]'}`} />
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-sm mt-8"
              >
                <LogOut className="w-4 h-4" />
                Desconectar
              </button>
           </nav>
        </aside>

        {/* Content */}
        <section className="flex-grow p-6 md:p-10 container-custom">
           {/* Summary Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="glass p-6 rounded-3xl border border-[#333333] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4">
                    <Zap className="w-5 h-5 text-gray-700 group-hover:text-[#F57C00] transition-colors" />
                 </div>
                 <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Nexus Credits</p>
                 <h4 className="text-3xl font-extrabold text-white">450</h4>
              </div>
              <div className="glass p-6 rounded-3xl border border-[#333333] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4">
                    <Package className="w-5 h-5 text-gray-700 group-hover:text-[#F57C00] transition-colors" />
                 </div>
                 <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Peças em Produção</p>
                 <h4 className="text-3xl font-extrabold text-white">02</h4>
              </div>
              <div className="glass p-6 rounded-3xl border border-[#333333] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4">
                    <Bell className="w-5 h-5 text-gray-700 group-hover:text-[#F57C00] transition-colors" />
                 </div>
                 <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Alertas Ativos</p>
                 <h4 className="text-3xl font-extrabold text-white">01</h4>
              </div>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                 {/* Nexus Engine Activity */}
                 <div className="glass rounded-3xl border border-[#333333] p-8 overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-bold flex items-center gap-3">
                          <Activity className="w-5 h-5 text-[#F57C00]" />
                          Últimas Análises de Blueprints
                       </h3>
                       <Link href="/#nexus-engine" className="text-xs text-[#F57C00] hover:underline uppercase font-bold tracking-widest">Nova Síntese</Link>
                    </div>
                    
                    <div className="space-y-4">
                       {RECENT_SCANS.map((scan) => (
                         <div key={scan.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#333333] group hover:border-[#F57C00]/30 transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-black border border-[#333333] flex items-center justify-center text-gray-500 group-hover:text-[#F57C00] transition-colors">
                                  <FileText className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-white mb-0.5">{scan.name}</p>
                                  <p className="text-[10px] text-gray-500 uppercase">{scan.date} • {scan.volume}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-6">
                               <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                                 scan.status === 'Sintetizado' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'
                               }`}>
                                  {scan.status}
                               </span>
                               <button className="p-2 text-gray-600 hover:text-white transition-colors">
                                  <ChevronRight className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Operational Notifications */}
                 <div className="glass rounded-3xl border border-[#333333] p-8">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                       <Clock className="w-5 h-5 text-[#F57C00]" />
                       Log Operacional
                    </h3>
                    <div className="border-l-2 border-[#333333] ml-3 space-y-8 pb-4">
                       {[
                         { title: 'Entrega Realizada', desc: 'Sua remessa ORD-9805 chegou ao destino.', time: 'há 1 dia', status: 'success' },
                         { title: 'Novo Post no Nexus Hub', desc: 'Tutorial: Otimização de suportes para resina.', time: 'há 3 dias', status: 'info' },
                       ].map((log, i) => (
                         <div key={i} className="relative pl-8">
                            <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-[#0A0A0A] ${
                              log.status === 'success' ? 'bg-green-500' : 'bg-[#F57C00]'
                            }`} />
                            <p className="text-[10px] text-gray-500 uppercase font-mono mb-1">{log.time}</p>
                            <h5 className="text-sm font-bold text-white mb-1">{log.title}</h5>
                            <p className="text-xs text-gray-400">{log.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-8">
                 {/* Orders Status */}
                 <div className="glass rounded-3xl border border-[#333333] p-8">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                       <Box className="w-5 h-5 text-[#F57C00]" />
                       Marketplace Ativo
                    </h3>
                    <div className="space-y-4">
                       {RECENT_ORDERS.map((order) => (
                         <div key={order.id} className="p-4 rounded-2xl bg-black border border-[#333333]">
                            <div className="flex items-center justify-between mb-2">
                               <span className="text-[10px] font-mono text-gray-500">{order.id}</span>
                               <span className="px-2 py-0.5 bg-[#F57C00]/10 border border-[#F57C00]/20 rounded text-[10px] text-[#F57C00] font-bold">
                                  {order.status}
                               </span>
                            </div>
                            <p className="text-xs font-bold text-white mb-2">{order.product}</p>
                            <div className="w-full h-1 bg-[#333333] rounded-full overflow-hidden">
                               <div className="w-2/3 h-full bg-[#F57C00]" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Quick Actions */}
                 <div className="glass rounded-3xl border border-[#F57C00]/20 bg-[#F57C00]/5 p-8 blog-glow-orange">
                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Protocolos de Segurança</h4>
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                       Sua conectividade está criptografada. Mantenha suas chaves de acesso em ambiente seguro.
                    </p>
                    <button className="w-full py-4 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#F57C00] hover:text-white transition-all flex items-center justify-center gap-2">
                       <Download className="w-4 h-4" />
                       Backup Técnico
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
