export const appName = 'ReactJS Archetype'
export const portalAppName = 'Portal'
export const dashboardAppName = 'Dashboard'

export type { AuthTokens } from './auth/tokens'
export {
  clearAuthTokens,
  getAccessToken,
  getAuthTokens,
  hasAccessToken,
  saveAuthTokens,
  saveTemplateSession,
} from './auth/tokens'
export type { ApiRequestOptions } from './services/http'
export { ApiError, apiFetch, buildBackendUrl } from './services/http'

export function getDashboardUrl(isDevelopment: boolean) {
  return isDevelopment ? 'http://localhost:5174/dashboard/' : '/dashboard/'
}
