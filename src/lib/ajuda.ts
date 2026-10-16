// Lê ajuda-insumos/tutoriais.md e transforma em dados para as páginas da central de ajuda.
// O texto é usado como está; aqui só se converte o Markdown simples para HTML.
import fonte from '../../ajuda-insumos/tutoriais.md?raw';
import type { ImageMetadata } from 'astro';

export type GrupoId = 'cliente' | 'equipe' | 'dono' | 'admin';

export const GRUPOS: { id: GrupoId; titulo: string; descricao: string }[] = [
  { id: 'cliente', titulo: 'Para o cliente', descricao: 'Quem pede pelo cardápio no celular.' },
  { id: 'equipe', titulo: 'Para a equipe', descricao: 'Quem atende os pedidos no painel.' },
  { id: 'dono', titulo: 'Para o dono da loja', descricao: 'Cardápio, estoque e configurações da loja.' },
  { id: 'admin', titulo: 'Administrador geral', descricao: 'Tarefas feitas pela equipe da Prestio.' },
];

const SECOES: Record<string, GrupoId | 'perguntas' | 'glossario'> = {
  'Para o cliente': 'cliente',
  'Para a equipe': 'equipe',
  'Para o dono da loja': 'dono',
  'Administrador geral (equipe Prestio)': 'admin',
  'Perguntas rápidas': 'perguntas',
  'Glossário': 'glossario',
};

export type Passo = { html: string; texto: string; print?: string };

export type Tutorial = {
  id: string;
  titulo: string;
  grupo: GrupoId;
  publico: string;
  ondeFica: string;
  precisaDe: string;
  passos: Passo[];
  resultado: Passo;
  atencao: string[];
};

export type Pergunta = { pergunta: string; resposta: string };
export type Termo = { termo: string; definicao: string };

// ---------- Markdown inline ----------

function escapar(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Código com mais de 40 caracteres (como o caminho do Chrome) vira bloco.
const LIMITE_BLOCO = 40;

export function inline(md: string): string {
  const partes = md.split(/(`[^`]+`)/g);
  let html = '';
  for (const parte of partes) {
    if (parte.startsWith('`') && parte.endsWith('`') && parte.length > 1) {
      const codigo = escapar(parte.slice(1, -1));
      html +=
        codigo.length > LIMITE_BLOCO ? `</p><pre><code>${codigo}</code></pre><p>` : `<code>${codigo}</code>`;
    } else {
      html += escapar(parte).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }
  }
  return `<p>${html}</p>`.replace(/<p>\s*<\/p>/g, '');
}

// Primeira letra maiúscula, para campos que no Markdown vêm depois de dois-pontos.
export function maiuscula(md: string): string {
  return md.replace(/^(\*\*|`)?(\p{Ll})/u, (_, marca = '', letra) => marca + letra.toUpperCase());
}

export function textoPuro(md: string): string {
  return md.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').trim();
}

const RE_PRINT = /\s*\(print:\s*([^)]+\.png)\)\s*$/;

function passo(md: string): Passo {
  const m = md.match(RE_PRINT);
  const texto = m ? md.replace(RE_PRINT, '') : md;
  return { html: inline(texto), texto: textoPuro(texto), print: m?.[1].trim() };
}

// ---------- Leitura do arquivo ----------

function ler() {
  const tutoriais: Tutorial[] = [];
  const perguntas: Pergunta[] = [];
  const glossario: Termo[] = [];

  const linhas = fonte.replace(/\r\n/g, '\n').split('\n');
  let secao: (typeof SECOES)[string] | undefined;
  let atual: Tutorial | undefined;
  let campo: 'passos' | 'atencao' | undefined;
  let perguntaAberta: string | undefined;

  const fechar = () => {
    if (atual) tutoriais.push(atual);
    atual = undefined;
    campo = undefined;
  };

  for (const bruta of linhas) {
    const linha = bruta.trim();

    const h2 = linha.match(/^## (.+)$/);
    if (h2) {
      fechar();
      secao = SECOES[h2[1].trim()];
      continue;
    }

    if (secao === 'perguntas') {
      const q = linha.match(/^\*\*(.+)\*\*$/);
      if (q) perguntaAberta = q[1];
      else if (linha && perguntaAberta) {
        perguntas.push({ pergunta: perguntaAberta, resposta: linha });
        perguntaAberta = undefined;
      }
      continue;
    }

    if (secao === 'glossario') {
      const t = linha.match(/^- \*\*(.+?)\*\*:\s*(.+)$/);
      if (t) glossario.push({ termo: t[1], definicao: t[2] });
      continue;
    }

    const h3 = linha.match(/^### \[([a-z0-9-]+)\] (.+)$/);
    if (h3 && secao) {
      fechar();
      atual = {
        id: h3[1],
        titulo: h3[2].trim(),
        grupo: secao as GrupoId,
        publico: '',
        ondeFica: '',
        precisaDe: '',
        passos: [],
        resultado: { html: '', texto: '' },
        atencao: [],
      };
      continue;
    }
    if (!atual) continue;

    let m: RegExpMatchArray | null;
    if ((m = linha.match(/^\*\*Público:\*\*\s*(.+)$/))) atual.publico = maiuscula(m[1]);
    else if ((m = linha.match(/^\*\*Onde fica:\*\*\s*(.+)$/))) atual.ondeFica = maiuscula(m[1]);
    else if ((m = linha.match(/^\*\*Precisa de:\*\*\s*(.+)$/))) atual.precisaDe = maiuscula(m[1]);
    else if (linha === '**Passos:**') campo = 'passos';
    else if ((m = linha.match(/^\*\*Resultado:\*\*\s*(.+)$/))) {
      atual.resultado = passo(maiuscula(m[1]));
      campo = undefined;
    } else if ((m = linha.match(/^\*\*Atenção:\*\*\s*(.*)$/))) {
      campo = 'atencao';
      if (m[1]) atual.atencao.push(maiuscula(m[1]));
    } else if (campo === 'passos' && (m = linha.match(/^\d+\.\s+(.+)$/))) atual.passos.push(passo(m[1]));
    else if (campo === 'atencao' && (m = linha.match(/^-\s+(.+)$/))) atual.atencao.push(maiuscula(m[1]));
    // Outras linhas (como "Sem print: ...") são notas de produção e ficam de fora.
  }
  fechar();

  return { tutoriais, perguntas, glossario };
}

export const { tutoriais: TUTORIAIS, perguntas: PERGUNTAS, glossario: GLOSSARIO } = ler();

// ---------- Imagens ----------

const IMAGENS = import.meta.glob<ImageMetadata>('../../ajuda-insumos/prints/*.png', {
  eager: true,
  import: 'default',
});

export function imagem(nome: string): ImageMetadata {
  const img = IMAGENS[`../../ajuda-insumos/prints/${nome}`];
  if (!img) throw new Error(`Print não encontrado: ${nome}`);
  return img;
}

export function ehCelular(img: ImageMetadata) {
  return img.height > img.width;
}

// Confere na hora do build que nada se perdeu na leitura.
for (const t of TUTORIAIS) {
  if (!t.passos.length || !t.resultado.texto) throw new Error(`Tutorial incompleto: ${t.id}`);
  for (const p of [...t.passos, t.resultado]) if (p.print) imagem(p.print);
}

export function primeiraFrase(texto: string) {
  const m = texto.match(/^.+?[.!?](?=\s|$)/);
  return (m ? m[0] : texto).trim();
}

export function vizinhos(t: Tutorial) {
  const doGrupo = TUTORIAIS.filter((x) => x.grupo === t.grupo);
  const i = doGrupo.findIndex((x) => x.id === t.id);
  return { anterior: doGrupo[i - 1], proximo: doGrupo[i + 1] };
}

export function grupo(id: GrupoId) {
  return GRUPOS.find((g) => g.id === id)!;
}
