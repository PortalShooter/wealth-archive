import React from 'react';

// Components
import Image from 'next/image';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import { TextBlock } from '@/feature/TextBlock';
import { BlogCardMore } from '@/svgComponents';
import NextLink from 'next/link';
import { Link } from '@/feature/Link';

// Styles
import classnames from 'classnames/bind';
import styles from './SearchItems.module.scss';

const cn = classnames.bind(styles);

function SearchItems({ data, isBackground, phrase, isSearchPreview }) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const searchItemsData = {
    category: data.category?.title ? data.category?.title : '',
    readTime: data.readTime ? data.readTime + ' min read' : '',
  };

  const publishedDate = data.publishedAt ? new Date(data.publishedAt) : null;
  const date = data.publishedAt
    ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`
    : null;

  const fallbackImage = isSearchPreview
    ? '/images/article-search-placeholder-min-white.jpg'
    : '/images/article-search-placeholder-min-list.jpg';
  const imageUrl = data.mainImage?.image ? getImgUrl(data.mainImage?.image) : fallbackImage;
  const articleUrl = `/the-plan/${data.category?.slug.current}/${data.slug.current}`;
  const categoryUrl = ` /the-plan/${data.category?.slug.current}`;

  return (
    <div className={cn('search-results', { 'search-results_show-background': isBackground })}>
      <div className={cn('search-results__image', { 'search-results__image_search': isBackground })}>
        {imageUrl && (
          <NextLink href={articleUrl}>
            <a aria-label={data.title} className={cn('search-results__image-link')}>
              <Image
                src={imageUrl}
                layout="fill"
                loading="eager"
                alt={data.mainImage?.image?.alt ?? ''}
                unoptimized
                objectFit="cover"
              />
            </a>
          </NextLink>
        )}
      </div>
      <div className={cn('search-results__text-block', 'text-block')}>
        <Link
          variant="text-secondary"
          href={articleUrl}
          className={cn('text-block__link', { 'text-block__link_search': isBackground })}
          aria-label={data.title}
        >
          <TextBlock
            headingText={data.title}
            headingStyles="h4"
            tagName="h4"
            accentPhrase={phrase ?? ''}
            className={cn('text-block__title', { 'title_show-background': isBackground })}
            headingClassName={cn('text-block__heading', { 'text-block__heading_show-background': isBackground })}
            align="left"
          />
        </Link>
        <div className={cn('container')}>
          <Link
            variant="text-secondary"
            className={cn({ 'text-block__description': searchItemsData.category })}
            href={categoryUrl}
            aria-label={data.title}
          >
            {searchItemsData.category}
          </Link>
          <div className={cn('text-block__time')}>
            <div className={cn('text-block__time__date')}>{date}</div>
            {date && searchItemsData.readTime && <div className={cn('text-block__time__point')}>{'·'}</div>}
            <div className={cn('text-block__time__readTime')}>{searchItemsData.readTime}</div>
          </div>
        </div>
      </div>
      {!isBackground && (
        <a className={cn('search-results__icon')} href={articleUrl} aria-label={data.title}>
          <BlogCardMore />
        </a>
      )}
    </div>
  );
}

export default SearchItems;
