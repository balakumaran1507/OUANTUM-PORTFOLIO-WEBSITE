import { useEffect, useState, lazy, Suspense } from 'react'
import OX1Countdown from './pages/OX1Countdown'
import { LAUNCH_TIMESTAMP } from './config/launch'
import './styles/global.css'

const loadSite = () => import('./SiteApp')
const SiteApp = lazy(loadSite)

function App() {
  const [launched, setLaunched] = useState(() => Date.now() >= LAUNCH_TIMESTAMP)
  const [reveal] = useState(() => Date.now() < LAUNCH_TIMESTAMP)

  useEffect(() => {
    if (launched) return
    const id = setInterval(() => {
      const remaining = LAUNCH_TIMESTAMP - Date.now()
      if (remaining <= 15000) loadSite()
      if (remaining <= 0) setLaunched(true)
    }, 250)
    return () => clearInterval(id)
  }, [launched])

  if (!launched) return <OX1Countdown />

  return (
    <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000' }} />}>
      <SiteApp reveal={reveal} />
    </Suspense>
  )
}

export default App;
