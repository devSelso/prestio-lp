// Dados que mudam com frequência ficam aqui, num lugar só.

export const SITE = {
  url: 'https://prestio.com.br',
  nome: 'Prestio',
  titulo: 'Prestio · Cardápio digital e painel de pedidos para delivery, retirada e mesa',
  descricao:
    'Cardápio digital para delivery, retirada e pedido por QR Code na mesa. O pedido chega no painel, sai impresso na cozinha e baixa o estoque. Sem comissão por pedido.',
};

// Número no formato internacional, só dígitos (usado no link wa.me).
export const WHATSAPP = {
  numero: '555182135882',
  exibicao: '(51) 8213-5882',
  horario: 'segunda a sexta, das 9h às 18h',
};

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(mensagem)}`;
}

export const MSG_DEMO = 'Olá! Quero ver a Prestio funcionando na minha loja.';

// Condição de lançamento: implantação grátis e 20% nos 3 primeiros meses.
export const LANCAMENTO = { ativo: true, desconto: 0.2, meses: 3 };

export type Plano = {
  id: string;
  nome: string;
  publico: string;
  mensal: number;
  anual: number;
  sufixo: string;
  pedidos: string;
  destaque?: boolean;
  itens: string[];
  implantacao: string;
};

export const PLANOS: Plano[] = [
  {
    id: 'essencial',
    nome: 'Essencial',
    publico: 'Para começar a receber pedidos pelo seu canal',
    mensal: 99,
    anual: 990,
    sufixo: '/mês',
    pedidos: 'Até 300 pedidos por mês',
    itens: [
      'Delivery, retirada e mesa por QR Code',
      'Quadro de pedidos com aviso sonoro',
      'Impressão na impressora térmica',
      'Estoque que baixa a cada pedido',
      'Promoções e combos',
      'Relatórios de vendas',
    ],
    implantacao: 'Você configura com a nossa ajuda',
  },
  {
    id: 'profissional',
    nome: 'Profissional',
    publico: 'Para quem vende todo dia e quer os números na mão',
    mensal: 179,
    anual: 1790,
    sufixo: '/mês',
    pedidos: 'Até 1.000 pedidos por mês',
    destaque: true,
    itens: [
      'Tudo do Essencial',
      'Relatórios completos com exportação para Excel',
      'Cardápio de revenda com estoque separado',
      'Preço de clube para clientes fiéis',
      'Ranking de atendentes e horários de pico',
    ],
    implantacao: 'A gente cadastra seu cardápio pela planilha',
  },
  {
    id: 'rede',
    nome: 'Rede',
    publico: 'Para franqueados e donos de mais de uma loja',
    mensal: 149,
    anual: 1490,
    sufixo: '/mês por loja',
    pedidos: 'Pedidos ilimitados · a partir de 2 lojas',
    itens: [
      'Tudo do Profissional',
      'Todas as lojas num painel só',
      'Cópia do cardápio de uma loja para outra',
      'Relatórios por unidade',
    ],
    implantacao: 'A gente cadastra e configura todas as lojas',
  },
];

export function brl(valor: number) {
  const inteiro = Number.isInteger(valor);
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
