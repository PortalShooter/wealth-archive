import React from 'react';
// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import ArticleSection from '../../UI/ArticleSection/ArticleSection';

// Styles
import classnames from 'classnames/bind';
import styles from './BlogSection.module.scss';

const cn = classnames.bind(styles);

function BlogSection({ data }) {
  const sections = data.map((elem) =>
    elem?.articles?.length ? <ArticleSection data={elem} key={elem._key} isButton isMiss /> : null
  );

  return (
    <Section className={cn('article')}>
      <Container className={cn('ArticleSearch')}>{sections}</Container>
    </Section>
  );
}

export default BlogSection;
