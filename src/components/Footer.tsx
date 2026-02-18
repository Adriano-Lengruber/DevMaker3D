'use client';

import { motion } from 'framer-motion';
import { Layers, Mail, Phone, MapPin, Instagram, Linkedin, Github } from 'lucide-react';

const footerLinks = {
  services: [
    'Prototipagem Rápida',
    'Peças Funcionais',
    'Peças Decorativas',
    'Modelagem 3D',
    'Pós-Processamento',
    'Produção em Série',
  ],
  company: [
    'Sobre Nós',
    'Processo',
    'Portfólio',
    'Contato',
    'Trabalhe Conosco',
  ],
  materials: [
    'PLA',
    'PETG',
    'TPU',
    'Resina',
    'ABS',
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] pt-20 pb-8">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#333333] to-transparent" />

      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <a href="#" className="flex items-center gap-2 mb-4">
                <Layers className="w-8 h-8 text-[#F57C00]" />
                <span className="font-[family-name:var(--font-montserrat)] font-bold text-xl text-white">
                  DevMaker<span className="text-[#F57C00]">3D</span>
                </span>
              </a>
              <p className="text-[#A0A0A0] mb-6 max-w-sm">
                Tecnologia com alma. Transformamos ideias abstratas em objetos tangíveis
                com rigor de engenharia e alma de artista.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center text-[#A0A0A0] hover:text-[#F57C00] hover:border-[#F57C00] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center text-[#A0A0A0] hover:text-[#F57C00] hover:border-[#F57C00] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center text-[#A0A0A0] hover:text-[#F57C00] hover:border-[#F57C00] transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">
              Serviços
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-[#A0A0A0] hover:text-[#F57C00] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#A0A0A0] hover:text-[#F57C00] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#F57C00] mt-0.5" />
                <span className="text-[#A0A0A0] text-sm">
                  contato@devmaker3d.com.br
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#F57C00] mt-0.5" />
                <span className="text-[#A0A0A0] text-sm">
                  (11) 99999-9999
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F57C00] mt-0.5" />
                <span className="text-[#A0A0A0] text-sm">
                  São Paulo, SP - Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Materials Bar */}
        <div className="py-6 border-y border-[#333333] mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-sm text-[#A0A0A0]">Materiais:</span>
            {footerLinks.materials.map((material) => (
              <span
                key={material}
                className="px-3 py-1 bg-[#1A1A1A] rounded text-sm text-[#A0A0A0]"
              >
                {material}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A0A0A0]">
          <p>
            © {new Date().getFullYear()} DevMaker3D. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F57C00] transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-[#F57C00] transition-colors">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
