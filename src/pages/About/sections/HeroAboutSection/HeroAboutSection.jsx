import React, {useRef} from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';

// Components
import Image from 'next/image';
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';
import {TextBlock} from '@/feature/TextBlock';
import {AboutLeftImage, AboutRightImage} from '@/svgComponents';

// Styles
import styles from './HeroAboutSection.module.scss';

const cn = classnames.bind(styles);

function HeroAboutSection({data}) {
  const {title, image, description} = data;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const imageWrapRef = useRef(null);

  return (
    <Section className={cn('section')}>
      {title && description && (
        <Container>
          <TextBlock
            headingText={title}
            subHeadingText={description}
            tagName="h2"
            headingStyles="h2"
            subHeadingLevel="1"
            className={cn('text-block')}
            headingClassName={cn('text-block__heading', useScrollInView(headingRef, {title: true}).titleSpawn)}
            subHeadingClassName={cn('text-block__subheading', useScrollInView(subHeadingRef).spawnAnimation)}
            textRef={headingRef}
            subtitleRef={subHeadingRef}
          />
        </Container>
      )}
      {image && (
        <Container className={cn('hero', useScrollInView(imageWrapRef).spawnAnimation)} ref={imageWrapRef}>
          <div className={cn('hero__image-wrap')}>
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              layout="responsive"
              loading="eager"
              alt={data.image.alt || ''}
              unoptimized
              priority
            />
            <div className={cn('hero__image-inside', 'hero__image-inside_left')}>
              <AboutLeftImage/>
            </div>
            <div className={cn('hero__image-inside', 'hero__image-inside_right')}>
              <AboutRightImage/>
            </div>
          </div>
        </Container>
      )}
    </Section>
  );
}

export default HeroAboutSection;
