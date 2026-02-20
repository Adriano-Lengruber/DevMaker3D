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
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <a href="#" className="flex items-center gap-2 mb-4">
                <img
                  src="/Logo White.svg"
                  alt="DevMaker3D"
                  className="h-7.5 md:h-9 w-auto"
                />
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
          <div className="lg:col-span-2">
            <h4 className="font-[family-name:var(--font-montserrat)] font-bold text-white mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 min-w-0">
                <Mail className="w-4 h-4 text-[#F57C00] mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:contato@adriano-lengruber.com" 
                  className="text-[#A0A0A0] text-xs sm:text-sm hover:text-[#F57C00] transition-colors break-all"
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  contato@adriano-lengruber.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#F57C00] mt-0.5" />
                <span className="text-[#A0A0A0] text-sm">
                  (21) 98330-0779
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F57C00] mt-0.5" />
                <span className="text-[#A0A0A0] text-sm">
                  Itaperuna/RJ
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A0A0A0]">
          <p>
            © {new Date().getFullYear()} DevMaker3D ❤️ - By Adriano Lengruber. Todos os direitos reservados.
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
