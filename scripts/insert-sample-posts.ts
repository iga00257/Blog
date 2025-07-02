import { MongoClient, ObjectId } from "mongodb";

const uri = process.env["MONGODB_URI_EXTERNAL"];

const samplePosts = [
  {
    title: "React 18 新特性解析",
    slug: "react-18-features",
    coverImageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    content: `
# React 18 新特性解析

React 18 帶來了許多令人興奮的新特性，包括 Concurrent Features 和 Suspense 的增強。

## 主要新特性

- **Concurrent Features**: 允許 React 中斷和恢復渲染
- **Suspense**: 增強的服務器端渲染支持
- **Automatic Batching**: 自動批處理狀態更新

## 使用示例

\`\`\`jsx
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';

const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);
\`\`\`

<Note>
  React 18 需要配合新的 createRoot API 使用。
</Note>
    `,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    title: "TypeScript 進階技巧",
    slug: "typescript-advanced-tips",
    coverImageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop",
    content: `
# TypeScript 進階技巧

TypeScript 的泛型和類型推斷是強大的工具，能夠幫助我們編寫更加類型安全的代碼。

## 泛型基礎

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
\`\`\`

## 條件類型

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

<Note type="success">
  掌握這些概念將大大提升你的 TypeScript 技能。
</Note>
    `,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
];

async function insertSamplePosts() {
  if (!uri) {
    console.error("MONGODB_URI_EXTERNAL 環境變量未設置");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("已連接到 MongoDB");

    const db = client.db("blog");
    const collection = db.collection("posts");

    const existingCount = await collection.countDocuments();
    console.log(`數據庫中已有 ${existingCount} 篇文章`);

    if (existingCount > 0) {
      console.log("數據庫中已有文章，跳過插入示例文章");
      return;
    }

    const postsToInsert = samplePosts.map((post) => ({
      ...post,
      _id: new ObjectId(),
    }));

    const result = await collection.insertMany(postsToInsert);
    console.log(`成功插入 ${result.insertedCount} 篇示例文章`);

    console.log("\n插入的文章列表：");
    for (const post of postsToInsert) {
      console.log(`- ${post.title} (slug: ${post.slug})`);
    }
  } catch (error) {
    console.error("插入文章時發生錯誤:", error);
  } finally {
    await client.close();
    console.log("已關閉數據庫連接");
  }
}

insertSamplePosts().catch(console.error);
