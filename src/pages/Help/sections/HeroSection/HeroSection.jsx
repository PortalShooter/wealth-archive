import React, { useCallback, useEffect, useRef, useState } from 'react';

// Styles
import styles from './HeroSection.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import SearchItem from '@/pages/HelpCategory/UI/SearchItem';

// Hooks
import { getUrlParameter, searchQuestions } from '@/helpers';
import SearchField from '@/pages/HelpCategory/UI/SearchField';
import { useBodyClass, useScrollInView, useUniversalClosing } from '@/hooks';
import { syncScroll } from '@/shared/scroll';

function HeroSection({ data, noResultsProps }) {
  const [searchInput, setSearchInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [searchArticles, setSearchArticles] = useState('');

  const popupRef = useRef(null);
  const searchItemRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);
  const titleRef = useRef(null);

  const [isActive, setIsSearchActive] = useUniversalClosing([popupRef, searchItemRef], { useScroll: false });
  useBodyClass(cn({ 'help-search-open': isActive }));

  const viewAllSearchResults = () => {
    if (onViewAllClick) {
      onViewAllClick(searchInput);
    }
  };
  const searchProps = {
    inputPlaceholder: data.inputPlaceholder,
    setSearchInput,
    setIsSearchActive,
    searchInputRef,
    isActive,
    buttonRef,
    isSearchResult: searchArticles,
    searchInput,
  };

  const onClickClose = () => {
    setIsSearchActive(false);
  };

  const searchFieldProps = {
    data: searchArticles,
    setIsSearchActive,
    noResultsProps,
    searchInput,
    searchInputRef,
    buttonRef,
  };

  const onClickOneQuestion = async () => {
    //const searchParameter = getUrlParameter('q');
    //setLastInput(searchParameter);
    setIsSearchActive(false);
  };
  useEffect(() => {
    setSearchArticles(searchQuestions(searchInput, data.categories));
  }, [searchInput]);

  return (
    <Section className={cn('hero')}>
      {isActive && <div className={cn('hero__background')} onClick={onClickClose} />}
      <Container className={cn('hero__container')}>
        <div className={cn('hero__title', useScrollInView(titleRef, { title: true }).titleSpawn)} ref={titleRef}>
          {data.title}
        </div>
        <div className={cn('hero__search')}>
          <SearchItem {...searchProps} inputWrapRef={searchItemRef} />
          {isActive && (
            <SearchField {...searchFieldProps} popupRef={popupRef} onClickOneQuestion={onClickOneQuestion} />
          )}
        </div>
      </Container>
    </Section>
  );
}

export default HeroSection;
