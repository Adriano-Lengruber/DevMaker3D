'use client';

import { motion } from 'framer-motion';
import { FileSearch, Scissors, Printer, Sparkle, Clock, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    icon: FileSearch,
    title: 'Análise e Modelagem',
    description: 'Nem sempre você tem um arquivo pronto. Muitas vezes, transformamos sua ideia em um modelo 3D do zero. Esboços, referências fotos ou apenas uma descrição viram geometria digital. Analisamos a viabilidade, criamos a modelagem e verificamos a malha para garantir integridade estrutural.',
    time: '2h - 1 dia',
    details: [
      'Modelagem 3D do zero',
      'Verificação de malha',
      'Otimização de geometria',
      'Análise de tolerâncias',
      'Sugestões de melhorias',
      'Revisões inclusas',
    ],
  },
  {
    step: '02',
    icon: Scissors,
    title: 'Fatiamento Estratégico',
    description: 'A estratégia de camadas. Definimos altura de camada, densidade de preenchimento, temperaturas e velocidades. Cada parâmetro afeta o resultado final. Aqui nascem as propriedades da peça. Para peças complexas, podem ser necessários múltiplos fatiamentos até достигти o resultado perfeito.',
    time: '30min - 2h',
    details: [
      'Configuração de camada',
      'Estratégia de suportes',
      'Parâmetros térmicos',
      'Teste de aderência',
      'Ajustes e retrabalho',
      'Validação técnica',
    ],
  },
  {
    step: '03',
    icon: Printer,
    title: 'Materialização',
    description: 'Horas (ou dias) de deposição precisa. Peças grandes são impressas em várias partes, depois coladas e montadas com calma. A paciência é uma virtude técnica. Monitoramos a impressão, ajustamos temperaturas, resolvemos problemas em tempo real. Peças finais podem levar até 7 dias de impressão contínua.',
    time: '4h - 7 dias',
    details: [
      'Impressão contínua',
      'Monitoramento térmico',
      'Ajuste de fluxo',
      'Controle de warping',
      'Montagem de peças grandes',
      'Verificação estrutural',
    ],
  },
  {
    step: '04',
    icon: Sparkle,
    title: 'Pós-Processamento',
    description: 'Lixar, pintar, polir, montar. Onde a peça ganha vida de verdade. Removemos suportes com precisão, eliminamos imperfeições e aplicamos os acabamentos desejados. Peças detalhadas ou grandes podem levar até 1 semana inteira de trabalho manual meticuloso.',
    time: '4h - 1 semana',
    details: [
      'Remoção de suportes',
      'Lixamento e polimento',
      'Pintura e acabamento',
      'Controle de qualidade',
      'Montagem final',
      'Embalagem especializada',
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
