import { Navigate, Outlet, useLocation } from 'react-router'
import { hasAccessToken } from '../auth/tokens'

export function ProtectedRoute() {
  const location = useLocation()

  if (!hasAccessToken()) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return <Outlet />
}
