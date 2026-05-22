import { getAccessToken } from '../auth/tokens'

type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown> | unknown[]
  fetcher?: Fetcher
}

export class ApiError extends Error {
  readonly body: unknown
  readonly status: number

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export function buildBackendUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  if (path.startsWith('/backend')) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `/backend${normalizedPath}`
}

async function parseResponseBody(response: Response) {
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

function isPlainJsonBody(body: ApiRequestOptions['body']) {
  return Boolean(
    body &&
      typeof body === 'object' &&
      !(body instanceof FormData) &&
      !(body instanceof URLSearchParams) &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer),
  )
}

export async function apiFetch<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { body, fetcher = fetch, headers, ...init } = options
  const requestHeaders = new Headers(headers)
  const accessToken = getAccessToken()

  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`)
  }

  const requestInit: RequestInit = {
    ...init,
    headers: requestHeaders,
  }

  if (body !== undefined) {
    if (isPlainJsonBody(body)) {
      requestHeaders.set('Content-Type', 'application/json')
      requestInit.body = JSON.stringify(body)
    } else {
      requestInit.body = body as BodyInit
    }
  }

  const response = await fetcher(buildBackendUrl(path), requestInit)
  const responseBody = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError(
      response.statusText || 'Request failed',
      response.status,
      responseBody,
    )
  }

  return responseBody as TResponse
}
