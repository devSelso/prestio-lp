# Insumos da central de ajuda

Material para montar `prestio.com.br/ajuda`.

| Arquivo | O que tem |
|---|---|
| `tutoriais.md` | 47 tutoriais (cliente, equipe, dono e administrador geral), 22 perguntas rápidas e o glossário |
| `funcoes.md` | Todas as funções do sistema por público, com status (ok, incompleta, com bug) e observações |
| `prints/` | 96 telas em PNG, nomeadas `[id-do-tutorial]-[passo]-[descricao].png` |
| `prints-manifest.json` | Lista das telas com tutorial, passo, descrição e tamanho de tela de cada uma |

## Como os prints foram gerados

Por um roteiro do Playwright no projeto do painel (`painel-adm-cacau`):

- `playwright.ajuda.config.ts`: configuração separada dos testes E2E.
- `e2e/ajuda/brasa-seed.ts`: cria e mantém a loja de teste.
- `e2e/ajuda/shot.ts`: tira o print, destaca o elemento clicado e grava o manifesto.
- `e2e/ajuda/00-preparar.prints.ts`, `10-cliente`, `20-equipe`, `30-dono`, `40-admin`: um arquivo por público.

Para gerar de novo, rode na pasta do painel:

```bash
pnpm prints:ajuda
```

A rodada leva cerca de 4 minutos e sobrescreve os PNGs e o manifesto.

### Só no staging

A configuração sobe o painel (porta 5180) e o cardápio (porta 5181) com `--mode staging`. Ela se recusa a rodar se:
- o `.env.staging.local` do painel faltar;
- ele apontar para o mesmo Supabase da produção;
- o `.env.staging.local` do cardápio apontar para outro banco.

Nada é criado, editado ou apagado na produção.

### Variáveis no `.env.staging.local` do painel (não vão para o Git)

- `E2E_SUPER_EMAIL` e `E2E_SUPER_PASSWORD`: administrador geral do staging, usado para criar as contas abaixo.
- `AJUDA_DONO_EMAIL` e `AJUDA_DONO_PASSWORD`: dona da Brasa Burger (usuária da loja).
- `AJUDA_ADMIN_EMAIL` e `AJUDA_ADMIN_PASSWORD`: administrador geral "Suporte Prestio".

As contas são criadas sozinhas na primeira rodada, com e-mails de domínio `.teste`.

### Loja de teste: Brasa Burger

Hamburgueria fictícia, slug `brasa-burger`, com todos os canais e a revenda ligados. O seed não duplica nada quando roda de novo. Ele garante:

- **Catálogo:**
  - 5 categorias;
  - 15 produtos com foto (desenhos gerados na hora), um deles pausado e dois só de revenda;
  - variações "Ponto da carne" e "Tamanho";
  - adicionais "Turbine seu burger" e "Molhos";
  - promoções "Combo Brasa" e "Terça do Bacon".
- **Atendentes:** 3.
- **Pedidos:**
  - 42 pedidos nos últimos 14 dias, alguns com preço de clube e alguns cancelados, para os relatórios terem números;
  - pedidos de hoje em todas as colunas do quadro.
- **Estoque:** reposto antes e depois de criar pedidos, para nenhum produto aparecer esgotado sem querer.

Nomes, CPFs e telefones são inventados. Os CPFs são válidos só no formato. Nenhum dado de cliente real nem de loja real.

### O que cada rodada cria no staging

- Pedidos novos para os tutoriais da equipe (aceitar, cancelar, voltar etapa, finalizar e dois da mesa 9), e os pedidos feitos pelo cardápio nos tutoriais do cliente.
- O produto "Brasa Picante" (B09): criado e excluído na mesma rodada.
- A importação de planilha atualiza os produtos B10, D05 e A04 (na primeira vez, cria).
- O administrador geral só abre janelas: nada é gravado em usuários, lojas ou cópia de catálogo.

### Padrão das telas

- Celular 390×844 e computador 1440×900, as duas em densidade 2x (o arquivo sai com o dobro de pixels).
- O cardápio é sempre no celular. O painel é no computador, e o quadro da equipe também no celular.
- O elemento clicado ganha um contorno de 3 px na cor `#B5541F`.
- Sem barra de endereço, sem login visível e sem token.
- O aviso de "ativar notificações" do navegador é escondido, para não poluir as telas.

### Cuidados

- As telas já usam "Cliente é do clube?" (antes o texto tinha o nome da primeira cliente). Essa troca está no código local e ainda precisa subir para produção.
- Os horários ("há 24 min") e a data no topo do quadro são do dia em que a rodada foi feita.
