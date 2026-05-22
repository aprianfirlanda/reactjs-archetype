import { Badge } from '@reactjs-archetype/ui'

const queues = [
  ['Civil registry request', '128', 'Active'],
  ['Permit renewal', '42', 'Review'],
  ['Complaint handling', '17', 'Escalated'],
]

export function ServicesPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {queues.map(([name, count, status]) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          key={name}
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-slate-950">{name}</h2>
            <Badge tone={status === 'Escalated' ? 'danger' : 'info'}>
              {status}
            </Badge>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-950">{count}</p>
          <p className="mt-2 text-sm text-slate-600">Open service items</p>
        </article>
      ))}
    </div>
  )
}
