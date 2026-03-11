'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Sobre', href: '#philosophy' },
  { name: 'Processo', href: '#process' },
  { name: 'Serviços', href: '#services' },
  { name: 'Materiais', href: '#materials' },
  { name: 'Portfólio', href: '#portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contato', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        // Skeleton para evitar hydration mismatch
        <div className="container-custom flex items-center justify-between">
          <div className="h-8 md:h-9 w-auto bg-[#333] rounded animate-pulse" />
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="h-4 w-16 bg-[#333] rounded animate-pulse" />
            ))}
          </nav>
          <div className="hidden lg:block h-10 w-32 bg-[#333] rounded animate-pulse" />
        </div>
      ) : (
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src="/Logo White.svg"
              alt="DevMaker3D"
              className="h-8 md:h-9 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-[#A0A0A0] hover:text-white transition-colors relative group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F57C00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#F57C00] text-white font-medium rounded text-sm hover:bg-[#FF9500] transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,124,0,0.4)] whitespace-nowrap"
          >
            Solicitar Orçamento
          </a>

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
      {isMounted && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-[#333333]"
            >
              <nav className="flex flex-col py-4 container-custom">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 text-[#A0A0A0] hover:text-white transition-colors border-b border-[#333333] last:border-0"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 py-3 bg-[#F57C00] text-white font-medium rounded text-center"
                >
                  Solicitar Orçamento
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.header>
  );
}