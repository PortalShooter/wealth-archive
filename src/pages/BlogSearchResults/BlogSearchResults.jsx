import React, { useEffect, useLayoutEffect, useState } from 'react';

// Components
import ArticleSearch from '@/pages/Blog/sections/ArticleSearch/ArticleSearch';
import WantToLearnMore from '@/pages/Blog/sections/WantToLearnMore';
import BlogSearchResult from '@/pages/BlogSearchResults/sections/BlogSearchResult';
import SearchItems from '@/pages/Blog/UI/SearchItems/SearchItems';
import { getArticlesByTitle, getUrlParameter } from '@/helpers';

// Styles
import classnames from 'classnames/bind';
import styles from './BlogSearchResults.module.scss';
import { useBodyClass } from '@/hooks';

const cn = classnames.bind(styles);

function BlogSearchResults({ data }) {
  useBodyClass('search-results');
  if (!data) {
    return null;
  }

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const step = 7;
  const [startSearch, setStartSearch] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [oldSearchQuery, setOldSearchQuery] = useState('');

  const wantToLearnMore = {
    title: data.wantToLearnMore.title,
    link: data.wantToLearnMore.link,
    placeholder: data.wantToLearnMore.placeholder,
  };

  const getAllBlogArticles = async (textSearch, start) => {
    const articles = await getArticlesByTitle(textSearch, start);

    const fetchedArticlesData = articles?.map((article) => ({
      id: article._id,
      data: article,
      isBackground: false,
    }));

    setArticleData(fetchedArticlesData);
  };

  // get initial search query
  useEffect(() => {
    const searchParameter = getUrlParameter('q');
    setSearchQuery(searchParameter);
    // await getAllBlogArticles(searchParameter, 0);
  }, []);

  useEffect(() => {
    setStartSearch(step);
    if (searchQuery) {
      getAllBlogArticles(searchQuery, 0);
    }
    setIsSearchActive(false);
  }, [searchQuery]);

  let searchArticles = articleData?.filter((elem, index) => index < startSearch);

  const onClickMore = () => {
    searchArticles = articleData.filter((elem, index) => index < startSearch);
    setStartSearch(startSearch + step);
  };

  const articlesComponents = searchArticles?.map((article) => (
    <SearchItems key={article.id} {...article} phrase={searchQuery} />
  ));

  // update page articles on view all click
  function reloadData(searchInputText) {
    setOldSearchQuery(searchQuery);
    setSearchQuery(searchInputText);

    if (searchQuery === oldSearchQuery) {
      setIsSearchActive(false);
    }
  }

  const searchNotFoundDataProps = {
    title: data?.searchInscriptions?.title ?? '',
    description: data?.searchInscriptions?.description ?? '',
  };

  const articleSearchProps = {
    isSearchActive,
    setIsSearchActive,
    backLink: '/the-plan',
    onViewAllClick: reloadData,
    searchNotFoundData: searchNotFoundDataProps,
    isSearchResult: true,
    white: true,
  };

  const blogSearchResultProps = {
    query: searchQuery,
    length: articleData?.length || 0,
    isLoadedAll: articleData?.length === searchArticles?.length,
    onClickMore,
  };

  return (
    <div>
      <div className={cn('blog-search-results', { 'blog-search-results__show': isSearchActive })}>
        <ArticleSearch {...articleSearchProps} />
      </div>
      <BlogSearchResult {...blogSearchResultProps}>{articlesComponents}</BlogSearchResult>
      <WantToLearnMore data={wantToLearnMore} />
    </div>
  );
}

export default BlogSearchResults;
