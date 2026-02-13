import axios from 'axios'
import { useAdminAuthStore } from '~/stores/adminAuth'
import { useCartStore } from '~/stores/cart'

// const basePath = import.meta.env.VITE_SERVER_BASE_API
// const localhostPath = import.meta.env.VITE_SERVER_LOCALHOST

const API_BASE = import.meta.env.DEV
  ? 'http://127.0.0.1:8000/api/'
  : 'https://firelifedev.com/api/'

const service = axios.create({
  // baseURL: import.meta.env.DEV ? localhostPath : basePath,
  baseURL: API_BASE,
  headers: {
    accept: 'application/json',
  },
  timeout: 30000,
})
service.interceptors.request.use(
  config => {
    const auth = useAdminAuthStore()
    const cart = useCartStore()

    const adminAuth = auth.user?.token

    // 後台登入
    if (adminAuth) {
      config.headers.Authorization = `Bearer ${adminAuth}`
    }

    // 前台購物車
    if (cart.guestToken) {
      config.headers['X-Guest-Token'] = cart.guestToken
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
