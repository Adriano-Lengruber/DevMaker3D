'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "A DevMaker3D transformou nossa ideia em um protótipo funcional em tempo rekord. O acabamento foi muito além do esperado.",
    author: "Carlos Silva",
    role: "Fundador",
    company: "TechInova Startup",
  },
  {
    quote: "Nunca vi tanto cuidado com os detalhes. Cada peça parece feita à mão, mesmo sendo impressa. Recomendo demais.",
    author: "Ana Paula",
    role: "Designer de Produto",
    company: "Estúdio Criativo",
  },
  {
    quote: "Precisávamos de peças resistentes para nosso drone de competição. A equipe analisou cada requisito técnico e entregou acima das expectativas.",
    author: "Marcos Oliveira",
    role: "Engenheiro Mecânico",
    company: "DroneTech",
  },
];

const companies = [
  'TechInova', 'Estúdio Criativo', 'DroneTech', 'Inov3D', 'MakerLab'
];

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0A]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F57C00] font-[family-name:var(--font-jetbrains)] text-sm uppercase tracking-widest">
            Depoimentos
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            O que nossos
            <span className="text-[#F57C00]"> clientes dizem.</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="p-6 rounded-2xl border border-[#333333] bg-[#1A1A1A]"
            >
              <Quote className="w-8 h-8 text-[#F57C00]/30 mb-4" />
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-[#333333] pt-4">
                <p className="font-[family-name:var(--font-montserrat)] font-bold text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-[#F57C00]">
                  {testimonial.role}
                </p>
                <p className="text-xs text-[#A0A0A0]">
                  {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-[#A0A0A0] mb-6 uppercase tracking-widest">
            Empresas que confiam em nosso trabalho
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companies.map((company) => (
              <span
                key={company}
                className="text-xl md:text-2xl font-[family-name:var(--font-montserrat)] font-bold text-[#333333] hover:text-[#F57C00] transition-colors cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
