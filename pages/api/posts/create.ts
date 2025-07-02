import getMongoClient from "../../../services/getMongoClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { title, content, coverImageUrl } = req.body;

  // 驗證必填字段
  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" });
    return;
  }

  // 生成 slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格轉換為連字符
    .replace(/-+/g, "-") // 多個連字符轉換為單個
    .trim();

  const mongo = await getMongoClient();

  try {
    // 檢查 slug 是否已存在
    const existingPost = await mongo
      .db("blog")
      .collection("posts")
      .findOne({ slug });

    if (existingPost) {
      res.status(400).json({ error: "A post with this title already exists" });
      return;
    }

    // 插入新文章
    const result = await mongo
      .db("blog")
      .collection("posts")
      .insertOne({
        _id: new ObjectId(),
        title,
        slug,
        content,
        coverImageUrl:
          coverImageUrl ||
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    await mongo.close();

    res.status(201).json({
      success: true,
      postId: result.insertedId,
      slug,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    await mongo.close();
    res.status(500).json({ error: "Failed to create post" });
  }
}
