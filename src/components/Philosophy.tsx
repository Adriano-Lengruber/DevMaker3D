'use client';

import { motion } from 'framer-motion';
import { Heart, Eye, Settings, Award } from 'lucide-react';

const philosophies = [
  {
    icon: Settings,
    title: 'Não é só imprimir. É projetar com intenção.',
    description: 'Antes de qualquer camada ser depositada, analysamos cada geometria, cada ângulo, cada funcionalidade. O que parece simples carrega horas de planejamento técnico.',
  },
  {
    icon: Eye,
    title: 'Cada camada é uma decisão.',
    description: 'Escolher a altura da camada, a densidade de preenchimento, a orientação na bandeja. Cada decisão afeta resistência, acabamento e tempo. Não existe impressão "padrão".',
  },
  {
    icon: Heart,
    title: 'Técnica que emociona.',
    description: 'Entendemos que por trás de cada projeto existe uma ideia, um sonho, um problema a resolver. Tratamos cada peça como única, não como número de produção.',
  },
  {
    icon: Award,
    title: 'Processo visível, resultado impecável.',
    description: 'Mostramos o trabalho invisível. O tempo de pós-processamento, os testes de resistência, os acabamentos manuais. Porque valoriza quem entende o processo.',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-[#0F0F0F]">
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
            Nossa Filosofia
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            Não vendemos plástico derretido.
            <br />
            <span className="text-[#F57C00]">Vendemos precisão, paciência e criação.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            O mercado de impressão 3D está saturado de quem oferece "o menor preço".
            Nós oferecemos o maior valor: atenção aos detalhes, transparência no processo e resultado que supera expectativas.
          </p>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group p-8 rounded-2xl border border-[#333333] bg-[#1A1A1A] hover:border-[#F57C00]/50 transition-all duration-500 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#F57C00]/10 flex items-center justify-center group-hover:bg-[#F57C00]/20 transition-colors">
                  <item.icon className="w-6 h-6 text-[#F57C00]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-montserrat)] font-semibold text-xl text-white mb-3 group-hover:text-[#F57C00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#A0A0A0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="font-[family-name:var(--font-montserrat)] font-bold text-2xl md:text-3xl text-white italic max-w-3xl mx-auto">
            "Nada nasce pronto. Tudo é construído,{' '}
            <span className="text-[#F57C00]">camada por camada</span>."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
