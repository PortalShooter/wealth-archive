import React, { useEffect, useRef, useState } from 'react';

// Styles
import styles from './BlogSearchResult.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Hooks
import { useScrollInView } from '@/hooks';
import { syncResize } from '@/shared/resize';

// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { TextBlock } from '@/feature/TextBlock';

function BlogSearchResult({ children, query, length, isLoadedAll, onClickMore }) {
  const titleRef = useRef(null);
  const searchQueryRef = useRef(null);
  const countRef = useRef(null);
  const [textIndent, setTextIndent] = useState(250);

  const handleResize = () => {
    setTextIndent(countRef.current.getBoundingClientRect().width + 10 ?? 250);
  };

  useEffect(() => {

    handleResize();
    syncResize.subscribe(handleResize);

    return () => {
      syncResize.unsubscribe(handleResize);
    };
  }, [children]);

  return (
    <Section className={cn('blog-search-result')}>
      <Container className={cn('blog-search-result__wrap')}>
        <div
          className={cn('blog-search-result__text', useScrollInView(titleRef).spawnAnimation)}
          ref={titleRef}
          style={{ '--text-indent': textIndent }}
        >
          <TextBlock
            headingText={`${length} search results for:`}
            headingStyles="h4"
            tagName="h4"
            className={cn('blog-search-result__title', 'blog-search-result__title_count')}
            headingClassName={cn('blog-search-result__heading-count')}
            align="left"
            ref={countRef}
          />
          {children && <TextBlock
            headingText={`${query}`}
            accentPhrase={query}
            headingStyles="h4"
            tagName="h4"
            className={cn('blog-search-result__title', 'blog-search-result__title_request')}
            headingClassName={cn('blog-search-result__heading-request')}
            align="left"
          />}

        </div>
        <div className={cn('blog-search-result__articles')}>{children}</div>
        {!isLoadedAll && (
          <div className={cn('blog-search-result__button-container')} onClick={onClickMore}>
            <div className={cn('blog-search-result__button')}>
              Load More Articles
              {/*<Link variant={'button-stroke'}>{'Load More Articles'}</Link>*/}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default BlogSearchResult;
