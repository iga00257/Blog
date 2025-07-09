import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeToggle from '@/components/ThemeToggle';
import mdxComponents from '@/components/mdx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SessionProvider, useSession } from '@/hooks/session';
import User from '@/models/user';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    console.log('routeChange', url);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const routeChangeStart = () => NProgress.start();
    const routeChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, []);

  const [session, setSession] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      await restoreSession();
    })();
  }, []);

  async function restoreSession() {
    if (
      !window.document.cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('token='))
    )
      return;
    try {
      const res = await fetch('/api/me');
      const user = await res.json();
      setSession(user);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SessionProvider value={{ session }}>
      <MDXProvider components={mdxComponents}>
        <SessionRestoreNotification />
        <ThemeToggle />
        <Component {...pageProps} />
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          icon={false}
        />
      </MDXProvider>
    </SessionProvider>
  );
}

function SessionRestoreNotification() {
  const session = useSession();
  useEffect(() => {
    if (session?.session) {
      toast.info(
        <div className='flex gap-2'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={session.session.avatarUrl} />
            <AvatarFallback className='text-sm'>{session.session.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p>哈囉，{session.session.name}！歡迎回來我的 Blog。</p>
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      );
    }
  }, [session?.session?.email]);
  return null;
}

export default MyApp;
