# Architecture

## 技術架構

### 核心框架

| 技術 | 版本 | 用途 |
|------|------|------|
| Nuxt | 3.17.4 | 全端框架（SSR + CSR） |
| Vue | 3.5.15 | UI 框架 |
| TypeScript | 5.8.3 | 型別安全 |

### UI / 樣式

| 技術 | 版本 | 用途 |
|------|------|------|
| @nuxt/ui | 3.3.7 | 元件庫（Headless UI） |
| Tailwind CSS | 4.1.8 | Utility-first 樣式 |
| SASS | 1.92.1 | CSS 預處理器 |
| Swiper | 11.2.10 | 輪播元件 |

### 狀態管理 / 資料

| 技術 | 版本 | 用途 |
|------|------|------|
| Pinia | 3.0.3 | 全域狀態管理 |
| pinia-plugin-persistedstate | 4.5.0 | Store 持久化（localStorage） |
| Axios | 1.11.0 | HTTP 客戶端 |
| Zod | 4.1.8 | Schema 驗證 |

### 編輯器 / 媒體

| 技術 | 版本 | 用途 |
|------|------|------|
| @tiptap/vue-3 | 3.4.3 | 富文字編輯器 |
| @nuxt/image | 1.10.0 | 圖片優化 |
| @nuxt/icon | 1.13.0 | Icon 庫 |

---

## 路由表

| 路徑 | Layout | 中介層 | SSR |
|------|--------|--------|-----|
| `/` | default | — | ✅ |
| `/about` | default | — | ✅ |
| `/contact` | default | — | ✅ |
| `/service` | default | — | ✅ |
| `/process` | default | — | ✅ |
| `/works` | default | — | ✅ |
| `/blog` | default | — | ✅ |
| `/blog/:id/:slug` | default | — | ✅ |
| `/products` | default | — | ✅ |
| `/products/:id` | default | — | ✅ |
| `/cart` | default | — | ✅ |
| `/cart/checkout` | default | — | ✅ |
| `/demo/personal` | personal | — | ✅ |
| `/demo/counseling` | counseling | — | ✅ |
| `/demo/gym` | gym | — | ✅ |
| `/admin/login` | admin-login | guest | ❌ |
| `/admin` | admin | auth | ❌ |
| `/admin/posts/**` | admin | auth | ❌ |
| `/admin/products/**` | admin | auth | ❌ |
| `/admin/orders/**` | admin | auth | ❌ |

---

## 狀態管理

### adminAuthStore（`stores/adminAuth.ts`）

```typescript
State:
  user: { token: string, id: number, name: string, email: string } | null

Getters:
  isLoggedIn: boolean  // user !== null

Actions:
  setUser(user): 儲存使用者資料
  logout(): 清除 user（自動清除 localStorage）

Persistence: localStorage key 'fire-life-auth'
```

### cartStore（`stores/cart.ts`）

```typescript
State:
  guestToken: string    // 訪客識別 token（UUID）
  userToken: string     // 已登入使用者 token
  cartId: number | null
  items: CartItem[]

Getters:
  hasToken: boolean
  findItem(productId): CartItem | undefined
  cartItemCount: number

Actions:
  setCartData(data): 同步 API 回傳的購物車資料
  updateItemQuantity(id, quantity): 更新本地項目數量
  removeItem(productId): 移除本地項目

Persistence: localStorage key 'guest-cart'
```

### menuStore（`stores/menu.ts`）

後台側邊欄選單結構，含 `findBreadcrumbPath(items, path)` DFS 搜尋麵包屑。

---

## 資料流

### Axios Plugin 攔截器

```
請求發出
  └─ 自動附加 Authorization: Bearer {adminToken}（來自 adminAuthStore）
  └─ 自動附加 X-Guest-Token: {guestToken}（來自 cartStore）
```

### 購物流程

```
GET /products → ProductCard → 點擊加入購物車
  → POST /cart/items (X-Guest-Token)
  → cartStore.setCartData() 更新本地狀態
  → Header CartBadge 顯示數量
```

### 付款流程

```
POST /order → 取得 order_no
  → POST /orders/{no}/checkout → 回傳 HTML form → form.submit() → 綠界
  → ECPay POST /payments/ecpay/callback → 驗簽 → 更新 status=paid
```

### 後台圖片上傳

```
前端 FileReader 產生預覽（blob URL）
  → 送出表單
  → FormData 含圖片 File 物件
  → POST /admin/products (multipart)
  → 後端回傳 ProductImage[]
```

---

## 待完成項目

| 項目 | 說明 |
|------|------|
| 超商取貨（`store_info`） | payload 支援，前台無選擇 UI |
| 購物車下單後未清空 | 結帳後 cartStore 不清除 |
| 訂單確認頁 | 結帳後無確認頁面 |
| 訂單管理後台 | `/admin/orders` 尚未完整實作 |
| 錯誤處理統一 | 部分 API 錯誤僅 console.log，應統一顯示 Toast |
