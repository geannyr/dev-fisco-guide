import type { Category, CategoryId } from '../data/types'

interface Props {
  categories: Category[]
  counts: Record<CategoryId, number>
  selected: CategoryId | null
  onSelect: (id: CategoryId | null) => void
}

export function CategoryGrid({ categories, counts, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-1 xl:gap-2">
      {categories.map((category) => {
        const isActive = selected === category.id
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(isActive ? null : category.id)}
            className={`rounded-xl border p-3 text-left transition ${
              isActive
                ? 'border-blue-800 bg-blue-900/5 dark:border-blue-400 dark:bg-blue-400/10'
                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg" aria-hidden>
                {category.icon}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {counts[category.id] ?? 0}
              </span>
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {category.title}
            </div>
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {category.description}
            </div>
          </button>
        )
      })}
    </div>
  )
}
