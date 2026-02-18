# SPEC.md - DevMaker3D Landing Page

## 1. Project Overview

**Project Name:** DevMaker3D Landing Page
**Type:** Institutional Landing Page with Lead Generation
**Core Functionality:** Present DevMaker3D's unique value proposition in 3D printing services, emphasizing craftsmanship, technical expertise, and the human element behind each piece.
**Target Users:** Creators, makers, developers, engineers, startups, and companies that value process and authorship in 3D printing.

---

## 2. Brand Identity

### Color Palette
| Role | Color | Hex Code |
|------|-------|----------|
| Primary Background | Preto Técnico | `#0F0F0F` |
| Secondary Background | Dark Gray | `#1A1A1A` |
| Primary Text | Branco | `#FFFFFF` |
| Secondary Text | Cinza Técnico | `#A0A0A0` |
| Accent/CTA | Laranja Criativo | `#F57C00` |
| Accent Hover | Laranja Brilhante | `#FF9500` |
| Border/Divider | Cinza Escuro | `#333333` |

### Typography
- **Headings:** JetBrains Mono (monospace, technical feel)
- **Body Text:** Inter (clean, readable)
- **Accent Text:** Montserrat Bold (for emphasis and brand name)

### Visual Style
- Dark mode native
- Subtle grid pattern background (simulating print bed)
- Glow effects on accent elements
- Geometric shapes and layer-inspired design elements
- Code/technical aesthetic mixed with artistic touches

---

## 3. UI/UX Specification

### Layout Structure

#### Header (Fixed)
- Logo (left)
- Navigation menu (center): Sobre, Serviços, Processo, Portfólio, Contato
- CTA Button (right): "Solicitar Orçamento"
- Glassmorphism effect on scroll

#### Hero Section
- Full viewport height
- Animated background: Layer-by-layer reveal effect
- Main headline with typewriter or fade-up animation
- Subheadline
- Two CTA buttons: primary (Laranja) and secondary (outline)
- Scroll indicator

#### Philosophy Section (O Que Nos Diferencia)
- Split layout: text left, visual right
- 4 key differentiators in cards:
  1. "Não é só imprimir. É projetar com intenção."
  2. "Cada camada é uma decisão."
  3. "Técnica que emociona."
  4. "Processo visível, resultado impecável."
- Scroll-triggered animations

#### Process Section (O Processo)
- Timeline or scrollytelling format
- 4 stages with detailed explanations:
  1. Análise e Modelagem
  2. Fatiamento Estratégico
  3. Materialização
  4. Pós-Processamento
- Visual indicators of time/effort for each stage

#### Services Section
- Grid of service cards (3 columns desktop, 1 mobile)
- Services:
  1. Prototipagem Rápida
  2. Peças Funcionais
  3. Peças Decorativas
  4. Modelagem 3D
  5. Pós-Processamento Premium
  6. Produção em Série (Small Batch)

#### Materials Section
- Interactive material showcase
- Materials to feature:
  - PLA (Basic/Prototyping)
  - PETG (Engineering)
  - TPU (Flexible)
  - Resina (High Detail)
  - ABS (Durability)
- Each with use cases and characteristics

#### Portfolio Section
- Masonry grid layout
- Hover effects showing technical details:
  - Print time
  - Material used
  - Layer height
  - Finish type

#### Testimonials Section
- Carousel with client testimonials
- Company logos (social proof)

#### CTA Section (Final)
- Strong call to action
- Contact form or button to start project

#### Footer
- Logo and description
- Quick links
- Contact information
- Social media icons

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Animations & Interactions
- Fade-up on scroll for sections
- Hover effects on cards (scale, glow)
- Smooth scroll between sections
- Typewriter effect on hero headline
- Layer reveal animation in hero
- Progress indicator mimicking print progress
- Parallax subtle effects

---

## 4. Functionality Specification

### Core Features
1. **Smooth Scroll Navigation** - Click nav items to smooth scroll to sections
2. **Scroll-Triggered Animations** - Elements animate in as user scrolls
3. **Interactive Material Cards** - Hover to see more details
4. **Portfolio Hover Details** - Technical specs appear on hover
5. **Mobile Menu** - Hamburger menu with slide-in animation
6. **Contact Form** - Lead capture form (visual only, no backend)

### User Interactions
- Navigation links scroll to corresponding sections
- CTA buttons trigger scroll to contact section
- Cards have hover states with subtle animations
- Portfolio items show detailed info on hover
- Mobile menu opens/closes smoothly

### Edge Cases
- Handle slow network: skeleton loaders for images
- Handle no-JS: basic layout still visible
- Handle small screens: stacked layouts, readable fonts

---

## 5. Content Specification

### Headlines
- **Hero:** "Do Código à Matéria: Materializamos o Intangível."
- **Subhead:** "Impressão 3D com rigor de engenharia e alma de artista."
- **Philosophy:** "Não vendemos plástico derretido. Vendemos precisão, paciência e criação."
- **Process:** "Cada peça conta uma história. Aqui está como."
- **Services:** "O que podemos criar juntos."
- **Materials:** "O material certo para cada propósito."
- **Portfolio:** "Projetos que ganham forma."
- **CTA:** "Pronto para materializar sua ideia?"

### Copy Tone
- Technical but accessible
- Human and approachable
- Value-focused (explaining the work behind each piece)
- Direct, no marketing fluff
- Inspiring without being exaggerated

---

## 6. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (JetBrains Mono, Inter, Montserrat)

---

## 7. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with #0F0F0F background throughout
- [ ] Orange #F57C00 accent visible in CTAs and highlights
- [ ] Typography matches specification
- [ ] Responsive on mobile, tablet, desktop
- [ ] Animations are smooth and subtle
- [ ] Grid pattern visible in backgrounds
- [ ] Glow effects on accent elements

### Functional Checkpoints
- [ ] All navigation links work and smooth scroll
- [ ] All hover states functional
- [ ] Mobile menu works correctly
- [ ] Portfolio hover details appear
- [ ] No console errors
- [ ] Fast load time (< 3s initial)

### Content Checkpoints
- [ ] All sections present: Hero, Philosophy, Process, Services, Materials, Portfolio, CTA, Footer
- [ ] Copy explains the work/difficulty behind each piece
- [ ] Professional tone throughout
- [ ] Brand messaging consistent

---

## 8. File Structure

```
devmaker3d-landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Philosophy.tsx
│   ├── Process.tsx
│   ├── Services.tsx
│   ├── Materials.tsx
│   ├── Portfolio.tsx
│   ├── Testimonials.tsx
│   ├── ContactCTA.tsx
│   └── Footer.tsx
├── public/
│   └── (images)
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```
