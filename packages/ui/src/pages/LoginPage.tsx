import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { FormEvent, ReactNode } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { Button, TextField } from '../primitives'

type LocationState = {
  from?: {
    pathname?: string
  }
}

export type LoginMetric = {
  label: string
  value: string
}

export type LoginPageProps = {
  brandName: string
  appName: string
  authenticated: boolean
  defaultRedirectTo: string
  eyebrow?: string
  title?: string
  description?: string
  helperText?: string
  metrics?: LoginMetric[]
  children?: ReactNode
  onLogin: () => void
}

export function LoginPage({
  appName,
  authenticated,
  brandName,
  children,
  defaultRedirectTo,
  description = 'A practical frontend template for authenticated module menus, operational pages, and service-backed admin workflows.',
  eyebrow = 'Local template login',
  helperText = 'This starter checks only for an access token. Replace the mock token write with your backend login endpoint when integrating auth.',
  metrics = [
    { label: 'Active services', value: '24' },
    { label: 'Agencies', value: '8' },
    { label: 'Uptime target', value: '99%' },
  ],
  onLogin,
  title = 'Government module administration workspace',
}: LoginPageProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const redirectTo = state?.from?.pathname ?? defaultRedirectTo

  if (authenticated) {
    return <Navigate replace to={defaultRedirectTo} />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onLogin()
    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="grid min-h-svh bg-slate-100 lg:grid-cols-[minmax(0,1fr)_520px]">
      <section className="hidden bg-slate-950 px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-200">
            {brandName}
          </p>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm text-slate-300">
          {metrics.map((metric) => (
            <div
              className="rounded-md border border-white/10 p-4"
              key={metric.label}
            >
              <p className="text-2xl font-semibold text-white">
                {metric.value}
              </p>
              {metric.label}
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <form
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
          onSubmit={handleSubmit}
        >
          <p className="text-sm font-semibold uppercase text-blue-700">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Sign in to {appName}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{helperText}</p>

          {children ?? (
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
          )}

          <Button className="mt-8 w-full" type="submit">
            Continue
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
      </section>
    </main>
  )
}
