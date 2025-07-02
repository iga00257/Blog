# 顏色重構指南

## 已定義的顏色變數

在 `tailwind.config.js` 中已定義以下顏色變數：

### 主要品牌色彩

- `primary` (#c9ada7) - 主要品牌色
- `primary-light` (#f2e9e4) - 淺色主要色

### 次要色彩

- `secondary` (#e0c2bb) - 次要色
- `secondary-light` (#eac8c2) - 淺色次要色
- `secondary-dark` (#b2938d) - 深色次要色

### 特殊用途色彩

- `accent` (#C9A7A7) - 強調色
- `selection` (#ffdad7) - 選取背景色

### 中性色彩

- `border` (#eaeaea) - 邊框色
- `white` (#fff) - 白色

### 漸層色彩

- `gradient-orange` (rgb(234,121,49)) - 漸層橙色
- `gradient-yellow` (rgb(282,181,79)) - 漸層黃色

### 透明度色彩

- `overlay` (rgba(0,0,0,0.6)) - 遮罩色
- `overlay-light` (rgba(255,255,255,0.5)) - 淺色遮罩

## 需要替換的文件和位置

### ✅ 1. pages/404.tsx (已完成)

- ✅ Line 15: `text-[#c9ada7]` → `text-primary`
- ✅ Line 28: `text-[#c9ada7]` → `text-primary`

### ✅ 2. pages/posts/[postId].tsx (已完成)

- ✅ Line 156: `text-[#c9ada7]` → `text-primary`
- ✅ Line 227: `fill="#C9A7A7"` → `fill="currentColor"` (配合 CSS 類別)
- ✅ Line 229: `color="#C9A7A7"` → `color="currentColor"` (配合 CSS 類別)
- ✅ Line 233: `text-[#C9A7A7]` → `text-accent`
- ✅ Line 236: `text-[#C9A7A7]` → `text-accent`

### ✅ 3. pages/index.tsx (已完成)

- ✅ Line 44: `text-[#c9ada7]` → `text-primary`
- ✅ Line 82-83: 漸層色彩 → 使用 CSS 變數或 Tailwind 漸層

### ✅ 4. components/PageHead.tsx (已完成)

- ✅ Line 44: `content="#f2e9e4"` → `content="var(--color-primary-light)"`

### ✅ 5. components/PostCard.tsx (已完成)

- ✅ Line 38: `text-[#b2938d]` → `text-secondary-dark`

### 🔄 6. styles/globals.css (部分完成)

- ✅ Line 31: `background-color: #fff` → `@apply bg-white`
- ✅ Line 32: `border: 1px solid #eaeaea` → `@apply border border-border`
- ✅ Line 47: `background-color: #fff` → `@apply bg-white`
- ✅ Line 48: `border: 1px solid #eaeaea` → `@apply border border-border`
- ✅ Line 58: `background-color: #fff` → `@apply bg-white`
- ✅ Line 59: `border: 1px solid #eaeaea` → `@apply border border-border`
- ✅ Line 68: `background-image: linear-gradient(transparent 70%, #eac8c2 30%)` → 使用 CSS 變數
- ✅ Line 72: `background: #c9ada7` → `@apply bg-primary`
- ✅ Line 77: `box-shadow: 0 0 10px #e0c2bb, 0 0 5px #c9ada7` → 使用 CSS 變數
- ✅ Line 85: `background: #ffdad7` → `@apply bg-selection`
- ✅ Line 89: `background: #ffdad7` → `@apply bg-selection`

### ✅ 7. pages/og_image/[slug].tsx (已完成)

- ✅ Line 49: `ctx.fillStyle = '#fff'` → 使用變數
- ✅ Line 52: `ctx.fillStyle = '#e0c2bb'` → 使用變數
- ✅ Line 56: `ctx.fillStyle = '#fff'` → 使用變數
- ✅ Line 46: `ctx.fillStyle = 'rgba(0,0,0,0.6)'` → 使用變數
- ✅ Line 60: `ctx.fillStyle = 'rgba(255,255,255,0.5)'` → 使用變數

### ✅ 8. pages/api/og_image.ts (已完成)

- ✅ Line 46: `ctx.fillStyle = '#fff'` → 使用變數
- ✅ Line 49: `ctx.fillStyle = '#e0c2bb'` → 使用變數
- ✅ Line 53: `ctx.fillStyle = '#fff'` → 使用變數
- ✅ Line 43: `ctx.fillStyle = 'rgba(0,0,0,0.6)'` → 使用變數
- ✅ Line 57: `ctx.fillStyle = 'rgba(255,255,255,0.5)'` → 使用變數

## 新增的文件

### utils/colors.ts

創建了顏色常數文件，包含所有顏色定義，用於 JavaScript/TypeScript 中的顏色引用。

### CSS 變數

在 `styles/globals.css` 中添加了 CSS 變數定義，用於特殊情況下的顏色引用。

## 完成狀態

🎉 **所有寫死的色號已成功替換為變數！**

### 替換統計

- ✅ Tailwind 類別中的顏色：5 個文件
- ✅ CSS 中的顏色：1 個文件
- ✅ Canvas 繪圖中的顏色：2 個文件
- ✅ 漸層色彩：1 個文件
- ✅ 總計：9 個文件，約 20+ 個顏色引用

### 優點

1. **統一管理**：所有顏色現在都集中在 `tailwind.config.js` 和 `utils/colors.ts` 中
2. **易於維護**：修改顏色只需要更新配置文件
3. **一致性**：確保整個專案使用相同的顏色系統
4. **類型安全**：TypeScript 常數提供類型檢查
5. **靈活性**：支援 CSS 變數和 Tailwind 類別

## 建議的後續步驟

1. **測試**：運行專案確保所有顏色顯示正確
2. **視覺檢查**：確認所有頁面的顏色效果一致
3. **文檔更新**：更新團隊文檔說明新的顏色系統
4. **設計系統**：考慮建立完整的設計系統文檔
