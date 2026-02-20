'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import ContactForm from './forms/ContactForm'

export default function ContactCTA() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0F0F0F]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F57C00]/5 rounded-full blur-3xl" />

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
            Contato
          </span>
          <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-3xl md:text-5xl text-white mt-4 mb-6">
            Pronto para materializar sua ideia?
          </h2>
          <p className="text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Entre em contato e vamos transformar seu projeto em realidade. Cada peça começa com uma conversa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#333333] rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Fale com nossa equipe</h3>
                <p className="text-[#A0A0A0]">
                  Preencha o formulário e responderemos em até 24 horas.
                </p>
              </div>
              
              <ContactForm />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#333333] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Informações de contato</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#F57C00] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Endereço</h4>
                    <p className="text-[#A0A0A0]">
                      Itaperuna/RJ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#F57C00] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Telefone</h4>
                    <p className="text-[#A0A0A0]">(21) 98330-0779</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#F57C00] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <p className="text-[#A0A0A0] break-all">contato@adriano-lengruber.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#333333] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Horário de atendimento</h3>
              <div className="space-y-2 text-[#A0A0A0]">
                <p>Seg a Sex - 10h às 17h</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#333333] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Tempo de resposta</h3>
              <p className="text-[#A0A0A0]">
                Orçamento até 2 dias<br />
                Projetos iniciados em até 4 dias
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}