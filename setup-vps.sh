#!/bin/bash

# DevMaker3D - Setup Inicial da VPS
# Execute este script na VPS após uma instalação limpa

echo "🚀 Configurando VPS para DevMaker3D..."
echo ""

# Verificar se é root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Execute este script como root (sudo su)"
    exit 1
fi

echo "📦 Atualizando sistema..."
apt update && apt upgrade -y

echo "🐳 Instalando Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $SUDO_USER
    systemctl enable docker
    systemctl start docker
fi

echo "📦 Instalando Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo "📁 Criando diretório do projeto..."
mkdir -p /var/www/devmaker3d
cd /var/www/devmaker3d

echo "🔐 Configurando chave SSH para deploy..."
# Adicionar chave pública do GitHub Actions
mkdir -p ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

echo "✅ VPS configurada!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure as secrets no GitHub (veja setup-github-secrets.sh)"
echo "   2. Faça o primeiro deploy manual ou copie os arquivos manualmente"
echo "   3. O workflow do GitHub Actions fará os deploys automáticos"
