import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase text-blue-700">404</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">
        Page not found
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        The requested administration page is not registered in this module.
      </p>
      <Link
        className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        to="/modules"
      >
        Back to modules
      </Link>
    </section>
  )
}
