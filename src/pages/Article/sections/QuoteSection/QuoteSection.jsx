import React, { useRef } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './QuoteSection.module.scss';
const cn = classnames.bind(styles);

// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import {ArticleQuote} from '@/svgComponents';
import { useScrollInView } from '@/hooks';

function QuoteSection({ data }) {
  const quoteRef = useRef(null);

  return (
    <Section className={cn('quote', useScrollInView(quoteRef).spawnAnimation)} ref={quoteRef}>
      <Container className={cn('quote__wrapper')}>
        <div className={cn('quote__title')}>{data.quote}</div>
        <div className={cn('quote__author')}>{data.authorName}</div>
        <div className={cn('quote__job-title')}>{data.authorProfession}</div>
        <div className={cn('quote__icon')}>
          <ArticleQuote />
        </div>
      </Container>
    </Section>
  );
}

export default QuoteSection;
