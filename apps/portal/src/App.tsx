import {
  appName,
  getDashboardUrl,
  portalAppName,
} from '@reactjs-archetype/shared'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const dashboardUrl = getDashboardUrl(import.meta.env.DEV)

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="brand-mark">
          <img src={reactLogo} alt="" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{portalAppName}</p>
          <h1>{appName}</h1>
          <p>
            A root web shell for landing, login, and launching module
            applications.
          </p>
        </div>
      </section>

      <section className="auth-panel" aria-label="Portal authentication">
        <div>
          <p className="eyebrow">Session</p>
          <h2>{isAuthenticated ? 'Signed in' : 'Sign in to continue'}</h2>
          <p>
            {isAuthenticated
              ? 'The portal session is active. Module apps can trust this state in production.'
              : 'This starter keeps authentication simple so each app boundary is visible.'}
          </p>
        </div>

        {isAuthenticated ? (
          <a className="button primary" href={dashboardUrl}>
            Open dashboard module
          </a>
        ) : (
          <button
            className="button primary"
            type="button"
            onClick={() => setIsAuthenticated(true)}
          >
            Sign in
          </button>
        )}
      </section>
    </main>
  )
}

export default App
