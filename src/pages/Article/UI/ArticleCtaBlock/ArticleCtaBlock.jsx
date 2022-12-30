import React, { useEffect, useRef, useState } from 'react';

// Styles
import classNames from 'classnames/bind';
import styles from './ArticleCtaBlock.module.scss';
import { ArticleCta } from '@/svgComponents';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import TextCtaCards from '@/pages/Article/UI/TextCtaCards';
import ArticleCtaBlockWithImage from '@/pages/Article/UI/ArticleCtaBlockWithImage';
import { useScrollInView } from '@/hooks';

const cn = classNames.bind(styles);

function ArticleCtaBlock({ data }) {
  const [card, setCard] = useState();
  const quoteRef = useRef(null);

  return (
    <Section className={cn('cta', useScrollInView(quoteRef).spawnAnimation)} ref={quoteRef}>
      <Container className={cn('cta__wrapper')}>
        {(data.typeOfCta === 'both' || data.typeOfCta === 'title') && <TextCtaCards data={data} />}
        {(data.typeOfCta === 'both_image' || data.typeOfCta === 'title_image') && (
          <ArticleCtaBlockWithImage data={data} />
        )}
      </Container>
    </Section>
  );
}

export default ArticleCtaBlock;
