import type { Term } from './types'

export const terms: Term[] = [
  {
    id: 'fluxo-erp-sped-pva',
    name: 'Fluxo ERP → SPED → PVA',
    category: 'visao-geral',
    short:
      'O caminho que o dado fiscal percorre: nasce no ERP, vira arquivo do SPED e é validado no PVA antes de chegar ao Fisco.',
    definition:
      'Se você está começando em fiscal, entenda primeiro esse fluxo — o resto do dicionário faz mais sentido depois. Tudo começa com um lançamento no ERP: uma venda, uma compra, uma movimentação de estoque, uma produção. Periodicamente (quase sempre por mês), o ERP junta todos esses lançamentos e monta um arquivo de texto seguindo um leiaute oficial: é o arquivo do SPED. Esse arquivo é aberto no PVA (Programa Validador e Assinador) ou no Sped Web, que confere se a estrutura está correta, permite assinar digitalmente e transmite tudo à Receita/Sefaz. Do outro lado, o Fisco cruza esses dados com as notas fiscais eletrônicas que ele já recebeu de outras fontes — por isso divergência entre o que o ERP "acha" que aconteceu e o que foi de fato transmitido nas notas costuma gerar autuação.',
    whereInErp:
      "Normalmente existe um módulo próprio chamado algo como 'Obrigações Acessórias' ou 'Geração de SPED', que lê as tabelas fiscais (notas, itens, estoque, apuração) e monta o arquivo no leiaute vigente para o período selecionado.",
    example:
      'Uma empresa fecha o mês de março. O ERP gera o arquivo do SPED Fiscal referente a março, contendo todas as notas emitidas/recebidas naquele mês. Esse arquivo é aberto no PVA, validado, assinado com o certificado digital da empresa e transmitido até o prazo legal (geralmente dia 25 do mês seguinte).',
    relatedRecords: ['0000', '9999'],
    commonErrors: [
      'Gerar o arquivo sem reprocessar a apuração do período, resultando em blocos de apuração desatualizados.',
      'Não validar o arquivo no PVA antes de transmitir, descobrindo erros de leiaute só na rejeição.',
    ],
    keywords: ['fluxo fiscal', 'obrigação acessória', 'transmissão', 'sefaz', 'receita federal', 'geração do sped'],
  },
  {
    id: 'sped-fiscal-efd',
    name: 'SPED Fiscal / EFD ICMS IPI',
    aliases: ['EFD', 'Escrituração Fiscal Digital'],
    category: 'sped-fiscal',
    short:
      'Arquivo digital mensal que substitui os antigos livros fiscais de papel (entradas, saídas, apuração e inventário).',
    definition:
      'Pense no SPED Fiscal como a versão digital dos livros fiscais que antigamente eram preenchidos à mão ou impressos: Livro de Entradas, Livro de Saídas, Livro de Apuração do ICMS/IPI e Livro de Inventário. Ele é entregue mensalmente e é organizado em "blocos" (identificados por letras: C, E, H, K, entre outros), cada um cobrindo um tipo de informação — documentos fiscais, apuração de impostos, inventário, produção industrial. Para quem desenvolve ERP, o SPED é basicamente um grande "export" estruturado das tabelas fiscais do sistema.',
    whereInErp:
      'É o arquivo final gerado por um módulo fiscal a partir de várias tabelas do ERP: notas fiscais, itens de nota, movimentações de estoque e apuração de tributos do período.',
    example:
      'Um analista fiscal, todo início de mês, roda a rotina "Gerar SPED Fiscal" no ERP informando o mês/ano de referência. O sistema busca todas as notas, calcula a apuração do período e gera um único arquivo .txt pronto para ser validado no PVA.',
    relatedRecords: ['0000', 'C100', 'E100'],
    commonErrors: [
      'Divergência entre o total apurado no Bloco E e o somatório dos documentos do Bloco C.',
      'Esquecer de atualizar tabelas de códigos (produtos, participantes) antes de gerar o arquivo, gerando registros incompletos.',
    ],
    keywords: ['efd icms ipi', 'escrituração fiscal digital', 'livro fiscal digital', 'blocos do sped'],
  },
  {
    id: 'pva',
    name: 'PVA',
    aliases: ['Programa Validador e Assinador'],
    category: 'sped-fiscal',
    short:
      'Programa oficial que valida a estrutura do arquivo do SPED, permite assiná-lo digitalmente e transmiti-lo ao Fisco.',
    definition:
      'O PVA é a ferramenta (hoje em transição para o Sped Web, sua versão online) que recebe o arquivo de texto gerado pelo ERP e confere, registro por registro, se ele segue o leiaute oficial vigente: campos obrigatórios preenchidos, totais batendo, referências entre registros corretas. Se tudo estiver certo, o próprio PVA permite assinar digitalmente o arquivo (com certificado digital da empresa) e transmiti-lo. Pense nele como o "corretor de provas" que roda antes de qualquer coisa chegar ao Fisco.',
    whereInErp:
      'Fica fora do ERP — é uma ferramenta separada, mantida pelo Fisco. O ERP só precisa gerar corretamente o arquivo .txt no leiaute esperado. Muitos ERPs oferecem uma "pré-validação" interna, mas ela não substitui a validação oficial do PVA.',
    example:
      'Depois de gerar o arquivo do SPED no ERP, o analista abre o PVA, importa o arquivo e clica em "Validar". O programa aponta, por exemplo, que o registro C170 de uma nota está com CFOP inválido para o CST informado — o analista corrige no ERP e gera o arquivo novamente.',
    commonErrors: [
      'Gerar o arquivo com encoding ou separador de campos incorreto, causando rejeição logo na abertura do PVA.',
      'Ignorar avisos (não bloqueantes) do PVA que indicam inconsistências que o Fisco pode questionar depois.',
    ],
    keywords: ['validador', 'assinador', 'sped web', 'certificado digital', 'transmissão do sped'],
  },
  {
    id: 'cfop',
    name: 'CFOP',
    aliases: ['Código Fiscal de Operações e Prestações'],
    category: 'documentos-fiscais',
    short:
      'Código de 4 dígitos que diz "o que" é a operação: venda, compra, devolução, transferência entre filiais, etc.',
    definition:
      'O CFOP responde a uma pergunta simples: qual é a natureza desta operação? É um código numérico de 4 dígitos em que o primeiro dígito já entrega bastante informação — indica se é uma entrada ou saída, e se a operação é dentro do mesmo estado, entre estados diferentes (interestadual) ou envolve o exterior (importação/exportação). Os demais dígitos detalham o tipo específico: venda de produção própria, venda de mercadoria adquirida de terceiros, devolução, remessa para industrialização, transferência entre filiais, e por aí vai.',
    whereInErp:
      'Costuma ser definido pela "regra fiscal" associada ao tipo de operação de venda/compra, e é replicado no item da nota fiscal — normalmente combinando o cadastro do produto com o cadastro do cliente/fornecedor (mesmo estado ou não, por exemplo).',
    example:
      'Uma empresa em São Paulo vende um produto para um cliente no Rio de Janeiro. Como é uma venda de produção própria para outro estado, o CFOP correto é 6.101 (venda de produção do estabelecimento, para fora do estado). Se a venda fosse para um cliente também em São Paulo, o CFOP seria 5.101.',
    relatedRecords: ['C170', 'C190'],
    commonErrors: [
      'Usar um CFOP de venda dentro do estado (5.xxx) em uma operação interestadual (que deveria usar 6.xxx), ou o contrário.',
      'Não distinguir o CFOP de devolução do CFOP da operação original, o que quebra o crédito/débito do imposto na apuração.',
    ],
    keywords: ['código fiscal de operação', 'natureza da operação', 'venda', 'compra', 'devolução', 'transferência'],
  },
  {
    id: 'cst',
    name: 'CST',
    aliases: ['Código de Situação Tributária'],
    category: 'tributos',
    short:
      'Código que diz "como" o imposto incide sobre aquele item: tributado, isento, com substituição tributária, etc.',
    definition:
      'Enquanto o CFOP diz o que é a operação, o CST diz como o imposto se comporta ali: se é tributado normalmente, se tem redução de base de cálculo, se está isento, se tem substituição tributária (o imposto já foi recolhido antes, por outro elo da cadeia), e assim por diante. Cada tributo tem sua própria tabela de CST — existe CST de ICMS, CST de IPI e CST de PIS/COFINS, e eles não precisam ser iguais entre si para o mesmo item.',
    whereInErp:
      'Fica associado ao cadastro do produto combinado com a regra fiscal da operação — juntos formam a "situação tributária" que a engine de cálculo usa para decidir a fórmula de cada imposto.',
    example:
      'Um produto sujeito à substituição tributária de ICMS recebe o CST 060 (ICMS cobrado anteriormente por substituição tributária). Isso sinaliza ao sistema que o ICMS daquele item não deve ser calculado de novo na venda, porque já foi recolhido lá atrás na cadeia.',
    commonErrors: [
      'Aplicar CST de empresa no regime normal em operações de empresas do Simples Nacional, que deveriam usar CSOSN.',
      'Deixar CST de ICMS e de PIS/COFINS desalinhados entre si para o mesmo item, gerando cálculo incoerente.',
    ],
    keywords: ['situação tributária', 'tributação do icms', 'substituição tributária', 'isenção'],
  },
  {
    id: 'csosn',
    name: 'CSOSN',
    aliases: ['Código de Situação da Operação no Simples Nacional'],
    category: 'tributos',
    short:
      'Versão do CST usada por empresas do Simples Nacional — troque um pelo outro conforme o regime do emitente.',
    definition:
      'Empresas optantes pelo Simples Nacional não usam a tabela de CST de ICMS: em seu lugar, usam o CSOSN, que descreve a situação da operação sob a ótica do regime simplificado — se permite ou não crédito de ICMS ao comprador, se há substituição tributária, se é imune, etc. É um erro comum de quem está começando confundir os dois: eles não coexistem no mesmo item, é um ou outro, dependendo do regime tributário do emitente da nota.',
    whereInErp:
      'Definido no cadastro fiscal do item/operação sempre que o emitente está configurado no sistema como optante do Simples Nacional.',
    example:
      'Uma microempresa optante pelo Simples Nacional vende uma mercadoria e não permite que o comprador aproveite crédito de ICMS. O CSOSN usado é o 102 (tributada pelo Simples Nacional sem permissão de crédito).',
    commonErrors: [
      'Manter CST em vez de CSOSN depois que a empresa migra para o Simples Nacional (ou o inverso, ao sair do regime).',
      'Escolher um CSOSN que não reflete se o item permite ou não crédito de ICMS ao destinatário.',
    ],
    keywords: ['simples nacional', 'situação tributária simples', 'micro empresa', 'me epp'],
  },
  {
    id: 'ncm',
    name: 'NCM',
    aliases: ['Nomenclatura Comum do Mercosul'],
    category: 'documentos-fiscais',
    short:
      'Código de 8 dígitos que classifica o tipo de produto — é a partir dele que se descobre a alíquota de IPI e outras regras.',
    definition:
      'O NCM é como um "CEP do produto": um código de 8 dígitos que classifica a mercadoria dentro de um padrão adotado pelos países do Mercosul. Não é o ERP que inventa esse código — ele vem de uma tabela oficial e cada tipo de produto (de parafusos a notebooks) tem o seu. A partir do NCM é que se descobre a alíquota de IPI aplicável, regras de substituição tributária por estado, benefícios fiscais e até exigências de outros órgãos (Anvisa, Inmetro, etc.).',
    whereInErp:
      'Cadastrado diretamente no produto e usado como chave de consulta em tabelas de alíquota e regras de tributação por estado — por isso manter o cadastro de NCM correto e atualizado é crítico.',
    example:
      'Um notebook é classificado no NCM 8471.30.12. É esse código que o ERP usa para buscar a alíquota de IPI aplicável e verificar se existe alguma regra especial de ICMS-ST para "produtos de informática" no estado de destino.',
    commonErrors: [
      'Classificar o produto com um NCM genérico ou desatualizado, aplicando alíquota de IPI incorreta.',
      'Não atualizar o NCM após mudanças na tabela oficial, gerando divergência entre o cadastro e a nota fiscal eletrônica.',
    ],
    keywords: ['classificação fiscal', 'nomenclatura comum do mercosul', 'código do produto', 'tabela tipi'],
  },
  {
    id: 'icms',
    name: 'ICMS',
    aliases: ['Imposto sobre Circulação de Mercadorias e Serviços'],
    category: 'tributos',
    short:
      'Principal imposto estadual sobre venda de mercadorias — cada estado define sua própria alíquota.',
    definition:
      'O ICMS incide sobre a circulação de mercadorias e sobre alguns serviços específicos (transporte intermunicipal/interestadual e comunicação). É um imposto estadual (não federal), o que significa que cada estado tem autonomia para definir suas próprias alíquotas e regras — por isso a mesma operação pode ter tratamento tributário diferente dependendo do estado de origem e destino. Ele também é "não cumulativo": a empresa se credita do ICMS pago na compra e debita o ICMS devido na venda, recolhendo apenas a diferença.',
    whereInErp:
      'Calculado pela engine fiscal do ERP a partir da combinação de CFOP + CST/CSOSN + NCM + alíquota (que varia se a operação é interna ao estado ou interestadual), e depois consolidado na apuração do Bloco E do SPED Fiscal.',
    example:
      'Uma venda interna em São Paulo pode ter alíquota de ICMS de 18%, enquanto a mesma mercadoria vendida para o Paraná pode ter alíquota interestadual de 12%. O ERP precisa saber diferenciar isso automaticamente com base no CFOP e no estado do destinatário.',
    relatedRecords: ['C190', 'E100'],
    commonErrors: [
      'Aplicar alíquota interna em operação interestadual, ou o contrário.',
      'Não considerar o Diferencial de Alíquota (DIFAL) em vendas para consumidor final localizado em outro estado.',
    ],
    keywords: ['imposto estadual', 'circulação de mercadorias', 'difal', 'alíquota interestadual', 'crédito e débito'],
  },
  {
    id: 'ipi',
    name: 'IPI',
    aliases: ['Imposto sobre Produtos Industrializados'],
    category: 'tributos',
    short:
      'Imposto federal cobrado principalmente na saída de produtos de indústrias — a alíquota depende do NCM.',
    definition:
      'O IPI é um tributo federal que incide sobre produtos industrializados, cobrado principalmente quando o produto sai de um estabelecimento industrial (ou de um equiparado a industrial, como certos importadores). Sua alíquota é definida a partir do NCM do produto, na chamada Tabela TIPI, e pode variar bastante — de 0% até percentuais altos, dependendo do tipo de produto (cigarros e bebidas, por exemplo, costumam ter alíquotas elevadas).',
    whereInErp:
      'Calculado junto com o ICMS na mesma regra fiscal da operação, mas só entra em cena quando o emitente é indústria ou equiparado — empresas puramente comerciais normalmente não calculam IPI na venda.',
    example:
      'Uma fábrica de móveis vende um produto que sai da linha de produção. Além do ICMS, essa nota também calcula IPI, com alíquota definida pelo NCM do móvel na Tabela TIPI. Se a mesma peça fosse revendida por uma loja (não industrial), normalmente não haveria incidência de IPI nessa segunda venda.',
    commonErrors: [
      'Calcular IPI em operações de empresas puramente comerciais que não são industriais nem equiparadas.',
      'Não atualizar a alíquota de IPI (Tabela TIPI) quando ela muda para o NCM do produto.',
    ],
    keywords: ['imposto federal', 'produtos industrializados', 'tabela tipi', 'indústria', 'equiparado a industrial'],
  },
  {
    id: 'pis-cofins',
    name: 'PIS/COFINS',
    aliases: [
      'Programa de Integração Social',
      'Contribuição para o Financiamento da Seguridade Social',
    ],
    category: 'tributos',
    short:
      'Contribuições federais sobre o faturamento da empresa — o regime (cumulativo ou não) muda toda a lógica de cálculo.',
    definition:
      'PIS e COFINS são contribuições federais que incidem sobre a receita/faturamento da empresa, quase sempre calculadas juntas por terem regras parecidas. Existem dois regimes principais: o cumulativo, com alíquota menor e sem direito a crédito sobre custos; e o não cumulativo, com alíquota maior, mas que permite descontar créditos sobre insumos e outros gastos. Qual regime se aplica depende do regime tributário geral da empresa (Lucro Real, Presumido, Simples Nacional).',
    whereInErp:
      'Calculado na apuração fiscal mensal, usando o CST de PIS/COFINS de cada item combinado com o regime tributário cadastrado para a empresa emitente.',
    example:
      'Uma empresa no Lucro Real, regime não cumulativo, compra insumos e tem direito a se creditar de PIS/COFINS sobre essa compra. Já uma empresa no Lucro Presumido, regime cumulativo, paga uma alíquota menor sobre suas vendas, mas não pode descontar crédito algum sobre os insumos comprados.',
    commonErrors: [
      'Misturar regras do regime cumulativo com o não cumulativo para a mesma empresa.',
      'Não aproveitar créditos de PIS/COFINS a que a empresa tem direito no regime não cumulativo, pagando imposto a mais.',
    ],
    keywords: ['contribuições federais', 'faturamento', 'regime cumulativo', 'regime não cumulativo', 'lucro real', 'lucro presumido'],
  },
  {
    id: 'bloco-c',
    name: 'Bloco C',
    category: 'bloco-c',
    short:
      'Parte do SPED Fiscal que reúne as notas fiscais de mercadorias — entradas e saídas, item a item.',
    definition:
      'O Bloco C é onde moram os documentos fiscais relacionados à circulação de mercadorias — principalmente as NF-e de entrada e de saída. Ele traz o cabeçalho de cada nota, o detalhamento de cada item vendido/comprado e um resumo por combinação de CST/CFOP/alíquota. É, de longe, um dos blocos mais volumosos do SPED Fiscal, porque nasce diretamente do movimento diário de notas do ERP.',
    whereInErp:
      'Gerado a partir da tabela de notas fiscais emitidas e recebidas pelo ERP, item a item — é praticamente um espelho digital de tudo o que já foi faturado ou recebido no período.',
    example:
      'No mês de referência, uma empresa emitiu 300 notas de venda e recebeu 40 notas de compra. Cada uma dessas 340 notas vira um registro C100 no Bloco C, com seus respectivos itens detalhados nos registros C170.',
    relatedRecords: ['C100', 'C170', 'C190'],
    commonErrors: [
      'Deixar de fora notas fiscais canceladas ou denegadas — elas também precisam constar, com o status correto.',
      'Gerar um C100 sem os C170 correspondentes, quebrando a hierarquia esperada do bloco.',
    ],
    keywords: ['notas fiscais', 'nf-e', 'entrada e saída', 'documentos fiscais de mercadorias'],
  },
  {
    id: 'c100',
    name: 'C100',
    category: 'bloco-c',
    short:
      'Registro "cabeçalho" de uma nota fiscal dentro do Bloco C — dados gerais do documento.',
    definition:
      'O C100 é o cabeçalho de cada documento fiscal: quem emitiu, quem recebeu, número e série da nota, chave de acesso, datas de emissão e de entrada/saída, e os valores totais. Pense nele como a "capa" da nota fiscal dentro do arquivo do SPED — é a ele que se conectam os itens detalhados (C170) e o resumo por tributação (C190).',
    whereInErp:
      'Corresponde diretamente ao cabeçalho da nota fiscal já emitida ou recebida, tal como ela existe no módulo de faturamento/fiscal do ERP.',
    example:
      'A nota fiscal nº 1234, emitida para o cliente "Comércio ABC Ltda", vira um único registro C100 com o valor total da nota. Se essa nota tiver 5 produtos diferentes, ela terá 5 registros C170 vinculados a esse mesmo C100.',
    relatedRecords: ['C170', 'C190'],
    commonErrors: [
      'Valor total do C100 não bater com a soma dos itens do C170 vinculado.',
      'Chave de acesso informada divergente da NF-e realmente autorizada na Sefaz.',
    ],
    keywords: ['cabeçalho da nota', 'registro mestre', 'chave de acesso'],
  },
  {
    id: 'c170',
    name: 'C170',
    category: 'bloco-c',
    short:
      'Detalhe de cada item/produto de uma nota fiscal — vinculado ao C100 correspondente.',
    definition:
      'O C170 detalha, produto por produto, o que foi vendido ou comprado em uma nota fiscal: código do item, descrição, NCM, CFOP, quantidade, valor e os dados de tributação daquele item específico (CST, base de cálculo, alíquota e valor de ICMS/IPI/PIS/COFINS). Uma nota com 10 itens gera 10 registros C170, todos apontando para o mesmo C100.',
    whereInErp:
      'Vem diretamente dos itens da nota fiscal, replicando a tributação que já foi calculada pela engine fiscal no momento da emissão ou do recebimento da nota.',
    example:
      'Na nota fiscal 1234 (registro C100), um dos itens é "parafuso M6" com CFOP 5.102, NCM 7318.15.00, quantidade 500 e valor total de R$ 250,00. Esse item aparece como um C170 vinculado ao C100 daquela nota.',
    relatedRecords: ['C100', 'C190'],
    commonErrors: [
      'CFOP do item divergente do CFOP predominante informado no C100.',
      'Base de cálculo do ICMS do item não coincidir com quantidade × valor unitário ajustado por descontos e frete.',
    ],
    keywords: ['item da nota', 'produto da nota fiscal', 'detalhe do documento'],
  },
  {
    id: 'c190',
    name: 'C190',
    category: 'bloco-c',
    short:
      'Resumo de uma nota (ou de várias) agrupado por CST/CFOP/alíquota — o que a fiscalização mais confere.',
    definition:
      'O C190 pega os itens de um documento (ou de vários documentos) e agrupa por combinação de CST, CFOP e alíquota, somando base de cálculo, valor de ICMS, valor de ICMS-ST e outros valores. Na prática, é um "resumo por faixa tributária" — e é justamente esse resumo que auditores fiscais mais usam para conferir se a apuração bate, porque condensa o Bloco C inteiro em poucas linhas.',
    whereInErp:
      'Calculado automaticamente pelo ERP como um somatório dos C170 que compartilham a mesma combinação de CST, CFOP e alíquota.',
    example:
      'Se 50 notas de venda no mês usaram o mesmo CFOP 5.101 com CST 000 e alíquota de 18%, todas essas linhas se somam em um único registro C190, mostrando a base de cálculo total e o ICMS total daquele grupo.',
    relatedRecords: ['C100', 'C170'],
    commonErrors: [
      'Totais do C190 não baterem com a soma dos C170 (comum quando há arredondamento diferente entre os registros).',
      'Agrupar CFOPs de naturezas diferentes (por exemplo, venda e devolução) na mesma linha do C190.',
    ],
    keywords: ['resumo tributário', 'analítico do documento', 'totalização por cst cfop'],
  },
  {
    id: 'bloco-h',
    name: 'Bloco H',
    category: 'bloco-h',
    short: 'Parte do SPED Fiscal que registra o inventário físico de estoque em uma data específica.',
    definition:
      'O Bloco H escritura o inventário de mercadorias, matérias-primas e produtos em processo/acabados existentes no estabelecimento em uma determinada data. Normalmente é feito ao fim do exercício (31/12), mas a legislação estadual pode exigir inventário em outras datas também. É basicamente uma "foto" oficial do que a empresa tinha em estoque naquele momento.',
    whereInErp:
      'Gerado a partir do módulo de estoque do ERP, que precisa "congelar" as quantidades e valores exatamente na data de referência do inventário.',
    example:
      'Em 31 de dezembro, o ERP gera um Bloco H listando todos os produtos em estoque naquela data, com a respectiva quantidade e valor unitário — mesmo que, no dia seguinte, o estoque já tenha mudado por novas vendas ou compras.',
    relatedRecords: ['H005', 'H010'],
    commonErrors: [
      'Divergência entre a quantidade em estoque no ERP e a quantidade realmente escriturada no Bloco H.',
      'Usar custo médio desatualizado para valorizar o inventário.',
    ],
    keywords: ['inventário de estoque', 'contagem física', 'balanço de estoque'],
  },
  {
    id: 'h005',
    name: 'H005',
    category: 'bloco-h',
    short: 'Cabeçalho do inventário: data de referência, valor total do estoque e motivo da escrituração.',
    definition:
      'O H005 identifica a data do inventário, o valor total do estoque naquela data e o motivo da escrituração (balanço de fim de ano, determinação da fiscalização, mudança de forma de tributação, etc.). É o registro "pai" ao qual os itens detalhados do H010 se conectam.',
    whereInErp:
      'Gerado uma vez para cada data de inventário informada no processo de fechamento fiscal do estoque.',
    example:
      'Um H005 é gerado com data 31/12/2025, motivo "01" (inventário de fim de exercício) e valor total de R$ 850.000,00 em estoque — esse valor deve bater exatamente com a soma de todos os H010 vinculados.',
    relatedRecords: ['H010'],
    keywords: ['cabeçalho do inventário', 'data do balanço', 'motivo do inventário'],
  },
  {
    id: 'h010',
    name: 'H010',
    category: 'bloco-h',
    short:
      'Detalhe do inventário item a item: quantidade e valor de cada produto em estoque na data de referência.',
    definition:
      'O H010 lista, produto por produto, a quantidade em estoque na data do inventário, o valor unitário usado na valorização e o valor total, além de um código indicando a posse/propriedade da mercadoria (própria, de terceiros, ou em poder de terceiros — como em consignação).',
    whereInErp:
      'Extraído diretamente do saldo de estoque por produto, tal como registrado no ERP na data exata de referência do inventário.',
    example:
      'Um H010 mostra que, em 31/12, a empresa tinha 1.200 unidades do produto "parafuso M6" em estoque, valorizadas a R$ 0,50 cada, totalizando R$ 600,00 — com código de posse "própria" (mercadoria de propriedade da empresa, no seu próprio estabelecimento).',
    relatedRecords: ['H005'],
    commonErrors: [
      'Não considerar mercadorias em poder de terceiros (consignação, industrialização) com o código de posse correto.',
      'Valor total do H010 não bater com o total informado no H005.',
    ],
    keywords: ['saldo de estoque por item', 'valorização de estoque', 'consignação'],
  },
  {
    id: 'bloco-k',
    name: 'Bloco K',
    category: 'bloco-k',
    short:
      'Parte do SPED Fiscal, obrigatória para indústrias, que controla produção e estoque com muito mais detalhe.',
    definition:
      'O Bloco K é a versão digital do "livro de controle da produção e do estoque" (LCPE). É obrigatório principalmente para indústrias (e, em menor escala, atacadistas), e é o bloco mais detalhado do SPED Fiscal: ele mostra o estoque escriturado por item, movimentações internas que não passam por nota fiscal, e as ordens de produção com os insumos efetivamente consumidos em cada uma. Isso permite ao Fisco cruzar "quanto de insumo entrou" com "quanto de produto acabado saiu" — e identificar produção não declarada.',
    whereInErp:
      'Um dos blocos mais difíceis de gerar corretamente: exige integração forte entre o módulo de produção (ordens de produção, apontamentos de consumo, estrutura de produto/BOM) e o módulo fiscal — muitos ERPs de gestão simples não têm essa integração pronta.',
    example:
      'Uma indústria de móveis produz 100 mesas em um mês. O Bloco K precisa mostrar: quantas mesas entraram no estoque de produto acabado, quantos metros de madeira e quantos parafusos foram consumidos para produzi-las, e como isso bate com a estrutura de produto (BOM) cadastrada.',
    relatedRecords: ['K200', 'K220', 'K230', 'K235'],
    commonErrors: [
      'Gerar o Bloco K sem que o módulo de produção do ERP esteja de fato integrado, resultando em dados incompletos ou defasados.',
      'Não vincular corretamente o insumo consumido (K235) à ordem de produção (K230) que o originou.',
    ],
    keywords: ['controle de produção', 'lcpe', 'livro de controle da produção e do estoque', 'indústria'],
  },
  {
    id: 'k200',
    name: 'K200',
    category: 'bloco-k',
    short: 'Quanto de cada item sobrou em estoque ao final do período, segundo o Bloco K.',
    definition:
      'O K200 informa a quantidade em estoque de cada item ao final do período de apuração, calculada a partir do saldo inicial mais as entradas menos as saídas escrituradas nos demais registros do Bloco K.',
    whereInErp:
      'Precisa reconciliar com o saldo de estoque do módulo de controle de estoque do ERP na mesma data — se não bater, é sinal de que alguma movimentação ficou de fora do Bloco K.',
    example:
      'Ao final do mês, o K200 mostra que restam 300 mesas prontas em estoque, valor que deve ser idêntico ao saldo do produto "mesa" no módulo de estoque do ERP na mesma data.',
    relatedRecords: ['K220', 'K230'],
    commonErrors: [
      'Saldo do K200 não bater com o estoque físico/contábil do ERP na mesma competência.',
    ],
    keywords: ['saldo final de estoque', 'estoque escriturado'],
  },
  {
    id: 'k220',
    name: 'K220',
    category: 'bloco-k',
    short:
      'Movimentações de estoque que não têm nota fiscal — como consumo interno ou transferência entre depósitos.',
    definition:
      'O K220 registra movimentações de estoque que não geram documento fiscal — transferências internas entre depósitos, consumo interno de materiais, ajustes de inventário — mas que ainda assim impactam o saldo escriturado no Bloco K. É fácil "esquecer" desse registro justamente porque, no dia a dia do ERP, esses movimentos não passam pelo faturamento.',
    whereInErp:
      'Corresponde a apontamentos internos de estoque no ERP que não geram nota fiscal — por exemplo, uma requisição de material para manutenção interna da fábrica.',
    example:
      'A fábrica retira 50 litros de um produto químico do estoque para uso na limpeza das máquinas, sem gerar nota fiscal. Esse consumo interno precisa aparecer como um K220 para que o saldo do K200 continue batendo.',
    commonErrors: [
      'Ignorar movimentações internas de estoque por não terem nota fiscal associada, gerando saldo divergente no K200.',
    ],
    keywords: ['consumo interno', 'transferência entre depósitos', 'ajuste de estoque'],
  },
  {
    id: 'k230',
    name: 'K230',
    category: 'bloco-k',
    short: 'Registro que abre uma ordem de produção: o que foi produzido, quanto e quando.',
    definition:
      'O K230 identifica uma ordem de produção: qual item está sendo produzido, em que quantidade e em qual período. É o registro "pai" ao qual se conectam os insumos efetivamente consumidos naquela produção específica, detalhados no K235.',
    whereInErp:
      'Vem do módulo de produção/apontamento de fábrica do ERP — cada ordem de produção concluída (ou em andamento) no período vira um K230.',
    example:
      'A ordem de produção nº 789, que gerou 100 mesas ao longo da semana, vira um registro K230. Todos os insumos usados nessa ordem (madeira, parafusos, verniz) são detalhados nos K235 vinculados a ela.',
    relatedRecords: ['K235'],
    keywords: ['ordem de produção', 'apontamento de fábrica'],
  },
  {
    id: 'k235',
    name: 'K235',
    category: 'bloco-k',
    short: 'Quais insumos e em que quantidade foram gastos em uma ordem de produção específica.',
    definition:
      'O K235 detalha, para cada ordem de produção do K230, quais insumos (matérias-primas, componentes) foram efetivamente consumidos e em que quantidade. É esse registro que permite ao Fisco validar se a estrutura de produto (BOM/ficha técnica) declarada é compatível com o que realmente foi gasto na produção.',
    whereInErp:
      'Depende diretamente da estrutura de produto (BOM) e dos apontamentos de consumo de insumo feitos por ordem de produção no módulo de fábrica.',
    example:
      'Para a ordem de produção nº 789 (100 mesas), o K235 detalha o consumo de 200m² de madeira, 800 parafusos e 15 litros de verniz — valores que devem ser compatíveis com a estrutura de produto cadastrada para "mesa".',
    relatedRecords: ['K230'],
    commonErrors: [
      'Consumo de insumo no K235 muito distante do previsto pela estrutura de produto (BOM), levantando questionamento fiscal.',
      'Não atualizar o K235 quando há substituição de insumo durante a produção (por exemplo, trocar um componente por outro similar).',
    ],
    keywords: ['consumo de insumo', 'estrutura de produto', 'bom', 'ficha técnica'],
  },
  {
    id: 'regra-fiscal-erp',
    name: 'Regra fiscal no ERP',
    category: 'erp-regra-negocio',
    short:
      'A "camada de decisão" do sistema que escolhe automaticamente CFOP, CST e alíquota para cada operação.',
    definition:
      'Na prática, "regra fiscal" é o nome dado ao conjunto de parâmetros — por tipo de operação, estado de origem/destino, tipo de cliente, NCM do produto, entre outros — que o ERP consulta para decidir automaticamente qual CFOP, CST/CSOSN e alíquota aplicar a cada item de uma nota fiscal. É essa camada que transforma uma legislação cheia de exceções em um comportamento previsível e automático do sistema.',
    whereInErp:
      "Geralmente vive em uma tela chamada algo como 'matriz fiscal' ou 'regra de tributação', separada do cadastro de produto e de cliente justamente para permitir manutenção sem precisar alterar código-fonte.",
    example:
      'Uma regra fiscal pode dizer: "para venda (operação = saída), quando o estado do cliente for diferente do estado da empresa e o produto tiver NCM começando em 8471, aplicar CFOP 6.102, CST 000 e alíquota de 12%". Isso evita que o desenvolvedor precise programar cada combinação possível manualmente.',
    commonErrors: [
      'Cadastrar regras fiscais fixas demais no código, exigindo alteração de programa a cada mudança de legislação estadual.',
      'Duplicar regras semelhantes para pequenas variações, dificultando a manutenção quando uma alíquota muda.',
    ],
    keywords: ['matriz fiscal', 'parametrização fiscal', 'motor de cálculo de impostos'],
  },
  {
    id: 'erros-comuns-integracao',
    name: 'Erros comuns de integração fiscal',
    category: 'erros-comuns',
    short:
      'A maioria dos problemas fiscais em ERP não é "cálculo errado" isolado — é dessincronia entre módulos.',
    definition:
      'Quando um número fiscal sai errado, o primeiro instinto é procurar erro na fórmula de cálculo. Mas, na prática, a maior parte dos problemas fiscais em ERP vem da fronteira entre módulos que evoluem de forma independente: o cadastro de produto muda de NCM, mas a nota já emitida não é retificada; o estoque é ajustado manualmente sem gerar o K220 correspondente; a apuração do Bloco E é gerada antes do fechamento final das notas do mês, ficando desatualizada.',
    whereInErp:
      'Costuma aparecer exatamente onde faturamento, estoque, produção e módulo fiscal deveriam estar sincronizados, mas não estão — por dependerem de rotinas manuais ou de ordens de execução que nem sempre são respeitadas.',
    example:
      'Um analista retifica uma nota fiscal já transmitida (corrigindo um valor), mas esquece de gerar novamente o SPED daquele período. O Fisco recebe a nota corrigida, mas a escrituração fiscal continua refletindo o valor antigo — gerando divergência que só aparece meses depois, em uma malha fiscal.',
    commonErrors: [
      'Gerar o SPED antes do fechamento contábil/fiscal do período estar concluído.',
      'Retificar uma nota fiscal sem retificar o SPED do período já transmitido.',
      'Não versionar as tabelas de CFOP/CST/NCM, perdendo rastreabilidade de qual regra valia em cada emissão.',
    ],
    keywords: ['dessincronia', 'retificação', 'malha fiscal', 'inconsistência entre módulos'],
  },
]
