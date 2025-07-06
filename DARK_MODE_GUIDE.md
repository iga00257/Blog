# 深色模式配置指南

## 配置完成

您的專案現在已經支援深色模式！以下是配置的詳細說明：

### 1. Tailwind 配置

- 啟用了 `darkMode: 'class'` 模式
- 添加了深色模式的專用顏色
- 支援 `dark:` 前綴的類別

### 2. 顏色系統

#### 淺色模式

- **背景色**：`#FFFFFF` (純白)
- **次要背景**：`#F8F9FA` (溫暖灰)
- **主要文字**：`#2C3E50` (深藍灰)
- **次要文字**：`#5A6C7D` (中藍灰)

#### 深色模式

- **背景色**：`#1A1A1A` (深灰)
- **次要背景**：`#2D2D2D` (中深灰)
- **主要文字**：`#E5E5E5` (淺灰白)
- **次要文字**：`#B0B0B0` (中灰)

### 3. 使用方法

#### 在組件中使用

```tsx
// 基本使用
<div className="bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text-primary">
  內容
</div>

// 按鈕樣式
<button className="bg-primary hover:bg-primary-dark text-white dark:bg-primary dark:hover:bg-primary-dark">
  按鈕
</button>

// 卡片樣式
<div className="bg-gray-warm dark:bg-dark-bg-secondary border border-border dark:border-dark-border rounded-lg p-4">
  卡片內容
</div>
```

#### 在 CSS 中使用

```css
.my-component {
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-primary);
  color: var(--color-text-main);
}

/* 深色模式會自動應用 */
```

### 4. 主題切換組件

已創建 `ThemeToggle` 組件，提供：

- 太陽/月亮圖標切換
- 本地存儲記憶設定
- 響應系統偏好設定
- 平滑過渡動畫

#### 在頁面中使用

```tsx
import ThemeToggle from '../components/ThemeToggle';

export default function MyPage() {
  return (
    <div>
      <ThemeToggle />
      {/* 其他內容 */}
    </div>
  );
}
```

### 5. 自動檢測

系統會自動：

1. 檢查本地存儲的主題設定
2. 如果沒有設定，則使用系統偏好
3. 在切換時保存設定到本地存儲

### 6. 可用的深色模式類別

#### 背景色

- `dark:bg-dark-bg` - 主要背景
- `dark:bg-dark-bg-secondary` - 次要背景
- `dark:bg-dark-bg-tertiary` - 第三級背景

#### 文字色

- `dark:text-dark-text-primary` - 主要文字
- `dark:text-dark-text-secondary` - 次要文字
- `dark:text-dark-text-muted` - 靜音文字

#### 邊框色

- `dark:border-dark-border` - 深色邊框

### 7. 品牌色彩在深色模式下的表現

- **珊瑚紅** (`#FF6B6B`) - 在深色背景下更加突出
- **薄荷綠** (`#4ECDC4`) - 提供清新的對比
- **橙色** (`#FFA726`) - 溫暖的強調色

### 8. 最佳實踐

1. **始終提供深色模式版本**：為所有 UI 元素提供深色模式樣式
2. **保持對比度**：確保文字在深色背景下的可讀性
3. **使用過渡動畫**：添加 `transition` 類別實現平滑切換
4. **測試可訪問性**：確保符合 WCAG 對比度標準

### 9. 測試建議

1. 在不同設備上測試深色模式
2. 檢查所有頁面的深色模式效果
3. 確認文字可讀性
4. 測試主題切換的流暢性

現在您的專案已經完全支援深色模式，用戶可以根據自己的偏好選擇主題！
