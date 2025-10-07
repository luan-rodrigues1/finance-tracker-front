# Tecnologias
- React
- Next.js
- Tailwind CSS
- TypeScript 
- Fetch API
- Context API

## Configuração do projeto

### Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/finance-tracker-front.git
cd finance-tracker-front
```
---

### Instalar dependências

```bash
npm install
# ou
yarn
# ou
pnpm install
```

---

Rodar servidor de desenvolvimento
```
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Por padrão, a aplicação roda em http://localhost:3000
.
Caso a porta 3000 já esteja ocupada, o Next.js tentará automaticamente a próxima porta disponível (3001, 3002, etc.).

---

### Configuração da API

No arquivo api.ts existe a variável API_URL, que define a ligação com a API.
Por padrão, está configurada para a porta localhost:7016.
Caso você tenha alterado a porta da API, é necessário atualizar essa variável para refletir a nova porta.

