import { z } from 'zod'
import type {
  CreateOrderPayload,
  AdminOrderDetail,
  AdminOrdersResponse,
  OrderResult,
} from '~/api/order/schema'
import {
  adminOrderDetailResponseSchema,
  adminOrdersResponseSchema,
  orderResultSchema,
} from '~/api/order/schema'

export type {
  CreateOrderPayload,
  AdminOrderDetail,
  AdminOrder,
  AdminOrdersResponse,
  OrderResult,
} from '~/api/order/schema'
export { createOrderSchema } from '~/api/order/schema'

export const createOrder = async (orderPayload: CreateOrderPayload) => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.post('/order', orderPayload)
    return { data: res.data, status: res.status }
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export const checkoutOrder = async (orderNo: string): Promise<string> => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.post(
      `/orders/${orderNo}/checkout`,
      {},
      { responseType: 'text' },
    )
    return res.data as string
  } catch (error) {
    console.error('Error during checkout:', error)
    throw error
  }
}

export const getAdminOrderById = async (
  id: string | number,
): Promise<AdminOrderDetail> => {
  const { $api } = useNuxtApp()
  const res = await $api.get(`/admin/orders/${id}`)
  const result = adminOrderDetailResponseSchema.safeParse(res.data)
  if (!result.success) {
    console.error('Zod validation failed:', result.error.issues)
  }
  return (result.success ? result.data.data : res.data.data) as AdminOrderDetail
}

export const getAdminOrders = async ({
  page = 1,
  perPage = 10,
}: {
  page?: number
  perPage?: number
} = {}): Promise<AdminOrdersResponse> => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.get('/admin/orders', {
      params: { page, per_page: perPage },
    })
    return adminOrdersResponseSchema.parse(res.data).data
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation failed:', error.issues)
      throw new Error('API 回傳資料格式不正確')
    }
    console.error('API request failed:', error)
    throw error
  }
}

export const getOrderResult = async (
  paymentTradeNo: string,
): Promise<OrderResult> => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.get(`/orders/${paymentTradeNo}/result`)
    return orderResultSchema.parse(res.data).data
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation failed:', error.issues)
      throw new Error('API 回傳資料格式不正確')
    }
    console.error('Error fetching order result:', error)
    throw error
  }
}
