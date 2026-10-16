# Prestio: landing page

Landing de vendas da Prestio (prestio.com.br). A Prestio é um sistema de pedidos para negócios de comida, com duas partes:

- **Cardápio digital**: o cliente abre no celular, por link ou pelo QR Code da mesa, sem aplicativo e sem cadastro com senha.
- **Painel da loja**: pedidos em tempo real, impressão, catálogo, estoque e relatórios.

O sistema já está em produção, em outros dois repositórios (`cacau-cardapio` e `painel-adm-cacau`). Este repositório é só a landing.

Desenvolvido pela Splash Sistemas (splashsistemas.com.br). Responsável: Bernardo Dornelles.

## Stack e comandos

- Astro, site 100% estático, sem framework de componentes. Publicado na Vercel.
- `npm install`, depois `npm run dev` (http://localhost:4321) e `npm run build` (gera `dist/`).
- Fontes self-hosted via `@fontsource-variable`: Bricolage Grotesque (títulos) e Figtree (texto).
- O `vercel.json` redireciona `www.prestio.com.br` para `prestio.com.br`.

## Onde fica cada coisa

| Arquivo | O que tem |
|---|---|
| `src/config.ts` | WhatsApp, horário de atendimento, planos, preços, condição de lançamento e formatação em reais. **Mude dados aqui, não no HTML.** |
| `src/pages/index.astro` | Página principal: listas de conteúdo no topo (tipos de negócio, "se hoje você", dores, perguntas frequentes), JSON-LD para SEO, HTML das seções, script do formulário e CSS da página |
| `src/pages/privacidade.astro`, `src/pages/termos.astro` | Política de Privacidade (LGPD) e Termos de Uso |
| `src/layouts/Base.astro` | `<head>` (SEO, Open Graph), topo, rodapé |
| `src/styles/global.css` | Cores da marca (variáveis CSS), tipografia, botões, topo, rodapé e páginas de texto |
| `src/components/Celular.astro` | Telas do cardápio desenhadas em HTML: `loja`, `produto`, `acompanhamento` |
| `src/components/Quadro.astro` | Quadro de pedidos do painel (prop `compacto` mostra 3 colunas) |
| `src/components/Relatorio.astro` | Tela de relatórios |
| `public/marca/` | Logos: `prestio-logo.svg` (fundo claro), `prestio-logo-negativo.svg` (fundo escuro) |

## Central de ajuda (/ajuda)

- O conteúdo vem de `ajuda-insumos/tutoriais.md`, lido em `src/lib/ajuda.ts` na hora do build. **Para mudar um tutorial, edite o `.md`**, não as páginas.
- Formato de cada tutorial: `### [id] Título`, depois **Público**, **Onde fica**, **Precisa de**, **Passos** (lista numerada, com `(print: arquivo.png)` no fim do passo), **Resultado** e **Atenção**. As seções `##` definem o grupo (cliente, equipe, dono, administrador geral), e também há "Perguntas rápidas" e "Glossário".
- O build quebra de propósito se faltar um print citado ou se um tutorial vier sem passos ou sem resultado.
- Os prints ficam em `ajuda-insumos/prints/` (PNG em 2x) e são convertidos para WebP pelo `astro:assets` (`src/components/Print.astro`). Prints de celular aparecem com 320 px; os de computador ocupam a coluna. Clicar abre a versão grande.
- Páginas: `src/pages/ajuda/index.astro` (busca, grupos, perguntas rápidas com JSON-LD FAQPage, glossário) e `src/pages/ajuda/[id].astro` (um tutorial por página).
- `ajuda-insumos/funcoes.md` e `ajuda-insumos/LEIAME.md` são de uso interno e não vão para o site.
- Os prints são gerados por um script Playwright no repositório do painel. Veja `ajuda-insumos/LEIAME.md`.

As telas da landing são desenhos com dados fictícios (a hamburgueria "Brasa Burger"). Podem ser trocadas por prints reais do sistema quando houver.

## Ordem das seções da página

1. Topo: frase principal, botões, quadro e celular
2. Faixa de tipos de negócio (só os mais conhecidos: Pizzaria, Hamburgueria, Açaiteria, Lanchonete, Restaurante, Cafeteria)
3. Como funciona, em 3 passos
4. "Se hoje você…": quem anota no WhatsApp, quem depende do iFood, quem já usa outro cardápio digital
5. Dores e soluções
6. Para o seu cliente (seção escura, 3 celulares)
7. Para a sua equipe (quadro de pedidos)
8. Para quem é dono (relatórios)
9. Diferenciais: revenda, preço de clube, segurança e "Chegando em breve"
10. Planos, com troca mensal/anual feita em CSS (`:has()`), sem JavaScript
11. Perguntas frequentes: **são 5, e o Bernardo quer manter assim**
12. Chamada final com formulário: monta a mensagem e abre o WhatsApp, não guarda dados
13. Rodapé com "Desenvolvido por Splash Sistemas"

## Decisões de produto (já tomadas, não perguntar de novo)

- **Público**: qualquer negócio de comida (pizzaria, hamburgueria, açaí, lanchonete…), não só café e chocolate. A logo tem um grão de café no "o", mas o texto **não** fala de café.
- **Foco**: delivery e retirada primeiro, mesa por QR Code depois.
- **Visual**: base creme, seção do cardápio escura, quadro de pedidos claro. Paleta da marca:
  - chocolate `#22150F`, creme `#F5EEE6`, ferrugem `#B5541F`, laranja `#E08A3C`;
  - cardápio `#1b110e` com caramelo `#e8a75c`;
  - painel `#f7f3f0` com texto `#2a1a14`.
- **Tom de voz**: direto, próximo, sem jargão. Falar com o dono: "seu balcão", "seus números". Evitar "solução", "plataforma robusta", "revolucione".
- **Planos** (mensalidade por loja, sem comissão por pedido):
  - Essencial: R$ 99/mês, até 300 pedidos. A loja configura com ajuda.
  - Profissional: R$ 179/mês, até 1.000 pedidos, com revenda, preço de clube e relatórios completos. A equipe cadastra o cardápio.
  - Rede: R$ 149 por loja/mês, a partir de 2 lojas, pedidos ilimitados, várias lojas num painel.
  - Passou do limite: sobe de plano no mês seguinte, sem bloqueio e sem cobrança por pedido.
  - Lançamento: implantação grátis e 20% de desconto nos 3 primeiros meses, sem prazo na página.
  - Anual: paga 10 meses e usa 12.
  - Implantação depois do lançamento: R$ 149 (a loja faz) e R$ 390 (a equipe faz). Ainda não aparece na página.
- **Pode aparecer como "em breve"**: pagamento online, taxa e área de entrega, nota fiscal.
- **Não prometer**: integração com iFood, programa de pontos, app nas lojas da Apple e do Google.
- **Não citar** a Kaká o Show nem a Cacau Show (primeira cliente) até haver autorização.
- **Fidelidade/contrato mínimo**: não decidido. Não mencionar.
- **Medição**: nenhuma (sem Google Analytics, sem pixel), então não há banner de cookies. Se for adicionar, criar o banner junto.
- **CNPJ**: ainda não existe, então fica fora do rodapé e da política por enquanto.
- **Contato**: WhatsApp +55 51 8213-5882, de segunda a sexta, das 9h às 18h. O número tem 8 dígitos. Se precisar do 9 na frente, trocar em `src/config.ts`.

## O que o sistema faz e não faz

Na landing, só listar o que já existe.

**Não faz hoje**: pagamento online, nota fiscal, integração com iFood, cálculo de taxa e área de entrega, programa de pontos, app nas lojas.

**Diferenciais reais**:
- produto montado em etapas, uma pergunta por tela;
- impressora térmica comum de 80 mm;
- estoque que baixa a cada pedido e bloqueia quando acaba;
- cardápio de revenda com estoque separado;
- preço de clube;
- várias lojas num painel, com cópia do catálogo;
- importação por planilha (Excel ou CSV);
- preço sempre calculado no servidor.

## Pendências

**Decisões em aberto da central de ajuda (16/10/2026).** Pergunte ao Bernardo no início da próxima conversa, até ele decidir:
1. **"Lover"**: o preço de clube aparece como "Lover" (nome do clube da Cacau Show) em quase todos os prints e no glossário de `ajuda-insumos/tutoriais.md` ("Preço de clube (Lover)"). Tirar do glossário? Refazer os prints com outro rótulo na loja de teste?
2. **Relatórios**: o tutorial `admin-relatorios` diz que o dono da loja não vê Relatórios, mas a landing vende relatórios ao dono ("Seus números, sem planilha" e "Relatórios completos" no plano Profissional). Mudar o painel ou mudar a landing?
3. **Loja fechada**: o cliente vê "Loja não encontrada" quando a loja está fechada. Melhorar a mensagem no cardápio (ex.: "Loja fechada no momento")? É mudança no repositório do cardápio.

**Outras pendências:**

- Publicar na Vercel e apontar `prestio.com.br` e `www`.
- Imagem de compartilhamento (`public/og-prestio.png`) hoje é só a logo. Fazer uma de 1200×630.
- Trocar as telas desenhadas por prints reais do sistema.
- Revisão jurídica da Política de Privacidade e dos Termos.
- Definir se o desconto de lançamento vale também para o plano anual.

## Como trabalhar aqui

- Português do Brasil em todo o texto da página e nos commits.
- Depois de mudar algo, rodar `npm run build` e conferir a página no celular (375 px e 320 px): não pode haver rolagem lateral.
