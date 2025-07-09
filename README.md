# 博客系統使用指南

這是一個基於 Next.js 和 MongoDB 的現代博客系統，支持 MDX 格式的文章和豐富的交互功能。

## 系統架構

### 技術棧

- **前端**: Next.js 12, React 18, TypeScript
- **後端**: Next.js API Routes
- **數據庫**: MongoDB
- **樣式**: Tailwind CSS
- **MDX**: next-mdx-remote

### 主要功能

- ✅ MDX 文章支持
- ✅ 代碼高亮
- ✅ 自定義組件（Note, Tree, Snippet）
- ✅ 圖片和視頻嵌入
- ✅ 用戶認證（Google OAuth）
- ✅ 評論系統
- ✅ 點讚功能
- ✅ 響應式設計
- ✅ SEO 優化

## 文章格式

### 數據結構

每篇文章包含以下字段：

```typescript
interface Post {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  content: string; // MDX 格式
  createdAt: Date;
  updatedAt: Date;
}
```

### MDX 支持

文章內容支持完整的 MDX 語法：

#### 1. Markdown 語法

```markdown
# 標題

## 子標題

- 列表項目
- 另一個項目

**粗體** 和 _斜體_

[鏈接](https://example.com)
```

#### 2. 代碼高亮

````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
````

#### 3. 自定義組件

```jsx
<Note>
  這是一個提示框。
</Note>

<Note type="warning">
  這是一個警告框。
</Note>

<Note type="success">
  這是一個成功提示。
</Note>

<Snippet text="npm install package" />
```

#### 4. 圖片和視頻

```markdown
![圖片描述](https://example.com/image.jpg)

<iframe src="https://www.youtube.com/embed/VIDEO_ID" />
```

## 如何創建文章

### 方法一：使用寫作頁面

1. 訪問 `/write` 頁面
2. 在左側編輯器中編寫 MDX 內容
3. 右側會實時預覽渲染結果
4. 內容會自動保存到 localStorage

### 方法二：直接插入數據庫

使用提供的腳本：

```bash
# 插入基礎示例文章
npm run insert-samples

# 插入更多示例文章
npm run insert-more
```

### 方法三：手動插入

```javascript
const post = {
  title: '文章標題',
  slug: 'article-slug',
  coverImageUrl: 'https://example.com/cover.jpg',
  content: `
# 文章內容

這是 MDX 格式的內容...
  `,
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## 自定義組件

### Note 組件

```jsx
<Note>默認提示</Note>
<Note type="warning">警告提示</Note>
<Note type="success">成功提示</Note>
<Note type="error">錯誤提示</Note>
```

### Snippet 組件

```jsx
<Snippet text='npm install package' />
```

### Tree 組件

```jsx
<Tree>
  <Tree.File name='file.js' />
  <Tree.Folder name='src'>
    <Tree.File name='index.js' />
  </Tree.Folder>
</Tree>
```

## 環境配置

### 必需環境變量

```bash
# MongoDB 連接字符串
MONGODB_URI_EXTERNAL=mongodb://localhost:27017/blog

# Google OAuth
GOOGLE_OAUTH_CLIENT_ID=your-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret

# JWT 密鑰
JWT_SECRET=your-jwt-secret
```

### 可選環境變量

```bash
# 網站 URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 部署

### 本地開發

```bash
npm install
npm run dev
```

### 生產部署

```bash
npm run build
npm start
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 數據庫管理

### 連接數據庫

```javascript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI_EXTERNAL);
await client.connect();
const db = client.db('blog');
const collection = db.collection('posts');
```

### 查詢文章

```javascript
// 獲取所有文章
const posts = await collection.find({}).toArray();

// 根據 slug 獲取文章
const post = await collection.findOne({ slug: 'article-slug' });
```

### 插入文章

```javascript
const result = await collection.insertOne({
  title: '新文章',
  slug: 'new-article',
  content: '# 內容',
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

## 性能優化

### 1. 圖片優化

- 使用 Next.js Image 組件
- 自動圖片優化和懶加載
- 支持 WebP 格式

### 2. 代碼分割

- 自動路由級代碼分割
- 動態導入組件
- 優化 bundle 大小

### 3. 緩存策略

- 靜態生成 (SSG)
- 增量靜態再生 (ISR)
- 瀏覽器緩存

## 安全考慮

### 1. 認證

- Google OAuth 2.0
- JWT Token 驗證
- 安全的會話管理

### 2. 數據驗證

- 輸入驗證和清理
- SQL 注入防護
- XSS 防護

### 3. 環境變量

- 敏感信息使用環境變量
- 生產環境安全配置

## 故障排除

### 常見問題

1. **MDX 渲染錯誤**
   - 檢查語法是否正確
   - 確保自定義組件已導入

2. **數據庫連接失敗**
   - 檢查 MongoDB URI
   - 確認網絡連接

3. **圖片無法顯示**
   - 檢查圖片 URL 是否有效
   - 確認圖片格式支持

### 調試技巧

```bash
# 查看詳細錯誤信息
NODE_ENV=development npm run dev

# 檢查數據庫連接
npm run insert-samples
```

## 擴展功能

### 添加新組件

1. 在 `components/mdx/` 目錄創建組件
2. 在 `components/mdx/index.tsx` 中註冊
3. 在 MDX 內容中使用

### 自定義樣式

- 修改 `styles/globals.css`
- 更新 Tailwind 配置
- 自定義組件樣式

### API 擴展

- 在 `pages/api/` 添加新端點
- 實現新的數據操作
- 添加中間件

## 總結

這個博客系統提供了完整的文章管理功能，支持豐富的 MDX 內容，具有良好的性能和用戶體驗。通過合理的配置和擴展，可以滿足各種博客需求。

---

_如有問題，請查看代碼註釋或提交 Issue。_
