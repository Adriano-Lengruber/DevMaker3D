#!/bin/bash

# DevMaker3D - Setup GitHub Secrets para Deploy Automático
# Execute este script localmente para configurar as secrets

echo "🔧 Configurando GitHub Secrets para Deploy Automático"
echo ""

# Verificar se gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) não está instalado."
    echo "   Execute: bash install-gh.sh"
    exit 1
fi

# Verificar se está autenticado
if ! gh auth status &> /dev/null; then
    echo "❌ Você precisa fazer login no GitHub CLI."
    echo "   Execute: gh auth login"
    exit 1
fi

echo "📋 Secrets necessárias:"
echo "   - VPS_HOST: Endereço IP da VPS"
echo "   - VPS_USER: Usuário SSH (adriano)"
echo "   - VPS_SSH_KEY: Chave privada SSH"
echo "   - DATABASE_URL: URL do banco de dados"
echo ""

# Valores padrão
VPS_HOST="148.230.75.59"
VPS_USER="adriano"

echo "📝 Usando VPS_HOST padrão: $VPS_HOST"
echo "📝 Usando VPS_USER padrão: $VPS_USER"
echo ""

echo "📝 Lendo chave privada SSH..."
if [ -f ~/.ssh/id_ed25519 ]; then
    VPS_SSH_KEY=$(cat ~/.ssh/id_ed25519)
else
    echo "❌ Chave privada não encontrada em ~/.ssh/id_ed25519"
    exit 1
fi

echo "📝 Lendo DATABASE_URL..."
if [ -f .env ]; then
    DATABASE_URL=$(grep DATABASE_URL .env | cut -d '=' -f2-)
else
    DATABASE_URL="file:./dev.db"
fi

# Configurar secrets
echo ""
echo "🔐 Configurando secrets no GitHub..."

gh secret set VPS_HOST --body "$VPS_HOST"
gh secret set VPS_USER --body "$VPS_USER"
gh secret set VPS_SSH_KEY --body "$VPS_SSH_KEY"
gh secret set DATABASE_URL --body "$DATABASE_URL"

echo ""
echo "✅ Secrets configuradas com sucesso!"
echo ""
echo "🚀 Agora você pode fazer um push para a branch main e o deploy será automático!"
echo ""
echo "📝 Certifique-se de que a VPS tem:"
echo "   1. Docker e Docker Compose instalados"
echo "   2. O diretório /var/www/devmaker3d criado"
echo "   3. Os arquivos do projeto copiados"
