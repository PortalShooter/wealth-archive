import React, { useEffect, useState } from 'react';

import ArticleSearch from '@/pages/Blog/sections/ArticleSearch/ArticleSearch';
import classnames from 'classnames/bind';
import styles from './BlogCategory.module.scss';
import WantToLearnMore from '@/pages/Blog/sections/WantToLearnMore';
import ArticleSection from '@/pages/Blog/UI/ArticleSection/ArticleSection';
import { getUrlParameter } from '@/helpers';
import { useBodyClass } from '@/hooks';

const cn = classnames.bind(styles);

function BlogCategory({ data, articles }) {
  useBodyClass('category');
  if (!data) {
    return null;
  }

  const [articleSearch, setArticleSearch] = useState([]);

  const getArticles = () => {
    setArticleSearch(articles);
  };

  // get parameter from url
  const getSearchParameter = () => getUrlParameter('q');

  const [isSearchActive, setIsSearchActive] = useState(false);
  const step = 6;
  const [startSearch, setStartSearch] = useState(8);
  let searchArticles = articleSearch.filter((elem, index) => index < startSearch);

  const onClickMore = () => {
    searchArticles = articleSearch.filter((elem, index) => index < startSearch);
    setStartSearch(startSearch + step);
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
    isSearchActive,
    setIsSearchActive,
    backLink: '/the-plan',
    searchNotFoundData: searchNotFoundDataProps,
  };

  useEffect(async () => {
    getArticles();
  }, []);

  const articleSection = {
    data: searchArticles,
    isButton: false,
    isTwoPicBig: true,
    onClickMore: onClickMore,
    All: true,
    loadedAll: searchArticles.length === articleSearch.length,
  };

  return (
    <div>
      <div className={cn('blog-category', { 'blog-category__show': isSearchActive })}>
        <ArticleSearch {...articleSearchProps} />
      </div>
      <div className={cn('article-section')}>
        <ArticleSection {...articleSection} />
      </div>
      <div className={cn('want-learn')}>
        <WantToLearnMore data={wantToLearnMore} />
      </div>
    </div>
  );
}

export default BlogCategory;
