import { GetServerSideProps } from 'next';

import links from '../src/links';

export default () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('location', links.discord);
  context.res.statusCode = 302;
  context.res.end();
  return { props: {} };
};
