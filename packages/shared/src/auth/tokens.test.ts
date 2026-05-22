import { afterEach, expect, test } from 'bun:test'
import {
  clearAuthTokens,
  getAuthTokens,
  hasAccessToken,
  saveAuthTokens,
} from './tokens'

const originalWindow = globalThis.window

function installWindowStorage() {
  const storage = new Map<string, string>()

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        removeItem: (key: string) => storage.delete(key),
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
  })
}

afterEach(() => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: originalWindow,
  })
})

test('stores and clears auth tokens in localStorage', () => {
  installWindowStorage()

  saveAuthTokens({
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  })

  expect(hasAccessToken()).toBe(true)
  expect(getAuthTokens()).toEqual({
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  })

  clearAuthTokens()

  expect(hasAccessToken()).toBe(false)
  expect(getAuthTokens()).toBeUndefined()
})
