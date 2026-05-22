import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Fragment, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'

export type AppNavigationItem = {
  name: string
  description?: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  status?: string
}

export type AdminLayoutProps = {
  appName: string
  eyebrow?: string
  navigation: AppNavigationItem[]
  userLabel?: string
  children?: ReactNode
  onLogout: () => void
}

function SidebarContent({
  appName,
  eyebrow,
  navigation,
  onNavigate,
}: {
  appName: string
  eyebrow?: string
  navigation: AppNavigationItem[]
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
        <div>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase text-blue-200">
              {eyebrow}
            </p>
          ) : null}
          <p className="text-base font-semibold">{appName}</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navigation.map((item) => (
          <NavLink
            className={({ isActive }) =>
              clsx(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-white text-slate-950'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white',
              )
            }
            key={item.href}
            onClick={onNavigate}
            to={item.href}
          >
            <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function pageTitle(
  pathname: string,
  navigation: AppNavigationItem[],
  appName: string,
) {
  return navigation.find((item) => item.href === pathname)?.name ?? appName
}

export function AdminLayout({
  appName,
  children,
  eyebrow = 'Admin Module',
  navigation,
  onLogout,
  userLabel = 'Operator',
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-svh bg-slate-100">
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
        open={sidebarOpen}
      >
        <div className="fixed inset-0 bg-slate-950/50" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-72 flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-4">
              <button
                className="rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setSidebarOpen(false)}
                type="button"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent
              appName={appName}
              eyebrow={eyebrow}
              navigation={navigation}
              onNavigate={() => setSidebarOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>

      <aside className="fixed inset-y-0 left-0 hidden w-72 lg:block">
        <SidebarContent
          appName={appName}
          eyebrow={eyebrow}
          navigation={navigation}
        />
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-slate-500">Government admin</p>
            <h1 className="truncate text-lg font-semibold text-slate-950">
              {pageTitle(location.pathname, navigation, appName)}
            </h1>
          </div>
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700">
              {userLabel}
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="z-50 mt-2 w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg focus:outline-none"
            >
              <MenuItem as={Fragment}>
                {({ focus }) => (
                  <button
                    className={clsx(
                      'flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-slate-700',
                      focus && 'bg-slate-100',
                    )}
                    onClick={onLogout}
                    type="button"
                  >
                    <ArrowRightStartOnRectangleIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  )
}
