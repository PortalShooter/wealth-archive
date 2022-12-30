import React, { useEffect, useRef, useState } from 'react';

// Styles
import styles from './SearchField.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Components
import { Container } from '@/feature/Container';
import { Link } from '@/feature/Link';
import { TextBlock } from '@/feature/TextBlock';

function SearchField({
  data,
  setIsSearchActive,
  searchInput,
  searchInputRef,
  noResultsProps,
  isWhite,
  onClickAllQuestions = null,
  popupRef,
  buttonRef,
  onClickOneQuestion,
}) {
  let searchResults;

  const handleTabRepeaterFocus = () => {
    searchInputRef?.current?.focus();
  };

  if (data) {
    searchResults = data?.map((elem) => (
      <Link
        className={cn('article-field__item-container')}
        key={elem._key}
        onClick={onClickOneQuestion}
        href={`/help/${elem.categoryName}?q=${elem._key}#${elem._key}`}
      >
        <TextBlock
          headingText={elem.question}
          tagName="h6"
          headingStyles={'h5'}
          accentPhrase={searchInput ?? ''}
          headingClassName={cn('article-field__item')}
          align="left"
        />
      </Link>
    ));
  }

  useEffect(() => {
    setIsSearchActive(!!searchInput.length);
  }, [searchInput]);

  return (
    <Container className={cn('article-field', { 'article-field_white': isWhite })}>
      <div className={cn('article-field__wrap')} ref={popupRef}>
        <div className={cn('article-field__results')}>{searchResults}</div>
        {searchResults?.length > 2 && (
          <Link
            variant={'text-primary'}
            className={cn('article-field__link')}
            href={`/help-search-results?q=${searchInput}`}
            onClick={onClickAllQuestions}
            ref={buttonRef}
          >
            {'View All Search Results'}
          </Link>
        )}{' '}
        {searchResults?.length === 0 && (
          <div className={cn('article-field__no-result', 'no-results')}>
            <div className={cn('no-results__title')}>{noResultsProps.title}</div>
            <div className={cn('no-results__subtitle')}>{noResultsProps.subtitle}</div>
          </div>
        )}
      </div>
      <div className={cn('search-result__tab-repeater')} tabIndex={0} onFocus={handleTabRepeaterFocus} />
    </Container>
  );
}

export default SearchField;
