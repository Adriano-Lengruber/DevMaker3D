# DevMaker3D - Landing Page Profissional

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)](https://tailwindcss.com/)

## 🎯 Sobre o Projeto

Landing page profissional para a **DevMaker3D**, empresa especializada em impressão 3D com rigor de engenharia e alma de artista, localizada em Itaperuna/RJ.

### 🌟 Características Principais

- **Design Moderno**: Interface dark mode com elementos visuais inspirados em camadas de impressão 3D
- **Responsividade Total**: Otimizada para desktop, tablet e mobile
- **Performance Otimizada**: Core Web Vitals otimizados com Next.js 14
- **SEO Avançado**: Meta tags dinâmicas, schema markup e sitemap automático
- **Animações Suaves**: Framer Motion para transições fluidas
- **Formulários Inteligentes**: Validação client-side e server-side
- **Analytics Integrado**: Google Analytics 4 e event tracking

## 🚀 Tecnologias Utilizadas

### Frontend
- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [React 19](https://react.dev/) - Biblioteca de UI
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipos
- [Tailwind CSS v4](https://tailwindcss.com/) - Framework CSS utilitário
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [Lucide React](https://lucide.dev/) - Ícones SVG otimizados

### Backend & APIs
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Rotas de API integradas
- [Resend](https://resend.com/) - Serviço de email transacional
- [Zod](https://zod.dev/) - Validação de esquemas TypeScript

### Desenvolvimento & Deploy
- [pnpm](https://pnpm.io/) - Gerenciador de pacotes rápido e eficiente
- [ESLint](https://eslint.org/) - Linting de código
- [Prettier](https://prettier.io/) - Formatação de código
- [Vercel](https://vercel.com/) - Plataforma de deploy com edge functions
- [Docker](https://www.docker.com/) - Containerização para desenvolvimento

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Git >= 2.40.0

### Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/Adriano-Lengruber/DevMaker3D_02_26.git
cd DevMaker3D_02_26/devmaker3d-website

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o servidor de desenvolvimento
pnpm dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Desenvolvimento com Docker

```bash
# Build e inicie o container de desenvolvimento
docker-compose up -d devmaker3d-dev

# Execute testes
docker-compose --profile testing run --rm devmaker3d-test

# Parar containers
docker-compose down
```

## 🔧 Configuração de Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure as variáveis:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=DevMaker3D

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=contato@devmaker3d.com.br

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Social Media
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/devmaker3d
NEXT_PUBLIC_WHATSAPP_NUMBER=5522999999999
```

## 🏗️ Estrutura do Projeto

```
devmaker3d-website/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── layout.tsx          # Layout raiz com providers
│   │   ├── page.tsx            # Página principal
│   │   ├── globals.css         # Estilos globais
│   │   └── api/                # Rotas de API
│   ├── components/             # Componentes React
│   │   ├── sections/           # Seções da landing page
│   │   ├── ui/                 # Componentes de UI (shadcn/ui)
│   │   ├── forms/              # Componentes de formulário
│   │   └── shared/             # Componentes compartilhados
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilitários e configurações
│   └── types/                  # Tipos TypeScript
├── public/                     # Assets estáticos
├── tests/                      # Testes automatizados
├── docker/                     # Configurações Docker
└── scripts/                    # Scripts de automação
```

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com coverage
pnpm test:coverage

# Executar testes E2E
pnpm test:e2e
```

## 🚀 Deploy

### Deploy na Vercel (Recomendado)

1. Conecte seu repositório GitHub na Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch main

### Deploy Manual

```bash
# Build de produção
pnpm build

# Inicie o servidor de produção
pnpm start
```

### Deploy com Docker

```bash
# Build da imagem de produção
docker build -f docker/Dockerfile.prod -t devmaker3d:latest .

# Execute o container
docker run -p 3000:3000 --env-file .env.local devmaker3d:latest
```

## 📊 Performance & SEO

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### SEO Features
- Meta tags dinâmicas para cada página
- Schema markup para rich snippets
- Sitemap.xml automático
- Robots.txt otimizado
- Open Graph tags para redes sociais
- Twitter Cards

### Otimizações
- Images otimizadas com Next.js Image
- Lazy loading de componentes pesados
- Code splitting automático
- Fontes otimizadas com next/font
- CSS minificado e comprimido

## 🔒 Segurança

- Headers de segurança configurados
- Validação de inputs com Zod
- Proteção contra XSS
- Rate limiting em formulários
- HTTPS enforcement

## 📈 Analytics & Monitoramento

- Google Analytics 4 integrado
- Event tracking personalizado
- Monitoramento de erros com Sentry
- Performance monitoring com Vercel Analytics
- Uptime monitoring

## 🎯 Features do Negócio

### Seções Principais
1. **Hero Section**: Apresentação impactante com animações
2. **Philosophy**: Conceito "Técnica com alma"
3. **Process**: Etapas do processo de impressão 3D
4. **Services**: Serviços oferecidos
5. **Materials**: Materiais disponíveis
6. **Portfolio**: Galeria de projetos realizados
7. **Testimonials**: Depoimentos de clientes
8. **Contact**: Formulário de contato e informações

### Funcionalidades de Lead Generation
- Formulário de contato inteligente
- Captura de leads com validação
- Integração com email marketing
- Notificações em tempo real
- Sistema de orçamento online (em desenvolvimento)

## 🔄 CI/CD Pipeline

O projeto utiliza GitHub Actions para:
- Testes automatizados a cada push
- Linting e type checking
- Build verification
- Deploy automático para Vercel
- Notificações de status

## 📝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 Reportando Bugs

Reporte bugs através das [Issues do GitHub](https://github.com/Adriano-Lengruber/DevMaker3D_02_26/issues).

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autor

**Adriano Lengruber**
- LinkedIn: [linkedin.com/in/adrianolengruber](https://linkedin.com/in/adrianolengruber)
- GitHub: [@Adriano-Lengruber](https://github.com/Adriano-Lengruber)

## 🙏 Agradecimentos

- Next.js team pela excelente framework
- Tailwind CSS pela produtividade no CSS
- Framer Motion pelas animações fluidas
- Comunidade open source pelos componentes e ícones

---

## 📞 Suporte

Para suporte, envie um email para: adriano@devmaker3d.com.br

**Site Oficial**: [https://devmaker3d.com.br](https://devmaker3d.com.br)

---

*Desenvolvido com ❤️ em Itaperuna/RJ - Brasil*