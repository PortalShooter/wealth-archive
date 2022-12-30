import React, { useRef, useEffect } from 'react';

// Components
import { Container } from '@/feature/Container';
import { BlogSearch, BlogSearchClose, BlogSearchResultsBack } from '@/svgComponents';
import NextLink from 'next/link';

// Styles
import classnames from 'classnames/bind';
import styles from './SearchBar.module.scss';

const cn = classnames.bind(styles);

function SearchBar({
  backLink,
  isSearchActive,
  setIsSearchActive,
  searchInput,
  setSearchInput,
  searchInputRef : inputRef,
  onSearchInput,
  viewAllSearchResults,
  isSearchResult = false,
  buttonRef,
}) {
  const tabRepeater = useRef(null);

  // autofocus on input on search open
  useEffect(() => {
    inputRef.current.focus();
  }, [isSearchActive]);

  const onSearchOpenClick = () => {
    setIsSearchActive(true);
    setSearchInput('');

    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.code === 'Escape') {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onSearchCloseClick = () => {
    setIsSearchActive(false);
  };

  const onSearchKeyDown = (ev) => {
    if (ev.code === 'Enter') {
      if (isSearchResult) {
        viewAllSearchResults();
      } else if (buttonRef?.current) {
        buttonRef.current.click();
      }
    }

    console.log('%cev:', 'font-style:italic; color:firebrick', ev);
    if(ev.shiftKey && ev.code === 'Tab') {
      console.log('%cev:', 'font-style:italic; color:firebrick', ev);
    }
  };

  const handleTabRepeaterFocus = () => {
    buttonRef?.current?.focus();
  }

  return (
    <Container
      className={cn(
        'search-bar',
        { 'search-bar_hidden': !isSearchActive },
        { 'search-bar_direction': !isSearchActive && !backLink }
      )}
    >
      {backLink && (
        <NextLink href={`${backLink}`}>
          <a className={cn('search-bar__back', { 'search-bar__back_show': isSearchActive })}>
            <div className={cn('search-bar__svg')}>
              <BlogSearchResultsBack />
            </div>
            <div className={cn('search-bar__back-text')}>{'Back to All Articles'}</div>
          </a>
        </NextLink>
      )}

      <button
        type="button"
        className={cn('search-bar__search-block', { 'search-bar__search-block_hide': isSearchActive })}
        onClick={onSearchOpenClick}
      >
        <div className={cn('search-bar__icon', { 'search-bar__icon_gray': isSearchActive })}>
          <BlogSearch />
        </div>
        <div className={cn('search-bar__text', { 'search-bar__text__hide': isSearchActive })}>
          {'Search Articles'}
        </div>
      </button>

      <div className={cn('search-bar__container')}>
        <div className={cn('search-bar__tab-repeater')} tabIndex={0} ref={tabRepeater} onFocus={handleTabRepeaterFocus}/>
        <input
          className={cn('search-bar__input')}
          onChange={onSearchInput}
          onKeyDown={onSearchKeyDown}
          value={searchInput}
          maxLength="80"
          ref={inputRef}
        />
        <div className={cn('search-bar__close-icon')} onClick={onSearchCloseClick}>
          <BlogSearchClose />
        </div>
      </div>
    </Container>
  );
}

export default SearchBar;
