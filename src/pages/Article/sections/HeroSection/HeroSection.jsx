import React, {useRef, useState} from 'react';

// Components
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';

// Styles
import classnames from 'classnames/bind';
import styles from './HeroSection.module.scss';
import {TextBlock} from '@/feature/TextBlock';
import Image from 'next/image';
import {getImgUrl} from '@/shared/utils/sanity.utils';
import {useScrollInView} from '@/hooks';

const cn = classnames.bind(styles);

function MainImage({imageUrl='', imageAlt=''}) {
  const imgRef = useRef(null);

  return (
    <div className={cn('hero-section__img', useScrollInView(imgRef).spawnAnimation)} ref={imgRef}>
      <Image
        src={imageUrl}
        layout="fill"
        loading="eager"
        alt={imageAlt}
        unoptimized
        objectFit="cover"
      />
    </div>
  )
}

function HeroSection({data}) {
  const {layout} = data;
  const imageUrl = layout === "normal" ? getImgUrl(data.mainImage.image) : "";
  const imageAlt = data?.mainImage?.image?.alt || '';

  const titleRef = useRef(null);
  const dateRef = useRef(null);

  return (
    <Section className={cn('hero-section')}>
      <Container className={cn('hero-section__wrapper')}>
        <TextBlock
          textRef={titleRef}
          headingText={data.title}
          headingStyles="h3"
          tagName="h3"
          className={cn('hero-section__title', useScrollInView(titleRef, {title: true}).titleSpawn)}
          align="left"
        />
        <div className={cn('time', 'hero-section__time', useScrollInView(dateRef).spawnAnimation)} ref={dateRef}>
          <div className={cn('hero-section__category')}>{data.category}</div>
          <div className={cn('time__container')}>
            <div className={cn('time__date')}>{data.date}</div>
            {data.date && data.timeRead && <div className={cn('time__point')}>{'·'}</div>}
            <div className={cn('time__readTime')}>{data.timeRead}</div>
          </div>
        </div>
        {layout === "normal" && (
          <MainImage imageUrl={imageUrl} imageAlt={imageAlt}/>
        )}
      </Container>
    </Section>
  );
}

export default HeroSection;
