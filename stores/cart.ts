import { defineStore } from 'pinia'
import type { CartItem, CartResponse } from '~/api/cart/schema'

export const useCartStore = defineStore('cart', {
  state: () => ({
    guestToken: '' as string,
    userToken: '' as string, // 會員系統使用
    cartId: null as number | null,
    items: [] as CartItem[],
  }),
  getters: {
    hasToken: state => !!state.guestToken || !!state.userToken,
    findItem: state => {
      return (productId: number) =>
        state.items.find(item => item.id === productId)
    },
    cartItemCount: state => state.items.length,
  },
  actions: {
    setCartData(data: CartResponse) {
      this.guestToken = data.guest_token
      this.cartId = data.id
      this.items = data.items
    },
    updateItemQuantity(id: number, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    removeItem(productId: number) {
      this.items = this.items.filter(item => item.id !== productId)
    },
  },
  persist: {
    key: 'guest-cart',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})
