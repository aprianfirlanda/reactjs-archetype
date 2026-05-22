import { Badge } from '@reactjs-archetype/ui'

const reports = [
  ['Quarterly service report', 'Ready for review', 'success'],
  ['Budget realization summary', 'Waiting for data', 'warning'],
  ['Citizen request export', 'Draft', 'neutral'],
] as const

export function ReportsPage() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-950">Reports</h2>
        <p className="mt-1 text-sm text-slate-600">
          Sample table pattern for document-heavy government modules.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Report
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Owner
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {reports.map(([name, status, tone]) => (
              <tr key={name}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-950">
                  {name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge tone={tone}>{status}</Badge>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  Secretariat
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
