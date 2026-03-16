# -------- Builder --------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências
COPY package.json ./

# Copia schema do Prisma (necessário para generate)
COPY prisma ./prisma

# Instala dependências
RUN npm install --legacy-peer-deps

# Gera Prisma Client
RUN npx prisma generate

# Copia restante do projeto
COPY . .

# Build Next.js
RUN npm run build

# -------- Runner --------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o necessário
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Para o modo standalone, precisamos dos arquivos estáticos no diretório _next
# O Next.js espera que os arquivos estáticos estejam em _next/static/
RUN mkdir -p _next && cp -r .next/static _next/static

EXPOSE 3000

# COMANDO CORRIGIDO PARA STANDALONE - executar do diretório correto
WORKDIR /app
CMD ["sh", "-c", "HOST=0.0.0.0 PORT=3000 node server.js"]