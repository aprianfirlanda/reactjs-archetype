import { apiFetch } from './http'

export type ModuleSummary = {
  id: string
  name: string
  description: string
  path: string
  status: 'active' | 'maintenance' | 'draft'
}

export function listModules(signal?: AbortSignal) {
  return apiFetch<ModuleSummary[]>('/modules', { signal })
}
