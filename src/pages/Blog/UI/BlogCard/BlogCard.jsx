import React, { useRef } from 'react';
import styles from './BlogCard.module.scss';

import classnames from 'classnames/bind';
import Image from 'next/image';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import { useScrollInView } from '@/hooks';
import NextLink from 'next/link';

const cn = classnames.bind(styles);

function BlogCard({ data, isTwoPicBig, isMiss = false, className }) {
  const { layout } = data;
  const imageUrl = layout === 'normal' ? getImgUrl(data.image?.image) : null;
  const cardRef = useRef();

  return (
    <div
      className={cn(
        'container',
        { 'big-picture': isTwoPicBig },
        { 'blog-card_miss': isMiss },
        { 'blog-card_imageless-size': layout !== 'normal' }
      )}
    >
      <NextLink href={`/the-plan/${data.categorySlug}/${data.articleSlug}`}>
        <a
          className={cn(
            'blog-card',
            { 'blog-card_imageless': layout !== 'normal' },
            className,
            useScrollInView(cardRef).spawnAnimation
          )}
          ref={cardRef}
        >
          <div className={cn('blog-card__img', { 'blog-card__img_hidden': !imageUrl })}>
            {imageUrl && (
              <Image
                src={imageUrl}
                layout="fill"
                loading="eager"
                alt={data.image?.alt || ''}
                unoptimized
                objectFit="cover"
              />
            )}
          </div>
          {data?.category && <div className={cn('blog-card__category')}>{data.category}</div>}
          <div className={cn('blog-card__description')}>{data.title}</div>
          <div className={cn('time')}>
            <div className={cn('time__date')}>{data.date}</div>
            {data.date && data.readDuration && <div className={cn('time__point')}>{'·'}</div>}
            <div className={cn('time__readTime')}>{data.readDuration}</div>
          </div>

          {layout === 'imageless' && <div className={cn('blog-card__read-more')}>Read More</div>}
        </a>
      </NextLink>
    </div>
  );
}

export default BlogCard;
