import React, { useRef, useState } from 'react';

import { TextBlock } from '@/feature/TextBlock';

// Styles
import classnames from 'classnames/bind';
import styles from './OrdinaryText.module.scss';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { useScrollInView } from '@/hooks';
const cn = classnames.bind(styles);

function OrdinaryText({ text, title, isPrimary }) {
  title = title ? title : '';
  text = text ? text : '';
  isPrimary = isPrimary ? isPrimary : false;

  const textRef = useRef(null);

  return (
    <Section className={cn('text', useScrollInView(textRef).spawnAnimation)} ref={textRef}>
      <Container className={cn('text__wrapper')}>
        <TextBlock
          headingText={title}
          subHeadingText={text}
          headingClassName={cn({ text__title: title }, { text__primary: isPrimary })}
          tagName={isPrimary ? 'h2' : 'h3'}
          headingStyles={'h4'}
          subHeadingClassName={cn('text__paragraph')}
        />
      </Container>
    </Section>
  );
}

export default OrdinaryText;
