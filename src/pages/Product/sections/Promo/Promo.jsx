import React, { useRef } from 'react';

// Component
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';

// Styles
import classnames from 'classnames/bind';
import styles from './Promo.module.scss';
import { useScrollInView } from '@/hooks';
import { TextBlock } from '@/feature/TextBlock';
import { getImgUrl } from '@/shared/utils/sanity.utils';
const cn = classnames.bind(styles);

function Promo({ data }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRef = useRef(null);

  return (
    <Section className={cn('promo')}>
      <Container className={cn('promo__wrapper')}>
        <div>
          <TextBlock
            textRef={titleRef}
            headingText={data.title}
            accentPhrase={data.accentPhrase}
            headingStyles="h2"
            tagName="h2"
            className={cn('promo__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
          />
          <p className={cn('promo__subtitle', useScrollInView(subtitleRef).spawnAnimation)} ref={subtitleRef}>
            {data.subtitle}
          </p>
        </div>
        <div className={cn('promo__img', useScrollInView(imgRef).spawnAnimation)} ref={imgRef}>
          <img src={getImgUrl(data.image.image.asset)} alt={data.image.image.alt || ''} />
        </div>
      </Container>
    </Section>
  );
}

export default Promo;
