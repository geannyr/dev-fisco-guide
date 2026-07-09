import type { Category, Term } from '../data/types'

interface Props {
  term: Term
  category: Category | undefined
  onBack: () => void
  onSelectRelated: (termId: string) => void
  findTermByRecord: (code: string) => Term | undefined
}

export function TermDetail({
  term,
  category,
  onBack,
  onSelectRelated,
  findTermByRecord,
}: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-900 transition-colors hover:underline dark:text-blue-300"
      >
        ← Voltar para todos os termos
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {category.icon} {category.title}
            </span>
          )}
        </div>

        <h1 className="mt-3 scroll-mt-24 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {term.name}
        </h1>
        {term.aliases && term.aliases.length > 0 && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {term.aliases.join(' · ')}
          </p>
        )}

        <p className="mt-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {term.definition}
        </p>

        {term.example && (
          <div className="mt-6 rounded-xl border border-blue-900/15 bg-blue-900/5 p-4 dark:border-blue-400/20 dark:bg-blue-400/10">
            <h2 className="text-sm font-semibold text-blue-950 dark:text-blue-200">
              💡 Exemplo prático
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-blue-950/90 dark:text-blue-100/90">
              {term.example}
            </p>
          </div>
        )}

        {term.whereInErp && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700/60 dark:bg-slate-800/60">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Onde aparece no ERP
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {term.whereInErp}
            </p>
          </div>
        )}

        {term.relatedRecords && term.relatedRecords.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Registros relacionados
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {term.relatedRecords.map((code) => {
                const related = findTermByRecord(code)
                const isClickable = related && related.id !== term.id
                return (
                  <button
                    key={code}
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && onSelectRelated(related.id)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-mono transition-colors ${
                      isClickable
                        ? 'border-blue-800/30 bg-blue-900/5 text-blue-900 hover:bg-blue-900/10 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300'
                        : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400'
                    }`}
                  >
                    {code}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {term.commonErrors && term.commonErrors.length > 0 && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
              ⚠️ Erros comuns
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90">
              {term.commonErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
