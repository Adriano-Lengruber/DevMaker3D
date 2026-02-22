#!/bin/bash

# Script de teste para validar o deploy DevMaker3D
# Este script deve ser executado no container Docker

echo "🧪 Iniciando testes de validação do DevMaker3D..."

# Aguardar o servidor iniciar completamente
sleep 5

# Testar se o servidor está respondendo
echo "🔍 Testando se o servidor está respondendo..."
if curl -f -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
  echo "✅ Servidor está respondendo!"
else
  echo "❌ Servidor não está respondendo"
  exit 1
fi

# Testar site.webmanifest
echo "🔍 Testando site.webmanifest..."
if curl -f -s -o /dev/null -w "%{http_code}" http://localhost:3000/site.webmanifest | grep -q "200"; then
  echo "✅ site.webmanifest está acessível!"
else
  echo "❌ site.webmanifest não está acessível"
  exit 1
fi

# Testar alguns chunks JavaScript
echo "🔍 Testando chunks JavaScript..."
CHUNKS=(
  "_next/static/chunks/62c5807de669b3d4.js"
  "_next/static/chunks/6300ea6be8a11c07.css"
)

for chunk in "${CHUNKS[@]}"; do
  if curl -f -s -o /dev/null -w "%{http_code}" "http://localhost:3000/$chunk" | grep -q "200"; then
    echo "✅ $chunk está acessível!"
  else
    echo "❌ $chunk não está acessível"
    exit 1
  fi
done

# Testar página principal
echo "🔍 Testando página principal..."
if curl -f -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
  echo "✅ Página principal está funcionando!"
else
  echo "❌ Página principal não está funcionando"
  exit 1
fi

echo "🎉 Todos os testes passaram! O DevMaker3D está funcionando corretamente."