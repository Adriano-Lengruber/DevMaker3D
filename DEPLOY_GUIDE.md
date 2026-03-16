# 🚀 DevMaker3D - Guia de Deploy

## 📋 Visão Geral

Este documento contém todas as informações necessárias para fazer deploy da aplicação DevMaker3D na VPS.

**URL de Produção:** https://devmaker3d.adriano-lengruber.com

---

## 🖥️ Infraestrutura

### VPS
- **IP:** 148.230.75.59
- **SSH:** `ssh vps` (configurado no ~/.ssh/config)

### Serviços
- **Nginx Proxy Manager:** Porta 80/81 (HTTP/HTTPS)
- **Aplicação:** Container Docker na porta 3000

---

## 🏗️ Arquitetura

```
[Cloudflare] → [Nginx Proxy Manager] → [devmaker3d:3000]
```

### Configuração do Nginx Proxy Manager
- **Domínio:** devmaker3d.adriano-lengruber.com
- **Forward:** http://devmaker3d:3000
- **Rede Docker:** nginx-proxy_default

---

## 📦 Arquivos Principais

### Dockerfile
Responsável pela construção da imagem Docker com Next.js standalone.

### docker-compose.yml
Configuração do serviço com variáveis de ambiente necessárias:
```yaml
environment:
  - NODE_ENV=production
  - HOST=0.0.0.0
  - PORT=3000
```

### .github/workflows/deploy.yml
Pipeline de CI/CD para deploy automático via GitHub Actions.

---

## 🚀 Como Fazer Deploy

### 1. Método Automático (Recomendado)

Faça push para a branch main:
```bash
git add .
git commit -m "sua mensagem"
git push origin main
```

O GitHub Actions automaticamente:
1. Instala dependências
2. Gera Prisma Client
3. Faz build da aplicação
4. Envia imagem para VPS
5. Faz deploy do container

### 2. Método Manual

Na VPS:
```bash
# Navegar para o diretório
cd /home/adriano/devmaker3d

# Pull das alterações
git pull origin main

# Build da imagem
docker build -t devmaker3d .

# Remover container antigo (se existir)
docker rm -f devmaker3d

# Rodar novo container
docker run -d \
  -p 3000:3000 \
  -e HOST=0.0.0.0 \
  -e PORT=3000 \
  --name devmaker3d \
  --network nginx-proxy_default \
  devmaker3d
```

### 3. Usando Docker Compose

```bash
cd /home/adriano/devmaker3d
docker-compose up -d --build
```

---

## 🔧 Comandos de Emergência

### Verificar status
```bash
docker ps | grep devmaker3d
```

### Ver logs
```bash
docker logs devmaker3d --tail 50
```

### Reiniciar container
```bash
docker restart devmaker3d
```

### Testar aplicação internamente
```bash
curl http://localhost:3000
curl http://devmaker3d.adriano-lengruber.com
```

### Rebuild completo
```bash
docker rm -f devmaker3d
docker rmi devmaker3d
docker build -t devmaker3d .
docker run -d -p 3000:3000 -e HOST=0.0.0.0 -e PORT=3000 --name devmaker3d --network nginx-proxy_default devmaker3d
```

---

## 🐛 Problemas Comuns

### 502 Bad Gateway
- Verificar se o container está rodando: `docker ps | grep devmaker3d`
- Verificar logs: `docker logs devmaker3d`
- Testar internamente: `docker exec nginx-proxy-app-1 curl http://devmaker3d:3000`

### Connection Refused
- Verificar se o HOST está configurado como 0.0.0.0
- Verificar variáveis de ambiente: `docker inspect devmaker3d | jq '.[0].Config.Env'`

### Assets 404
- Verificar se o build foi concluído corretamente
- Verificar se os arquivos estáticos foram copiados no Dockerfile

---

## 📝 Variáveis de Ambiente

### Produção (Docker)
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
```

### Desenvolvimento Local
Criar arquivo `.env.local` baseado em `.env.example`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3001"
```

---

## 🔐 Redes Docker

A aplicação precisa estar na rede `nginx-proxy_default` para o Nginx Proxy Manager conseguir acessá-la.

Verificar redes existentes:
```bash
docker network ls
```

Conectar container a rede:
```bash
docker network connect nginx-proxy_default devmaker3d
```

---

## ✅ Checklist de Deploy

- [ ] Código pushed para main
- [ ] GitHub Actions completou com sucesso
- [ ] Container rodando: `docker ps | grep devmaker3d`
- [ ] Teste local: `curl http://localhost:3000` (retorna 200)
- [ ] Teste domínio: `curl http://devmaker3d.adriano-lengruber.com` (retorna 200)
- [ ] SSL funcionando (https://devmaker3d.adriano-lengruber.com)

---

## 📞 Suporte

Em caso de problemas, verificar:
1. Logs do container: `docker logs devmaker3d`
2. Logs do Nginx: `docker logs nginx-proxy-app-1`
3. Status dos containers: `docker ps -a`

---

**Última atualização:** 16/03/2026
