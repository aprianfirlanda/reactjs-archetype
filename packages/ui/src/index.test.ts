import { expect, test } from 'bun:test'
import { uiPackageName } from './index'

test('exports the UI package name', () => {
  expect(uiPackageName).toBe('@reactjs-archetype/ui')
})
