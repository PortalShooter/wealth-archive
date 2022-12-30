import React, { useEffect, useRef, useState } from 'react';

//Sections
import HelpCTA from '@/pages/HelpCategory/sections/HelpCTA';
import HelpCategoryList from '@/pages/HelpCategory/sections/HelpCategoryList';
import { getUrlParameter, searchQuestions } from '@/helpers';
import { useUniversalClosing } from '@/hooks';

function HelpSearchResults({ data }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [searchArticles, setSearchArticles] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const popupRef = useRef(null);
  const searchItemRef = useRef(null);

  const [isActive, setIsSearchActive] = useUniversalClosing([popupRef, searchItemRef], { useScroll: false });

  const onClickAllQuestions = () => {
    setSearchArticles(searchQuestions(searchInput, data.questions.categories, true));
    setSearchQuery(searchInput);
    setIsSearchActive(false);
  };

  const onClickOneQuestion = async () => {
    const searchParameter = getUrlParameter('q');
    setLastInput(searchParameter);
    setSearchArticles(searchQuestions(searchParameter, data.questions.categories, true));
    setIsSearchActive(false);
  };

  const SearchResultsProps = {
    title: 'search results for: ',
    back: 'Back to All Questions',
    searchSign: "I'm having trouble with",
    list: searchArticles,
    search: data.questions.categories,
    onClickAllQuestions,
  };

  const ctaProps = {
    title: data.cta.title,
    description: data.cta.subtitle,
    buttonTitle: data.cta.buttonText,
  };

  const noResultsProps = {
    title: 'Sorry, no results found',
    subtitle: 'Please check spelling or try different keywords',
  };

  useEffect(
    () =>
      (async () => {
        const searchParameter = getUrlParameter('q');
        setSearchQuery(searchParameter);
        setSearchArticles(searchQuestions(searchParameter, data.questions.categories, true));
        setIsSearchActive(false);
      })(),
    []
  );

  return (
    <>
      <HelpCategoryList
        data={SearchResultsProps}
        subheading={searchQuery}
        noResultsProps={noResultsProps}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isActive={isActive}
        setIsSearchActive={setIsSearchActive}
        searchItemRef={searchItemRef}
        onClickOneQuestion={onClickOneQuestion}
        popupRef={popupRef}
      />
      <HelpCTA data={ctaProps} />
    </>
  );
}

export default HelpSearchResults;
