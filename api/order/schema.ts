import { z } from 'zod'

// ------------------------------
// Create Order
// ------------------------------
export const createOrderSchema = z.object({
  buyer_name: z.string(),
  buyer_email: z.string().email(),
  buyer_phone: z.string().regex(/^09\d{8}$/, 'Invalid phone number format'),
  items: z.array(
    z.object({
      product_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
  delivery_type: z.enum(['physical', 'digital']),
  store_info: z
    .object({
      store_id: z.string(),
      store_name: z.string(),
    })
    .optional(),
})

export type CreateOrderPayload = z.infer<typeof createOrderSchema>

// ------------------------------
// Order Item (items_snapshot)
// ------------------------------
export const orderItemSchema = z.object({
  type: z.string().nullable(),
  price: z.preprocess(val => Number(val), z.number()),
  title: z.string(),
  quantity: z.number(),
  product_id: z.number(),
})

// ------------------------------
// Order Result
// ------------------------------
export const orderResultSchema = z.object({
  data: z.object({
    order_no: z.string(),
    buyer_name: z.string(),
    buyer_email: z.string(),
    buyer_phone: z.string().nullable(),
    total_amount: z.number(),
    status: z.string(),
    paid_at: z.string().nullable(),
    items_snapshot: z.array(orderItemSchema),
    store_info: z
      .object({
        store_id: z.string(),
        store_name: z.string(),
      })
      .nullable(),
  }),
})

export type OrderResult = z.infer<typeof orderResultSchema>['data']

// ------------------------------
// Admin Order Detail
// ------------------------------
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

export const adminOrderDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: adminOrderDetailSchema,
})

export type AdminOrderDetail = z.infer<typeof adminOrderDetailSchema>

// ------------------------------
// Admin Orders List
// ------------------------------
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

export const paginationSchema = z.object({
  current_page: z.number(),
  data: z.array(adminOrderSchema),
})

export const adminOrdersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: paginationSchema,
})

export type AdminOrder = z.infer<typeof adminOrderSchema>
export type AdminOrdersResponse = z.infer<typeof paginationSchema>
