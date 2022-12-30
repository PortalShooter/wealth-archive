import React, { useRef } from 'react';

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { TextBlock } from '@/feature/TextBlock';
import { Link } from '@/feature/Link';
import Image from 'next/image';
import { getImgUrl } from '@/shared/utils/sanity.utils';

// Styles
import styles from './EstatePlanning.module.scss';
import classnames from 'classnames/bind';

const cn = classnames.bind(styles);

function EstatePlanning({ data }) {
  const { layout } = data;
  const { image } = data;
  const imageUrl = layout === 'normal' ? getImgUrl(image.image) : '';

  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const dateRef = useRef(null);
  const buttonRef = useRef(null);
  return (
    <Section className={cn('estate-planning', { 'estate-planning_imageless': layout !== 'normal' })}>
      <Container className={cn('estate-planning__wrap')}>
        {layout === 'normal' && (
          <div className={cn('estate-planning__picture', useScrollInView(imgRef).spawnAnimation)} ref={imgRef}>
            <Image
              src={imageUrl}
              layout="fill"
              loading="eager"
              alt={data.image.alt || ''}
              unoptimized
              objectFit="cover"
            />
          </div>
        )}
        <div className={cn('text-block')}>
          <div className={cn('text-block__label', useScrollInView(labelRef).spawnAnimation)} ref={labelRef}>
            {data.label}
          </div>
          <TextBlock
            textRef={titleRef}
            headingText={data.title}
            headingStyles="h4"
            tagName="h4"
            className={cn('text-block__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
            headingClassName={cn('text-block__heading')}
            align="left"
          />
          <div className={cn('time-container', useScrollInView(dateRef).spawnAnimation)} ref={dateRef}>
            {data.date && <div className={cn('time-container__date')}>{data.date}</div>}
            {data.readDuration && (
              <>
                {data.date && data.readDuration && <div className={cn('time-container__separator')} >·</div>}
                <div className={cn('time-container__time')}>{`${data.readDuration} min read`}</div>
              </>
            )}
          </div>
          <Link
            variant={'button-fill'}
            href={`/the-plan/${data.categorySlug}/${data.articleSlug}`}
            className={cn('text-block__button', useScrollInView(buttonRef).spawnAnimation)}
            ref={buttonRef}
          >
            {data.buttonText}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default EstatePlanning;
