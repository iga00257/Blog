import { Avatar, useToasts } from '@geist-ui/core';
import cx from 'classnames';
import { ObjectId } from 'mongodb';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart } from 'react-feather';

import PageHead from '@/components/PageHead';
import SocialLinks from '@/components/SocialLinks';
import { GOOGLE_OAUTH_CLIENT_ID } from '@/constants/config.client';
import { useSession } from '@/hooks/session';
import Comment from '@/models/comment';
import Post, { parsePost, serializePost } from '@/models/post';
import getComments from '@/services/getComments';
import getPost, { getPostBySlug } from '@/services/getPost';
import { getPostsInMongo } from '@/services/getPosts';

interface PageProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  comments: Comment[];
}

export default function PostPage(props: PageProps) {
  const { post, mdxSource } = props;
  const postId = parsePost(post)._id;
  const [shouldHideWhiteLogo, setShouldHideWhiteLogo] = useState(false);
  const session = useSession();
  const toast = useToasts();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<{
    userLike: number;
    likeCount: number;
    userAvatars: string[];
  }>();

  const [comments, setComments] = useState<Comment[]>(props.comments);

  const [commentInput, setCommentInput] = useState('');

  async function submitComment() {
    if (!commentInput) return;
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentInput }),
      });
      if (res.status === 201) {
        setCommentInput('');
        await refresh();
      }
    } catch (e) {
      toast.setToast({
        text: '發生錯誤，暫時無法留言！',
        type: 'error',
      });
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    if (!postId) return;
    try {
      const likes = await fetch('/api/posts/' + postId + '/likes');
      const likesData = await likes.json();
      setLikes(likesData);
      const posts = await fetch('/api/posts');
      const postsData = await posts.json();
      setPosts(postsData.map((p: Post) => parsePost(p)));
      const comments = await fetch('/api/posts/' + postId + '/comments');
      const commentsData = await comments.json();
      setComments(commentsData);
    } catch (err) {
      console.error(err);
    }
  }

  function login() {
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      '?response_type=code' +
      `&client_id=${GOOGLE_OAUTH_CLIENT_ID}` +
      '&scope=openid%20email%20https://www.googleapis.com/auth/userinfo.profile' +
      `&redirect_uri=https://${window.location.host}/api/login&state=/posts/${post.slug}`;
  }

  async function handleLike() {
    if (!session.session) {
      login();
      return;
    }
    if (!likes || likes.userLike >= 10) return;
    setLikes((o) =>
      !o
        ? undefined
        : {
            ...o,
            likeCount: o.likeCount + 1,
            userLike: o.userLike + 1,
          },
    );
    await fetch('/api/posts/' + postId + '/likes', { method: 'POST' });
  }

  useEffect(() => {
    function handleScroll() {
      if (document.documentElement.scrollTop > 36 * 16) {
        setShouldHideWhiteLogo(true);
      } else {
        setShouldHideWhiteLogo(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-white text-text-primary transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text-primary'>
      <PageHead
        title={(post ? post.title : 'Blog') + '| Derrick Liu 劉穎多'}
        type='article'
        description={post?.content.substring(0, 100) + '...'}
      />
      <div
        className={cx(
          'fixed top-0 w-full px-4 lg:w-64',
          'flex flex-row justify-between lg:flex-col',
          'z-50 bg-white py-2 transition lg:bg-opacity-0 lg:p-6',
          !shouldHideWhiteLogo && 'bg-opacity-0',
        )}
      >
        <Link href='/' scroll passHref>
          <div className='mb-0 flex cursor-pointer flex-row items-baseline text-xl font-extrabold lg:flex-col lg:text-3xl'>
            <p
              className={cx(
                'z-50 mr-2 transition duration-1000',
                shouldHideWhiteLogo ? 'text-black' : 'text-white',
              )}
            >
              Derrick Liu
            </p>
            <p className='text-lg text-primary'>Blog</p>
          </div>
        </Link>
        <SocialLinks color={shouldHideWhiteLogo ? 'black' : 'white'} />
      </div>
      <div className='relative flex h-[32rem] w-full justify-center overflow-hidden lg:h-[46rem]'>
        <Image
          layout='fill'
          objectFit='cover'
          src={post?.coverImageUrl}
          className='absolute top-0 h-full w-full bg-zinc-500 object-cover'
          alt=''
        />
        <div className='absolute top-0 right-0 h-full w-full bg-black bg-opacity-60' />
        <div className='absolute bottom-12 mx-auto w-full px-4 lg:bottom-24 lg:w-[650px]'>
          {!post ? (
            <TitleSkeleton />
          ) : (
            <p
              className='text-3xl font-extrabold text-white drop-shadow-lg lg:text-5xl'
              style={{ lineHeight: 1.5 }}
            >
              {post?.title}
            </p>
          )}

          {!post ? (
            <AuthorSkeleton />
          ) : (
            <div className='mt-4 flex flex-row align-bottom'>
              <img
                src='https://lh3.googleusercontent.com/a/ACg8ocLrYjvD01l_M0ZX5DWrnQD-5g36lsVf3upMBetPWTd8jzgvfQmg=s96-c'
                className='mr-4 h-8 w-8 rounded-full'
                alt=''
              />
              <p className='font-extrabold text-white opacity-80 drop-shadow-md lg:text-xl'>
                Derrick Liu 劉穎多
              </p>
              <p className='ml-2 text-white opacity-60 drop-shadow-md lg:ml-8 lg:text-xl'>
                {new Date(post?.createdAt).toISOString().split('T')[0]}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className='mx-auto min-h-screen w-full px-7 pb-32 lg:w-[650px]'>
        <div id='article' className='my-16'>
          {!post && <ArticleSkeleton />}
          <MDXRemote {...mdxSource} />
        </div>

        {likes && (
          <div className='overflow-hidden'>
            <div onClick={handleLike} className='group flex cursor-pointer items-center'>
              <Heart
                fill='currentColor'
                fillOpacity={likes.userLike / 10 || 0}
                color='currentColor'
                className='text-accent transition group-active:scale-125'
              />
              {likes.likeCount && <p className='ml-4 mr-6 text-accent'>{likes.likeCount}</p>}
              {likes.likeCount === 0 && (
                <p className='ml-4 mr-6 text-accent'>給這篇文章一個愛心吧！</p>
              )}
              <Avatar.Group>
                {likes.userAvatars?.map((avatar, index) => (
                  <Avatar key={index} src={avatar} stacked />
                ))}
              </Avatar.Group>
            </div>
          </div>
        )}
      </div>
      <div className='w-full bg-zinc-50 py-16 dark:bg-dark-bg-secondary'>
        <div className='mx-auto w-full px-4 lg:w-[650px]'>
          <p className='mb-4 text-center font-extrabold text-text-secondary opacity-60 dark:text-dark-text-secondary md:text-left'>
            分享你的看法
          </p>
          <div
            className={`my-8 flex w-full items-center gap-4 ${!session.session ? 'cursor-pointer opacity-50' : ''}`}
          >
            {session.session ? (
              <img
                src={session.session?.avatarUrl}
                alt='author-avatar'
                className='h-8 w-8 rounded-full'
              />
            ) : (
              <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-dark-bg-tertiary' />
            )}
            <input
              className={`flex-grow rounded-lg border border-gray-200 bg-white px-4 py-2 text-text-primary dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary ${!session.session ? 'cursor-pointer' : ''}`}
              placeholder={session.session ? '' : '點擊即可登入並留言'}
              onClick={() => !session.session && login()}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              className='shrink-0 rounded-lg bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-dark'
              onClick={() => (!session.session ? login() : submitComment())}
            >
              留言
            </button>
          </div>

          {comments?.map((comment, index) => (
            <div key={index} className='my-8 flex flex-col gap-4 overflow-x-hidden'>
              <div className='flex items-center gap-4'>
                <img
                  src={comment.author.avatarUrl}
                  alt='author-avatar'
                  className='h-8 w-8 rounded-full'
                />
                <p className='font-extrabold text-text-primary dark:text-dark-text-primary'>
                  {comment.author.name}
                </p>
                <p className='text-text-secondary opacity-60 dark:text-dark-text-secondary'>
                  {comment.createdAt.split('T')[0]}
                </p>
              </div>
              <p className='text-text-primary dark:text-dark-text-primary'>{comment.content}</p>
            </div>
          ))}

          {comments && comments.length === 0 && (
            <p className='text-center text-text-secondary opacity-60 dark:text-dark-text-secondary'>
              暫無留言，你可以成為第一個留言的人！
            </p>
          )}
        </div>
      </div>
      <div className='w-full bg-zinc-100 pb-32 pt-16 dark:bg-dark-bg-tertiary'>
        <div className='mx-auto w-full px-4 lg:w-[650px]'>
          <div className='mt-12 flex flex-col items-center md:flex-row'>
            <img
              src='https://lh3.googleusercontent.com/a/ACg8ocLrYjvD01l_M0ZX5DWrnQD-5g36lsVf3upMBetPWTd8jzgvfQmg=s96-c?v=4'
              alt='author-avatar'
              className='h-24 w-24 rounded-full'
            />
            <div className='ml-0 mt-12 md:ml-12 md:mt-0'>
              <p className='mb-4 text-center font-extrabold text-text-secondary opacity-60 dark:text-dark-text-secondary md:text-left'>
                關於作者
              </p>
              <p className='text-center text-2xl font-extrabold text-text-primary dark:text-dark-text-primary md:text-left'>
                Derrick Liu 劉穎多
              </p>
              <p className='mt-6 mb-12 text-center text-text-secondary opacity-70 dark:text-dark-text-secondary md:text-left'>
                台灣新竹人，目前是全端開發工程師，熱愛產品設計與軟體開發。
              </p>
              <div className='flex justify-center md:justify-start'>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
      {posts && posts.length > 0 && (
        <div className='w-full bg-zinc-200 pb-32 pt-16 dark:bg-dark-bg'>
          <div className='mx-auto w-full px-4 lg:w-[650px]'>
            <p className='mb-16 text-center font-extrabold text-text-primary dark:text-dark-text-primary md:text-left'>
              你可能也會喜歡
            </p>
            {posts
              .filter((p) => p._id !== postId)
              .sort(() => Math.random() - 0.5)
              .slice(0, 5)
              .map((p) => (
                <Link key={p._id} href='/posts/[postId]' as={`/posts/${p._id}`} legacyBehavior>
                  <div className='group mb-12 flex cursor-pointer flex-col md:flex-row'>
                    <img
                      src={p.coverImageUrl}
                      alt={p.title}
                      className='mr-8 h-48 w-full rounded-lg object-cover transition-all duration-500 group-hover:scale-105 md:w-48'
                    />
                    <div className='mt-4 flex-1 md:mt-0'>
                      <p className='text-xl font-extrabold text-text-primary transition-all duration-700 group-hover:translate-x-2 dark:text-dark-text-primary'>
                        {p.title}
                      </p>
                      <p className='my-4 font-extrabold text-text-secondary opacity-40 transition-all duration-1000 group-hover:translate-x-4 dark:text-dark-text-secondary'>
                        {p.createdAt.toLocaleDateString()}
                      </p>
                      <p className='text-text-primary transition-all group-hover:opacity-100 dark:text-dark-text-primary lg:opacity-80'>
                        {p.content}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            <Link href='/' scroll legacyBehavior>
              <div className='flex cursor-pointer'>
                <ArrowLeft className='mr-4' />
                <p className='text-text-primary dark:text-dark-text-primary'>回部落格首頁</p>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div
        id='g_id_onload'
        data-auto_select='true'
        data-skip_prompt_cookie='token'
        data-client_id={GOOGLE_OAUTH_CLIENT_ID}
        data-login_uri={'/api/login?url=/posts/' + postId}
      />
    </div>
  );
}

function AuthorSkeleton() {
  return (
    <div className='mt-8 flex flex-row items-center align-bottom'>
      <div className='mr-4 h-8 w-8 animate-pulse rounded-full bg-zinc-500 dark:bg-dark-bg-tertiary' />
      <div className='mr-4 h-6 w-64 animate-pulse rounded-lg bg-zinc-600 dark:bg-dark-bg-secondary' />
      <div className='h-6 w-36 animate-pulse rounded-lg bg-zinc-700 dark:bg-dark-bg-tertiary' />
    </div>
  );
}

function TitleSkeleton() {
  return (
    <div>
      <div className='h-8 w-full animate-pulse rounded-xl bg-zinc-600 dark:bg-dark-bg-secondary lg:h-14' />
      <div className='mt-4 h-8 w-1/2 animate-pulse rounded-xl bg-zinc-600 dark:bg-dark-bg-secondary lg:h-14' />
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div>
      <div className='h-4 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-1/2 animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-1/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-1/4 animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='my-16 h-8 w-full animate-pulse rounded-lg bg-zinc-300 dark:bg-dark-bg-tertiary' />
      <div className='h-4 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-1/2 animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-1/3 animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
      <div className='mt-4 h-4 w-1/4 animate-pulse rounded-lg bg-zinc-200 dark:bg-dark-bg-secondary' />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await getPostsInMongo();
  const paths = posts.map((p) => ({ params: { postId: p.slug } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const postId = context.params?.postId;
  if (typeof postId !== 'string') return { notFound: true };
  if (!postId.match(/^[a-f\d]{24}$/i)) {
    try {
      const post = await getPostBySlug(postId);
      if (!post) {
        return { notFound: true };
      }
      const comments = await getComments(new ObjectId(post._id));
      const mdxSource = await serialize(post.content, {
        mdxOptions: { development: false },
      });
      console.log('static props comments', comments);
      return {
        revalidate: 10,
        props: {
          key: postId,
          postId,
          post: serializePost(post),
          mdxSource,
          comments: comments.map((c) => {
            c._id = c._id.toHexString();
            c.userId = '';
            c.postId = c.postId.toHexString();
            c.createdAt = c.createdAt.toISOString();
            c.author._id = c.author._id.toHexString();
            return c;
          }),
        },
      };
    } catch (error) {
      console.error(error);
      return { notFound: true };
    }
  }
  try {
    const post = await getPost(postId);
    return {
      redirect: {
        destination: '/posts/' + post.slug,
        permanent: true,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
