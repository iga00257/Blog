import Head from 'next/head';
import Link from 'next/link';

import SocialLinks from '../components/SocialLinks';

export default function Card() {
  return (
    <div className='flex h-screen w-full flex-col justify-center bg-zinc-50 pb-32 pt-16 dark:bg-dark-bg-secondary'>
      <Head>
        <title>劉穎多 Derrick Liu 的電子名片</title>
        <meta
          name='og:description'
          content='本頁是 Derrick Liu 劉穎多的電子名片，有自我介紹、作品集與聯繫方式。'
        />
        <meta name='og:image' content='/card-og.png' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <div className='mx-auto w-full px-16 pb-24 lg:w-[650px] lg:px-4'>
        <div className='mt-12 flex flex-col items-center justify-center'>
          <img
            src='https://lh3.googleusercontent.com/a/ACg8ocLrYjvD01l_M0ZX5DWrnQD-5g36lsVf3upMBetPWTd8jzgvfQmg=s96-c?v=4'
            alt='author-avatar'
            className='h-24 w-24 rounded-full'
          />
          <div className='ml-0 mt-12'>
            <p className='mb-4 text-center font-extrabold opacity-60'>關於我</p>
            <p className='text-center text-2xl font-extrabold'>Derrick Liu 劉穎多</p>
            <p className='mt-6 mb-12 text-center opacity-70'>
              台灣新竹人，目前是全端開發工程師，熱愛產品設計與軟體開發。
            </p>
            <div className='flex justify-center'>
              <SocialLinks />
            </div>
          </div>
          <a
            href='https://yuanlinlin.notion.site/6ceac3a80f684708ae8efeb5742a8335'
            className='mt-12 cursor-pointer text-center text-blue-500'
            target='_blank'
            rel='noreferrer'
          >
            作品集
          </a>

          <div className='absolute bottom-12 left-0 w-full'>
            <Link href='/'>
              <p className='cursor-pointer text-center text-blue-500'>回部落格首頁</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
