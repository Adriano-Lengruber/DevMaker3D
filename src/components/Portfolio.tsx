'use client';

import { motion } from 'framer-motion';
import { Clock, Layers, Ruler, Palette } from 'lucide-react';

const portfolioItems = [
  {
    title: 'Engrenagem de Precisão',
    category: 'Engenharia',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    details: {
      time: '14h',
      material: 'PETG',
      layerHeight: '0.12mm',
      finish: 'Mecanizado',
    },
  },
  {
    title: 'Miniatura de Personagem',
    category: 'Arte & Colecionáveis',
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=600&h=400&fit=crop',
    details: {
      time: '28h',
      material: 'Resina',
      layerHeight: '0.05mm',
      finish: 'Pintura Detalhada',
    },
  },
  {
    title: 'Suporte para Smartphone',
    category: 'Utilitário',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=400&fit=crop',
    details: {
      time: '6h',
      material: 'PLA',
      layerHeight: '0.2mm',
      finish: 'Texturizado',
    },
  },
  {
    title: 'Peça de Reposição',
    category: 'Manutenção',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112cf917b1?w=600&h=400&fit=crop',
    details: {
      time: '4h',
      material: 'ABS',
      layerHeight: '0.16mm',
      finish: 'Industrial',
    },
  },
  {
    title: 'Protótipo de Produto',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    details: {
      time: '16h',
      material: 'PLA',
      layerHeight: '0.1mm',
      finish: 'Prototipagem',
    },
  },
  {
    title: 'Peça Decorativa Geométrica',
    category: 'Decoração',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
    details: {
      time: '10h',
      material: 'PLA',
      layerHeight: '0.12mm',
      finish: 'Natural',
    },
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-[#0F0F0F]">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#333333] to-transparent" />

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F57C00] font-[family-name:var(--font-jetbrains)] text-sm uppercase tracking-widest">
            Portfólio
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            Projetos que
            <span className="text-[#F57C00]"> ganham forma.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Cada projeto é único. Passe o mouse sobre as imagens para ver os detalhes técnicos
            de cada peça: tempo de impressão, material, altura de camada e acabamento.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative rounded-2xl overflow-hidden border border-[#333333] bg-[#1A1A1A]"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-xs text-[#F57C00] uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-xl text-white mb-4">
                  {item.title}
                </h3>

                {/* Technical Details */}
                <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F57C00]" />
                    <span className="text-xs text-[#A0A0A0]">
                      {item.details.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#F57C00]" />
                    <span className="text-xs text-[#A0A0A0]">
                      {item.details.material}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#F57C00]" />
                    <span className="text-xs text-[#A0A0A0]">
                      {item.details.layerHeight}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#F57C00]" />
                    <span className="text-xs text-[#A0A0A0]">
                      {item.details.finish}
                    </span>
                  </div>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#F57C00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#333333] text-white font-semibold rounded-lg hover:border-[#F57C00] hover:text-[#F57C00] transition-all duration-300"
          >
            Ver Todos os Projetos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
