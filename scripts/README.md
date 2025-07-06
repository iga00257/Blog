# 示例文章生成腳本

這個目錄包含了用於生成和插入示例文章到數據庫的腳本。

## 文件結構

- `insert-sample-posts.js` - 主要的插入腳本（JavaScript 版本）
- `generate-more-posts.js` - 更多示例文章腳本（JavaScript 版本）
- `insert-sample-posts.ts` - TypeScript 版本（可選）
- `generate-more-posts.ts` - TypeScript 版本（可選）
- `README.md` - 本說明文件

## 使用方法

### 1. 設置環境變量

確保你已經設置了 `MONGODB_URI_EXTERNAL` 環境變量：

```bash
export MONGODB_URI_EXTERNAL="mongodb://your-mongodb-uri"
```

### 2. 運行腳本

```bash
# 測試數據庫連接
npm run test-db

# 插入示例文章
npm run insert-samples
npm run insert-more

# 或者直接運行
node scripts/test-connection.js
node scripts/insert-sample-posts.js
node scripts/generate-more-posts.js
```

## 腳本功能

### 測試連接腳本 (`test-connection.js`)

- 測試 MongoDB 連接
- 顯示數據庫中的文章數量
- 顯示最近的文章列表

### 插入示例文章腳本

- 連接到 MongoDB 數據庫
- 檢查是否已有文章存在
- 如果沒有文章，插入預定義的示例文章
- 顯示插入結果

## 示例文章內容

腳本會插入以下示例文章：

1. **React 18 新特性解析**
   - Slug: `react-18-features`
   - 內容：介紹 React 18 的 Concurrent Features 和 Suspense

2. **TypeScript 進階技巧**
   - Slug: `typescript-advanced-tips`
   - 內容：介紹 TypeScript 的泛型和類型推斷

## 文章格式

每篇文章包含以下字段：

- `title`: 文章標題
- `slug`: URL 友好的標識符
- `coverImageUrl`: 封面圖片 URL
- `content`: MDX 格式的文章內容
- `createdAt`: 創建時間
- `updatedAt`: 更新時間

## MDX 支持

文章內容支持 MDX 語法，包括：

- Markdown 語法
- 自定義組件（如 `<Note>`）
- 代碼高亮
- 圖片和視頻嵌入

## 注意事項

- 腳本只會在數據庫為空時插入示例文章
- 如果數據庫中已有文章，腳本會跳過插入
- 確保 MongoDB 連接字符串正確
- 腳本會自動處理 ObjectId 生成

## 自定義

你可以修改 `insert-sample-posts.ts` 文件來：

- 添加更多示例文章
- 修改文章內容
- 調整文章格式
- 添加更多字段
