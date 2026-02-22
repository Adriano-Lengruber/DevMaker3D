'use client';

import { motion } from 'framer-motion';
import { FileSearch, Scissors, Printer, Sparkle, Clock, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    icon: FileSearch,
    title: 'Análise e Modelagem',
    description: 'Cada peça começa com uma história. No branding, capturamos sua ideia, seu contexto, seu propósito. Cada detalhe é importante - desde a função prática até o significado emocional. Usando Blender, transformo esboços, referências ou apenas descrições em modelos 3D precisos. Cada curva, cada ângulo, cada espessura é pensada para que a peça transmita exatamente o que você imagina. Peças complexas ou com grande carga emocional podem levar 1 a 2 dias, ou mais, porque cada configuração é ajustada para alcançar a perfeição.',
    time: '1 - 2 dias (complexas até mais)',
    details: [
      'Captura de ideias e contexto',
      'Modelagem manual no Blender',
      'Análise de viabilidade técnica',
      'Otimização para impressão',
      'Ajustes de tolerância',
      'Revisões com o cliente',
    ],
  },
  {
    step: '02',
    icon: Scissors,
    title: 'Fatiamento Estratégico',
    description: 'Aqui o conhecimento técnico é fundamental. Cada camada é estrategicamente planejada - definimos altura de camada, densidade de preenchimento, temperaturas e velocidades de impressão. Cada parâmetro afeta diretamente a resistência, acabamento e funcionalidade final da peça. Para peças complexas, são necessários múltiplos testes e ajustes finos até alcançar a configuração perfeita.',
    time: '2 - 4h',
    details: [
      'Planejamento de camadas',
      'Estratégia de suportes',
      'Parâmetros térmicos otimizados',
      'Testes de aderência',
      'Ajustes finos e refinamento',
      'Validação técnica completa',
    ],
  },
  {
    step: '03',
    icon: Printer,
    title: 'Materialização',
    description: 'Aqui é onde a mágica acontece - mas nem sempre são flores. Dependendo da complexidade da peça, podemos perder tudo em determinada parte da impressão. Um descolamento, um entupimento, uma temperatura instável. Acontece. Quando isso ocorre, analisamos o que deu errado, ajustamos os parâmetros e recomeçamos. Nos esforçamos para acertar de primeira, mas a transparência é fundamental: o prazo pode se estender conforme os imprevistos.',
    time: '4h - 7 dias (com imprevistos)',
    details: [
      'Impressão monitorada 24/7',
      'Controle térmico constante',
      'Prevenção de falhas',
      'Retrabalho quando necessário',
      'Transparência sobre imprevistos',
      'Garantia de qualidade',
    ],
  },
  {
    step: '04',
    icon: Sparkle,
    title: 'Pós-Processamento',
    description: 'É aqui que a peça ganha alma. Cada etapa é feita com carinho e dedicação artesanal. Removo suportes com precisão cirúrgica, lixo com paciência infinita, aplico acabamentos pensando em cada detalhe. Peças detalhadas ou grandes podem levar até uma semana de trabalho manual meticuloso, porque meu compromisso é entregar sempre o melhor que consigo fazer para você.',
    time: '4h - 1 semana',
    details: [
      'Remoção artesanal de suportes',
      'Lixamento com precisão',
      'Acabamento personalizado',
      'Pintura detalhada quando necessário',
      'Montagem final cuidadosa',
      'Entrega com amor e dedicação',
    ],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-[#0A0A0A]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

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
            O Processo
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            Cada peça conta uma história.
            <br />
            <span className="text-[#F57C00]">Aqui está como.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Cada projeto é único. Os tempos abaixo são estimativas — peças complexas ou de grande porte podem levar mais tempo. Mas sempre entregamos com a qualidade que sua ideia merece.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F57C00] via-[#333333] to-transparent" />

          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`relative flex items-center gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Step Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                <div className="p-6 rounded-2xl border border-[#333333] bg-[#1A1A1A] hover:border-[#F57C00]/30 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#F57C00] font-[family-name:var(--font-jetbrains)] text-sm">
                      {item.step}
                    </span>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-xl text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#A0A0A0] mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-start">
                    {item.details.map((detail) => (
                      <span
                        key={detail}
                        className="px-2 py-1 text-xs bg-[#0F0F0F] text-[#A0A0A0] rounded"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#F57C00]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-[family-name:var(--font-jetbrains)]">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Icon Circle */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F0F0F] border-2 border-[#F57C00] flex items-center justify-center z-10">
                <item.icon className="w-5 h-5 text-[#F57C00]" />
              </div>

              {/* Empty Space for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Final Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border border-[#333333]"
        >
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-[#F57C00] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-xl text-white mb-2">
                Por que isso importa?
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Porque quando você entende o processo, você entende o valor. Cada minuto de trabalho
                manual, cada ajuste de parâmetros, cada verificação de qualidade. É isso que diferencia
                uma peça &ldquo;impressa&rdquo; de uma peça <em>feita</em>. É por isso que projetos com a DevMaker3D
                entregam resultados que superam expectativas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
