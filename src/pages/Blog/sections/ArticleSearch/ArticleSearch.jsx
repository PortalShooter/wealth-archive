import React, { useCallback, useEffect, useRef, useState } from 'react';

// Components
import { Section } from '@/feature/Section';
import SearchBar from '@/pages/Blog/UI/SearchBar';
import SearchField from '@/pages/Blog/UI/SearchField';
import SearchItems from '@/pages/Blog/UI/SearchItems';
import { getArticlesByTitle } from '@/helpers';

// Styles
import classnames from 'classnames/bind';
import styles from './ArticleSearch.module.scss';
import throttle from '@/helpers/throttle';
import {useBodyClass} from '@/hooks';

const cn = classnames.bind(styles);

function ArticleSearch({ backLink, isSearchActive, setIsSearchActive, onViewAllClick = null, searchNotFoundData,white }) {
  const [searchInput, setSearchInput] = useState('');
  const searchInputRef = useRef(null);
  // data storage for articles loaded via search
  const [articlesData, setArticlesData] = useState([]);
  const searchThrottleTimeMs = 100;
  useBodyClass(isSearchActive ? white?'search-open_white':'search-open' : '');
  const onEnterUpRef = useRef();
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef(null);

  function removeSpecialChars(str) {
    return str
      .replace(/(?!\w|\s)./g, '')
      .replace(/\s+/g, ' ')
      .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
  }

  const getAllBlogArticles = async (textSearch, start, end) => {
    setLoading(true);
    let articles;

    try {
      articles = removeSpecialChars(textSearch).trim()
        ? await getArticlesByTitle(removeSpecialChars(textSearch), start, end)
        : [];
      const fetchedArticlesData = articles?.map((article) => ({
        id: article._id,
        categoryId: article?.category?._id ? article?.category?._id : '',
        data: article,
        isBackground: false,
      }));
      setArticlesData(fetchedArticlesData);
    } catch {
      setArticlesData([]);
    }

    setIsSearch(true);
    setLoading(false);
  };

  // executing search wih specified delay
  const throttledGetAll = useCallback(throttle(getAllBlogArticles, searchThrottleTimeMs), []);

  const onSearchInput = async (event) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
    throttledGetAll(inputText, 0, 3);
  };

  const viewAllSearchResults = () => {
    if (onViewAllClick) {
      onViewAllClick(searchInput);
    }
  };

  const searchBarProps = {
    backLink,
    isSearchActive,
    setIsSearchActive,
    searchInput,
    onSearchInput,
    searchInputRef,
    setSearchInput,
    viewAllSearchResults,
    buttonRef,
  };

  const searchFieldProps = {
    searchInput,
    searchInputRef,
    setIsSearchActive,
    viewAllSearchResults,
    searchNotFoundData,
    isSearch,
    loading,
    buttonRef,
  };

  const articles = articlesData?.map((article) => (
    <SearchItems data={article.data} key={article.id} isBackground phrase={searchInput} isSearchPreview />
  ));

  return (
    <Section className={cn('article-search',{'article-search_white':white})}>
      <SearchBar {...searchBarProps} />
      {isSearchActive && <SearchField {...searchFieldProps}>{articles}</SearchField>}
    </Section>
  );
}

export default ArticleSearch;
