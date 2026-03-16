#!/bin/bash

# DevMaker3D - Script de Conexão com VPS

echo "🔐 Conectando à VPS DevMaker3D..."

# Conectar via SSH usando a configuração salva
ssh vps

# Se a conexão falhar, mostra instruções
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Não foi possível conectar à VPS."
    echo ""
    echo "Para configurar a chave SSH, execute este comando na VPS:"
    echo 'echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAWSGkOBauu5rGVCF9AKfXGege8tqXnZeSivfXnrXA9/ devmaker3d@development" >> ~/.ssh/authorized_keys'
    echo ""
fi
