import type { Category, Term } from '../data/types'

interface Props {
  term: Term
  category: Category | undefined
  onSelect: (termId: string) => void
}

export function TermCard({ term, category, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(term.id)}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-800/40 hover:shadow-md sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-blue-400/40"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-blue-900 dark:text-slate-100 dark:group-hover:text-blue-300">
          {term.name}
        </h3>
        {category && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] whitespace-nowrap text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {category.title}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        {term.short}
      </p>
    </button>
  )
}
