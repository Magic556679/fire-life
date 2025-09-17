import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

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
    const auth = useAuthStore()
    const token = auth.user?.token

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
    return response
  },
  error => {
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
