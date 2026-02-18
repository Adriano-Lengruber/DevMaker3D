'use client';

import { motion } from 'framer-motion';
import { Rocket, Wrench, Palette, Box, Sparkles, Package } from 'lucide-react';

const services = [
  {
    icon: Rocket,
    title: 'Prototipagem Rápida',
    description: 'Valide suas ideias com rapidez. Produzimos protótipos funcionais para testes e apresentações, com foco em velocidade sem comprometer a qualidade.',
    features: ['MVP em dias', 'Testes funcionais', 'Iterações rápidas', 'Documentação técnica'],
  },
  {
    icon: Wrench,
    title: 'Peças Funcionais',
    description: 'Componentes que precisam funcionar no mundo real. Escolhemos materiais e configurações para garantir resistência, durabilidade e desempenho.',
    features: ['Materiais técnicos', 'Alta resistência', 'Tolerâncias precisas', 'Teste de carga'],
  },
  {
    icon: Palette,
    title: 'Peças Decorativas',
    description: 'Arte em camadas. Desde action figures até elementos arquitetônicos, com pós-processamento que transforma o ordinário em extraordinário.',
    features: ['Acabamento premium', 'Pintura personalizada', ['Detalhamento complexo', 'Acabamento fosco ou gloss']],
  },
  {
    icon: Box,
    title: 'Modelagem 3D',
    description: 'Não tem o arquivo? Sem problemas. Nossa equipe transforma sketches, referências ou ideias em modelos 3D prontos para impressão.',
    features: ['Briefing criativo', 'Modelagem paramétrica', 'Otimização para impressão', 'Revisões inclusas'],
  },
  {
    icon: Sparkles,
    title: 'Pós-Processamento Premium',
    description: 'O acabamento que faz diferença. Remoção de suportes, lixamento, polimento, pintura e revestimentos para um resultado profissional.',
    features: ['Polimento mecânico', 'Pintura spray', 'Anodização (metais)', 'Acabamento à prova d\'água'],
  },
  {
    icon: Package,
    title: 'Produção em Série',
    description: 'Small batch production para validação de mercado ou produção limitada. Escalabilidade sem investimentos em moldes ou ferramentas.',
    features: ['Sem MOQ mínimo', 'Consistência entre peças', 'Custo-benefício', 'Embalagem personalizada'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0F0F0F]">
      {/* Background accent */}
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
            Serviços
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            O que podemos criar
            <span className="text-[#F57C00]"> juntos.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            De protótipos para validação até peças finais com acabamento premium.
            Cada serviço é pensado para atender necessidades específicas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-6 rounded-2xl border border-[#333333] bg-[#1A1A1A] hover:border-[#F57C00]/50 transition-all duration-500 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F57C00]/10 flex items-center justify-center group-hover:bg-[#F57C00]/20 transition-colors">
                  <service.icon className="w-6 h-6 text-[#F57C00]" />
                </div>
                <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-lg text-white group-hover:text-[#F57C00] transition-colors">
                  {service.title}
                </h3>
              </div>

              <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={Array.isArray(feature) ? feature[0] : feature}
                    className="px-2 py-1 text-xs bg-[#0F0F0F] text-[#A0A0A0] rounded group-hover:text-white group-hover:bg-[#F57C00]/20 transition-colors"
                  >
                    {Array.isArray(feature) ? feature[0] : feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-[#A0A0A0] mb-4">
            Não sabe qual serviço precisa?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#F57C00] hover:text-white transition-colors font-medium"
          >
            Fale com nossa equipe {' '}
            <span className="text-xl">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
