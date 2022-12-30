import React, { useEffect, useRef, useState } from 'react';

// Components
import { Link } from '@/feature/Link';
import { TextBlock } from '@/feature/TextBlock';
import { Container } from '@/feature/Container';

// Styles
import classnames from 'classnames/bind';
import styles from './SearchField.module.scss';

const cn = classnames.bind(styles);

function SearchField({
  children,
  searchInput = '',
  searchInputRef,
  viewAllSearchResults,
  setIsSearchActive,
  searchNotFoundData,
  onEnterUpRef,
  isSearch,
  loading,
  buttonRef,
}) {
  const [isShow, setIsShow] = useState(false);
  const searchResultsUrl = '/search-results';
  const tabRepeater = useRef(null);

  useEffect(() => {
    setIsShow(!!searchInput.length);
  }, [searchInput]);

  const onClickClose = () => {
    setIsSearchActive(false);
  };

  const handleTabRepeaterFocus = () => {
    searchInputRef?.current.focus();
  }

  return (
    <Container className={cn('search-result')}>
      <div className={cn('search-result__background')} onClick={onClickClose} />
      {children?.length > 0 && isShow && isSearch && !loading && (
        <div className={cn('search-result__wrap', { 'search-result__wrap_nothing': !children?.length })}>
          <div className={cn('search-result__wrap__articles')}>{children}</div>
          <Link
            href={`${searchResultsUrl}?q=${searchInput}`}
            variant="text-primary"
            className={cn('search-result__link')}
            onClick={viewAllSearchResults}
            ref={buttonRef}
          >
            {'View All Search Results'}
          </Link>
        </div>
      )}
      {(typeof children?.length === 'undefined' || children?.length === 0) && isShow && isSearch && !loading && (
        <div className={cn('search-result__wrap', { 'search-result__wrap_nothing': !children?.length })}>
          <div className={'not-found'}>
            <TextBlock
              headingText={searchNotFoundData.title}
              headingStyles="h5"
              tagName="h5"
              className={cn('not-found__title')}
              align="left"
            />
            <div className={cn('not-found__description')}>{searchNotFoundData.description}</div>
          </div>
        </div>
      )}

      <div className={cn('search-result__tab-repeater')} tabIndex={0} ref={tabRepeater} onFocus={handleTabRepeaterFocus}/>
    </Container>
  );
}

export default SearchField;
