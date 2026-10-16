# Funções da Prestio

Levantamento feito no código dos dois sistemas (`cacau-cardapio` e `painel-adm-cacau`) em 16/10/2026, conferido tela a tela no staging com a loja de teste Brasa Burger.

Status:
- **ok**: funciona como esperado.
- **incompleta**: existe, mas falta uma parte ou depende de algo fora do sistema.
- **com bug**: existe e tem um defeito conhecido.

A coluna "Tutorial" aponta o id em `tutoriais.md`. Um traço (—) quer dizer que não há tutorial, e o motivo está nas observações.

## Cliente (cardápio no celular, sem login)

| Função | Onde fica | Status | Tutorial | Observações |
|---|---|---|---|---|
| Escolher como pedir: na mesa, para levar, para entregar | Entrada da loja (`/<loja>`) | ok | cliente-pedir-para-levar-ou-entregar | Só aparecem os canais que a loja deixou ligados |
| Pedir na mesa pelo QR Code | `/<loja>/mesa/<número>` | ok | cliente-pedir-na-mesa | O pedido entra sozinho na conta da mesa |
| Ver produtos por categoria, com foto, descrição e preço | Cardápio | com bug | cliente-pedir-na-mesa | **Comportamento estranho**: o nome do produto aparece só com a primeira letra maiúscula ("Brasa clássico" em vez de "Brasa Clássico"), mesmo quando foi cadastrado de outro jeito |
| Ver o preço de clube ao lado do preço normal | Cardápio, produto, sacola | ok | cliente-preco-de-clube | |
| Montar o produto em etapas (variações, adicionais, quantidade, observação) | Janela do produto | ok | cliente-escolher-opcoes | Uma pergunta por tela |
| Comprar combo ou produto em promoção pelo carrossel | Topo do cardápio | com bug | cliente-promocao-combo | **Bug (backlog)**: a janela do combo não limita a quantidade ao estoque disponível; o pedido só é recusado ao confirmar |
| Sacola: mudar quantidade, remover item | Botão "Ver sacola" | ok | cliente-pedir-na-mesa | |
| Retirar no local ou receber em casa, com endereço | Etapa "Seus dados" | ok | cliente-pedir-para-levar-ou-entregar | Não calcula taxa nem área de entrega |
| Revisar e confirmar o pedido | Etapa "Revisão" | com bug | cliente-pedir-na-mesa | **Bug (backlog)**: a observação do item não aparece na revisão (ela vai para a loja normalmente) |
| Acompanhar o pedido (linha do tempo que se atualiza sozinha) | Depois de confirmar | ok | cliente-acompanhar-pedido | |
| Mandar o pedido de entrega pelo WhatsApp da loja | Tela do pedido enviado | ok | cliente-whatsapp-entrega | A mensagem pronta traz o total normal e o total com preço de clube |
| Meus pedidos pelo CPF (Hoje e Histórico) | "Ver meus pedidos" | ok | cliente-meus-pedidos | Quem souber o CPF vê os pedidos (risco aceito, sem endereço) |
| Cardápio de revenda | `/<loja>/revendedor` | com bug | cliente-revenda | **Bug (backlog)**: recarregar a página (F5) no cardápio de revenda volta para o cardápio comum. O endereço antigo `/atacado` redireciona |
| Pagar online | — | não existe | — | Pagamento combinado direto com a loja |
| Conta de cliente com senha | — | não existe | — | Decisão: cliente se identifica por nome, CPF e telefone |

## Equipe (painel, quadro de pedidos)

| Função | Onde fica | Status | Tutorial | Observações |
|---|---|---|---|---|
| Entrar no painel com e-mail e senha | Tela de entrar | ok | equipe-entrar-no-painel | Não há "esqueci minha senha": a tela orienta pedir a senha nova para o administrador |
| Quadro de pedidos de hoje em tempo real (Novos, Em preparo, Prontos, Entregues, Finalizados) | Pedidos | ok | equipe-quadro-de-pedidos | Atualiza sozinho; aviso quando a conexão cai |
| Aviso de pedido novo (som e notificação na tela) | Configurações > Aviso de pedido novo | ok | equipe-aviso-de-pedido-novo | Liga e desliga por loja, neste computador |
| Ver detalhes do pedido | "Detalhes" no card | ok | equipe-detalhes-do-pedido | |
| Chamar o cliente no WhatsApp | "Chamar no WhatsApp" no card | ok | equipe-detalhes-do-pedido | Só aparece quando o cliente informou telefone |
| Editar itens antes de aceitar | "Editar" no card (só em Novos) | ok | equipe-editar-itens | O pedido nunca fica vazio; para tirar tudo, cancele |
| Aceitar pedido escolhendo quem prepara | "Aceitar pedido" | ok | equipe-aceitar-pedido | Obrigatório escolher um atendente |
| Imprimir o cupom ao aceitar | Automático ao aceitar | incompleta | equipe-imprimir-cupom | Usa a impressão do navegador; para não abrir a janela de impressão precisa de um atalho do Chrome feito à mão em cada computador. Sem reimpressão pela tela |
| Avançar etapa | Botão principal do card | ok | equipe-avancar-etapa | O texto do botão diz o que acontece ("Pronto pra retirada", "Entregue", "Finalizar") |
| Voltar etapa | "Voltar etapa" | ok | equipe-voltar-etapa | Não volta pedido finalizado |
| Cancelar com motivo | "Cancelar" (só em Novos) | ok | equipe-cancelar-pedido | Motivo obrigatório |
| Finalizar perguntando o preço de clube | "Finalizar" | ok | equipe-finalizar-pedido | Pergunta "Cliente é do clube?". O texto antigo, com o nome da primeira cliente, foi trocado em 16/10/2026; a troca ainda não está em produção |
| Conta da mesa: pedidos da mesma mesa juntos, "Finalizar mesa" e "Fechar mesa" | Coluna Entregues e faixa "Mesas abertas" | ok | equipe-conta-da-mesa | Fechar a mesa é manual |
| Histórico de pedidos (qualquer dia e status) | Histórico | ok | equipe-historico | |
| Usar o painel no celular | Qualquer tela | ok | equipe-quadro-no-celular | |
| Instalar o painel como aplicativo | Navegador | incompleta | — | Tem ícone e manifesto, mas não foi testado de ponta a ponta e não dá para fotografar a janela do navegador com o Playwright |
| Confirmar pagamento | — | não existe | — | "Finalizado" é só uma marcação da equipe; o sistema não confere pagamento |

## Dono da loja (painel)

| Função | Onde fica | Status | Tutorial | Observações |
|---|---|---|---|---|
| Cadastrar produto (código, nome, descrição, preços, categoria, onde aparece, foto) | Produtos > Novo produto | com bug | dono-cadastrar-produto | **Comportamento estranho**: produto novo já vem com "Controlar estoque desse item" marcado e estoque 0, então aparece esgotado até alguém mudar |
| Editar produto | Produtos > lápis | ok | dono-cadastrar-produto | |
| Pausar produto (tirar do cardápio sem apagar) | Desmarcar "Produto ativo" | ok | dono-pausar-produto | |
| Excluir produto | Produtos > lixeira | ok | dono-excluir-produto | |
| Filtrar produtos incompletos | Produtos | ok | dono-importar-planilha | Produto sem foto, categoria ou descrição ganha o selo "Incompleto" |
| Variações e adicionais de cada produto | Janela do produto | ok | dono-opcoes-do-produto | |
| Categorias | Produtos > Categorias | ok | dono-categorias | |
| Grupos de adicionais | Produtos > Adicionais | ok | dono-adicionais | Adicional sempre soma ao preço |
| Grupos de variações (substitui ou soma ao preço) | Produtos > Variações | ok | dono-variacoes | Variação é obrigatória: o cliente escolhe uma por grupo |
| Organizar a ordem do cardápio (arrastar) | Produtos > Organizar cardápio | ok | dono-organizar-cardapio | |
| Importar planilha (Excel ou CSV) com conferência antes de gravar | Produtos > Importar planilha | ok | dono-importar-planilha | Célula vazia não apaga o que já está preenchido. Foto não vem pela planilha |
| Exportar planilha de produtos | Produtos > Mais ações | ok | dono-exportar-planilha | |
| Estoque do varejo (baixa a cada pedido, bloqueia quando acaba) | Janela do produto | ok | dono-estoque-do-varejo | |
| Estoque e pedidos da revenda | Revendedores | ok | dono-estoque-da-revenda | Só aparece se a revenda estiver ligada |
| Promoções: carrossel, combo e desconto | Promoções | ok | dono-promocoes-e-combos | |
| Atendentes (quem prepara) | Atendentes | ok | dono-atendentes | |
| Dados da loja (nome, WhatsApp) | Configurações > Loja | ok | dono-dados-da-loja | Máscara do WhatsApp: +55 (51) 9 9999-9999 |
| Abrir o cardápio e a revenda | Configurações, botões no topo | ok | dono-abrir-cardapio | |
| Ligar e desligar canais (Cafeteria, Retirada no balcão, Entrega, Revenda) | Configurações > Como o cliente pede | com bug | dono-canais-de-pedido | **Comportamento estranho**: o canal de mesa se chama "Cafeteria" para qualquer negócio, e a entrada do cardápio mostra "Pedir na cafeteria" mesmo numa hamburgueria |
| QR Codes das mesas | Configurações > Mesas e QR Code | ok | dono-qr-codes-das-mesas | Gera uma folha para imprimir em papel comum |
| Fechar e reabrir a loja | Configurações > Fechar ou excluir | incompleta | dono-fechar-a-loja | Com a loja fechada, o cardápio mostra "Loja não encontrada", sem aviso de "fechado agora" |
| Horário de funcionamento | — | não existe | — | Não há horário automático; abrir e fechar é manual |
| Foto ou logo da loja | — | não existe | — | O cardápio mostra o nome da loja, sem imagem |
| Relatórios | — | incompleta | admin-relatorios | **Comportamento estranho**: o dono da loja não vê Relatórios; só o administrador geral |

## Administrador geral (Prestio)

| Função | Onde fica | Status | Tutorial | Observações |
|---|---|---|---|---|
| Relatórios (faturamento, ticket médio, canais, horários, tempo de preparo, clientes novos e recorrentes) | Relatórios | ok | admin-relatorios | Só pedido finalizado conta como dinheiro |
| Exportar relatório em Excel | Relatórios > Exportar planilha | ok | admin-relatorios | |
| Usuários (criar, editar, desativar, excluir) | Usuários | ok | admin-usuarios | Excluir é bloqueado se o usuário já mexeu em pedido; aí desativa |
| Várias lojas: trocar a unidade | Rodapé do menu > Unidade | ok | admin-varias-lojas | |
| Copiar catálogo de outra loja | Produtos > Mais ações > Copiar catálogo | ok | admin-copiar-catalogo | Estoque chega desligado na loja de destino |
| Criar loja | Rodapé do menu > Unidade > Criar loja | ok | admin-criar-loja | |
| Excluir loja | Configurações > Fechar ou excluir | ok | — | Só funciona com a loja vazia. Sem print, para não apagar nada |
| Criar o primeiro administrador | `/cadastro` | ok | — | Só funciona uma vez por sistema. Uso interno, fica fora da central |

## Não existe hoje (não entra na central)

Pagamento online, nota fiscal, taxa e área de entrega, horário automático, foto da loja, reimpressão de cupom, troca de senha pelo próprio usuário, integração com iFood, programa de pontos, app nas lojas da Apple e do Google.
