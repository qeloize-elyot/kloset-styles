# Kloset Styles

**Seu guarda-roupa, suas cores, suas soluções.**

Kloset Styles é um guarda-roupa digital inteligente que analisa seu subtom de pele, recomenda cores que combinam com você e monta looks práticos usando as peças que você já tem — considerando ocasião e clima.

---

## O que o projeto faz

- **Análise de Subtom**: upload de selfie → identifica subtom (quente / frio / neutro), contraste e estação de cores
- **Guarda-Roupa Digital**: cadastro de peças com foto, categoria, cor e estilo
- **Gerador de Looks**: monta combinações com as peças cadastradas, filtrando por ocasião e clima
- **Soluções práticas**: sugere o que vestir e aponta o que falta no guarda-roupa

---

## Stack

| Camada              | Tecnologia                  |
|---------------------|-----------------------------|
| Frontend + Backend  | Next.js 15 (App Router)     |
| Estilo              | Tailwind CSS                |
| Banco de dados      | Supabase (PostgreSQL)       |
| Autenticação        | Supabase Auth               |
| Storage de imagens  | Supabase Storage            |
| Análise de imagem   | Google Gemini 1.5 Flash     |
| Hospedagem          | Vercel                      |

---

## Estrutura do Projeto

```
kloset-styles/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── cadastro/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── analise/
│   │   ├── guarda-roupa/
│   │   ├── looks/
│   │   └── perfil/
│   ├── page.tsx          # Landing page
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── middleware.ts
├── .env.example
└── README.md
```

---

## Como rodar localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (copie `.env.example` para `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   GOOGLE_GENERATIVE_AI_API_KEY=
   ```
4. Rode o projeto:
   ```bash
   npm run dev
   ```

---

## Status atual

- [x] Landing page
- [x] Estrutura de pastas (auth + dashboard)
- [x] Páginas de Login e Cadastro (UI)
- [x] Layout do dashboard com navegação
- [x] Páginas placeholder: Análise, Guarda-roupa, Looks, Perfil
- [x] Tipos TypeScript principais
- [x] Clientes Supabase (browser + server + middleware)
- [ ] Integração real de autenticação com Supabase
- [ ] Análise de imagem com Gemini
- [ ] CRUD de peças no guarda-roupa
- [ ] Gerador de looks funcional

---

## Licença

Projeto privado / em desenvolvimento.
