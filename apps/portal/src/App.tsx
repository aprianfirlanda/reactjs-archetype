import {
  appName,
  getDashboardUrl,
  hasAccessToken,
  portalAppName,
  saveTemplateSession,
} from '@reactjs-archetype/shared'
import { LoginPage, NotFoundPage } from '@reactjs-archetype/ui'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

function getRouterBasename() {
  const baseUrl = import.meta.env.BASE_URL

  if (baseUrl === '/') {
    return undefined
  }

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

function PortalLoginPage() {
  return (
    <LoginPage
      appName={portalAppName}
      authenticated={hasAccessToken()}
      brandName={appName}
      defaultRedirectTo="/"
      description="A root web shell for authentication and launching module applications."
      metrics={[
        { label: 'Module apps', value: '1' },
        { label: 'Shared routes', value: '3' },
        { label: 'Session reuse', value: '99%' },
      ]}
      onLogin={saveTemplateSession}
      title="Government application portal"
    />
  )
}

function PortalHomePage() {
  const dashboardUrl = getDashboardUrl(import.meta.env.DEV)

  if (!hasAccessToken()) {
    return <Navigate replace to="/login" />
  }

  return (
    <main className="min-h-svh bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-700">
          {portalAppName}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          {appName}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          A root web shell for authenticated access and launching module
          applications.
        </p>
      </section>

      <section className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Module</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Dashboard
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Open the shared admin module template.
          </p>
          <a
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            href={dashboardUrl}
          >
            Open dashboard module
          </a>
        </article>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <Routes>
        <Route element={<PortalHomePage />} index />
        <Route element={<PortalLoginPage />} path="/login" />
        <Route
          element={<NotFoundPage returnLabel="Back to portal" returnTo="/" />}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
