import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AdminLayout } from './layouts/AdminLayout'
import { LoginPage } from './pages/LoginPage'
import { ModulesPage } from './pages/ModulesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ReportsPage } from './pages/ReportsPage'
import { ServicesPage } from './pages/ServicesPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

function getRouterBasename() {
  const baseUrl = import.meta.env.BASE_URL

  if (baseUrl === '/') {
    return undefined
  }

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route element={<Navigate replace to="/modules" />} index />
            <Route element={<ModulesPage />} path="/modules" />
            <Route element={<ReportsPage />} path="/reports" />
            <Route element={<ServicesPage />} path="/services" />
            <Route element={<SettingsPage />} path="/settings" />
            <Route element={<NotFoundPage />} path="*" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
