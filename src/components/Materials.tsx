'use client';

import { motion } from 'framer-motion';
import { Leaf, Shield, Wind, Gem, Box } from 'lucide-react';

const materials = [
  {
    icon: Leaf,
    name: 'PLA',
    category: 'Básico / Prototipagem',
    description: 'O ponto de partida. Biodegradável, fácil de usar e perfeito para validações visuais e protótipos funcionais simples.',
    characteristics: ['Fácil impressão', 'Baixa warping', 'Biodegradável', 'Acabamento fosco'],
    temperature: '190-220°C',
    strength: 'Medium',
    useCase: 'Protótipos visuais,-maquinetes, brindes',
  },
  {
    icon: Shield,
    name: 'PETG',
    category: 'Engenharia',
    description: 'O equilíbrio perfeito. Resiste ao calor e impactos, sendo ideal para peças que precisam funcionar no mundo real.',
    characteristics: ['Alta resistência', 'Resistente ao calor', 'Baixa odor', 'Translúcido possível'],
    temperature: '230-250°C',
    strength: 'High',
    useCase: 'Peças funcionais, adaptadores, suportes',
  },
  {
    icon: Wind,
    name: 'TPU',
    category: 'Flexível',
    description: 'Elasticidade em camadas. Borracha termoplástica que absorve impactos e cria texturas únicas.',
    characteristics: ['Extremamente flexível', 'Resistente à abrasão', 'Suave ao toque', 'Retorno elástico'],
    temperature: '210-230°C',
    strength: 'Medium',
    useCase: 'Estojos, juntas, botões, protéticos',
  },
  {
    icon: Gem,
    name: 'Resina',
    category: 'Alta Detalhe',
    description: 'Precisão microscópica. Acabamento liso como vidro, capturando detalhes que os olhos mal conseguem ver.',
    characteristics: ['Superfície lisa', 'Alta precisão', 'Detalhes finos', 'Variedade de propriedades'],
    temperature: '25-35°C (LCD/SLA)',
    strength: 'Medium-High',
    useCase: 'Joyaria, dentística, miniaturas, protótipos visuais',
  },
  {
    icon: Box,
    name: 'ABS',
    category: 'Durabilidade',
    description: 'Resistência testada. O clássico da engenharia, agora em camadas. Suporta temperaturas e impactos.',
    characteristics: ['Alta durabilidade', 'Resistente ao calor', 'Usinável', 'Acabamento brilhante'],
    temperature: '230-250°C',
    strength: 'Very High',
    useCase: 'Peças automotivas, ferramentas, protótipos industriais',
  },
];

export default function Materials() {
  return (
    <section id="materials" className="relative py-24 md:py-32 bg-[#0A0A0A]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

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
            Materiais
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            O material certo para
            <span className="text-[#F57C00]"> cada propósito.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Não existe material &ldquo;melhor&rdquo; ou &ldquo;pior&rdquo;. Existe o material certo para cada aplicação.
            Escolhemos baseado em funcionalidade, estética e orçamento.
          </p>
        </motion.div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-6 rounded-2xl border border-[#333333] bg-[#1A1A1A] hover:border-[#F57C00]/50 transition-all duration-500 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F57C00]/10 flex items-center justify-center group-hover:bg-[#F57C00]/20 transition-colors">
                  <material.icon className="w-6 h-6 text-[#F57C00]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-xl text-white group-hover:text-[#F57C00] transition-colors">
                    {material.name}
                  </h3>
                  <span className="text-xs text-[#A0A0A0]">
                    {material.category}
                  </span>
                </div>
              </div>

              <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">
                {material.description}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-xs text-[#F57C00] uppercase tracking-wider">
                    Temperatura
                  </span>
                  <p className="text-sm text-white font-[family-name:var(--font-jetbrains)]">
                    {material.temperature}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#F57C00] uppercase tracking-wider">
                    Resistência
                  </span>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded ${
                          i < (material.strength === 'Very High' ? 5 : material.strength === 'High' ? 4 : material.strength === 'Medium-High' ? 3 : material.strength === 'Medium' ? 2 : 1)
                            ? 'bg-[#F57C00]'
                            : 'bg-[#333333]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#F57C00] uppercase tracking-wider">
                    Uso Principal
                  </span>
                  <p className="text-sm text-white">
                    {material.useCase}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#333333]">
                {material.characteristics.map((char) => (
                  <span
                    key={char}
                    className="px-2 py-1 text-xs bg-[#0F0F0F] text-[#A0A0A0] rounded"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Material Selection Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#333333]"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-xl text-white mb-4">
                Precisa de ajuda para escolher?
              </h3>
              <p className="text-[#A0A0A0] mb-4">
                Entendemos que a variedade de materiais pode ser confusa. Nossa equipe
                está pronta para analisar seu projeto e recomendar a melhor opção
                considerando funcionalidade, acabamento e orçamento.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#F57C00] hover:text-white transition-colors font-medium"
              >
                Consultar material ideal {' '}
                <span className="text-xl">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#0F0F0F] text-center">
                <div className="text-2xl font-bold text-[#F57C00] mb-1">5+</div>
                <div className="text-xs text-[#A0A0A0]">Materiais</div>
              </div>
              <div className="p-4 rounded-lg bg-[#0F0F0F] text-center">
                <div className="text-2xl font-bold text-[#F57C00] mb-1">20+</div>
                <div className="text-xs text-[#A0A0A0]">Acabamentos</div>
              </div>
              <div className="p-4 rounded-lg bg-[#0F0F0F] text-center">
                <div className="text-2xl font-bold text-[#F57C00] mb-1">100%</div>
                <div className="text-xs text-[#A0A0A0]">Testado</div>
              </div>
              <div className="p-4 rounded-lg bg-[#0F0F0F] text-center">
                <div className="text-2xl font-bold text-[#F57C00] mb-1">Expert</div>
                <div className="text-xs text-[#A0A0A0]">Análise</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
