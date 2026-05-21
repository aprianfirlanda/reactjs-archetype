import { expect, test } from 'bun:test'
import { appName, getDashboardUrl } from '@reactjs-archetype/shared'

test('portal resolves the shared workspace package', () => {
  expect(appName).toBe('ReactJS Archetype')
})

test('portal links to the local dashboard module in development', () => {
  expect(getDashboardUrl(true)).toBe('http://localhost:5174/dashboard/')
})
