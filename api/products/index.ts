import { z } from 'zod'

import {
  ProductsApiResponseSchema,
  type BaseProduct,
  type ProductsResponse,
  type Product,
  type ProductCreate,
  type ProductImage,
  type CreateProductResponse,
  type UpdateProductResponse,
  type DeleteProductResponse,
} from '~/api/products/schema'

export type { ProductsResponse, Product }

export const getProducts = async ({
  page = 1,
  perPage = 10,
}): Promise<ProductsResponse> => {
  const { $api } = useNuxtApp()

  try {
    const res = await $api.get('/admin/products', {
      params: {
        page,
        per_page: perPage,
      },
    })
    const validatedResponse = ProductsApiResponseSchema.parse(res.data)

    return validatedResponse.data
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation failed:', error.issues)
      throw new Error('API 回傳資料格式不正確')
    }
    console.error('API request failed:', error)
    throw error
  }
}

interface FetchProductsParams {
  page?: number
  perPage?: number
  productType?: 'physical' | 'digital'
}
export const fetchPublicProducts = async ({
  page = 1,
  perPage = 10,
  productType,
}: FetchProductsParams): Promise<ProductsResponse> => {
  const { $api } = useNuxtApp()

  const res = await $api.get('/products', {
    params: {
      page,
      per_page: perPage,
      // 只有當 productType 有值時才傳遞這個參數
      ...(productType && { product_type: productType }),
    },
  })

  try {
    const validatedResponse = ProductsApiResponseSchema.parse(res.data)

    return validatedResponse.data
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error('詳細錯誤 Issues:', e.issues)
      throw new Error('API 回傳資料格式不正確')
    }

    console.error('其他 API 處理錯誤:', e)
    throw e
  }
}

type ProductAPIPayload = ProductCreate | FormData
export const createProduct = async (payload: ProductAPIPayload) => {
  const { $api } = useNuxtApp()

  try {
    const res = await $api.post<CreateProductResponse>(
      '/admin/products',
      payload,
    )

    return { data: res.data, status: res.status }
  } catch (e) {
    console.error('Failed to create product:', e)
    throw e
  }
}

export const updateProduct = async (payload: FormData) => {
  const { $api } = useNuxtApp()

  const productId = payload.get('id')

  if (!productId || typeof productId !== 'string') {
    throw new Error('FormData 中缺少有效的商品 ID。')
  }

  try {
    const res = await $api.post<UpdateProductResponse>(
      `/admin/products/${productId}`,
      payload,
    )
    return { data: res.data, status: res.status }
  } catch (e) {
    console.error(e)
  }
}

export const deleteProduct = async (id: number) => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.delete<DeleteProductResponse>(
      `/admin/products/${id}`,
    )
    return { data: res.data, status: res.status }
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * @interface ProductDetail
 * 商品詳細資料的介面，繼承 BaseProduct 並確保 images 包含完整的 ProductImage 結構。
 */
export interface ProductDetail extends BaseProduct {
  id: number
  images: ProductImage[]
  created_at: string
  updated_at: string
}

/**
 * @interface FetchProductByIdResponse
 * 獲取單一商品詳細資料的 API 回應格式
 */
interface FetchProductByIdResponse {
  data: ProductDetail // API 返回 ProductDetail 格式
}
export const fetchProductById = async (productId: string | number | null) => {
  const { $api } = useNuxtApp()

  try {
    const { data } = await $api.get<FetchProductByIdResponse>(
      `/products/${productId}`,
    )

    return data.data
  } catch (e: unknown) {
    console.error(e)
    throw e
  }
}
