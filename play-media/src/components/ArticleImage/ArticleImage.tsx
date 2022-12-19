import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

interface Props extends ImageProps {
  alt: string;
  src: string;
}

const ArticleImage: FC<Props> = ({ alt, src, ...props }) => {
  return (
    <div className="article-image-container">
      <Image className="article-image" fill src={src || ''} alt={alt || ''} {...props} />
    </div>
  );
};

export default ArticleImage;
