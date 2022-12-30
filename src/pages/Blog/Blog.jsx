import React, { useState } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './Blog.module.scss';
const cn = classnames.bind(styles);

//Hooks
import { useBodyClass } from '@/hooks';

//Sections
import WantToLearnMore from './sections/WantToLearnMore';
import EstatePlanning from './sections/EstatePlanning';
import ArticleSearch from './sections/ArticleSearch';
import BlogSection from './sections/BlogSection';

function Blog({ data }) {
  useBodyClass('blog');

  if (!data) {
    return null;
  }
  const [isSearchActive, setIsSearchActive] = useState(false);

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


  const publishedDate = data.heroArticle.publishedAt ? new Date(data.heroArticle.publishedAt) : null;

  const publishedAt = data.heroArticle.publishedAt
    ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`
    : null;

  const estatePlaningProps = {
    searchText: 'Search Articles', //todo: add in sanity
    label: data.heroArticle.category,
    title: data.heroArticle.title,
    date: publishedAt,
    readDuration: data.heroArticle.readTime,
    buttonText: 'Read More',
    layout: data.heroArticle.image && data.heroArticle.image.image ? 'normal' : 'imageless',
    image: data.heroArticle.image,
    categoryId: data.heroArticle.categoryId,
    articleId: data.heroArticle.articleId,
    categorySlug: data.heroArticle.categorySlug.current,
    articleSlug: data.heroArticle.articleSlug.current,
  };

  const wantToLearnMore = {
    title: data.wantToLearnMore.title,
    link: data.wantToLearnMore.link,
    placeholder: data.wantToLearnMore.placeholder,
  };

  const searchNotFoundDataProps = {
    title: data?.searchInscriptions?.title ?? '',
    description: data?.searchInscriptions?.description ?? '',
  };

  const articleSearchProps = {
    backLink: '',
    isSearchActive,
    setIsSearchActive,
    searchNotFoundData: searchNotFoundDataProps,
  };

  return (
    <div>
      <div className={cn('blog')}>
        <ArticleSearch {...articleSearchProps} />
      </div>
      <EstatePlanning data={estatePlaningProps} />
      <BlogSection data={data.categoriesArticles} />
      <WantToLearnMore data={wantToLearnMore} />
    </div>
  );
}

export default Blog;
