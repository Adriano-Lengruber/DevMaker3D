# PROMPT PARA PRÓXIMA IA CODER - DevMaker3D Deploy Pipeline

## CONTEXTO CRÍTICO - Pipeline QUEBRADO

**SITUAÇÃO ATUAL:**
- Site: https://devmaker3d.adriano-lengruber.com
- Status: Application error + 404 em arquivos estáticos Next.js
- Deploy: GitHub Actions → VPS via SSH → Docker Compose
- Container: Rodando mas sem acesso a assets

## PROBLEMAS IDENTIFICADOS:

### 1. Next.js Standalone Não Serve Assets
- **Erro**: `/_next/static/chunks/62c5807de669b3d4.js` → 404 NOT FOUND
- **Erro**: `/site.webmanifest` → 404 NOT FOUND
- **Erro Browser**: `ChunkLoadError: Failed to load chunk`
- **MIME Type**: `text/plain` instead of `application/javascript`

### 2. Container Configuration
- **Dockerfile CMD**: `["sh", "-c", "HOST=0.0.0.0 node .next/standalone/server.js"]`
- **Rede**: `nginx-proxy_default` (OK)
- **Porta**: 3000 (OK)
- **Ambiente**: HOST=0.0.0.0, PORT=3000, NODE_ENV=production

### 3. Estrutura Standalone Next.js
```
.next/standalone/
├── server.js          ← Entry point
├── .next/
│   ├── static/        ← Assets que faltam
│   └── chunks/        ← Chunks que dão 404
└── public/            ← Arquivos públicos
```

## SOLUÇÃO NECESSÁRIA:

### Passo 1: Diagnosticar Container Atual
```bash
# Verificar estrutura de arquivos
docker exec devmaker3d find .next -name "*.js" | head -10
docker exec devmaker3d ls -la .next/static/
docker exec devmaker3d ls -la .next/standalone/

# Testar acesso interno
docker exec devmaker3d curl -I http://localhost:3000/_next/static/chunks/62c5807de669b3d4.js
```

### Passo 2: Comando Correto para Standalone
O comando deve garantir que o servidor encontre os assets no diretório correto:

```bash
# Versão completa com navegação correta
docker stop devmaker3d
docker rm devmaker3d
docker run -d --name devmaker3d \
  --network nginx-proxy_default \
  -p 3000:3000 \
  -e HOST=0.0.0.0 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  devmaker3d_02_26-devmaker3d \
  sh -c "cd .next/standalone && HOST=0.0.0.0 PORT=3000 node server.js"
```

### Passo 3: Atualizar Dockerfile
```dockerfile
# -------- Runner --------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copia apenas o necessário
COPY --from=builder /app ./

EXPOSE 3000

# COMANDO CORRIGIDO PARA STANDALONE
WORKDIR /app/.next/standalone
CMD ["sh", "-c", "HOST=0.0.0.0 PORT=3000 node server.js"]
```

### Passo 4: Verificar Next.js Config
```javascript
// next.config.js deve ter:
module.exports = {
  output: 'standalone',
  // ... outras configs
}
```

### Passo 5: Testar Completo
```bash
# Build local para testar
npm run build
ls -la .next/standalone/
ls -la .next/static/

# Testar servidor standalone local
cd .next/standalone && HOST=0.0.0.0 PORT=3000 node server.js
# Acessar: http://localhost:3000 e verificar se assets carregam
```

## CRÍTICO - Pipeline GitHub Actions:
1. **CI roda**: `npm run build`
2. **Deploy roda**: `docker compose up -d`
3. **Container novo** deve ter comando correto
4. **Rede nginx-proxy_default** deve ser usada
5. **Assets devem carregar 100%**

## PRIORIDADE MÁXIMA:
**Fazer o site carregar completamente com todos os assets JavaScript, CSS e manifest!**

## COMANDOS RÁPIDOS PARA TESTAR:
```bash
# Status atual
docker ps | grep devmaker3d
docker logs devmaker3d --tail 10

# Testar assets
curl -I https://devmaker3d.adriano-lengruber.com/_next/static/chunks/62c5807de669b3d4.js
curl -I https://devmaker3d.adriano-lengruber.com/site.webmanifest

# Verificar nginx proxy
docker exec nginx-proxy-app-1 curl -I http://devmaker3d:3000/_next/static/chunks/62c5807de669b3d4.js
```

## SUCESSO QUANDO:
- [ ] Site carrega sem erros no console
- [ ] Todos chunks JavaScript carregam (200 OK)
- [ ] site.webmanifest carrega (200 OK)
- [ ] Nenhum 404 em assets estáticos
- [ ] Deploy automático funciona após git push