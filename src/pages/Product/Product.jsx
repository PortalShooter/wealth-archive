import React, { useCallback, useEffect, useState } from 'react';

// Styles
import './Product.module.scss';

// Hooks
import { useBodyClass } from '@/hooks';

// Components
import Promo from '@/pages/Product/sections/Promo';
import WantToLearnMore from '@/pages/Blog/sections/WantToLearnMore';
import ListSection from '@/pages/Product/sections/ListSection';
import Cards from '@/pages/Product/sections/Cards';
import ListItem from '@/pages/Product/UI/ListItem';
import getArticlesByCategory from '../../helpers/getArticlesByCategory';
import { throttle } from '@/helpers';

const Product = ({ data, ctaData, articles, category }) => {
  if (!data || !ctaData || !articles || !category) {
    return null;
  }

  const step = 7;
  const [startSearch, setStartSearch] = useState(step);
  const [searchArticles, setSearchArticles] = useState([]);
  const [searchAllArticles, setSearchAllArticles] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [previousSearchInput, setPreviousSearchInput] = useState('');
  const searchThrottleTimeMs = 500;
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useBodyClass('product');

  const listSectionData = {
    title: category[0].title,
    inputPlaceholder: 'Search Articles',
  };

  const toReactComponent = (articles, textSearch = '') => {
    const newArticles = articles?.map((elem) => {
      const dataProps = {
        categorySlug: elem.category?.slug.current,
        itemSlug: elem.slug?.current,
        data: elem.publishedAt,
        title: elem.title,
        readTime: elem?.readTime ? elem?.readTime + ' min read' : '',
        searchInput: textSearch,
      };

      return <ListItem data={dataProps} key={elem.id} />;
    });

    return newArticles;
  };

  useEffect(() => {
    const categoryArticles = articles?.filter((elem, index) => index < startSearch);
    setSearchArticles(toReactComponent(categoryArticles));
    setSearchAllArticles(articles);
    setStartSearch(startSearch + step);
  }, []);

  const onClickResetSearch = () => {
    const categoryArticles = articles?.filter((elem, index) => index < step);
    setSearchArticles(toReactComponent(categoryArticles));
    setSearchAllArticles(articles);
    setStartSearch(startSearch + step);
    setPreviousSearchInput('');
  };

  const onClickMore = () => {
    const categoryArticles = searchAllArticles.filter((elem, index) => index < startSearch);
    setStartSearch(startSearch + step);
    setSearchArticles(toReactComponent(categoryArticles, previousSearchInput ? previousSearchInput : searchInput));
  };

  const getAllBlogArticles = (textSearch) => {
    setLoading(true);
    setPreviousSearchInput(textSearch);

    const articleProps = {
      articles: articles,
    };

    const resultArticles = getArticlesByCategory(textSearch, articleProps);
    const categoryArticles = resultArticles?.filter((elem, index) => index < step);

    setSearchArticles(toReactComponent(categoryArticles, textSearch));
    setSearchAllArticles(resultArticles);
    setStartSearch(step * 2);

    setIsSearch(true);
    setLoading(false);
  };

  const throttledGetAll = useCallback(throttle(getAllBlogArticles, searchThrottleTimeMs), []);

  const searchInscriptionsProps = {
    description: ctaData.searchInscriptions.description,
    title: ctaData.searchInscriptions.title,
  };

  const listSectionProps = {
    title: listSectionData.title,
    data: searchArticles,
    onClickMore,
    isLoadedAll: searchAllArticles?.length === searchArticles?.length,
    inputPlaceholder: listSectionData.inputPlaceholder,
    getAllBlogArticles: throttledGetAll,
    searchInput,
    setSearchInput,
    searchInscriptionsProps,
    onClickResetSearch,
  };

  return (
    <>
      <Promo data={data.productHero} />
      <Cards data={data.cards} />
      <ListSection {...listSectionProps} />
      <WantToLearnMore data={ctaData.wantToLearnMore} />
    </>
  );
};

export default Product;
