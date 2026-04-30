import { z } from 'zod'

import { CartApiResponseSchema } from '~/api/cart/schema'
import type { CartResponse } from '~/api/cart/schema'

export const getCart = async (): Promise<CartResponse> => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.get('/cart')
    const validatedResponse = CartApiResponseSchema.parse(res.data)

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

export const addCartItem = async (productId: number, quantity: number) => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.post('/cart/items', {
      product_id: productId,
      quantity,
    })

    return { data: res.data, status: res.status }
  } catch (error) {
    console.error(error)
  }
}

export const updateCartItemQuantity = async (
  productId: number,
  quantity: number,
) => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.patch(`/cart/items/${productId}`, { quantity })
    return { data: res }
  } catch (error) {
    console.error(error)
  }
}

export const deleteCartItem = async (productId: number) => {
  const { $api } = useNuxtApp()
  try {
    const res = await $api.delete(`/cart/items/${productId}`)
    return { data: res }
  } catch (error) {
    console.error(error)
    throw error
  }
}
