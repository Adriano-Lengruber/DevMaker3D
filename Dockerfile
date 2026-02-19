# Dockerfile para produção
FROM node:20-alpine AS builder

# Instala pnpm
RUN npm install -g pnpm@8

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia código fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Imagem de produção
FROM node:20-alpine AS runner

# Cria usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Muda propriedade dos arquivos
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expõe porta
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para produção
CMD ["node", "server.js"]