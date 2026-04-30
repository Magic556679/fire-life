import { z } from 'zod'
import { ProductImageSchema } from '~/api/products/schema'

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.array(ProductImageSchema),
  stock: z.number().nullable().optional(),
  product_type: z.enum(['physical', 'digital']).optional(),
})

const CartItemSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  price: z.number(),
  subtotal: z.number(),
  product: ProductSchema,
})
export type CartItem = z.infer<typeof CartItemSchema>

const CartDataSchema = z.object({
  id: z.number(),
  guest_token: z.string(),
  items: z.array(CartItemSchema),
  total: z.number(),
})
export type CartResponse = z.infer<typeof CartDataSchema>

export const CartApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: CartDataSchema,
})
