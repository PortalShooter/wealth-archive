import React, { useEffect, useRef, useState } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './ListSection.module.scss';
const cn = classnames.bind(styles);

//Hooks
import { useUniversalClosing } from '@/hooks';

// Component
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import SearchItem from '@/pages/HelpCategory/UI/SearchItem';

function ListSection({
  onClickResetSearch,
  loading,
  searchInscriptionsProps,
  data,
  onClickMore,
  title,
  isLoadedAll,
  inputPlaceholder,
  getAllBlogArticles,
  searchInput,
  setSearchInput,
}) {
  const popupRef = useRef(null);
  const searchItemRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);

  const [isActive, setIsSearchActive] = useUniversalClosing([popupRef, searchItemRef], { useScroll: false });

  const searchProps = {
    inputPlaceholder,
    setSearchInput,
    setIsSearchActive,
    isActive,
    searchInput,
    searchInputRef,
    buttonRef,
    getAllBlogArticles,
    isUp: false,
  };

  return (
    <Section className={cn('list-section')}>
      <Container className={cn('list-section__wrapper')}>
        <div className={cn('list-section__container')}>
          <div className={cn('list-section__title')}>{title}</div>
          <div className={cn('list-section__search')}>
            <SearchItem {...searchProps} />
          </div>
        </div>
        {!loading &&
          (data?.length ? (
            <div className={cn('list-section__list')}>{data}</div>
          ) : (
            <div className={cn('list-section__no-results', 'no-results')}>
              <div className={cn('no-results__title')}>{searchInscriptionsProps.title}</div>
              <div className={cn('no-results__description')}>{searchInscriptionsProps.description}</div>
              <button className={cn('no-results__button')} onClick={onClickResetSearch}>
                {'Reset Search'}
              </button>
            </div>
          ))}
        {!isLoadedAll && (
          <div className={cn('list-section__button-container')}>
            <button className={cn('list-section__button')} onClick={onClickMore}>
              {'Load More Articles'}
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default ListSection;
