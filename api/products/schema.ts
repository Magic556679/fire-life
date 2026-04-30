import { z } from 'zod'

// ------------------------------
// Shared Helpers
// ------------------------------
const numericString = z
  .union([z.number(), z.string()])
  .nullable()
  .optional()
  .transform(val =>
    val === null || val === undefined || val === '' ? undefined : Number(val),
  )

const numericBoolean = z
  .union([z.boolean(), z.number()])
  .transform(val => val === 1 || val === true)

// ------------------------------
// Product Image
// ------------------------------
export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  sort_order: number
  created_at: string
  updated_at: string
}

export const ProductImageSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  image_url: z.string().url(),
  sort_order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

// ------------------------------
// Base Product (Shared Structure)
// ------------------------------
export const BaseProductSchema = z.object({
  title: z.string().min(1, '請輸入商品名稱'),
  description: z.string().nullable().optional(),
  product_type: z.enum(['physical', 'digital']),
  stock: z.number().nullable().optional(),
  price: z.preprocess(
    val => (typeof val === 'string' ? Number(val) : val),
    z.number().min(0, '價格不能為負數'),
  ),
  special_price: numericString.optional(),
  status: z.enum(['active', 'inactive']),
  is_favorites: numericBoolean,
  images: z.array(ProductImageSchema).optional().nullable(),
})

export type BaseProduct = z.infer<typeof BaseProductSchema>

// ------------------------------
// Product (Full Schema)
// ------------------------------
export const ProductSchema = BaseProductSchema.extend({
  id: z.number(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type Product = z.infer<typeof ProductSchema>

// ------------------------------
// Pagination
// ------------------------------
export const PaginationSchema = z.object({
  current_page: z.number(),
  data: z.array(ProductSchema),
  total: z.number(),
  per_page: z.number(),
  first_page_url: z.string().nullable(),
  from: z.number().nullable(),
  last_page: z.number(),
  last_page_url: z.string().nullable(),
  links: z.array(
    z.object({
      url: z.string().nullable(),
      label: z.string(),
      active: z.boolean(),
    }),
  ),
  next_page_url: z.string().nullable(),
  path: z.string(),
  prev_page_url: z.string().nullable(),
  to: z.number().nullable(),
})

export type ProductsResponse = z.infer<typeof PaginationSchema>

// ------------------------------
// Create Product
// ------------------------------
export const ProductCreateSchema = BaseProductSchema.superRefine(
  (data, ctx) => {
    if (data.product_type === 'physical') {
      if (data.stock === null || data.stock === undefined || data.stock < 0) {
        ctx.addIssue({
          code: 'custom',
          message: '實體商品請填寫庫存，且不能為負',
          path: ['stock'],
        })
      }
    }
  },
)

export type ProductCreate = z.infer<typeof ProductCreateSchema>

export const CreateProductResponseSchema = z.object({
  // id: z.number(),
  success: z.boolean(),
  message: z.string(),
  product: ProductSchema,
})
export type CreateProductResponse = z.infer<typeof CreateProductResponseSchema>

// ------------------------------
// Update / Delete Response
// ------------------------------
export const UpdateProductResponseSchema = z.object({
  // id: z.number(),
  success: z.boolean(),
  message: z.string(),
  product: ProductSchema,
})
export type UpdateProductResponse = z.infer<typeof UpdateProductResponseSchema>

export const DeleteProductResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
export type DeleteProductResponse = z.infer<typeof DeleteProductResponseSchema>

// ------------------------------
// API Response Wrapper
// ------------------------------
export const ProductsApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: PaginationSchema,
})
