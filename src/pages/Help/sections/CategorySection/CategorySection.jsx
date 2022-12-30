import React, {useRef} from 'react';

// Styles
import styles from './CategorySection.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

//Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import CategoryCard from '@/pages/Help/UI/CategoryCard';
import {useScrollInView} from "@/hooks";

function CategorySection({ data }) {
  const questions = data.categories.map((elem) => {if (elem.questions) {return <CategoryCard data={elem} key={elem._id} />}});
  const titleRef = useRef();
  return (
    <Section className={cn('category')}>
      <Container className={cn('category__container')}>
        <div className={cn('category__title', useScrollInView(titleRef, { title: true }).titleSpawn)} ref={titleRef}>{data.title}</div>
        <div className={cn('category__cards')}>{questions}</div>
      </Container>
    </Section>
  );
}

export default CategorySection;
