export const appName = 'ReactJS Archetype'
export const portalAppName = 'Portal'
export const dashboardAppName = 'Dashboard'

export function getDashboardUrl(isDevelopment: boolean) {
  return isDevelopment ? 'http://localhost:5174/dashboard/' : '/dashboard/'
}
