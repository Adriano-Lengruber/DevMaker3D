# -------- Builder --------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia restante do projeto
COPY . .

# Build Next.js
RUN npm run build

# -------- Runner --------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o necessário
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]