import { ThemeToggle } from './ThemeToggle'

interface Props {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onGoHome: () => void
}

export function Header({ theme, onToggleTheme, onGoHome }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-none">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 text-left transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-sm font-bold text-white dark:bg-blue-700">
            F
          </span>
          <span className="text-sm font-semibold text-slate-800 sm:text-base dark:text-slate-100">
            Dicionário Fiscal
            <span className="hidden text-slate-400 sm:inline"> para devs de ERP</span>
          </span>
        </button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
