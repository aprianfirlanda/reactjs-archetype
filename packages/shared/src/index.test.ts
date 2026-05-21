import { expect, test } from 'bun:test'
import { appName, getDashboardUrl } from './index'

test('exports the app name', () => {
  expect(appName).toBe('ReactJS Archetype')
})

test('resolves dashboard URLs by environment', () => {
  expect(getDashboardUrl(true)).toBe('http://localhost:5174/dashboard/')
  expect(getDashboardUrl(false)).toBe('/dashboard/')
})
