# prestio-lp

Landing page da Prestio (prestio.com.br), feita em [Astro](https://astro.build) e publicada na Vercel.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```

## Onde mexer

- `src/config.ts`: WhatsApp, horário de atendimento, planos, preços e condição de lançamento.
- `src/pages/index.astro`: conteúdo da página principal (seções, dores, perguntas frequentes).
- `src/pages/privacidade.astro` e `src/pages/termos.astro`: documentos legais.
- `src/components/`: telas de exemplo do cardápio, do quadro de pedidos e dos relatórios.
- `public/marca/`: logos.

O formulário de contato não tem servidor: ele monta a mensagem e abre o WhatsApp.
O `vercel.json` redireciona `www.prestio.com.br` para `prestio.com.br`.
