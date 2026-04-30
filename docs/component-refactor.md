# Component 拆分建議

分析 `pages/`（不含 `demo/`）中可提取為共用元件的重複程式碼。

---

## Button 一致性問題

專案已引入 Nuxt UI，但部分頁面混用原生 `<button>` 加手刻 Tailwind：

| 檔案 | 問題 |
|------|------|
| `pages/cart/checkout.vue:64` | 原生 `<button>` + `bg-blue-600` 等手刻樣式 |
| `pages/cart/index.vue:87` | 原生 `<button class="text-gray-400">` 刪除按鈕 |
| `pages/products/[id].vue:94` | 原生 `<button>` + `bg-orange-light` 手刻樣式 |

**建議做法**：統一改用 `<UButton>`，不需另包 wrapper component。`UButton` 支援 `color`、`variant`、`class` 覆蓋，足以處理視覺差異。

```vue
<!-- Before -->
<button class="rounded bg-blue-600 px-4 py-2 text-white ...">確認購買</button>

<!-- After -->
<UButton type="submit" :loading="isSubmitting">確認購買</UButton>
```

**例外**：`pages/admin/posts/` 中 Tiptap toolbar 的 `<button>` 使用 `:class="{ 'is-active': ... }"` 做 toggle 狀態，屬於 editor 內部邏輯，待拆為 `TiptapEditor` 元件後一併處理，不需改成 `UButton`。

---

## 高優先級（明確重複）

### 1. `components/admin/TiptapEditor.vue`

**涉及檔案**
- `pages/admin/posts/create.vue`
- `pages/admin/posts/edit/[id].vue`

**問題**
兩個頁面有完全相同的 Tiptap toolbar（Bold / Italic / Strike / H1–H6 / 列表 / 連結 / 表格等共 20+ 個按鈕），以及相同的 `useEditor` 設定、`setLink()`、`handleUploadImage()`、`addImage()` 邏輯。

**建議介面**
```vue
<TiptapEditor v-model:content="articleContent" />
```

| 項目 | 說明 |
|------|------|
| Props | `content: string`（v-model） |
| Emits | `update:content` |
| 內部 | `useEditor` 實例、toolbar、`<editor-content>` |

---

### 2. `components/admin/ImageAltModal.vue`

**涉及檔案**
- `pages/admin/posts/create.vue:33`（已有 `<!-- 做成元件 -->` 注釋）
- `pages/admin/posts/edit/[id].vue:31`（已有 `<!-- 做成元件 -->` 注釋）

**問題**
兩個頁面有幾乎完全相同的 `<UModal>`，用於上傳圖片後設定 Alt Text 與 Title。

**建議介面**
```vue
<ImageAltModal
  v-model:open="showModal"
  v-model:alt="modalAlt"
  v-model:title="modalTitle"
  @confirm="confirmImage"
/>
```

| 項目 | 說明 |
|------|------|
| Props | `open: boolean`、`alt: string`、`title: string` |
| Emits | `update:open`、`update:alt`、`update:title`、`confirm` |

---

### 3. `components/admin/DataTable.vue`

**涉及檔案**
- `pages/admin/posts/index.vue`
- `pages/admin/products/index.vue`
- `pages/admin/orders/index.vue`

**問題**
三個頁面的 template 幾乎完全相同：相同的 `<UTable>` ui 設定、相同的 `<UPagination>` 結構，差異只有 columns 定義。

**建議介面**
```vue
<DataTable
  :columns="columns"
  :data="data"
  :loading="pending"
  v-model:page="page"
  :per-page="perPage"
  :total="pageTotal"
/>
```

| 項目 | 說明 |
|------|------|
| Props | `columns`、`data`、`loading`、`page`、`perPage`、`total` |
| Emits | `update:page` |

---

### 4. `components/admin/ProductForm.vue`

**涉及檔案**
- `pages/admin/products/create.vue`
- `pages/admin/products/edit/[id].vue`

**問題**
兩個頁面有相同的 7 個表單欄位（商品名稱、描述、類型、狀態、庫存、價格、特價、熱門 checkbox）、相同的 `productTypeOptions` / `statusOptions` 常數、相同的 `handleTypeChange()` 邏輯。edit 頁多了現有圖片管理（刪除舊圖、待上傳預覽），可透過 Props 區分。

**建議介面**
```vue
<ProductForm
  v-model="formState"
  v-model:files="filesUpload"
  :existing-images="formState.images"
  :upload-error="uploadError"
  @remove-image="removeExistingImage"
/>
```

| 項目 | 說明 |
|------|------|
| Props | `modelValue: BaseProduct`、`files: File[]`、`existingImages`（edit 用）、`uploadError` |
| Emits | `update:modelValue`、`update:files`、`remove-image` |

---

## 中優先級（可讀性提升）

### 5. `components/admin/PageHeader.vue`

**涉及檔案**
- `pages/admin/posts/create.vue`
- `pages/admin/posts/edit/[id].vue`
- `pages/admin/products/create.vue`
- `pages/admin/products/edit/[id].vue`

**問題**
4 個頁面都有相同的 `flex justify-between` 標題列結構。

**建議介面**
```vue
<AdminPageHeader title="新增文章">
  <template #actions>
    <UButton @click="submit">發佈文章</UButton>
  </template>
</AdminPageHeader>
```

| 項目 | 說明 |
|------|------|
| Props | `title: string` |
| Slots | `actions` |

---

### 6. `components/cart/CartItem.vue`

**涉及檔案**
- `pages/cart/index.vue`

**問題**
購物車商品列含手機版 / 桌面版 RWD 切換邏輯，在 `v-for` 內約 60 行，雖只用一次但邏輯獨立、結構複雜，拆出後可讓 `cart/index.vue` 更清晰。

**建議介面**
```vue
<CartItem
  :item="item"
  @update-quantity="updateQuantity"
  @remove="removeItem"
/>
```

| 項目 | 說明 |
|------|------|
| Props | `item: CartItem` |
| Emits | `update-quantity`、`remove` |

---

## 現有組件現況

以下組件已拆分，方向正確，不需調整：

| 組件 | 用途 |
|------|------|
| `components/product/ProductCard.vue` | 商品卡片 |
| `components/product/QuantitySelector.vue` | 數量選擇器 |
| `components/cart/Badge.vue` | 購物車 badge |

---

## 建議執行順序

1. `ImageAltModal` — 作者已標注，改動範圍小，優先完成
2. `TiptapEditor` — 重複量最大，效益最高
3. `DataTable` — template 幾乎一樣，拆分容易
4. `ProductForm` — 需處理 create / edit 差異，稍複雜
5. `PageHeader` — 簡單，可與上述任一一起處理
6. `CartItem` — 可選，視需求決定
