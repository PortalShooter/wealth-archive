import React, { useEffect, useRef, useState } from 'react';
import styles from './ArticleSection.module.scss';

import classnames from 'classnames/bind';
import BlogCard from '../BlogCard';
import { useScrollInView } from '@/hooks';
import { TextBlock } from '@/feature/TextBlock';
import { Link } from '@/feature/Link';
import { getArticlesByCategoryId } from '@/helpers';
const cn = classnames.bind(styles);

function ArticleSection({ data, isButton, isTwoPicBig, onClickMore, All = false, loadedAll, isMiss = false }) {
  const [articles, setArticles] = useState(null);
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

  const showButton = isButton;

  const readyArticles = (article) => {
    return article?.map((element, index) => {
      const publishedDate = element.publishedAt ? new Date(element.publishedAt) : null;

      const articles = {
        articleId: element._id,
        articleSlug: element.slug.current,
        categoryId: element?.category._id,
        categorySlug: element?.category.slug.current,
        readDuration: element.readTime ? element.readTime + ' min read' : '',
        title: element.title,
        layout: element.mainImage && element.mainImage.image ? 'normal' : 'imageless',
        image: element.mainImage,
        date: element.publishedAt
          ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`
          : null,
      };
      return <BlogCard data={articles} key={index} isTwoPicBig={isTwoPicBig} isMiss={isMiss} />;
    });
  };

  const titleRef = useRef(null);
  const viewMoreButtonRef = useRef(null);
  const loadMoreArticlesButtonRef = useRef(null);

  useEffect(() => {
    (async () => {
      let preparedArticles;
      let result;

      if (!All) {
        result = await getArticlesByCategoryId(data.category?.id ?? data[0]?.category?._id, 0, 3);
        preparedArticles = readyArticles(result);
        setArticles(preparedArticles);
      } else {
        preparedArticles = readyArticles(data);
        setArticles(preparedArticles);
      }
    })();
  }, [data]);

  return (
    <div className={cn('article-section')}>
      <TextBlock
        ref={titleRef}
        headingText={data?.category?.title ?? data[0]?.category?.title}
        headingStyles="h4"
        tagName="h4"
        className={cn('article-section__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
        align="left"
      />
      <div className={cn('cards', { 'grid-desktop': !isButton })}>{articles}</div>
      {showButton ? (
        <Link
          variant={'button-stroke'}
          href={`/the-plan/${data.category.slug}`}
          className={cn('article-section__button', useScrollInView(viewMoreButtonRef).spawnAnimation)}
          ref={viewMoreButtonRef}
        >
          {'View All'}
        </Link>
      ) : (
        <div className={cn('button', { button_hidden: loadedAll })} onClick={onClickMore}>
          <div
            className={cn('button__btn', useScrollInView(loadMoreArticlesButtonRef).spawnAnimation)}
            ref={loadMoreArticlesButtonRef}
          >
            {'Load More Articles'}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleSection;
