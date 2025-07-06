const { MongoClient } = require('mongodb');

const uri = process.env['MONGODB_URI_EXTERNAL'];

async function testConnection() {
  if (!uri) {
    console.error('❌ MONGODB_URI_EXTERNAL 環境變量未設置');
    console.log('請設置環境變量：');
    console.log("export MONGODB_URI_EXTERNAL='your-mongodb-connection-string'");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('🔌 正在連接到 MongoDB...');
    await client.connect();
    console.log('✅ 成功連接到 MongoDB');

    const db = client.db('blog');
    const collection = db.collection('posts');

    const count = await collection.countDocuments();
    console.log(`📊 數據庫中共有 ${count} 篇文章`);

    if (count > 0) {
      console.log('📝 最近的文章：');
      const recentPosts = await collection.find({}).sort({ createdAt: -1 }).limit(3).toArray();

      recentPosts.forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.title} (${post.slug})`);
      });
    } else {
      console.log('📭 數據庫中沒有文章');
      console.log('💡 運行以下命令插入示例文章：');
      console.log('  npm run insert-samples');
    }
  } catch (error) {
    console.error('❌ 連接失敗:', error.message);
    console.log('🔧 請檢查：');
    console.log('  1. MongoDB 服務是否運行');
    console.log('  2. 連接字符串是否正確');
    console.log('  3. 網絡連接是否正常');
  } finally {
    await client.close();
    console.log('🔌 已關閉數據庫連接');
  }
}

testConnection().catch(console.error);
