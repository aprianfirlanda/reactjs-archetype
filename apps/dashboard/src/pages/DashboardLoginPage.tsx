import {
  appName,
  dashboardAppName,
  hasAccessToken,
  saveTemplateSession,
} from '@reactjs-archetype/shared'
import { LoginPage } from '@reactjs-archetype/ui'

export function DashboardLoginPage() {
  return (
    <LoginPage
      appName={dashboardAppName}
      authenticated={hasAccessToken()}
      brandName={appName}
      defaultRedirectTo="/modules"
      onLogin={saveTemplateSession}
    />
  )
}
