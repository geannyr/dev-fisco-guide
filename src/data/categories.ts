import type { Category } from './types'

export const categories: Category[] = [
  {
    id: 'visao-geral',
    title: 'Visão geral',
    description: 'O panorama fiscal que todo dev de ERP precisa ter em mente.',
    icon: '🧭',
  },
  {
    id: 'documentos-fiscais',
    title: 'Documentos fiscais',
    description: 'Notas, códigos e classificações que descrevem uma operação.',
    icon: '📄',
  },
  {
    id: 'tributos',
    title: 'Tributos',
    description: 'ICMS, IPI, PIS/COFINS e os regimes que definem seu cálculo.',
    icon: '💰',
  },
  {
    id: 'sped-fiscal',
    title: 'SPED Fiscal',
    description: 'A escrituração digital que consolida tudo isso para o Fisco.',
    icon: '🗂️',
  },
  {
    id: 'bloco-c',
    title: 'Bloco C',
    description: 'Documentos fiscais de mercadorias (notas de entrada e saída).',
    icon: 'C',
  },
  {
    id: 'bloco-h',
    title: 'Bloco H',
    description: 'Inventário físico de estoque.',
    icon: 'H',
  },
  {
    id: 'bloco-k',
    title: 'Bloco K',
    description: 'Controle de produção e de estoque industrial.',
    icon: 'K',
  },
  {
    id: 'erp-regra-negocio',
    title: 'ERP e regra de negócio',
    description: 'Como tudo isso vira parametrização e código dentro do sistema.',
    icon: '⚙️',
  },
  {
    id: 'erros-comuns',
    title: 'Erros comuns',
    description: 'Armadilhas recorrentes em ajustes e integrações fiscais.',
    icon: '⚠️',
  },
]
