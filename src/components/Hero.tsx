'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Code } from 'lucide-react';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
  ssr: false,
  loading: () => null
});

const MouseParallax = dynamic(() => import('./MouseParallax'), {
  ssr: false,
  loading: () => null
});

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
  loading: () => null
});

export default function Hero() {
  return (
    <section 
      data-testid="hero-section" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden [will-change:transform]"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* 3D Background */}
      <ThreeBackground />

      {/* Mouse Parallax */}
      <MouseParallax />

      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Animated Layers Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 1 }}
            className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-[#F57C00]/20 rounded-full"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      {/* Glowing Orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F57C00]/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-20 container-custom min-h-screen flex flex-col py-20 pointer-events-none">
        {/* Main Content Area - Flex Grow pushes everything to center */}
        <div className="flex-grow flex flex-col items-center justify-center text-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#333333] bg-[#1A1A1A]/80 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#F57C00]" />
            <span className="text-sm text-[#A0A0A0] font-[family-name:var(--font-jetbrains)]">
              Tecnologia com alma
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-[family-name:var(--font-montserrat)] font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            <span className="block text-sm md:text-base uppercase tracking-[0.3em] text-[#F57C00] mb-4 font-mono">
              Impressão 3D de Precisão & Engenharia
            </span>
            Do Código à Matéria:{' '}
            <span className="text-[#F57C00] text-glow">Materializamos</span>
            <br />
            o Intangível
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10 font-[family-name:var(--font-inter)]"
          >
            Impressão 3D com rigor de engenharia e alma de artista. Cada peça é uma história,
            cada camada é uma decisão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F57C00] text-white font-semibold rounded-lg hover:bg-[#FF9500] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,124,0,0.5)] text-lg whitespace-nowrap"
            >
              <Zap className="w-5 h-5" />
              Iniciar Projeto
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#333333] text-white font-semibold rounded-lg hover:border-[#F57C00] hover:text-[#F57C00] transition-all duration-300 text-lg whitespace-nowrap"
            >
              <Code className="w-5 h-5" />
              Ver Processo
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator - Naturally placed below and pushed to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-auto py-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 text-[#F57C00]/40"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-mono">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
