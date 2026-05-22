import { afterEach, expect, test } from 'bun:test'
import { ApiError, apiFetch, buildBackendUrl } from './http'

const originalWindow = globalThis.window

function installTokenStorage(accessToken: string) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) =>
          key === 'access_token'
            ? accessToken
            : key === 'refresh_token'
              ? 'refresh-token'
              : null,
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

test('builds backend proxy urls', () => {
  expect(buildBackendUrl('/modules')).toBe('/backend/modules')
  expect(buildBackendUrl('modules')).toBe('/backend/modules')
  expect(buildBackendUrl('/backend/modules')).toBe('/backend/modules')
})

test('attaches access token and parses json responses', async () => {
  installTokenStorage('access-token')
  const seenHeaders: string[] = []

  const result = await apiFetch<{ ok: boolean }>('/modules', {
    body: { page: 1 },
    method: 'POST',
    fetcher: async (_input, init) => {
      const headers = new Headers(init?.headers)
      seenHeaders.push(headers.get('Authorization') ?? '')
      seenHeaders.push(headers.get('Content-Type') ?? '')

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'content-type': 'application/json' },
        status: 200,
      })
    },
  })

  expect(result).toEqual({ ok: true })
  expect(seenHeaders).toEqual(['Bearer access-token', 'application/json'])
})

test('throws typed api errors for failed responses', async () => {
  const request = apiFetch('/modules', {
    fetcher: async () =>
      new Response(JSON.stringify({ message: 'Invalid request' }), {
        headers: { 'content-type': 'application/json' },
        status: 400,
        statusText: 'Bad Request',
      }),
  })

  await expect(request).rejects.toBeInstanceOf(ApiError)
  await expect(request).rejects.toMatchObject({
    body: { message: 'Invalid request' },
    status: 400,
  })
})
