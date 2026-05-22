export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

const accessTokenKey = 'access_token'
const refreshTokenKey = 'refresh_token'

function getStorage() {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.localStorage
}

export function getAuthTokens(): AuthTokens | undefined {
  const storage = getStorage()

  if (!storage) {
    return undefined
  }

  const accessToken = storage.getItem(accessTokenKey)
  const refreshToken = storage.getItem(refreshTokenKey)

  if (!accessToken || !refreshToken) {
    return undefined
  }

  return { accessToken, refreshToken }
}

export function getAccessToken() {
  return getStorage()?.getItem(accessTokenKey) ?? undefined
}

export function hasAccessToken() {
  return Boolean(getAccessToken())
}

export function saveAuthTokens(tokens: AuthTokens) {
  const storage = getStorage()

  if (!storage) {
    return
  }

  storage.setItem(accessTokenKey, tokens.accessToken)
  storage.setItem(refreshTokenKey, tokens.refreshToken)
}

export function saveTemplateSession() {
  saveAuthTokens({
    accessToken: 'template-access-token',
    refreshToken: 'template-refresh-token',
  })
}

export function clearAuthTokens() {
  const storage = getStorage()

  if (!storage) {
    return
  }

  storage.removeItem(accessTokenKey)
  storage.removeItem(refreshTokenKey)
}
