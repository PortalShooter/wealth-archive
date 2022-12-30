import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

// Styles
import styles from './HelpCategoryList.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import HelpCategoryListItem from '@/pages/HelpCategory/UI/HelpCategoryListItem';
import { BlogSearchResultsBack } from '@/svgComponents';
import SearchItem from '@/pages/HelpCategory/UI/SearchItem';
import getUrlParameter from '../../../../helpers/getUrlParameter';
import { searchQuestions } from '@/helpers';
import { TextBlock } from '@/feature/TextBlock';
import SearchField from '@/pages/HelpCategory/UI/SearchField';
import { syncResize } from '@/shared/resize';
import { useBodyClass, useScrollInView, useUniversalClosing } from '@/hooks';
import { Link } from '@/feature/Link';

function HelpCategoryList({
  isCategory = false,
  lastInput,
  onClickOneQuestion,
  data,
  subheading = '',
  noResultsProps,
  searchInput,
  setSearchInput,
  isActive,
  setIsSearchActive,
  popupRef,
  searchItemRef,
}) {
  const [url, setUrl] = useState(null);
  const [textIndent, setTextIndent] = useState(10);
  const [searchArticles, setSearchArticles] = useState('');

  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);

  useBodyClass(cn({ 'help-search-open': isActive }));

  const countRef = useRef(null);

  useLayoutEffect(() => {
    setUrl(getUrlParameter('q'));
  }, []);

  const [list, setList] = useState();

  if (isCategory) {
    useEffect(() => {
      setList(
        data?.list?.map((elem) => (
          <HelpCategoryListItem allData={data} data={elem} index={url} key={elem._key} accentPhrase={subheading} />
        ))
      );
    }, [data, lastInput]);
  } else {
    useEffect(() => {
      setList(
        data?.list?.map((elem) => (
          <HelpCategoryListItem allData={data} data={elem} index={url} key={elem._key} accentPhrase={subheading} />
        ))
      );
    }, [data, url]);
  }

  const searchProps = {
    inputPlaceholder: data.searchSign,
    setSearchInput,
    setIsSearchActive,
    isActive,
    searchInput,
    searchInputRef,
    buttonRef,
    isSearchResult: searchArticles,
  };

  const handleResize = () => {
    const headerWidth = countRef.current.getBoundingClientRect().width;

    if (window.innerWidth >= 375 && window.innerWidth < 768) {
      setTextIndent(headerWidth + 5 ?? 250);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1025) {
      setTextIndent(headerWidth + 12 ?? 250);
    } else if (window.innerWidth >= 1025) {
      setTextIndent(headerWidth + 10 ?? 250);
    }
  };

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => {
      syncResize.unsubscribe(handleResize);
    };
  }, [subheading, list?.length]);

  useEffect(() => {
    setSearchArticles(searchQuestions(searchInput, data.search));
  }, [searchInput]);

  const searchFieldProps = {
    data: searchArticles,
    setIsSearchActive,
    searchInput,
    searchInputRef,
    noResultsProps,
    isWhite: true,
    onClickAllQuestions: data.onClickAllQuestions,
    buttonRef,
  };

  return (
    <Section className={cn('help-category-list')}>
      <Container className={cn('help-category-list__container')}>
        <div className={cn('help-category-list__back', 'back')}>
          <div className={cn('back__svg')}>
            <BlogSearchResultsBack />
          </div>
          <Link variant={'text-primary'} href={'/help'} className={cn('back__text')}>
            {data.back}
          </Link>
        </div>
        <div className={cn('help-category-list__category-container')}>
          <div className={cn('help-category-list__heading-container')} style={{ '--text-indent': textIndent }}>
            <TextBlock
              headingText={data?.category ? data.category : `${list?.length} search results for:`}
              headingStyles="h4"
              tagName="h2"
              className={cn('help-category-list__text-container', {
                'help-category-list__text-container_only-title': !subheading,
              })}
              headingClassName={cn(
                'help-category-list__category',
                {
                  'help-category-list__category_only-title': !subheading,
                },
                { 'help-category-list__category_with-subtitle': subheading }
              )}
              align="left"
              textRef={countRef}
            />
            {subheading && (
              <TextBlock
                headingText={`${subheading}`}
                accentPhrase={subheading}
                headingStyles="h4"
                tagName="h2"
                className={cn('help-category-list__subtitle-container')}
                headingClassName={cn('help-category-list__subtitle')}
                align="left"
              />
            )}
          </div>
          <div className={cn('help-category-list__search')}>
            <SearchItem {...searchProps} inputWrapRef={searchItemRef} />
            {isActive && (
              <SearchField {...searchFieldProps} popupRef={popupRef} onClickOneQuestion={onClickOneQuestion} />
            )}
          </div>
        </div>
        <div className={cn('help-category-list__list')}>{list}</div>
      </Container>
    </Section>
  );
}

export default HelpCategoryList;
