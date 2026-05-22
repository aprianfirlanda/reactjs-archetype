import { clearAuthTokens, dashboardAppName } from '@reactjs-archetype/shared'
import { AdminLayout } from '@reactjs-archetype/ui'
import { useNavigate } from 'react-router'
import { moduleNavigation } from '../routes/navigation'

export function DashboardLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    clearAuthTokens()
    navigate('/login', { replace: true })
  }

  return (
    <AdminLayout
      appName={dashboardAppName}
      navigation={moduleNavigation}
      onLogout={handleLogout}
      userLabel="Operator"
    />
  )
}
