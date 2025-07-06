import { NextApiRequest, NextApiResponse } from 'next';

import { getPostsInMongo } from '../../../services/getPosts';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const postsInMongo = await getPostsInMongo();
        res.status(200).json(postsInMongo);
      } catch (err: any) {
        console.error(err);
      }
  }
}
