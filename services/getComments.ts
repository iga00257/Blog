import getMongoClient from "./getMongoClient";
import { ObjectId } from "mongodb";

export default async function (postObjectId: ObjectId) {
  const mongo = await getMongoClient();
  console.log(postObjectId);
  const comments = await mongo
    .db("blog")
    .collection("comments")
    .aggregate([
      { $match: { postId: postObjectId } },
      {
        $addFields: {
          // 將字符串 userId 轉換為 ObjectId
          userIdObjectId: { $toObjectId: "$userId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObjectId", // 使用轉換後的 ObjectId
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $project: {
          // 移除臨時字段，保留需要的字段
          _id: 1,
          postId: 1,
          userId: 1,
          content: 1,
          createdAt: 1,
          author: 1,
        },
      },
    ])
    .toArray();

  const commentsUseFind = await mongo
    .db("blog")
    .collection("comments")
    .find({ postId: postObjectId })
    .toArray();

  console.log("commentsUseFind", commentsUseFind);
  console.log("comments", comments);
  await mongo.close();
  return comments;
}
