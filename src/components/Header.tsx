'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Rocket, Cpu, Newspaper, Info, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';

const nexusHubItems = [
  { name: 'Nexus Engine', href: '/#nexus-engine', icon: Cpu, description: 'Análise de blueprints STL' },
  { name: 'Nexus de Engenharia', href: '/blog', icon: Newspaper, description: 'Log técnico e tutoriais' },
];

export default function Header() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Dropdown = ({ title, items, id }: { title: string, items: any[], id: string }) => (
    <div 
      className="relative group"
      onMouseEnter={() => setActiveDropdown(id)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button className="flex items-center gap-1 text-sm text-[#A0A0A0] hover:text-white transition-colors py-2">
        {title}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === id ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {activeDropdown === id && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4"
          >
            <div className="glass rounded-2xl border border-[#333333] p-4 shadow-2xl">
              <div className="space-y-1">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                  >
                    <item.icon className="w-5 h-5 text-[#F57C00] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      {item.description && (
                         <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'py-5'
      }`}
    >
      {!isMounted ? (
        <div className="container-custom flex items-center justify-between">
          <div className="h-8 md:h-9 w-32 bg-[#333] rounded animate-pulse" />
          <div className="hidden lg:flex gap-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-4 w-16 bg-[#333] rounded animate-pulse" />)}
          </div>
          <div className="h-10 w-32 bg-[#333] rounded animate-pulse" />
        </div>
      ) : (
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/Logo White.svg"
              alt="DevMaker3D"
              width={160}
              height={36}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            <Dropdown title="Nexus Hub" items={nexusHubItems} id="nexus" />
            
            <Link href="/#philosophy" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              Sobre
            </Link>
            
            <Link href="/#process" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              Processo
            </Link>
            
            <Link href="/#services" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              Serviços
            </Link>
            
            <Link href="/#portfolio" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              Portfólio
            </Link>

            <Link href="/#contact" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              Contato
            </Link>
          </nav>

          {/* Auth/CTA Section */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4 border-l border-[#333333] pl-4">
                 <Link href="/dashboard" className="text-right hover:opacity-80 transition-opacity group">
                    <p className="text-[10px] text-gray-500 uppercase font-mono group-hover:text-[#F57C00] transition-colors">Command Center</p>
                    <p className="text-xs font-bold text-white">{session.user?.name}</p>
                 </Link>
                 <button 
                   onClick={() => signOut()}
                   className="w-8 h-8 rounded-full border border-[#333333] bg-[#1A1A1A] flex items-center justify-center hover:border-red-500/50 transition-colors group"
                 >
                    <X className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                 </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn()}
                className="px-5 py-2.5 bg-[#F57C00] text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-[#FF8C00] transition-all hover:shadow-[0_0_20px_rgba(245,124,0,0.3)]"
              >
                Orçamento
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-[#333333] overflow-hidden"
          >
            <nav className="flex flex-col py-6 container-custom gap-4">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2">Navegação</p>
              
              <Link href="/#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-[#A0A0A0] hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                <Info className="w-5 h-5 text-[#F57C00]" />
                <span className="text-sm font-medium">Sobre Nós</span>
              </Link>

              <Link href="/#process" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-[#A0A0A0] hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#F57C00]" />
                <span className="text-sm font-medium">Processo</span>
              </Link>

              <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-[#A0A0A0] hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                <Rocket className="w-5 h-5 text-[#F57C00]" />
                <span className="text-sm font-medium">Serviços</span>
              </Link>
              
              <Link href="/#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-[#A0A0A0] hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                <Rocket className="w-5 h-5 text-[#F57C00]" />
                <span className="text-sm font-medium">Portfólio</span>
              </Link>

              <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-[#A0A0A0] hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                <Rocket className="w-5 h-5 text-[#F57C00]" />
                <span className="text-sm font-medium">Contato</span>
              </Link>

              <div className="mt-4 pt-4 border-t border-[#333333]">
                {!session ? (
                  <button 
                    onClick={() => signIn()}
                    className="w-full py-4 bg-[#F57C00] text-white font-bold rounded-xl text-xs uppercase tracking-widest"
                  >
                    Orçamento
                  </button>
                ) : (
                  <button 
                    onClick={() => signOut()}
                    className="w-full py-4 bg-[#1A1A1A] text-gray-400 border border-[#333333] font-bold rounded-xl text-xs uppercase tracking-widest"
                  >
                    Desconectar
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}