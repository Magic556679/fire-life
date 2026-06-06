# API Layer Validation Rules

## Zod 驗證只用於 GET 請求

GET 回傳的資料會直接餵給 UI 渲染，schema 不符會導致畫面出現 undefined 或 render 錯誤，因此必須驗證。

```ts
// ✅ GET — 使用 Zod parse/safeParse
export const getAdminOrders = async (): Promise<AdminOrdersResponse> => {
  const res = await $api.get('/admin/orders')
  return adminOrdersResponseSchema.parse(res.data).data
}
```

## POST / PATCH / DELETE 不驗證回傳值

Mutation 的 response 呼叫端只關心 `status` 和 `message`，不需要對應到 UI 狀態，不驗證。

```ts
// ✅ POST — 不驗證，直接回傳
export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await $api.post('/order', payload)
  return { data: res.data, status: res.status }
}
```

**例外**：若 mutation 回傳的物件被直接用來更新 store 或 UI（而非重新 fetch），才需要驗證。

## Soft Validation（不中斷頁面的情境）

當驗證失敗不應阻斷使用者導航時，使用 `safeParse` + fallback，不 throw。

```ts
// ✅ 驗證失敗記 log，fallback 回原始資料
const result = schema.safeParse(res.data)
if (!result.success) {
  console.error('Zod validation failed:', result.error.issues)
}
return (result.success ? result.data : res.data) as ExpectedType
```

適用於：管理後台的詳細頁，資料格式有細微差異但仍可顯示的情境。

## Schema 檔案分離

每個 api 資源的 Zod schema 獨立放在 `schema.ts`，不寫在 `index.ts` 裡。`index.ts` 只負責 API 函式，並 re-export 需要的 types。

```
api/order/
  index.ts   ← API 函式 + re-export
  schema.ts  ← 所有 Zod schema 和 infer 出的 types
```
