#!/bin/bash

# Script para corrigir dependências e gerar novo lock file

echo "🔧 Corrigindo dependências..."

# Remover lock file antigo
rm -f package-lock.json

#Instalar dependências com legacy-peer-deps
npm install --legacy-peer-deps

# Fazer commit e push
git add -A
git commit -m "fix: Atualizar lock file para ESLint 8"
git push origin main

echo "✅ Correção enviada! O deploy deve funcionar agora."
