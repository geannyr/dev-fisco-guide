import { useMemo, useState } from 'react'
import { categories, terms } from './data'
import type { CategoryId, Term } from './data/types'
import { useTheme } from './hooks/useTheme'
import { useHashRoute } from './hooks/useHashRoute'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SearchBar } from './components/SearchBar'
import { CategoryGrid } from './components/CategoryGrid'
import { TermList } from './components/TermList'
import { TermDetail } from './components/TermDetail'
import { Footer } from './components/Footer'

const categoriesById = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, (typeof categories)[number]>

const termsById = Object.fromEntries(terms.map((t) => [t.id, t]))

function findTermByRecord(code: string): Term | undefined {
  const normalized = code.trim().toLowerCase()
  return terms.find((t) => t.id === normalized || t.name.toLowerCase() === normalized)
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const { route, goToTerm, goHome } = useHashRoute()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<CategoryId, number>
    for (const category of categories) counts[category.id] = 0
    for (const term of terms) counts[term.category] += 1
    return counts
  }, [])

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return terms.filter((term) => {
      if (selectedCategory && term.category !== selectedCategory) return false
      if (!normalizedQuery) return true
      const haystack = [
        term.name,
        term.short,
        term.definition,
        ...(term.aliases ?? []),
        ...(term.keywords ?? []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [query, selectedCategory])

  const activeTerm = route.view === 'term' ? termsById[route.termId] : undefined

  return (
    <div className="flex min-h-screen flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} onGoHome={goHome} />

      <main className="flex-1">
        {activeTerm ? (
          <TermDetail
            term={activeTerm}
            category={categoriesById[activeTerm.category]}
            onBack={goHome}
            onSelectRelated={goToTerm}
            findTermByRecord={findTermByRecord}
          />
        ) : (
          <>
            <Hero />
            <section className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-6 xl:grid xl:grid-cols-[280px_1fr] xl:items-start xl:gap-10">
              <aside className="mb-8 xl:sticky xl:top-20 xl:mb-0">
                <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Categorias
                </h2>
                <CategoryGrid
                  categories={categories}
                  counts={categoryCounts}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </aside>

              <div>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    Termos{' '}
                    <span className="normal-case text-slate-400">
                      ({filteredTerms.length})
                    </span>
                  </h2>
                  <div className="w-full sm:w-80 xl:w-96">
                    <SearchBar value={query} onChange={setQuery} />
                  </div>
                </div>
                <TermList
                  terms={filteredTerms}
                  categoriesById={categoriesById}
                  onSelectTerm={goToTerm}
                />
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
