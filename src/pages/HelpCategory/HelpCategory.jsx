import React, {useEffect, useRef, useState} from 'react';
import HelpCTA from '@/pages/HelpCategory/sections/HelpCTA';
import HelpCategoryList from '@/pages/HelpCategory/sections/HelpCategoryList';
import { useBodyClass, useUniversalClosing } from '@/hooks';
import classnames from 'classnames/bind';
import styles from '@/pages/Help/sections/HeroSection/HeroSection.module.scss';
import {getUrlParameter, searchQuestions} from "@/helpers";
const cn = classnames.bind(styles);

function HelpCategory({ data, ctaData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [searchArticles, setSearchArticles] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const popupRef = useRef(null);
  const searchItemRef = useRef(null);

  const [isActive, setIsSearchActive] = useUniversalClosing([popupRef, searchItemRef], { useScroll: false });

  const onClickAllQuestions = () => {
    if (setSearchArticles) {
      setSearchArticles(searchQuestions(searchInput, ctaData.questions.categories, true));
      setSearchQuery(searchInput);
      setIsSearchActive(false);
    }
  };

  const onClickOneQuestion = async () => {
    const searchParameter = getUrlParameter('q');
    setLastInput(searchParameter);
    setIsSearchActive(false);
  }
  //
  // useEffect(
  //   () =>
  //     (async () => {
  //       const searchParameter = getUrlParameter('q');
  //       setSearchQuery(searchParameter);
  //       setLastInput(searchParameter);
  //       setSearchArticles(searchQuestions(searchParameter, data.questions.categories, true));
  //       setIsSearchActive(false);
  //     })(),
  //   []
  // );

  const ctaProps = {
    title: ctaData.cta.title,
    description: ctaData.cta.subtitle,
    buttonTitle: ctaData.cta.buttonText,
  };

  const noResultsProps = {
    title: 'Sorry, no results found',
    subtitle: 'Please check spelling or try different keywords',
  };

  const helpCategoryProps = {
    back: 'Back to All Questions',
    searchSign: "I'm having trouble with",
    category: data.title,
    list: data.questions,
    search: ctaData.questions.categories,
    onClickAllQuestions
  };

  return (
    <div>
      <HelpCategoryList data={helpCategoryProps} noResultsProps={noResultsProps} searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        isActive={isActive}
                        setIsSearchActive={setIsSearchActive}
                        searchItemRef={searchItemRef}
                        lastInput={lastInput}
                        isCategory={true}
                        onClickOneQuestion={onClickOneQuestion}
                        popupRef={popupRef}/>
      <HelpCTA data={ctaProps} />
    </div>
  );
}

export default HelpCategory;
