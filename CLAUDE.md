# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run generate  # Static site generation
npm run preview   # Preview production build
```

No test runner is configured. Code quality is enforced via ESLint and TypeScript type checking (both run as part of the build).

## Architecture

Fire Life is a Nuxt 3 full-stack app with three distinct purposes: a portfolio/service website, an e-commerce storefront, and a CMS admin dashboard. It also contains three embedded demo sites (personal brand, counseling clinic, fitness gym) with their own layouts.

### Rendering Strategy

- **Public pages** (`/`, `/blog`, `/products`, `/cart`, etc.) — SSR
- **Admin pages** (`/admin/**`) — Client-side only (CSR), configured via `nuxt.config.ts` `routeRules`

### Key Directories

- `pages/` — File-based routing. Public pages, `admin/` (protected dashboard), `demo/` (three demo sites), `cart/` (cart + checkout)
- `api/` — Thin API client functions (not server routes). Each subfolder wraps a resource (auth, products, posts, cart, order, upload) with Zod-validated responses
- `stores/` — Three Pinia stores: `adminAuth.ts` (JWT state), `cart.ts` (guest token + items), `menu.ts` (admin sidebar). All persist to localStorage via the pinia-persistedstate plugin
- `plugins/axios.ts` — Single Axios instance with two interceptors: injects `Authorization: Bearer <token>` from adminAuth store, and `X-Guest-Token` from cart store on every request
- `middleware/` — `auth.ts` guards all `/admin` routes; `guest.ts` redirects logged-in admins away from `/admin/login`
- `layouts/` — `default.vue` (public), `admin.vue` / `admin-login.vue` (dashboard), `personal.vue` / `counseling.vue` / `gym.vue` (demo sites)
- `composables/` — `useLoginValidator.ts` wraps Zod schema for admin login form; `useImageLimitWatcher.ts` enforces max image count on product upload forms

### Auth Flow

JWT token is stored in the `adminAuth` Pinia store (persisted to localStorage key `fire-life-auth`). The Axios plugin reads it on every request. The `auth` middleware checks this store and redirects to `/admin/login` if unauthenticated.

### Cart Flow

Guest cart uses a UUID token (`guestToken`) stored in the `cart` Pinia store (persisted to localStorage key `guest-cart`). This token is sent via the `X-Guest-Token` header (injected by Axios plugin) so the backend can associate anonymous carts with a session.

### Styling

Tailwind CSS 4 + SASS. Custom styles in `assets/css/`. Prettier is configured with the Tailwind plugin (`prettier-plugin-tailwindcss`) for automatic class sorting. Use single quotes (configured in `.prettierrc.json`).

### API Layer Convention

Functions in `api/` use Axios directly and validate responses with Zod schemas. Add new API functions in the appropriate subfolder following the same pattern: define a Zod schema, call axios, return typed data.

## API

Base URL: `http://127.0.0.1:8000/api/` (dev) / `https://firelifedev.com/api/` (prod)

Resources: `auth`, `posts`, `products` (public + `/admin/products`), `cart`, `order`, `upload`. Full spec in `.claude/rules/api-reference.md` and `.claude/rules/architecture.md`.

### Payment Flow

`POST /order` → 取得 `order_no` → `POST /orders/{order_no}/checkout` → 回傳綠界 HTML form → inject DOM → `form.submit()` 導向付款頁。ECPay 付款完成後以 `POST /payments/ecpay/callback` 非同步回調更新訂單狀態。

## Known Incomplete Features

- 超商取貨（`store_info`）：payload 支援，前台無選擇 UI
- 購物車在下單後未清空

## Coding Style

完整規則見 `.claude/rules/coding-style.md`。重點摘要：

- **Formatter**：Prettier（no semi、single quote、trailing comma all、arrowParens avoid）；Tailwind 類別由 `prettier-plugin-tailwindcss` 自動排序
- **TypeScript**：禁用 `any`；catch 用 `unknown` + `instanceof Error`；nullable 欄位用 `T | null`
- **Vue 屬性順序**：`ref/key` → `v-model` → 靜態屬性 → `:動態綁定` → `@事件`
