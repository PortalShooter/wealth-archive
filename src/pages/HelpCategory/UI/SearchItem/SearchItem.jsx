import React, { useEffect, useRef, useState } from 'react';

// Styles
import styles from './SearchItem.module.scss';
import classnames from 'classnames/bind';

const cn = classnames.bind(styles);

// Components
import { BlogSearch } from '@/svgComponents';
import { Input } from '@/feature/Input';
import { syncScroll } from '@/shared/scroll';

function SearchItem({
  inputPlaceholder,
  setSearchInput,
  setIsSearchActive,
  isActive = false,
  inputWrapRef,
  buttonRef,
  isSearchResult,
  searchInputRef: inputRef,
  getAllBlogArticles = null,
  isUp = true,
  searchInput,
}) {
  const [modalTop, setModalTop] = useState(0);

  const onSearchInput = async (event) => {
    setSearchInput(event);

    if (getAllBlogArticles) {
      getAllBlogArticles(event);
    }

    if (isUp) {
      setModalTop(syncScroll.get().top);
      if (!isActive) {
        if (!modalTop) {
          setModalTop(syncScroll.get().top);
        }

        let root = document.querySelector('body');

        root.style.setProperty('top', syncScroll.get().top < 200 ? `-${syncScroll.get().top}px` : '-200px');

        if (syncScroll.get().top > 100) {
          setTimeout(() => {
            document.body.classList.add('header-hidden');
          }, 100);
        }
      }
    }

    setIsSearchActive(true);
  };

  useEffect(() => {
    if (!isActive && modalTop) {
      window.scrollTo({ top: modalTop, behavior: 'instant' });
      document.body.classList.remove('header-hidden');
    }
  }, [isActive]);

  const onSearchKeyDown = (ev) => {
    if (ev.code === 'Enter') {
      if (isSearchResult?.length && buttonRef?.current) {
        buttonRef.current.click();
      }
    }

    // if(ev.shiftKey && ev.code === 'Tab') {
    //   console.log('%cev:', 'font-style:italic; color:firebrick', ev);
    // }
  };

  const closeSearch = () => {
    setSearchInput('');
    setIsSearchActive(false);
  };

  // useEffect(() => {
  //   if (!isActive) {
  //     setSearchInput('');
  //   }
  // }, [isActive]);

  const handleTabRepeaterFocus = () => {
    buttonRef?.current?.focus();
  };

  return (
    <>
      <div
        className={cn('search__tab-repeater')}
        tabIndex={0}
        // onFocus={handleTabRepeaterFocus}
      />
      <div className={cn('search')} ref={inputWrapRef}>
        <Input
          onChange={onSearchInput}
          maxLength={80}
          inputClassName={cn('search__input')}
          placeholder={inputPlaceholder}
          inputRef={inputRef}
          onKeyDown={onSearchKeyDown}
          value={searchInput}
        />
        <div className={cn('search__icons')}>
          <div className={cn('search__search-icon')}>
            <BlogSearch />
          </div>
          {(isActive || searchInput) && <div className={cn('search__close-icon')} onClick={closeSearch}></div>}
        </div>
      </div>
    </>
  );
}

export default SearchItem;
