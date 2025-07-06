import cx from 'classnames';
import Image from 'next/legacy/image';
import Link from 'next/link';

import Post from '../models/post';

interface Props {
  post: Post;
  imageClassName?: string;
  titleClassName?: string;
}

function PostCard(props: Props) {
  const { post, imageClassName, titleClassName } = props;

  return (
    <Link href={'/posts/' + post.slug} scroll>
      <a>
        <div className='group w-full transition-all duration-1000'>
          <div
            className={cx(
              imageClassName,
              'w-full object-cover',
              'overflow-hidden duration-500 lg:group-hover:scale-105',
              'cursor-pointer rounded-lg shadow-lg',
              'relative',
            )}
          >
            <Image layout='fill' objectFit='cover' src={post.coverImageUrl} alt='' />
          </div>
          <p
            className={cx(
              titleClassName,
              'text-2xl font-extrabold',
              'mt-6 cursor-pointer group-hover:translate-x-2',
              'duration-1000',
            )}
          >
            {post.title}
          </p>
          <p className='mt-2 cursor-pointer font-extrabold text-secondary-dark transition-all duration-700 group-hover:translate-x-4'>
            {post.createdAt.toISOString().split('T')[0]}
          </p>
          <p className='mt-4 cursor-pointer text-text-secondary transition-all group-hover:opacity-100 dark:text-dark-text-secondary lg:opacity-40'>
            {post.content.substring(0, 100)} ...
          </p>
        </div>
      </a>
    </Link>
  );
}

export default PostCard;
