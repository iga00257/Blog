import Image from 'next/image';

// Components

// Constants
import { imageDomain } from '@/constants/imageDomain';
import { basePath } from '@/constants/routePath';

// Styles

// Variables

// PropTypes
export enum PlaceholderType {
  empty = 'empty',
  blur = 'blur',
}

type ImageProps = {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blurDataURL?: string;
  sizes?: string;
  lazyBoundary?: string;
  quality?: number;
  onLoadingComplete?: () => void;
  fill?: boolean;
  style?: object;
  placeholder?: PlaceholderType;
};

function ImageComponent(props: ImageProps) {
  const {
    alt,
    width,
    height,
    src,
    priority,
    sizes,
    lazyBoundary,
    quality,
    fill,
    placeholder = PlaceholderType.empty,
    style,
    ...restProps
  } = props;

  // 若是Url，則檢查是不是在imageDomain裡，不是就先不用next/image
  const isFromUrl = Boolean(src?.match(/^(http|https):/));
  const isAllowDomain = imageDomain.some((item) => src?.includes(item));

  const shouldNativeImage = isFromUrl && !isAllowDomain;
  const isUnoptimized = shouldNativeImage;

  const newImageSrc = isFromUrl ? src : `${basePath}${src}`;

  return (
    <>
      {src && (
        <Image
          alt={alt}
          width={width}
          height={height}
          src={newImageSrc}
          priority={priority}
          fill={fill}
          sizes={sizes}
          placeholder={placeholder}
          lazyBoundary={lazyBoundary}
          unoptimized={isUnoptimized}
          quality={quality || 75}
          style={style}
          {...restProps}
        />
      )}
    </>
  );
}

// ImageComponent.defaultProps = defaultProps

export default ImageComponent;
