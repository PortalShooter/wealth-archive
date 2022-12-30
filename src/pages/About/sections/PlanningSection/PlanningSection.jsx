import React, {useEffect, useRef} from 'react';

// Helpers
import classnames from 'classnames/bind';
import {syncResize} from '@/shared/resize';

// Hooks
import {useScrollInView} from '@/hooks';
import {useScrollTrigger} from '@/feature/ScrollProvider/ScrollProvider';
import {motion, useTransform} from 'framer-motion';

// Components
import Image from 'next/image';
import {Container} from '@/feature/Container';
import {Section} from '@/feature/Section';
import {TextBlock} from '@/feature/TextBlock';

// Styles
import styles from './PlanningSection.module.scss';

const cn = classnames.bind(styles);

function PlanningSection({data, className, additionalClassName}) {
  const {title, description: subtitle, images: imagesData} = data;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  const imagesHolderRef = useRef(null);
  const triggerRef = useRef(null);
  const isDesktop = useRef(null);

  const progress = useScrollTrigger().progress;
  const leftImageX = useTransform(progress, [0, 0.3], [-280, 0]);
  const rightImageX = useTransform(progress, [0, 0.3], [280, 0]);
  const centerScale = useTransform(progress, [0, 0.3], ['scale(1.3)', 'scale(1)']);

  const handleResize = () => {
    isDesktop.current = window.innerWidth > 1024;
  };

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => {
      syncResize.unsubscribe(handleResize);
    };
  }, []);

  const images = (
    <>
      <motion.div className={cn('planning__image-block')} style={isDesktop.current ? {x: leftImageX} : {}}>
        <div className={cn('planning__image-wrap')}>
          <Image
            src={imagesData[0].url}
            layout="fill"
            loading="eager"
            className={cn('planning__image', className)}
            alt={imagesData[0].alt || ''}
            unoptimized
            objectFit="cover"
            objectPosition="100% center"
          />
        </div>
      </motion.div>
      <div className={cn('planning__image-block')}>
        <motion.div className={cn('planning__image-wrap')} style={isDesktop.current ? {transform: centerScale} : {}}>
          <Image
            src={imagesData[1].url}
            layout="fill"
            loading="eager"
            className={cn('planning__image', className)}
            alt={imagesData[1].alt || ''}
            unoptimized
            objectFit="cover"
            objectPosition="50% center"
          />
        </motion.div>
      </div>
      <motion.div className={cn('planning__image-block')} style={isDesktop.current ? {x: rightImageX} : {}}>
        <div className={cn('planning__image-wrap')}>
          <Image
            src={imagesData[2].url}
            layout="fill"
            loading="eager"
            className={cn('planning__image', className)}
            alt={imagesData[2].alt || ''}
            unoptimized
            objectFit="cover"
            objectPosition="0% center"
          />
        </div>
      </motion.div>
    </>
  );
  return (
    <Section className={cn('planning', className, additionalClassName)}>
      <Container className={cn('planning__container')} ref={triggerRef}>
        <TextBlock
          headingText={title}
          subHeadingText={subtitle}
          tagName="h2"
          headingStyles="h2"
          align="center"
          className={cn('planning__title')}
          headingClassName={cn('planning__heading', className, useScrollInView(headingRef, {title: true}).titleSpawn)}
          subHeadingClassName={cn('planning__subheading', className, useScrollInView(subHeadingRef).spawnAnimation)}
          textRef={headingRef}
          subtitleRef={subHeadingRef}
        />
        <div
          className={cn('planning__image-holder', useScrollInView(imagesHolderRef).spawnAnimation)}
          ref={imagesHolderRef}
        >
          {images}
        </div>
      </Container>
    </Section>
  );
}

export default PlanningSection;
