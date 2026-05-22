import { Badge } from '@reactjs-archetype/ui'
import { Link } from 'react-router'
import { moduleNavigation } from '../routes/navigation'

const statusTone = {
  Active: 'success',
  Maintenance: 'warning',
  Draft: 'neutral',
} as const

export function ModulesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-700">
          Module menu
        </p>
        <div className="mt-3 max-w-3xl">
          <h2 className="text-2xl font-semibold text-slate-950">
            Select an administration module
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This page is the default landing screen after login. Add agency
            modules here as cards or a searchable list when the catalog grows.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {moduleNavigation.map((item) => (
          <Link
            className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            key={item.href}
            to={item.href}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-md bg-blue-50 p-2 text-blue-700">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge tone={statusTone[item.status]}>{item.status}</Badge>
            </div>
            <h3 className="mt-5 text-base font-semibold text-slate-950">
              {item.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  )
}
