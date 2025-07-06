import { Note as NoteRaw, Snippet as SnippetRaw, Tree } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import SelectQuestion from './SelectQuestion';

function Note(props: any) {
  return (
    <NoteRaw {...props} style={{ margin: '24px 0' }}>
      {props.children}
    </NoteRaw>
  );
}

function Snippet(props: any) {
  return <SnippetRaw {...props} className='mdx-snippet' style={{ margin: '24px 0' }} />;
}

function code({ className, ...props }: any) {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag='div' {...props} />
  ) : (
    <code className={className} {...props} />
  );
}

const mdxComponents = {
  Note,
  Tree,
  SelectQuestion,
  Snippet,
  ol: (props: any) => (
    <ol className='mdx-rendered ml-8 list-decimal' {...props}>
      {props.children}
    </ol>
  ),
  pre: (props: any) => <pre className='mdx-rendered' {...props} />,
  code,
  img: (props: any) => {
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
      setLoaded(true);
    }, []);

    if (props.src.startsWith('https://www.youtube.com/embed/')) {
      return (
        <>
          <iframe
            src={props.src}
            className='h-96 w-full rounded-xl shadow-lg transition-all duration-200 hover:shadow-2xl lg:hover:scale-105'
            title='YouTube video player'
            allow='accelerometer; clipboard-write; gyroscope; picture-in-picture'
            allowFullScreen
          />
          {isLoaded && <span className='text-center text-xs opacity-50'>{props.alt}</span>}
        </>
      );
    }

    return (
      <>
        <img
          src={props.src}
          alt={props.alt}
          className='mt-16 rounded-xl shadow-lg transition-all duration-200 hover:shadow-2xl lg:hover:scale-105'
        />
        {isLoaded && (
          <span className='mb-16 text-center text-xs leading-tight opacity-50'>{props.alt}</span>
        )}
      </>
    );
  },
};

export default mdxComponents as any;
