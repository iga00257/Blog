import Link from 'next/link';

import SocialLinks from '../components/SocialLinks';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <div className='container mx-auto flex flex-row flex-wrap px-6 py-8 lg:px-32 lg:pb-24 2xl:px-64'>
        <div className='mt-4 lg:mt-12'>
          <Link href='/' scroll passHref>
            <div className='mb-4 flex cursor-pointer flex-row items-baseline text-xl font-extrabold lg:mb-0 lg:flex-col lg:text-3xl'>
              <p className='mr-2'>Derrick Liu</p>
              <p className='text-lg text-primary'>Blog</p>
            </div>
          </Link>
          <SocialLinks />
        </div>
        <div className='my-16 w-full'>
          <h1 className='text-5xl font-extrabold'>出事了阿伯！</h1>
          <p className='mt-12 mb-2 text-lg font-bold'>你找到了一個不存在的頁面 ...</p>
          <p className='font-bold opacity-50'>You found a page which is not available now ...</p>
          <div className='mt-32'>
            <p>可以的話，請告訴我你從哪裡發現這個頁面的，讓我可以修復這個問題 🙏</p>
          </div>
          <Link href='/' className='mt-8 font-bold text-primary'>
            回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}
