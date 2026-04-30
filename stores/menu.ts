import { defineStore } from 'pinia'

export interface NavigationItem {
  label: string
  icon?: string
  defaultOpen?: true
  to?: string
  children?: NavigationItem[]
  active?: true
}

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<NavigationItem[]>([
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      to: '/admin',
    },
    {
      label: '內容管理',
      icon: 'i-lucide-file-text',
      defaultOpen: true,
      children: [
        {
          label: '文章列表',
          icon: 'i-lucide-list',
          to: '/admin/posts',
          //   active: true,
        },
        {
          label: '新增文章',
          icon: 'i-lucide-file-plus',
          to: '/admin/posts/create',
        },
      ],
    },
    {
      label: '電商管理',
      icon: 'i-lucide-shopping-cart',
      defaultOpen: true,
      children: [
        {
          label: '商品管理',
          icon: 'i-lucide-box',
          to: '/admin/products',
        },
        {
          label: '新增商品',
          icon: 'i-lucide-plus-square',
          to: '/admin/products/create',
        },
        {
          label: '訂單管理',
          icon: 'i-lucide-package',
          to: '/admin/orders',
        },
      ],
    },
  ])

  const findBreadcrumbPath = (
    items: NavigationItem[],
    currentPath: string,
    trail: NavigationItem[] = [],
  ): NavigationItem[] | null => {
    // 深度優先搜尋（DFS, Depth-First Search）
    // 使用 trail 參數來追蹤目前的路徑
    for (const item of items) {
      const newTrail = [...trail, item]
      if (item.to === currentPath) return newTrail
      if (item.children) {
        const found = findBreadcrumbPath(item.children, currentPath, newTrail)
        if (found) return found
      }
    }
    return null
  }

  return {
    menu,
    findBreadcrumbPath,
  }
})
