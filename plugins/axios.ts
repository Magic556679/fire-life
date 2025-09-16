import axios from 'axios'
import storage from '@/utils/storage'

const basePath = import.meta.env.VITE_SERVER_BASE_API
const localhostPath = import.meta.env.VITE_SERVER_LOCALHOST

const service = axios.create({
  baseURL: import.meta.env.DEV ? localhostPath : basePath,
  headers: {
    accept: 'application/json',
  },
  timeout: 30000,
})
service.interceptors.request.use(
  config => {
    const token = storage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    const headers = response.headers

    const token = headers['refresh-token']

    if (token) {
      storage.setToken(token)
    }

    return response
  },
  error => {
    const headers = error.response.headers

    const token = headers['refresh-token']

    if (token) {
      storage.setToken(token)
    }

    return Promise.reject(error)
  },
)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: service,
    },
  }
})
