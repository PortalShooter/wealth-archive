import React, { useRef } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './ArticleCtaBlockWithImage.module.scss';
const cn = classnames.bind(styles);

// Components
import { ArticleCta } from '@/svgComponents';
import { Link } from '@/feature/Link';
import ImageBlock from '@/pages/Article/UI/ImageBlock';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import { Image } from '@/feature/Image';

function ArticleCtaBlockWithImage({ data }) {
  console.log(data);
  return (
    <div className={cn('quote', { 'quote_with-paragraph': data.typeOfCta === 'both_image' })}>
      <div className={cn('quote__image')} style={{ position: 'relative' }}>
        {data.image[0].source && <div dangerouslySetInnerHTML={{ __html: data.image[0].source }} />}
        {data.image[0].image && (
          <Image
            src={getImgUrl(data.image[0].image?.asset)}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            loading="eager"
            alt={data.image[0].image?.alt || ''}
            unoptimized
          />
        )}
      </div>
      <div className={cn('quote__text-block')}>
        <div className={cn('quote__title')}>{data.title}</div>
        {data.subtitle && data.typeOfCta === 'both_image' && (
          <div className={cn('quote__subtitle')}>{data.subtitle}</div>
        )}
        <div className={cn('quote__button')}>
          <Link variant="button-fill" href={data.link} className={cn('button')}>
            {data.buttonText || 'Subscribe'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleCtaBlockWithImage;
