# API Reference

Base URL:
- Development: `http://127.0.0.1:8000/api/`
- Production: `https://firelifedev.com/api/`

## 通用請求標頭

| Header | 值 | 說明 |
|--------|----|------|
| `Authorization` | `Bearer {token}` | 需身份驗證的請求 |
| `X-Guest-Token` | `{guestToken}` | 訪客購物車追蹤 |
| `Content-Type` | `application/json` | 預設 |
| `Content-Type` | `multipart/form-data` | 圖片上傳 |

---

## 認證 `/api/auth`

| Method | Path | 說明 |
|--------|------|------|
| POST | `/login` | 管理員登入，回傳 JWT token |
| POST | `/logout` | 登出 |

---

## 文章 `/api/posts`

| Method | Path | 說明 |
|--------|------|------|
| GET | `/posts` | 文章列表（公開），Query: `page`, `per_page` |
| GET | `/posts/:id` | 單篇文章（公開） |
| POST | `/posts` | 建立文章（後台） |
| PATCH | `/posts/:id` | 更新文章（後台） |
| DELETE | `/posts/:id` | 刪除文章（後台） |

---

## 商品 `/api/products`

| Method | Path | 說明 |
|--------|------|------|
| GET | `/products` | 商品列表（公開），Query: `page`, `per_page`, `product_type?` |
| GET | `/products/:id` | 商品詳情（公開） |
| GET | `/admin/products` | 商品列表（後台，需 Authorization） |
| POST | `/admin/products` | 建立商品（multipart/form-data） |
| POST | `/admin/products/:id` | 更新商品（multipart/form-data，帶 `_method: PATCH`） |
| DELETE | `/admin/products/:id` | 刪除商品 |

---

## 購物車 `/api/cart`

| Method | Path | 說明 |
|--------|------|------|
| GET | `/cart` | 取得購物車（需 X-Guest-Token） |
| POST | `/cart/items` | 新增商品，Body: `{ product_id, quantity }` |
| PATCH | `/cart/items/:productId` | 更新數量，Body: `{ quantity }` |
| DELETE | `/cart/items/:productId` | 刪除項目 |

---

## 訂單 `/api/order`

| Method | Path | 說明 |
|--------|------|------|
| POST | `/order` | 建立訂單（支援訪客） |
| POST | `/orders/{order_no}/checkout` | 產生 ECPay HTML 表單（回傳 text/html） |
| GET | `/orders/{payment_trade_no}/result` | 查詢已付款訂單結果 |
| GET | `/admin/orders` | 訂單列表（後台），Query: `page`, `per_page` |
| GET | `/admin/orders/:id` | 訂單詳情（後台） |

**POST `/order`** 欄位：

| 欄位 | 規則 | 說明 |
|------|------|------|
| `buyer_name` | required, max:100 | 買家姓名 |
| `buyer_email` | required, email | 買家 Email |
| `buyer_phone` | nullable, max:20 | 買家電話 |
| `items` | required, array≥1 | 訂購項目陣列 |
| `items[].product_id` | required, exists:products | 商品 ID |
| `items[].quantity` | required, integer≥1 | 數量 |
| `delivery_type` | `physical` \| `digital` | 配送類型 |
| `store_info` | array | 超商取貨資訊（含實體商品時） |
| `store_info.store_id` | string | 超商門市代號 |
| `store_info.store_name` | string | 超商門市名稱 |

### 付款流程

```
POST /order → 取得 order_no
  → POST /orders/{order_no}/checkout → 回傳 ECPay HTML form
  → inject DOM → form.submit() → 導向綠界付款頁
  → 付款完成後 ECPay POST /payments/ecpay/callback（非同步回調）→ 更新訂單狀態
```

---

## 金流回調 `/api/payments`

| Method | Path | 說明 |
|--------|------|------|
| POST | `/payments/ecpay/callback` | ECPay 非同步付款通知（綠界伺服器呼叫） |

綠界以 form-data 方式 POST，系統驗證 `CheckMacValue`，若 `RtnCode=1` 且訂單尚未有 `ecpay_trade_no`，則更新訂單狀態為 `paid`。成功回應 `1|OK`，失敗回應 `0|<reason>`。

---

## 圖片上傳 `/api/upload`

| Method | Path | 說明 |
|--------|------|------|
| POST | `/upload` | 上傳圖片，multipart/form-data，回傳 `{ url: string }` |

---

## Order 資料表結構

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | bigint PK | |
| `user_id` | bigint FK nullable | 可為訪客訂單 |
| `order_no` | string unique | `ORD-YmdHis-XXXXXX` |
| `payment_trade_no` | string | `ECYmdHisXXXX`（送給 ECPay 的交易編號） |
| `ecpay_trade_no` | string nullable | 綠界回傳的交易編號（防重複付款依據） |
| `buyer_name` | string | |
| `buyer_email` | string | |
| `buyer_phone` | string nullable | |
| `items_snapshot` | JSON | 下單當下商品資料快照 |
| `total_amount` | integer | 總金額（以元為單位） |
| `delivery_type` | string nullable | 配送類型 |
| `store_info` | JSON nullable | 超商取貨資訊 |
| `status` | enum | `pending` \| `paid` |
| `paid_at` | timestamp nullable | 付款時間 |

`items_snapshot` 結構：
```json
[
  {
    "product_id": 5,
    "title": "書名",
    "price": 150,
    "quantity": 2,
    "type": "physical"
  }
]
```
