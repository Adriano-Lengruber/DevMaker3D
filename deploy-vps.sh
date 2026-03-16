#!/bin/bash

# DevMaker3D - Script de Deploy para VPS

echo "🚀 Deploy DevMaker3D para VPS..."

# Verificar se há alterações não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há alterações não commitadas. Fazendo commit..."
    git add .
    git commit -m "update: alterações locais $(date '+%Y-%m-%d %H:%M')"
fi

# Push para origin
echo "📤 Enviando para GitHub..."
git push origin main

# Conectar à VPS e fazer pull
echo "🔄 Atualizando servidor..."
ssh vps << 'EOF'
    cd /var/www/devmaker3d
    
    # Pull das últimas alterações
    git pull origin main
    
    # Rebuild da aplicação
    docker compose down
    docker compose build --no-cache
    docker compose up -d
    
    # Verificar status
    docker ps | grep devmaker3d
    
    echo "✅ Deploy concluído!"
EOF

echo "🌐 Acesse: https://devmaker3d.adriano-lengruber.com"
