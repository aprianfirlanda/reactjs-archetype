import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { appName, dashboardAppName } from '@reactjs-archetype/shared'
import { Button, TextField } from '@reactjs-archetype/ui'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { hasAccessToken, saveTemplateSession } from '../auth/tokens'

type LocationState = {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const redirectTo = state?.from?.pathname ?? '/modules'

  if (hasAccessToken()) {
    return <Navigate replace to="/modules" />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    saveTemplateSession()
    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="grid min-h-svh bg-slate-100 lg:grid-cols-[minmax(0,1fr)_520px]">
      <section className="hidden bg-slate-950 px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-200">
            {appName}
          </p>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight">
            Government module administration workspace
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            A practical frontend template for authenticated module menus,
            operational pages, and service-backed admin workflows.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm text-slate-300">
          <div className="rounded-md border border-white/10 p-4">
            <p className="text-2xl font-semibold text-white">24</p>
            Active services
          </div>
          <div className="rounded-md border border-white/10 p-4">
            <p className="text-2xl font-semibold text-white">8</p>
            Agencies
          </div>
          <div className="rounded-md border border-white/10 p-4">
            <p className="text-2xl font-semibold text-white">99%</p>
            Uptime target
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <form
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
          onSubmit={handleSubmit}
        >
          <p className="text-sm font-semibold uppercase text-blue-700">
            Local template login
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Sign in to {dashboardAppName}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This starter checks only for an access token. Replace the mock token
            write with your backend login endpoint when integrating auth.
          </p>

          <div className="mt-8 space-y-5">
            <TextField
              autoComplete="username"
              defaultValue="operator@gov.local"
              label="Email"
              name="email"
              type="email"
            />
            <TextField
              autoComplete="current-password"
              defaultValue="password"
              label="Password"
              name="password"
              type="password"
            />
          </div>

          <Button className="mt-8 w-full" type="submit">
            Continue
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
      </section>
    </main>
  )
}
