import {
  Cog6ToothIcon,
  DocumentChartBarIcon,
  RectangleGroupIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'
import type { AppNavigationItem } from '@reactjs-archetype/ui'

export type DashboardNavigationItem = AppNavigationItem & {
  description: string
  status: 'Active' | 'Maintenance' | 'Draft'
}

export const moduleNavigation: DashboardNavigationItem[] = [
  {
    name: 'Module Registry',
    description: 'Browse all available administration modules.',
    href: '/modules',
    icon: RectangleGroupIcon,
    status: 'Active',
  },
  {
    name: 'Reports',
    description: 'Review operational reports and submission status.',
    href: '/reports',
    icon: DocumentChartBarIcon,
    status: 'Active',
  },
  {
    name: 'Public Services',
    description: 'Monitor service queues, cases, and fulfilment progress.',
    href: '/services',
    icon: ServerStackIcon,
    status: 'Maintenance',
  },
  {
    name: 'Settings',
    description: 'Manage module preferences and access configuration.',
    href: '/settings',
    icon: Cog6ToothIcon,
    status: 'Draft',
  },
]
