import React, { useRef } from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import NextLink from 'next/link';
import Image from 'next/image';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { TextBlock } from '@/feature/TextBlock';

// Styles
import styles from './StoriesSection.module.scss';

const cn = classnames.bind(styles);

function Story({ category, title, publishedAt, readTime, image, layout, categorySlug, articleSlug }) {
  return (
    <NextLink href={`/the-plan/${categorySlug}/${articleSlug}`}>
      <a className={cn('story', { story_imageless: layout !== 'normal' })}>
        {layout === 'normal' && (
          <div className={cn('story__image-wrap')} aria-label={title}>
            <Image
              src={image.url}
              layout="fill"
              loading="eager"
              className={cn('story__image')}
              alt={image.alt || ''}
              unoptimized
              objectFit="cover"
            />
          </div>
        )}

        {category && <div className={cn('story__category')}>{category}</div>}
        {title && <div className={cn('story__title')}>{title}</div>}

        <div className={cn('story__info')}>
          {publishedAt && publishedAt}
          {publishedAt && readTime ? <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span> : null}
          {readTime && readTime}
        </div>

        {layout === 'imageless' && <div className={cn('story__read-more')}>Read More</div>}
      </a>
    </NextLink>
  );
}

function StoriesSection({ data }) {
  const { title, stories } = data;
  const headingRef = useRef();
  const holderRef = useRef();
  const storiesList = stories.map((storyData, i) => <Story key={`${storyData.title}${i}}`} {...storyData} />);

  return (
    <Section className={cn('stories')}>
      <Container>
        <TextBlock
          headingText={title}
          headingStyles="h3"
          tagName="h3"
          className={cn('stories__title')}
          headingClassName={cn('stories__heading', useScrollInView(headingRef, { title: true }).titleSpawn)}
          align="left"
          textRef={headingRef}
        />
      </Container>
      <Container className={cn('stories__holder', useScrollInView(holderRef).spawnAnimation)} ref={holderRef}>
        {storiesList}
      </Container>
    </Section>
  );
}

export default StoriesSection;
