import React, { useEffect, useState } from 'react';

// Components

// Styles
import classnames from 'classnames/bind';
import styles from './RelatedArticles.module.scss';
import { TextBlock } from '@/feature/TextBlock';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import BlogCard from '@/pages/Blog/UI/BlogCard';
import { getArticlesByCategoryId } from '@/helpers';
const cn = classnames.bind(styles);

function RelatedArticles({ articles, title }) {
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
  const relatedArticles = (article) => {
    return article?.map((element, index) => {
      const publishedDate = element.publishedAt ? new Date(element.publishedAt) : null;
      const articles = {
        readDuration: element.readTime ? element.readTime + ' min read' : '',
        title: element.title,
        category: element.category.title,
        articleId: element._id,
        articleSlug: element.slug.current,
        categoryId: element?.category._id,
        categorySlug: element?.category.slug.current,
        image: element.mainImage,
        layout: element.mainImage && element.mainImage.image  ? "normal" : "imageless",
        link: element.category._id,
        date: element.publishedAt
          ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`
          : null,
      };
      return <BlogCard data={articles} key={index} className={'article-page'}/>;
    });
  };

  const [preparedArticles, setPreparedArticles] = useState();

  useEffect(() => setPreparedArticles(relatedArticles(articles)), [articles]);

  return (
    <Section className={cn('related-articles')}>
      <Container className={cn('related-articles__wrapper')}>
        <TextBlock
          tagName={'h2'}
          headingStyles={'h4'}
          headingClassName={cn('related-articles__title')}
          className={cn('related-articles__block-title')}
          headingText={title}
        />
        <div className={cn('related-articles__articles')}>{preparedArticles}</div>
      </Container>
    </Section>
  );
}

export default RelatedArticles;
