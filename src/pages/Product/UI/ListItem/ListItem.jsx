import React, { useRef } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './ListItem.module.scss';
const cn = classnames.bind(styles);

// Component
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { BlogCardMore, ProductArrow } from '@/svgComponents';
import NextLink from 'next/link';
import { TextBlock } from '@/feature/TextBlock';

function ListItem({ data }) {
  const articleUrl = `/the-plan/${data.categorySlug}/${data.itemSlug}`;

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

  const publishedDate = data.data ? new Date(data.data) : null;

  const publishedAt = data.data
    ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`
    : null;

  return (
    <NextLink href={articleUrl}>
      <a className={cn('list-item')}>
        <TextBlock
          className={cn('list-item__title-container')}
          headingClassName={cn('list-item__title')}
          headingText={data.title}
          accentPhrase={data?.searchInput ? data?.searchInput : ''}
        />
        <div className={cn('list-item__text-block', 'text-block')}>
          <div>{publishedAt}</div>
          {publishedAt && data.readTime && <div className={cn('text-block__point')}>{'·'}</div>}
          <div>{data.readTime}</div>
        </div>
        <div className={cn('list-item__arrow')}>
          <ProductArrow />
        </div>
      </a>
    </NextLink>
  );
}

export default ListItem;
