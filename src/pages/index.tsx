import cx from 'classnames';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import PageHead from '@/components/PageHead';
import PostCard from '@/components/PostCard';
import SocialLinks from '@/components/SocialLinks';
import { GOOGLE_OAUTH_CLIENT_ID } from '@/constants/config.client';
import Post, { parsePost, serializePost } from '@/models/post';
import { getPostsInMongo } from '@/services/getPosts';

type Card = { type: 'Article'; data: Post; key: string };

export default function Home(props: { posts: Post[] }) {
  const data = props.posts.map(parsePost);

  const cards: Card[] = data.map((post) => ({
    type: 'Article',
    data: post,
    key: post.slug,
  }));

  return (
    <div className='min-h-screen bg-white text-text-primary transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text-primary'>
      <PageHead canonicalUrl='https://yual.in' />
      <div className='container mx-auto flex flex-row flex-wrap px-6 py-8 lg:px-12 lg:pb-24 2xl:px-32'>
        <div className='mt-4 lg:mt-12'>
          <Link href='/' scroll>
            <div className='mb-4 flex cursor-pointer flex-row items-baseline text-xl font-extrabold lg:mb-0 lg:flex-col lg:text-3xl'>
              <p className='mr-2'>Derrick Liu</p>
              <p className='text-lg text-primary'>Blog</p>
            </div>
          </Link>
          <SocialLinks />
        </div>
        <div className='my-16 grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3'>
          {cards.map((card, i) => {
            switch (card.type) {
              case 'Article':
                return (
                  <div className={cx(i == 0 && 'md:col-span-2')} key={card.key}>
                    <PostCard
                      post={card.data}
                      imageClassName={cx(
                        i === 0 && 'h-64 lg:h-96',
                        i === 1 && 'h-64',
                        i > 1 && 'h-48 lg:h-64',
                      )}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
      <div
        id='g_id_onload'
        data-auto_select='true'
        data-skip_prompt_cookie='token'
        data-client_id={GOOGLE_OAUTH_CLIENT_ID}
        data-login_uri='/api/login?url=/'
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let postsInMongo: any = await getPostsInMongo();
  postsInMongo = postsInMongo.map(serializePost);
  return {
    props: { posts: postsInMongo },
    revalidate: 10,
  };
};
