const FLOW_STEPS = [
  { label: 'ERP', detail: 'Lançamentos: notas, estoque, produção' },
  { label: 'SPED', detail: 'Arquivo digital gerado no leiaute oficial' },
  { label: 'PVA', detail: 'Validação, assinatura e transmissão ao Fisco' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-blue-900/10 blur-3xl dark:bg-blue-500/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 xl:py-20">
        <span className="inline-flex items-center rounded-full border border-blue-900/20 bg-blue-900/5 px-3 py-1 text-xs font-medium tracking-wide text-blue-900 uppercase dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
          Guia rápido de fiscal para ERP
        </span>

        <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl xl:text-5xl dark:text-white">
          Dicionário fiscal para desenvolvedores de ERP
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Este guia ajuda você a entender, na prática, os termos fiscais que
          aparecem no dia a dia de um ERP: o que cada sigla significa (CFOP,
          CST, NCM), como os registros do SPED Fiscal se conectam (Blocos C, H
          e K) e onde essas regras costumam entrar no sistema — para você
          resolver uma dúvida no meio de um ajuste fiscal sem precisar abrir o
          manual oficial inteiro.
        </p>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-stretch sm:gap-0 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center gap-3">
              <div className="flex-1 rounded-xl bg-slate-50 px-4 py-3.5 transition dark:bg-slate-800/60">
                <div className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                  {step.label}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {step.detail}
                </div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <span
                  className="hidden shrink-0 px-2 text-xl text-slate-300 sm:block dark:text-slate-600"
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
