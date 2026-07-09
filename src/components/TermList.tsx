import type { Category, CategoryId, Term } from '../data/types'
import { TermCard } from './TermCard'

interface Props {
  terms: Term[]
  categoriesById: Record<CategoryId, Category>
  onSelectTerm: (termId: string) => void
}

export function TermList({ terms, categoriesById, onSelectTerm }: Props) {
  if (terms.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Nenhum termo encontrado. Tente outra palavra-chave ou limpe o filtro de
        categoria.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {terms.map((term) => (
        <TermCard
          key={term.id}
          term={term}
          category={categoriesById[term.category]}
          onSelect={onSelectTerm}
        />
      ))}
    </div>
  )
}
