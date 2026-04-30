import { z } from 'zod'

// Define the schema for the order payload
export const createOrderSchema = z.object({
  buyer_name: z.string(),
  buyer_email: z.string().email(),
  buyer_phone: z.string().regex(/^09\d{8}$/, 'Invalid phone number format'), // Assuming Taiwan phone number format
  items: z.array(
    z.object({
      product_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
  delivery_type: z.enum(['physical', 'digital']), // Assuming these are the only two types
  store_info: z
    .object({
      store_id: z.string(),
      store_name: z.string(),
    })
    .optional(), // Making store_info optional as it might only apply to physical delivery
})

export type CreateOrderPayload = z.infer<typeof createOrderSchema>

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

const orderResultItemSchema = z.object({
  type: z.string().nullable(),
  price: z.preprocess(val => Number(val), z.number()),
  title: z.string(),
  quantity: z.number(),
  product_id: z.number(),
})

const orderResultSchema = z.object({
  data: z.object({
    order_no: z.string(),
    // payment_trade_no: z.string(), ❌ 刪掉或 optional
    buyer_name: z.string(),
    buyer_email: z.string(),
    buyer_phone: z.string().nullable(),
    total_amount: z.number(),
    status: z.string(),
    paid_at: z.string().nullable(),
    items_snapshot: z.array(orderResultItemSchema),
    store_info: z
      .object({
        store_id: z.string(),
        store_name: z.string(),
      })
      .nullable(),
  }),
})

export type OrderResult = z.infer<typeof orderResultSchema>['data']

/**
 * Order Item
 */
export const orderItemSchema = z.object({
  type: z.string().nullable(),
  price: z.string(),
  title: z.string(),
  quantity: z.number(),
  product_id: z.number(),
})

/**
 * Admin Order Detail Item
 */
const adminOrderDetailItemSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  delivery_type: z.string(),
  price: z.number(),
  quantity: z.number(),
  subtotal: z.number(),
  product: z.object({
    id: z.number(),
    title: z.string(),
  }),
})

/**
 * Admin Order Detail
 */
const adminOrderDetailSchema = z.object({
  id: z.number(),
  order_no: z.string(),
  payment_trade_no: z.string().nullable(),
  ecpay_trade_no: z.string().nullable(),
  status: z.string(),
  total_amount: z.number(),
  paid_at: z.string().nullable(),
  buyer_name: z.string(),
  buyer_email: z.string(),
  buyer_phone: z.string().nullable(),
  store_info: z
    .object({ store_id: z.string(), store_name: z.string() })
    .nullable(),
  items_snapshot: z.array(orderItemSchema),
  items: z.array(adminOrderDetailItemSchema),
  created_at: z.string(),
})

const adminOrderDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: adminOrderDetailSchema,
})

export type AdminOrderDetail = z.infer<typeof adminOrderDetailSchema>

export const getAdminOrderById = async (
  id: string | number,
): Promise<AdminOrderDetail> => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.get(`/admin/orders/${id}`)
    return adminOrderDetailResponseSchema.parse(res.data).data
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation failed:', error.issues)
      throw new Error('API 回傳資料格式不正確')
    }
    throw error
  }
}

/**
 * Order (API 原始格式)
 */
export const adminOrderSchema = z.object({
  id: z.number(),
  order_no: z.string(),
  user_id: z.number().nullable().optional(),
  status: z.string(),
  buyer_name: z.string(),
  buyer_email: z.string(),
  buyer_phone: z.string().nullable(),

  items_snapshot: z.array(orderItemSchema),
})

/**
 * Pagination
 */
export const paginationSchema = z.object({
  current_page: z.number(),
  data: z.array(adminOrderSchema),
})

/**
 * API Response
 */
export const adminOrdersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: paginationSchema,
})

export type AdminOrder = z.infer<typeof adminOrderSchema>
export type AdminOrdersResponse = z.infer<typeof paginationSchema>

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
    console.error('Error fetching order result:', error)
    throw error
  }
}
