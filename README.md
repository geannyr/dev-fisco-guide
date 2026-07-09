# Dicionário Fiscal para Devs de ERP

Guia/dicionário de consulta rápida para desenvolvedores que fazem ajustes
fiscais em ERP: SPED Fiscal (EFD ICMS IPI), Bloco C, Bloco H, Bloco K, CFOP,
CST, CSOSN, NCM, ICMS, IPI, PIS/COFINS e conceitos de parametrização fiscal.

Página estática, sem backend e sem banco de dados — publicada no GitHub Pages.

## Stack

- [Vite](https://vite.dev/)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- Sem roteador externo: navegação por hash (`#/termo/<id>`) implementada em
  [`src/hooks/useHashRoute.ts`](src/hooks/useHashRoute.ts)

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse o endereço exibido no terminal (algo como `http://localhost:5173/dev-fisco-guide/`).

## Build

```bash
npm run build
```

Gera a versão estática em `dist/`. Para conferir o resultado do build localmente:

```bash
npm run preview
```

## Publicando no GitHub Pages

O deploy é automático via GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)): a cada push
em `main`, o workflow builda o projeto e publica o conteúdo de `dist/` no
GitHub Pages.

Passos únicos de configuração (na primeira vez):

1. No GitHub, vá em **Settings → Pages** do repositório.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Dê push na branch `main` — o workflow cuida do resto.

A URL final fica em `https://<seu-usuario>.github.io/dev-fisco-guide/`.

> O `base` do Vite já está configurado como `/dev-fisco-guide/` em
> [`vite.config.ts`](vite.config.ts). Se o repositório for renomeado, ajuste
> esse valor (e o `href` do favicon em `index.html`, que usa `%BASE_URL%`
> automaticamente).

## Como adicionar novos termos

Todo o conteúdo fica em [`src/data/`](src/data), separado da UI:

- [`src/data/categories.ts`](src/data/categories.ts) — lista de categorias
  (id, título, descrição, ícone).
- [`src/data/terms.ts`](src/data/terms.ts) — lista de termos, cada um com:
  - `name`, `aliases` (opcional)
  - `category` (precisa bater com um `id` de `categories.ts`)
  - `short` — frase curta usada no card
  - `definition` — texto completo da página de detalhe
  - `whereInErp` (opcional) — onde o conceito costuma aparecer no sistema
  - `relatedRecords` (opcional) — códigos de registros do SPED relacionados
    (viram links clicáveis quando existe um termo com o mesmo `id`)
  - `example` (opcional) — exemplo prático exibido no painel de detalhe
  - `commonErrors` (opcional) — lista de erros comuns
  - `keywords` (opcional) — sinônimos/termos extras usados apenas pela busca

Para adicionar um termo, basta acrescentar um novo objeto em `terms.ts` — ele
aparece automaticamente na busca, no card de categoria e na contagem, sem
precisar tocar em nenhum componente.

Para adicionar uma categoria nova, acrescente-a em `categories.ts`; ela já
aparece na grade de categorias da home.

## Estrutura

```
src/
  data/            conteúdo fiscal (categorias e termos)
  hooks/           useTheme (modo escuro) e useHashRoute (navegação)
  components/      Header, Hero, CategoryGrid, SearchBar, TermList,
                   TermCard, TermDetail, Footer, ThemeToggle
  App.tsx          orquestra estado de busca/filtro e a rota atual
```

## Aviso

Conteúdo didático para consulta rápida — não substitui a legislação vigente
nem o manual oficial do SPED.
