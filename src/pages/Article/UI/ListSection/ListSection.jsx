import React from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './ListSection.module.scss';
const cn = classnames.bind(styles);

// Components
import { TextBlock } from '@/feature/TextBlock';
import ListElement from '@/pages/Article/UI/ListElement';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';

function ListSection({ title, data }) {
  const listItems = data.list.map((elem, index) => <ListElement data={elem} key={index} />);
  return (
    <Section className={cn('list')}>
      <Container className={cn('list__wrapper')}>
        <TextBlock
          headingClassName={cn('list__title')}
          headingText={title}
          tagName={'h3'}
          headingStyles={'h4'}
          className={cn('list__text-block')}
        />
        <ul className={cn('list__items')}>{listItems}</ul>
      </Container>
    </Section>
  );
}

export default ListSection;
