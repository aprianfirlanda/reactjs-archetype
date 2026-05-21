import { expect, test } from 'bun:test'
import { appName, dashboardAppName } from '@reactjs-archetype/shared'

test('dashboard resolves the shared workspace package', () => {
  expect(appName).toBe('ReactJS Archetype')
  expect(dashboardAppName).toBe('Dashboard')
})
