import { hasAccessToken } from '@reactjs-archetype/shared'
import { Navigate, Outlet, useLocation } from 'react-router'

export function ProtectedRoute() {
  const location = useLocation()

  if (!hasAccessToken()) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return <Outlet />
}
