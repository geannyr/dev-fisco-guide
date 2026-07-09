import { useEffect, useState } from 'react'

export type Route = { view: 'home' } | { view: 'term'; termId: string }

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')
  if (hash.startsWith('termo/')) {
    return { view: 'term', termId: decodeURIComponent(hash.slice('termo/'.length)) }
  }
  return { view: 'home' }
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(parseHash)

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Sem isso, trocar de termo (ou voltar para a home) com a página rolada
  // deixa o título da nova view fora da viewport, escondido acima do fold.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  const goToTerm = (termId: string) => {
    window.location.hash = `/termo/${encodeURIComponent(termId)}`
  }

  const goHome = () => {
    window.location.hash = '/'
  }

  return { route, goToTerm, goHome }
}
