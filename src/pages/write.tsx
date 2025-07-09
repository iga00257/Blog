import { Note } from '@geist-ui/core';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import { Edit3, Save } from 'react-feather';

import ErrorBoundary from '../components/ErrorBoundary';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Write() {
  const [input, setInput] = useState<string>('');
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [title, setTitle] = useState<string>('');
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (input !== '') window.localStorage.setItem('note', input);
        setMdxSource(await serialize(input));
        setError(undefined);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [input]);

  useEffect(() => {
    setInput(window.localStorage.getItem('note') || '');
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('請輸入文章標題');
      return;
    }
    if (!input.trim()) {
      setError('請輸入文章內容');
      return;
    }

    setIsSaving(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: input.trim(),
          coverImageUrl: coverImageUrl.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`文章保存成功！Slug: ${data.slug}`);
        // 清除 localStorage
        window.localStorage.removeItem('note');
        setInput('');
        setTitle('');
        setCoverImageUrl('');
      } else {
        setError(data.error || '保存失敗');
      }
    } catch (_err: any) {
      console.error(_err);
      setError('網絡錯誤，請稍後再試');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='grid w-screen grid-cols-5'>
      <div className='col-span-2'>
        <div className='fixed top-0 left-0 z-20 flex h-full w-[40vw] flex-col bg-zinc-100'>
          {/* 保存按鈕和表單 */}
          <div className='border-b border-gray-200 bg-white p-4'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-lg font-bold'>寫作編輯器</h2>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm' onClick={() => setShowForm(!showForm)}>
                  <Edit3 size={16} className='mr-2' />
                  {showForm ? '隱藏' : '設置'}
                </Button>
                <Button variant='default' size='sm' disabled={isSaving} onClick={handleSave}>
                  <Save size={16} className='mr-2' />
                  {isSaving ? '保存中...' : '保存文章'}
                </Button>
              </div>
            </div>

            {showForm && (
              <div className='space-y-3'>
                <div>
                  <label className='text-sm font-medium'>文章標題</label>
                  <Input
                    placeholder='輸入文章標題...'
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className='text-sm font-medium'>封面圖片 URL</label>
                  <Input
                    placeholder='可選：輸入封面圖片 URL'
                    value={coverImageUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCoverImageUrl(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* 編輯器 */}
          <div className='flex-1 p-4'>
            <textarea
              spellCheck={false}
              className='h-full w-full resize-none bg-transparent p-4 outline-none'
              placeholder='開始寫作你的 MDX 文章...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='z-30 col-span-3'>
        <div className='relative flex h-[36rem] w-full justify-center overflow-hidden lg:h-[46rem]'>
          <img
            src={
              coverImageUrl ||
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'
            }
            className='absolute top-0 h-full w-full bg-zinc-500 object-cover'
            alt=''
          />
          <div className='absolute top-0 right-0 h-full w-full bg-black bg-opacity-60' />
          <div className='absolute bottom-12 mx-auto w-full px-4 lg:bottom-24 lg:w-[650px]'>
            <p
              className='text-3xl font-extrabold text-white lg:text-5xl'
              style={{ lineHeight: 1.5 }}
            >
              {title || '文章標題'}
            </p>

            <div className='mt-4 flex flex-row align-bottom'>
              <img
                src='https://lh3.googleusercontent.com/a/ACg8ocLrYjvD01l_M0ZX5DWrnQD-5g36lsVf3upMBetPWTd8jzgvfQmg=s96-c'
                className='mr-4 h-8 w-8 rounded-full'
                alt=''
              />
              <p className='font-extrabold text-white opacity-80 lg:text-xl'>Derrick Liu 劉穎多</p>
              <p className='ml-2 text-white opacity-60 lg:ml-8 lg:text-xl'>
                {new Date().toISOString().split('T')[0]}
              </p>
            </div>
          </div>
        </div>
        <div className='mx-auto min-h-screen w-full px-4 lg:w-[650px]'>
          {error && <Note type='error'>{error}</Note>}
          {success && <Note type='success'>{success}</Note>}
          <div id='article' className='mt-16 mb-32'>
            {mdxSource && (
              <ErrorBoundary>
                <MDXRemote {...mdxSource} />
              </ErrorBoundary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
