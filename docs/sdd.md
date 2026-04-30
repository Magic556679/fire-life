# Software Design Document (SDD)

**Project:** Fire Life
**Version:** 1.0
**Date:** 2026-04-01
**Branch:** feature/cart

---

## Table of Contents

1. [專案概覽](#1-專案概覽)
2. [技術架構](#2-技術架構)
3. [專案架構](#3-專案架構)
4. [功能模組](#4-功能模組)
5. [API 設計](#5-api-設計)
6. [資料流](#6-資料流)
7. [使用者流程](#7-使用者流程)
8. [狀態管理](#8-狀態管理)
9. [路由與中介層](#9-路由與中介層)
10. [元件架構](#10-元件架構)

---

## 1. 專案概覽

Fire Life 是一個以 Nuxt 3 為基礎的全端網頁應用程式，同時作為：

- **個人作品集 / 服務介紹網站** — 展示網頁設計服務、作品、流程
- **電商平台** — 提供實體/數位商品販售、購物車、結帳
- **後台管理系統 (CMS)** — 管理部落格文章與商品

專案同時內建三套 Demo 網站（個人品牌、諮商診所、健身房），用於展示設計能力。

---

## 2. 技術架構

### 核心框架

| 技術 | 版本 | 用途 |
|------|------|------|
| Nuxt | 3.17.4 | 全端框架（SSR + CSR） |
| Vue | 3.5.15 | UI 框架 |
| TypeScript | 5.8.3 | 型別安全 |
| Vite | — | 建構工具 |

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
| @tiptap/starter-kit | 3.4.3 | TipTap 基本擴充套件 |
| @tiptap/extension-code-block-lowlight | 3.4.4 | 程式碼高亮 |
| @nuxt/image | 1.10.0 | 圖片優化 |
| @nuxt/icon | 1.13.0 | Icon 庫 |

### 分析 / 工具

| 技術 | 版本 | 用途 |
|------|------|------|
| nuxt-gtag | 4.1.0 | Google Analytics 4 (G-V06F0B39CN) |
| ESLint | 9.27.0 | 程式碼檢查 |
| Prettier | 3.5.3 | 程式碼格式化 |

### 渲染策略

- 前台公開頁面：**SSR**（Server-Side Rendering）
- 後台 `/admin/**`：**CSR**（Client-Side Rendering，`ssr: false`）

---

## 3. 專案架構

```
fire-life/
├── api/                          # API 呼叫函式（按資源分類）
│   ├── auth/
│   │   └── login.ts              # 登入 / 登出
│   ├── post/
│   │   ├── getPosts.ts           # 取得文章列表
│   │   ├── getPost.ts            # 取得單篇文章
│   │   ├── createPost.ts         # 建立文章
│   │   ├── updatePost.ts         # 更新文章
│   │   └── deletePost.ts         # 刪除文章
│   ├── product/
│   │   ├── getProducts.ts        # 取得商品列表（公開）
│   │   ├── getProduct.ts         # 取得商品詳情
│   │   ├── getAdminProducts.ts   # 取得商品列表（後台）
│   │   ├── createProduct.ts      # 建立商品
│   │   ├── updateProduct.ts      # 更新商品
│   │   └── deleteProduct.ts      # 刪除商品
│   ├── cart/
│   │   ├── getCart.ts            # 取得購物車
│   │   ├── addCartItem.ts        # 新增購物車項目
│   │   ├── updateCartItem.ts     # 更新數量
│   │   └── deleteCartItem.ts     # 刪除項目
│   ├── order/
│   │   └── createOrder.ts        # 建立訂單
│   └── upload/
│       └── uploadImage.ts        # 圖片上傳
│
├── pages/                        # 頁面路由（檔案路由）
│   ├── index.vue                 # 首頁
│   ├── about/index.vue           # 關於
│   ├── contact/index.vue         # 聯絡
│   ├── service/index.vue         # 服務
│   ├── process/index.vue         # 流程
│   ├── works/index.vue           # 作品集
│   ├── blog/
│   │   ├── index.vue             # 部落格列表
│   │   └── [id]/[slug].vue       # 文章詳情
│   ├── products/
│   │   ├── index.vue             # 商品列表
│   │   └── [id].vue              # 商品詳情
│   ├── cart/
│   │   ├── index.vue             # 購物車
│   │   └── checkout.vue          # 結帳
│   ├── demo/
│   │   ├── personal.vue          # Demo：個人品牌
│   │   ├── counseling.vue        # Demo：諮商診所
│   │   └── gym.vue               # Demo：健身房
│   └── admin/
│       ├── login.vue             # 後台登入
│       ├── index.vue             # 後台儀表板
│       ├── posts/
│       │   ├── index.vue         # 文章管理列表
│       │   ├── create.vue        # 建立文章
│       │   └── edit/[id].vue     # 編輯文章
│       ├── products/
│       │   ├── index.vue         # 商品管理列表
│       │   ├── create.vue        # 建立商品
│       │   └── edit/[id].vue     # 編輯商品
│       └── orders/
│           └── index.vue         # 訂單管理
│
├── components/                   # 可複用元件
│   ├── layout/                   # 前台版面元件
│   ├── admin/                    # 後台版面元件
│   ├── blog/                     # 部落格元件
│   ├── product/                  # 商品元件
│   ├── sections/                 # 前台區塊元件
│   ├── personal/                 # Demo 個人品牌元件
│   ├── counseling/               # Demo 諮商診所元件
│   └── gym/                      # Demo 健身房元件
│
├── layouts/                      # 版面框架
│   ├── default.vue               # 前台主版面
│   ├── admin.vue                 # 後台版面
│   ├── admin-login.vue           # 後台登入版面
│   ├── personal.vue              # Demo 個人品牌
│   ├── counseling.vue            # Demo 諮商診所
│   └── gym.vue                   # Demo 健身房
│
├── middleware/
│   ├── auth.ts                   # 保護後台路由
│   └── guest.ts                  # 阻擋已登入者進入登入頁
│
├── stores/
│   ├── adminAuth.ts              # 管理員認證狀態
│   ├── cart.ts                   # 購物車狀態
│   └── menu.ts                   # 後台選單結構
│
├── utils/
│   └── storage.ts                # Token 讀寫工具
│
├── composables/
│   └── useLoginValidator.ts      # 登入表單 Zod 驗證
│
├── plugins/                      # Nuxt Plugins
│   ├── axios.ts                  # Axios 實例（含攔截器）
│   └── pinia-persistedstate.ts   # Store 持久化設定
│
├── assets/css/tailwind.css       # Tailwind 全域樣式
├── nuxt.config.ts                # Nuxt 設定
└── package.json                  # 依賴套件
```

---

## 4. 功能模組

### 4.1 前台公開模組

#### 服務介紹
- 首頁（品牌形象、服務概覽、CTA）
- 關於頁（創辦人介紹）
- 服務頁（服務項目與定價，起價 35,000 元）
- 流程頁（5 步驟合作流程：需求 → 設計 → 測試 → 部署 → 上線）
- 作品集（Demo 網站展示）
- 聯絡頁（聯絡資訊）

#### 部落格
- 文章列表（分頁，每頁 10 篇）
- 文章詳情（HTML 內容渲染、SEO 結構化資料 JSON-LD、OG 標籤）

#### 電商
- 商品列表（分類篩選：全部 / 實體 / 數位）
- 商品詳情（圖片輪播、數量選擇、加入購物車）
- 購物車（品項管理、數量調整、刪除）
- 結帳（購買人資訊表單、訂單送出）

#### Demo 網站
- 個人品牌（數位遊牧主題，`personal` layout）
- 諮商診所（心理諮商主題，`counseling` layout）
- 健身房（健身主題，`gym` layout + Swiper）

---

### 4.2 後台管理模組（需身份驗證）

#### 認證
- 管理員登入（Email / 密碼，Zod 驗證）
- JWT Token 驗證（localStorage 持久化）
- 登出（清除 Token 並跳轉登入頁）

#### 文章管理
- 列表（分頁）
- 建立（TipTap 富文字編輯器）
- 編輯（載入現有內容至編輯器）
- 刪除

#### 商品管理
- 列表（分頁）
- 建立（表單 + 最多 2 張圖片上傳）
- 編輯（可刪除現有圖片 / 上傳新圖片）
- 刪除

#### 訂單管理
- 列表頁（目前為 stub，尚未完整實作）

---

## 5. API 設計

### 基本設定

| 環境 | Base URL |
|------|----------|
| Development | `http://127.0.0.1:8000/api/` |
| Production | `https://firelifedev.com/api/` |

### 通用請求標頭

| Header | 值 | 說明 |
|--------|----|------|
| `Authorization` | `Bearer {token}` | 需身份驗證的請求 |
| `X-Guest-Token` | `{guestToken}` | 訪客購物車追蹤 |
| `Content-Type` | `application/json` | 預設 |
| `Content-Type` | `multipart/form-data` | 圖片上傳 |

---

### 5.1 認證 API

#### 登入
```
POST /login
```
Request:
```json
{
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```

#### 登出
```
POST /logout
```
Response:
```json
{ "message": "string" }
```

---

### 5.2 文章 API

#### 文章列表（公開）
```
GET /posts
```
Query Params: `page`, `per_page`

Response:
```json
{
  "data": [Post],
  "total": "number",
  "current_page": "number",
  "per_page": "number"
}
```

#### 單篇文章（公開）
```
GET /posts/:id
```
Response: `{ "data": Post }`

#### 建立文章（後台）
```
POST /posts
```
Request:
```json
{
  "title": "string",
  "slug": "string",
  "metaDescription": "string",
  "content": "string (HTML)"
}
```

#### 更新文章（後台）
```
PATCH /posts/:id
```
Request: Partial Post 欄位

#### 刪除文章（後台）
```
DELETE /posts/:id
```

**Post 型別：**
```typescript
interface Post {
  id: number
  title: string
  slug?: string
  meta_description?: string
  content: string           // TipTap 產生的 HTML
  author: string
  is_enabled: number
  is_pinned: number
  og_image: string
  status: string
  created_at?: string
  updated_at?: string
}
```

---

### 5.3 商品 API

#### 商品列表（公開）
```
GET /products
```
Query Params: `page`, `per_page`, `product_type?`（`physical` | `digital`）

#### 商品詳情（公開）
```
GET /products/:id
```
Response: `{ "data": ProductDetail }`

#### 商品列表（後台）
```
GET /admin/products
```
Query Params: `page`, `per_page`（需 Authorization header）

#### 建立商品（後台）
```
POST /admin/products
Content-Type: multipart/form-data
```
Fields: `title`, `description`, `product_type`, `price`, `special_price`, `stock`, `status`, `is_favorites`, `images[]`

#### 更新商品（後台）
```
POST /admin/products/:id
Content-Type: multipart/form-data
_method: PATCH
```
Fields: 同建立 + `remove_image_ids[]`

#### 刪除商品（後台）
```
DELETE /admin/products/:id
```

**Product 型別：**
```typescript
interface Product {
  id: number
  title: string
  description?: string
  product_type: 'physical' | 'digital'
  stock?: number            // 僅實體商品
  price: number
  special_price?: number
  status: 'active' | 'inactive'
  is_favorites: boolean
  images: ProductImage[]
  created_at: string
  updated_at: string
}

interface ProductImage {
  id: number
  product_id: number
  image_url: string
  sort_order: number
  created_at: string
  updated_at: string
}
```

---

### 5.4 購物車 API

#### 取得購物車
```
GET /cart
X-Guest-Token: {guestToken}
```
Response:
```json
{
  "data": {
    "id": "number",
    "guest_token": "string",
    "items": [CartItem],
    "total": "number"
  }
}
```

#### 新增購物車項目
```
POST /cart/items
```
Request: `{ "product_id": number, "quantity": number }`

#### 更新數量
```
PATCH /cart/items/:productId
```
Request: `{ "quantity": number }`

#### 刪除項目
```
DELETE /cart/items/:productId
```

---

### 5.5 訂單 API

#### 建立訂單
```
POST /order
```
Request:
```json
{
  "buyer_name": "string",
  "buyer_email": "string",
  "buyer_phone": "string (09xxxxxxxx)",
  "items": [{ "product_id": number, "quantity": number }],
  "delivery_type": "physical | digital",
  "store_info": {
    "store_id": "string",
    "store_name": "string"
  }
}
```

---

### 5.6 圖片上傳 API

```
POST /upload
Content-Type: multipart/form-data
```
Response: `{ "url": "string" }`

---

## 6. 資料流

### 6.1 Axios Plugin 攔截器

```
請求發出
  └─ 自動附加 Authorization: Bearer {adminToken}
  └─ 自動附加 X-Guest-Token: {guestToken}
  └─ 送至後端 API
```

Token 來源：
- `adminToken` ← `useAdminAuthStore().user.token`
- `guestToken` ← `useCartStore().guestToken`

### 6.2 全域狀態資料流

```
localStorage
    ├─ 'fire-life-auth'  ←→  adminAuthStore (user, token)
    └─ 'guest-cart'      ←→  cartStore (guestToken, items, cartId)

cartStore / adminAuthStore
    ├─ 讀入 Axios Plugin（自動帶入 headers）
    └─ 讀入 middleware（auth、guest 判斷）
```

### 6.3 商品 / 購物車資料流

```
前台 /products
    → GET /products (帶 product_type 篩選)
    → ProductCard 元件渲染
    → 點擊加入購物車
        → POST /cart/items (帶 X-Guest-Token)
        → cartStore.setCartData() 更新本地狀態
        → Header CartBadge 顯示數量
```

### 6.4 後台圖片上傳資料流

```
管理員上傳圖片
    → 前端 FileReader 產生預覽（本地 blob URL）
    → 使用者送出表單
    → FormData 含圖片 File 物件
    → POST /admin/products (multipart)
    → 後端儲存圖片，回傳 ProductImage[]
```

### 6.5 部落格內容資料流

```
TipTap 編輯器（富文字輸入）
    → 產生 HTML 字串
    → POST / PATCH /posts（payload.content = HTML）
    → 前台 /blog/:id/:slug
    → v-html 渲染 HTML 內容
    → JSON-LD schema 附加至 <head>（useHead）
```

---

## 7. 使用者流程

### 7.1 管理員登入流程

```
訪問 /admin/login
    → guest middleware 確認未登入（已登入跳至 /admin）
    → 輸入 Email / 密碼
    → Zod 驗證（email 格式、password 最少 6 字元）
    → POST /login
    → adminAuthStore.setUser({ token, id, name, email })
    → 持久化至 localStorage
    → navigateTo('/admin')
    → auth middleware 通過後續後台頁面存取
```

### 7.2 購物流程

```
/products（商品列表）
    → 分類篩選（全部 / 實體 / 數位）
    → 點選商品 → /products/:id
    → QuantitySelector 調整數量
    → 點擊「加入購物車」
        → POST /cart/items
        → cartStore 更新
    → 點擊購物車圖示 → /cart
    → 調整數量（PATCH /cart/items/:id）或刪除（DELETE）
    → 點擊「結帳」 → /cart/checkout
    → 填寫購買人資訊（姓名、Email、電話）
    → POST /order
    → 訂單建立（目前無確認頁，功能待完善）
```

### 7.3 部落格文章發布流程

```
/admin/posts/create
    → 填寫：標題、Slug、Meta 描述
    → TipTap 編輯器撰寫內容
        → 可插入圖片（POST /upload）
        → 支援：粗體、斜體、連結、表格、程式碼區塊
    → POST /posts
    → navigateTo('/admin/posts')
```

### 7.4 商品建立流程

```
/admin/products/create
    → 填寫：名稱、描述、商品類型（實體/數位）
    → 填寫：定價、特價、庫存（實體商品）、狀態、是否精選
    → 拖拉或點選上傳圖片（最多 2 張）
        → 前端即時預覽
        → 圖片格式驗證
    → POST /admin/products（FormData）
    → navigateTo('/admin/products')
```

### 7.5 商品編輯流程

```
/admin/products（列表）
    → 點擊編輯圖示 → /admin/products/edit/:id
    → GET /admin/products/:id 載入現有資料
    → 可刪除現有圖片（記錄 remove_image_ids）
    → 可補充上傳新圖片（上限 = 2 - 現有圖片數）
    → POST /admin/products/:id（FormData, _method: PATCH）
    → navigateTo('/admin/products')
```

### 7.6 部落格閱讀流程

```
/blog（文章列表）
    → GET /posts（分頁）
    → 點擊文章 → /blog/:id/:slug
    → GET /posts/:id
    → v-html 渲染內容
    → useHead 設定 OG 標籤、JSON-LD schema
    → SEO 友善 URL（含 slug）
```

---

## 8. 狀態管理

### 8.1 adminAuthStore（`stores/adminAuth.ts`）

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

### 8.2 cartStore（`stores/cart.ts`）

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

### 8.3 menuStore（`stores/menu.ts`）

```typescript
功能：定義後台側邊欄選單結構

選單結構：
  - 儀表板 (/admin)
  - 內容管理
    - 文章列表 (/admin/posts)
    - 新增文章 (/admin/posts/create)
  - 電商管理
    - 商品管理 (/admin/products)
    - 新增商品 (/admin/products/create)
    - 訂單管理 (/admin/orders)

Helper:
  findBreadcrumbPath(items, path): DFS 搜尋麵包屑路徑
```

---

## 9. 路由與中介層

### 9.1 路由表

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

### 9.2 中介層邏輯

#### `middleware/auth.ts`
```
檢查 adminAuthStore.isLoggedIn
  → false: navigateTo('/admin/login')
  → true:  繼續
```

#### `middleware/guest.ts`
```
檢查 adminAuthStore.isLoggedIn
  → true:  navigateTo('/admin')
  → false: 繼續（允許進入登入頁）
```

---

## 10. 元件架構

### 10.1 前台版面元件（`components/layout/`）

| 元件 | 說明 |
|------|------|
| `Header.vue` | 主導覽列，含購物車 Badge |
| `Footer.vue` | 頁尾 |
| `Banner.vue` | 首頁 Hero Banner |
| `MobileMenu.vue` | 手機版導覽選單 |

### 10.2 後台元件（`components/admin/`）

| 元件 | 說明 |
|------|------|
| `Sidebar.vue` | 後台側邊導覽列 |
| `Header.vue` | 後台頁首 |
| `Main.vue` | 儀表板主內容區 |

### 10.3 商品元件（`components/product/`）

| 元件 | Props | Events | 說明 |
|------|-------|--------|------|
| `ProductCard.vue` | `product: Product` | `add-to-cart` | 商品列表卡片 |
| `QuantitySelector.vue` | `modelValue: number` | `update:modelValue` | 數量 +/- 選擇器 |

### 10.4 部落格元件（`components/blog/`）

| 元件 | Props | 說明 |
|------|-------|------|
| `Post.vue` | `post: Post` | 文章列表項目卡片 |

### 10.5 Demo 網站元件

各 Demo 主題擁有獨立的 Header / Banner / Footer / MobileMenu：

- `components/personal/` — 數位遊牧主題
- `components/counseling/` — 諮商診所主題
- `components/gym/` — 健身房主題（含 Swiper 整合）

### 10.6 區塊元件（`components/sections/`）

| 元件 | 說明 |
|------|------|
| `ServicesSection.vue` | 服務項目展示區塊（前台複用） |

---

## 附錄：未完成 / 待優化項目

| 項目 | 狀態 | 說明 |
|------|------|------|
| 訂單確認頁 | 未實作 | 結帳後無確認頁面，流程不完整 |
| 訂單管理後台 | Stub | `/admin/orders` 頁面尚未完整實作 |
| 結帳表單驗證 | 待確認 | 電話格式驗證（09xxxxxxxx）是否完整 |
| 錯誤處理 | 待改善 | 部分 API 錯誤僅 console.log，應統一顯示 Toast |
| 購物車登入整合 | 待確認 | `userToken` 在 cartStore 中存在但未見完整登入整合流程 |
| 超商取貨 | 待確認 | Order payload 含 `store_info` 但前台尚未實作選擇流程 |
