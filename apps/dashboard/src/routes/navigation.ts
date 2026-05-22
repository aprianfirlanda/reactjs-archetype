import {
  Cog6ToothIcon,
  DocumentChartBarIcon,
  RectangleGroupIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'
import type { ComponentType, SVGProps } from 'react'

export type NavigationItem = {
  name: string
  description: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  status: 'Active' | 'Maintenance' | 'Draft'
}

export const moduleNavigation: NavigationItem[] = [
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
