import React from 'react';

// Component
import { Section } from "@/feature/Section";
import { Container } from "@/feature/Container";
import { TextBlock } from "@/feature/TextBlock";
import CompareSide from '@/pages/Partnerships/components/CompareSide';

// Styles
import classnames from "classnames/bind";
import styles from './Works.module.scss';
const cn = classnames.bind(styles);

function Works({ data }) {
  const { title, description, wealthPlans, companiesCompare, subtitle } = data

  return (
    <Section className={cn('works')}>
      <TextBlock
        headingText={title}
        subHeadingText={description}
        tagName='h3'
        headingStyles='h3'
        headingClassName={cn('works__title')}
        subHeadingClassName={cn('works__subtitle')}
        className={cn('works__text')}
      />
      <Container className={cn('works__wrap-plans')}>
        {wealthPlans.map((item, index) => (
          <Container key={index + 1} className={cn('works__wrap-plans-item')}>
            <TextBlock
              headingText={item.title}
              subHeadingText={item.description}
              tagName='h4'
              headingStyles='span'
              headingClassName={cn('works__plans-title')}
              subHeadingClassName={cn('works__plans-subtitle')}
              className={cn('works__text')}
            />
          </Container>
        ))}
      </Container>

      <CompareSide data={companiesCompare} />

      <TextBlock
        subHeadingText={subtitle}
        tagName='h5'
        headingStyles='h5'
        headingClassName={cn('works__title')}
        subHeadingClassName={cn('works__subtitle')}
        className={cn('works__text')}
      />
    </Section >
  )
}

export default Works
