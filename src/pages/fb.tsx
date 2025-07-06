import { GetServerSideProps } from 'next';

import links from '@/links';

export default () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('location', links.facebook);
  context.res.statusCode = 302;
  context.res.end();
  return { props: {} };
};
