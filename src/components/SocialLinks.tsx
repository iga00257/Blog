import { Facebook, GitHub, Globe, Instagram, Linkedin } from 'react-feather';

import LineIcon from './LineIcon';

interface Props {
  color?: string;
}

function SocialLinks(props: Props) {
  return (
    <div className='flex items-center opacity-70 lg:mt-4'>
      <a href='https://portfolio.yuanlin.dev' target='_blank' rel='noreferrer'>
        <Globe
          size={18}
          className='transition hover:text-primary dark:hover:text-primary'
          color={props.color}
        />
      </a>
      <a
        href='https://github.com/iga00257'
        className='ml-4 transition hover:text-primary dark:hover:text-primary'
        target='_blank'
        rel='noreferrer'
      >
        <GitHub size={18} color={props.color} />
      </a>
    </div>
  );
}

export default SocialLinks;
