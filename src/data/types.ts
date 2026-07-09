export type CategoryId =
  | 'visao-geral'
  | 'documentos-fiscais'
  | 'tributos'
  | 'sped-fiscal'
  | 'bloco-c'
  | 'bloco-h'
  | 'bloco-k'
  | 'erp-regra-negocio'
  | 'erros-comuns'

export interface Category {
  id: CategoryId
  title: string
  description: string
  icon: string
}

export interface Term {
  id: string
  name: string
  aliases?: string[]
  category: CategoryId
  short: string
  definition: string
  whereInErp?: string
  relatedRecords?: string[]
  example?: string
  commonErrors?: string[]
  /** Sinônimos e termos relacionados usados apenas para a busca encontrar o termo. */
  keywords?: string[]
}
