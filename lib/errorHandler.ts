import { AxiosError } from 'axios'

interface ServerErrorResponse {
  error?: string
  [key: string]: unknown
}

interface ErrorLog {
  message: string
  data?: unknown
  retryAfter?: string
}

export const handleErrorByStatus = (error: AxiosError<ServerErrorResponse>): void => {
  const status = error.response?.status
  const errorMessage = error.response?.data?.error || error.message || 'Network error'
  const method = error.config?.method?.toUpperCase()
  const url = error.config?.url

  const errorLog: ErrorLog = {
    message: errorMessage,
    data: error.response?.data,
  }

  switch (status) {
    case 400:
      console.error(`🔴 [400 Bad Request] ${method} ${url}`, errorLog)
      break
    case 401:
      window.location.replace('auth/login')
      break
    case 403:
      console.error(`🔴 [403 Forbidden] ${method} ${url}`, errorLog)
      break
    case 404:
      console.warn(`🟡 [404 Not Found] ${method} ${url}`, errorLog)
      break
    case 409:
      console.warn(`🟡 [409 Conflict] ${method} ${url}`, errorLog)
      break
    case 422:
      console.warn(`🟡 [422 Unprocessable Entity] ${method} ${url}`, errorLog)
      break
    case 429:
      console.warn(`🟡 [429 Too Many Requests] ${method} ${url}`, {
        message: errorMessage,
        retryAfter: error.response?.headers['retry-after'],
      })
      break
    case 500:
      console.error(`🔴 [500 Internal Server Error] ${method} ${url}`, errorLog)
      break
    case 502:
      console.error(`🔴 [502 Bad Gateway] ${method} ${url}`, {
        message: errorMessage,
      })
      break
    case 503:
      console.error(`🔴 [503 Service Unavailable] ${method} ${url}`, {
        message: errorMessage,
      })
      break
    default:
      if (status) {
        console.error(`🔴 [${status} Error] ${method} ${url}`, errorLog)
      } else {
        console.error('🔴 [Network Error]', {
          message: errorMessage,
        })
      }
  }
}
