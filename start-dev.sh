#!/bin/bash

# DevMaker3D - Script de Desenvolvimento Local

echo "🚀 Iniciando DevMaker3D em modo desenvolvimento..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker Desktop."
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose não está disponível."
    exit 1
fi

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar se o banco de dados existe
if [ ! -f "prisma/dev.db" ]; then
    echo "🗄️ Criando banco de dados..."
    npx prisma generate
    npx prisma db push
    npx tsx prisma/seed.ts
fi

# Iniciar com Docker Compose
echo "🐳 Iniciando container Docker..."
docker-compose -f docker-compose.dev.yml up --build

echo "✅ Servidor disponível em http://localhost:3000"
