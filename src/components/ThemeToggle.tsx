interface Props {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Alternar tema claro/escuro"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-lg transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
