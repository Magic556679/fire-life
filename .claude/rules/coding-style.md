# Coding Style

## Formatter — Prettier

設定檔：`.prettierrc.json`

| 規則 | 值 | 說明 |
|---|---|---|
| `printWidth` | 80 | 每行最多 80 字元 |
| `tabWidth` | 2 | 縮排 2 空格 |
| `useTabs` | false | 空格縮排，不用 tab |
| `semi` | false | 不加分號 |
| `singleQuote` | true | 字串用單引號 |
| `trailingComma` | all | 多行結尾加逗號 |
| `arrowParens` | avoid | 單參數箭頭函式不加括號，例如 `x => x` |
| `htmlWhitespaceSensitivity` | ignore | HTML 空白不敏感 |

Tailwind 類別由 `prettier-plugin-tailwindcss` 自動排序，不需手動整理順序。

---

## Linter — ESLint

設定檔：`eslint.config.mjs`，使用 `@nuxt/eslint` + `eslint-config-prettier`。

---

## TypeScript

- **禁止使用 `any`**，catch 變數用 `unknown` 搭配 `instanceof` 型別縮窄：

```ts
// ✗
} catch (err: any) {
  alert(err.message)
}

// ✓
} catch (err) {
  alert(err instanceof Error ? err.message : '未知錯誤')
}
```

- nullable 欄位型別用 `T | null`，非 `T | undefined`，例如 `og_image: string | null`

---

## Vue 模板屬性順序

依照 `vue/attributes-order` 規則，屬性由上到下依序：

1. `ref`、`key`（UNIQUE）
2. `v-model`（TWO_WAY_BINDING）
3. 靜態 HTML 屬性：`type`、`class`、`placeholder`（ATTR_STATIC）
4. 動態綁定：`:disabled`、`:class`、`:src`（ATTR_DYNAMIC）
5. 事件：`@click`、`@change`（EVENTS）

```html
<!-- ✗ -->
<button @click="submit" :disabled="loading" :class="{ active }">

<!-- ✓ -->
<button :disabled="loading" :class="{ active }" @click="submit">
```

```html
<!-- input 範例 -->
<input
  ref="fileInput"
  type="file"
  class="hidden"
  @change="handleUpload"
/>
```

---

## Vue SFC 結構

- 使用 `<script lang="ts" setup>`（Composition API + setup syntax）
- 順序：`<template>` → `<script>` → `<style>`（如有）

---

## 錯誤處理

- API 錯誤統一在 catch 用 `instanceof Error` 縮窄型別
- 不用 `err.response?.data?.message` 的鏈式存取，避免繞過型別檢查
