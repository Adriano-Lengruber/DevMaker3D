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
- **Animações Suaves**: Framer Motion e Three.js para transições fluidas
- **Formulários Inteligentes**: Validação client-side e server-side
- **Blog Integrado**: Sistema completo de blog com painel administrativo
- **Dashboard de Usuário**: Área restrita para clientes gerenciarem seus projetos
- **Autenticação**: Sistema de login com NextAuth.js

## 🚀 Tecnologias Utilizadas

### Frontend
- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [React 18](https://react.dev/) - Biblioteca de UI
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipos
- [Tailwind CSS v3](https://tailwindcss.com/) - Framework CSS utilitário
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [Three.js](https://threejs.org/) - Gráficos 3D
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React para Three.js
- [Lucide React](https://lucide.dev/) - Ícones SVG otimizados
- [Tiptap](https://tiptap.dev/) - Editor Rich Text

### Backend & Databases
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Rotas de API integradas
- [Prisma](https://prisma.io/) - ORM para SQLite
- [NextAuth.js](https://next-auth.js.org/) - Autenticação
- [Zod](https://zod.dev/) - Validação de esquemas TypeScript
- [Resend](https://resend.com/) - Serviço de email transacional

### Desenvolvimento & Deploy
- [npm](https://www.npmjs.com/) - Gerenciador de pacotes
- [ESLint](https://eslint.org/) - Linting de código
- [Jest](https://jestjs.io/) - Testes automatizados
- [Docker](https://www.docker.com/) - Containerização
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js >= 20.0.0
- npm >= 10.0.0
- Git >= 2.40.0
- Docker (opcional)

### Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/Adriano-Lengruber/DevMaker3D.git
cd DevMaker3D

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Gere o Prisma Client
npx prisma generate

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Desenvolvimento com Docker

```bash
# Iniciar container de desenvolvimento
docker-compose -f docker-compose.dev.yml up --build

# Acesse em http://localhost:3000
```

## 🔧 Configuração de Variáveis de Ambiente

```bash
# Database
DATABASE_URL="file:./dev.db"

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=DevMaker3D

# Auth (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_aqui

# Email Configuration (Resend)
RESEND_API_KEY=re_123456789
RESEND_FROM_EMAIL=contato@devmaker3d.com.br

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📁 Estrutura do Projeto

```
devmaker3d/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── api/               # Rotas de API
│   │   ├── auth/              # Páginas de autenticação
│   │   ├── blog/              # Blog e admin
│   │   ├── dashboard/         # Dashboard do usuário
│   │   └── page.tsx           # Página principal
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base
│   │   ├── blog/             # Componentes do blog
│   │   └── forms/            # Formulários
│   ├── lib/                  # Utilitários
│   └── types/                # Tipos TypeScript
├── prisma/                   # Schema do banco de dados
├── public/                   # Assets estáticos
├── .github/workflows/        # GitHub Actions
└── docker-compose*.yml       # Configurações Docker
```

## 🚀 Deploy

### Deploy Automático com GitHub Actions

1. Configure as secrets no GitHub:
   - `VPS_HOST`: Endereço IP da VPS
   - `VPS_USER`: Usuário SSH
   - `VPS_SSH_KEY`: Chave privada SSH
   - `DATABASE_URL`: URL do banco de dados

2. Execute o script de setup:
```bash
./setup-github-secrets.sh
```

3. Faça push para a branch main:
```bash
git add .
git commit -m "feat: descrição"
git push origin main
```

O deploy será automático! 🎉

### Deploy Manual na VPS

```bash
# Clone na VPS
git clone https://github.com/Adriano-Lengruber/DevMaker3D.git /var/www/devmaker3d
cd /var/www/devmaker3d

# Configure variáveis de ambiente
cp .env.example .env

# Inicie com Docker
docker-compose up -d
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage

# Executar testes CI
npm run test:ci
```

## 📋 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Iniciar servidor de produção |
| `npm run lint` | Verificar código |
| `npm run test` | Executar testes |
| `npm run db:generate` | Gerar Prisma Client |
| `npm run db:push` | Atualizar banco de dados |
| `npm run db:seed` | Popular banco com dados iniciais |

## 🎯 Funcionalidades

### Landing Page
- Hero com animações 3D
- Filosofia da empresa
- Processo de impressão 3D
- Serviços oferecidos
- Materiais disponíveis
- Portfólio de projetos
- Depoimentos de clientes
- Formulário de contato

### Blog
- Listagem de artigos
- Artigos individuais
- Comentários
- Reações (likes)
- Painel administrativo
- Editor Rich Text

### Dashboard
- Área do cliente
- Gerenciamento de projetos
- Status de pedidos

### Autenticação
- Login/Registro
- Integração com NextAuth.js
- Sessões seguras

## 📞 Suporte

Para suporte, envie um email para: adriano@devmaker3d.com.br

**Site Oficial**: [https://devmaker3d.adriano-lengruber.com](https://devmaker3d.adriano-lengruber.com)

---

*Desenvolvido com ❤️ em Itaperuna/RJ - Brasil*
