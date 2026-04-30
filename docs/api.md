### 2.4 訂單模組 `/api/order`

| Method | Path                                | 驗證           | 描述                               |
| ------ | ----------------------------------- | -------------- | ---------------------------------- |
| POST   | `/order`                            | 否（支援訪客） | 建立訂單                           |
| GET    | `/orders/{payment_trade_no}/result` | 否             | 以 payment_trade_no 查詢已付款訂單 |
| POST   | `/orders/{order_no}/checkout`       | 否             | 產生 ECPay 付款表單                |

**POST `/order`** 欄位（`StoreOrderRequest`）：

| 欄位                    | 規則                      | 說明                         |
| ----------------------- | ------------------------- | ---------------------------- |
| `buyer_name`            | required, max:100         | 買家姓名                     |
| `buyer_email`           | required, email           | 買家 Email                   |
| `buyer_phone`           | nullable, max:20          | 買家電話                     |
| `items`                 | required, array≥1         | 訂購項目陣列                 |
| `items[].product_id`    | required, exists:products | 商品 ID                      |
| `items[].quantity`      | required, integer≥1       | 數量                         |
| `store_info`            | array                     | 超商取貨資訊（含實體商品時） |
| `store_info.store_id`   | string                    | 超商門市代號                 |
| `store_info.store_name` | string                    | 超商門市名稱                 |

**POST `/order`** 回應（201）：

```json
{
  "message": "Order created",
  "data": {
    "id": 1,
    "order_no": "ORD-20260408123456-ABCDEF",
    "total_amount": 500,
    "status": "pending",
    "items_snapshot": [...]
  }
}
```

**GET `/orders/{payment_trade_no}/result`**：

- `payment_trade_no` 不存在 → 404
- 訂單狀態非 `paid` → 400
- 成功 → 回傳買家資訊、訂單資訊、`items_snapshot`、`store_info`

> ECPay 付款完成後跳轉前端，前端從 URL 取出 `payment_trade_no` 呼叫此端點顯示購買完成頁。

**POST `/orders/{order_no}/checkout`** 回應：直接回傳 HTML（`text/html`），包含自動 submit 的 ECPay 表單，瀏覽器導向綠界付款頁。

---

### 2.5 金流回調 `/api/payments`

| Method | Path                       | 驗證                 | 描述                 |
| ------ | -------------------------- | -------------------- | -------------------- |
| POST   | `/payments/ecpay/callback` | 否（綠界伺服器呼叫） | ECPay 非同步付款通知 |

> 綠界以 form-data 方式 POST，系統驗證 `CheckMacValue`，若 `RtnCode=1` 且訂單尚未有 `ecpay_trade_no`，則更新訂單狀態為 `paid` 並記錄 `paid_at`、`ecpay_trade_no`。
> 成功回應 `1|OK`，失敗回應 `0|<reason>`。

### 3.7 Order

| 欄位                        | 型別               | 說明                                    |
| --------------------------- | ------------------ | --------------------------------------- |
| `id`                        | bigint PK          |                                         |
| `user_id`                   | bigint FK nullable | 可為訪客訂單                            |
| `order_no`                  | string unique      | `ORD-YmdHis-XXXXXX`                     |
| `payment_trade_no`          | string             | `ECYmdHisXXXX`（送給 ECPay 的交易編號） |
| `ecpay_trade_no`            | string nullable    | 綠界回傳的交易編號（防重複付款依據）    |
| `buyer_name`                | string             |                                         |
| `buyer_email`               | string             |                                         |
| `buyer_phone`               | string nullable    |                                         |
| `items_snapshot`            | JSON               | 下單當下商品資料快照                    |
| `total_amount`              | integer            | 總金額（以元為單位）                    |
| `delivery_type`             | string nullable    | 配送類型（目前由 items 判斷）           |
| `store_info`                | JSON nullable      | 超商取貨資訊                            |
| `status`                    | enum               | `pending` \| `paid`（其他狀態待擴展）   |
| `paid_at`                   | timestamp nullable | 付款時間                                |
| `created_at` / `updated_at` | timestamp          |                                         |

關聯：`hasMany(OrderItem)`

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

### 5.1 購買流程

```
[前端] 加入商品 → POST /cart/items (X-Guest-Token)
       瀏覽購物車 → GET /cart
       送出訂單   → POST /order        → 建立 Order + OrderItem（DB transaction）
       前往付款   → POST /orders/{no}/checkout → 回傳 HTML form，瀏覽器導向綠界
       付款完成   → ECPay POST /payments/ecpay/callback → 驗簽 → 更新 status=paid
```
