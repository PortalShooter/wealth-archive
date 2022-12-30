import React, {useEffect, useRef, useState} from 'react';

// Helpers
import classnames from 'classnames/bind';
import {syncResize} from '@/shared/resize';
import {syncScroll} from '@/shared/scroll';

// Hooks
import {useScrollInView} from '@/hooks';

// Components
import Image from 'next/image';
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';
import {TextBlock} from '@/feature/TextBlock';
import ParallaxBox from "@/feature/ParallaxBox";

// Styles
import styles from './AreWeForYouSection.module.scss';
import {Link} from "@/feature/Link";

const cn = classnames.bind(styles);

function AreWeForYouSection(
  {data,
    className,
    classNameMainImage,
    classNameWrap,
    classNameHeading,
    classNameTitle
  }) {
  const {title, secondTitle, description, mainImage, avatars: avatarsData, cta_link} = data;
  const subHeadingRef = useRef(null);
  const secondTitleRef = useRef(null);
  const imageRef = useRef(null);
  const [isSubHeadingVisible, setIsSubHeadingVisible] = useState(false);
  const headingRef = useRef(null);

  const handleScroll = () => {
    const {width} = syncResize.get();
    const offsetModifier = width < 440 ? 0 : width > 1440 ? 100 : Math.round(width / 10);
    if (!imageRef || !imageRef?.current) {
      return;
    }

    if (imageRef.current.offsetTop + offsetModifier < secondTitleRef.current.offsetTop) {
      setIsSubHeadingVisible(true);
    }
  };

  useEffect(() => {
    handleScroll();
    syncScroll.subscribe(handleScroll);

    return () => {
      syncScroll.unsubscribe(handleScroll);
    };
  }, []);

  const avatars = avatarsData.map((image, index) => {
    const slowElements = [0, 2, 3, 4, 6, 9];
    const fastElements = [1, 5, 7, 8, 10];
    let scrollModifier = 1;
    if (slowElements.indexOf(index) !== -1) {
      scrollModifier = 0.97;
    }

    if (fastElements.indexOf(index) !== -1) {
      scrollModifier = 1.13;
    }

    return (
      <ParallaxBox
        key={image.url}
        scrollModifier={scrollModifier}
        className={cn('are-we-for-you__elem', `are-we-for-you__elem_${index + 1}`)}
      >
        <Image
          src={image.url}
          layout="responsive"
          width={image.width}
          height={image.height}
          loading="eager"
          alt={image.alt || ''}
          unoptimized
        />
      </ParallaxBox>
    );
  });
  const linkRef = useRef(null);

  return (
    <Section className={cn('are-we-for-you', className)}>
      <Container className={cn('are-we-for-you__wrap', classNameWrap)}>
        <TextBlock
          textRef={headingRef}
          headingText={title}
          tagName="h2"
          headingStyles="h1"
          className={cn('are-we-for-you__title')}
          headingClassName={cn('are-we-for-you__heading', classNameHeading, useScrollInView(headingRef, {title: true}).titleSpawn)}
          align="center"
        />

        <ul className={cn('are-we-for-you__list')} role="presentation">{avatars}</ul>
        <div className={cn('are-we-for-you__spacer-top')}/>
      </Container>
      <Container className={cn('are-we-for-you__wrap', classNameWrap)}>
        <TextBlock
          headingText={secondTitle}
          subHeadingText={description}
          tagName="h2"
          headingStyles="h1"
          className={cn('are-we-for-you__title', classNameTitle)}
          headingClassName={cn('are-we-for-you__heading', 'are-we-for-you__heading_bottom', classNameHeading)}
          subHeadingClassName={cn('are-we-for-you__subheading', {
            'are-we-for-you__subheading_hidden': !isSubHeadingVisible,
          })}
          subtitleRef={subHeadingRef}
          ref={secondTitleRef}
          align="center"
        />
        <div className={cn('are-we-for-you__main-image-wrap', classNameMainImage)} ref={imageRef}>
          <Image
            src={mainImage.url}
            layout="fill"
            loading="eager"
            alt={mainImage.alt || ''}
            unoptimized
            objectFit="cover"
          />
        </div>
        {
          cta_link &&
          <Link href={cta_link.url} ref={linkRef} variant="button-fill" className={cn('are-we-for-you__link', useScrollInView(linkRef).spawnAnimation)} >
            {cta_link.text}
          </Link>
        }
        <div className={cn('are-we-for-you__spacer')}/>
      </Container>
    </Section>
  );
}

export default AreWeForYouSection;
