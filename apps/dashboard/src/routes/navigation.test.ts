import { expect, test } from 'bun:test'
import { moduleNavigation } from './navigation'

test('dashboard exposes the expected module menu routes', () => {
  expect(moduleNavigation.map((item) => item.href)).toEqual([
    '/modules',
    '/reports',
    '/services',
    '/settings',
  ])
})
