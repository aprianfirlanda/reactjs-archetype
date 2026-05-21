import { appName, dashboardAppName } from '@reactjs-archetype/shared'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [hasLocalSession, setHasLocalSession] = useState(false)
  const shouldShowLocalLogin = import.meta.env.DEV && !hasLocalSession

  return (
    <main className="module-shell">
      {shouldShowLocalLogin ? (
        <section className="login-panel" aria-label="Local module login">
          <img src={reactLogo} alt="" />
          <p className="eyebrow">Local development</p>
          <h1>{dashboardAppName} login</h1>
          <p>
            This login appears only while running the module app directly in
            development.
          </p>
          <button
            className="button"
            type="button"
            onClick={() => setHasLocalSession(true)}
          >
            Continue locally
          </button>
        </section>
      ) : (
        <section className="module-panel" aria-label="Dashboard module">
          <div>
            <p className="eyebrow">{appName}</p>
            <h1>{dashboardAppName}</h1>
            <p>
              A module web app mounted at{' '}
              <code>{import.meta.env.BASE_URL}</code>.
            </p>
          </div>
          <div className="metric-grid">
            <article>
              <span>12</span>
              Active modules
            </article>
            <article>
              <span>4</span>
              Release lanes
            </article>
            <article>
              <span>99%</span>
              Session reuse
            </article>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
