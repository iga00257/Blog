import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env['MONGODB_URI_EXTERNAL'];

const additionalPosts = [
  {
    title: 'Next.js 13 App Router 完全指南',
    slug: 'nextjs-13-app-router-guide',
    coverImageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    content: `
# Next.js 13 App Router 完全指南

Next.js 13 引入了全新的 App Router，這是一個基於 React Server Components 的革命性路由系統。

## 主要特點

- **基於文件夾的路由**：使用文件夾結構定義路由
- **服務器組件優先**：默認使用 React Server Components
- **更好的性能**：自動代碼分割和優化

## 文件夾結構

\`\`\`
app/
├── layout.tsx          # 根布局
├── page.tsx           # 首頁
├── blog/
│   ├── layout.tsx     # 博客布局
│   ├── page.tsx       # 博客列表頁
│   └── [slug]/
│       └── page.tsx   # 博客文章頁
\`\`\`

## 使用示例

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>My Blog</header>
        {children}
        <footer>© 2024</footer>
      </body>
    </html>
  )
}
\`\`\`

<Note>
  App Router 是 Next.js 的未來，建議新項目直接使用這個架構。
</Note>
    `,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    title: '現代 CSS 技巧：Grid 與 Flexbox',
    slug: 'modern-css-grid-flexbox',
    coverImageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    content: `
# 現代 CSS 技巧：Grid 與 Flexbox

CSS Grid 和 Flexbox 是現代 CSS 布局的兩大核心技術。

## CSS Grid 基礎

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 100px 1fr 100px;
  gap: 20px;
}
\`\`\`

## Flexbox 基礎

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
\`\`\`

## 實際應用

### 響應式卡片布局

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

<Note type="success">
  掌握 Grid 和 Flexbox 將大大提升你的 CSS 技能。
</Note>
    `,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    title: 'Node.js 性能優化實戰指南',
    slug: 'nodejs-performance-optimization',
    coverImageUrl:
      'https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?w=1200&h=600&fit=crop',
    content: `
# Node.js 性能優化實戰指南

Node.js 性能優化是生產環境中的關鍵課題。

## 內存優化

### 避免內存洩漏

\`\`\`javascript
// 好的做法
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  
  addListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
  
  removeListener(event, callback) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
}
\`\`\`

## 異步操作

\`\`\`javascript
// 好的做法 - 異步讀取文件
const fs = require('fs').promises;

async function processFileAsync(path) {
  const data = await fs.readFile(path, 'utf8');
  return data.toUpperCase();
}
\`\`\`

## 緩存策略

\`\`\`javascript
class MemoryCache {
  constructor() {
    this.cache = new Map();
  }
  
  set(key, value, ttl = 60000) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
}
\`\`\`

<Note type="warning">
  記住，過早優化是萬惡之源，先確保功能正確，再進行性能優化。
</Note>
    `,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    title: 'Docker 容器化部署最佳實踐',
    slug: 'docker-containerization-best-practices',
    coverImageUrl:
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=600&fit=crop',
    content: `
# Docker 容器化部署最佳實踐

Docker 已經成為現代應用部署的標準工具。

## Dockerfile 最佳實踐

### 多階段構建

\`\`\`dockerfile
# 構建階段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 運行階段
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 安全考慮

### 非 root 用戶運行

\`\`\`dockerfile
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
\`\`\`

## Docker Compose

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: mongo:5
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
\`\`\`

<Note>
  容器化部署可以大大提高應用的可移植性和一致性。
</Note>
    `,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    title: 'Git 工作流程與分支策略',
    slug: 'git-workflow-branching-strategy',
    coverImageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop',
    content: `
# Git 工作流程與分支策略

良好的 Git 工作流程是團隊協作的重要基礎。

## Git Flow 工作流程

### 主要分支

- **main**: 生產環境代碼
- **develop**: 開發環境代碼
- **feature/***: 功能分支
- **release/***: 發布分支
- **hotfix/***: 熱修復分支

## 分支命名規範

\`\`\`bash
# 功能分支
git checkout -b feature/user-authentication

# 修復分支
git checkout -b fix/login-bug

# 發布分支
git checkout -b release/v1.2.0

# 熱修復分支
git checkout -b hotfix/security-patch
\`\`\`

## 提交信息規範

\`\`\`bash
# 格式：<type>(<scope>): <subject>

# 示例
git commit -m "feat(auth): add OAuth2 authentication"
git commit -m "fix(api): resolve user data fetching issue"
git commit -m "docs(readme): update installation instructions"
\`\`\`

## 常用命令

\`\`\`bash
# 查看分支
git branch -a

# 切換分支
git checkout develop

# 合併分支
git merge feature/new-feature

# 刪除分支
git branch -d feature/old-feature
\`\`\`

<Note type="success">
  良好的 Git 工作流程可以提高團隊的開發效率和代碼質量。
</Note>
    `,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

async function insertAdditionalPosts() {
  if (!uri) {
    console.error('MONGODB_URI_EXTERNAL 環境變量未設置');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('已連接到 MongoDB');

    const db = client.db('blog');
    const collection = db.collection('posts');

    const existingCount = await collection.countDocuments();
    console.log(`數據庫中已有 ${existingCount} 篇文章`);

    const postsToInsert = additionalPosts.map((post) => ({
      ...post,
      _id: new ObjectId(),
    }));

    const result = await collection.insertMany(postsToInsert);
    console.log(`成功插入 ${result.insertedCount} 篇額外文章`);

    console.log('\n插入的文章列表：');
    for (const post of postsToInsert) {
      console.log(`- ${post.title} (slug: ${post.slug})`);
    }
  } catch (error) {
    console.error('插入文章時發生錯誤:', error);
  } finally {
    await client.close();
    console.log('已關閉數據庫連接');
  }
}

insertAdditionalPosts().catch(console.error);
