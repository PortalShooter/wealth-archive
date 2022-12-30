import React, { useEffect, useRef, useState } from 'react';

// Components
import { getImgSize, getImgUrl } from '@/shared/utils/sanity.utils';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import Image from 'next/image';
import { syncResize } from 'src/shared/resize';

// Styles
import classnames from 'classnames/bind';
import styles from './ImageBlock.module.scss';
import CustomScrollbar from '@/feature/CustomScrollbar';
import { useWindowSize } from '@/hooks';
import { carouselEventEmitter } from '@/pages/Home/sections/OldHero/shared/carousel';

const cn = classnames.bind(styles);

function ImageBlock({ data, style = null }) {
  const [height, setHeight] = useState(242);
  const wideImageRef = useRef();

  const handleResize = () => {
    if (window && window.innerWidth >= 768) {
      setHeight(353);
    } else {
      setHeight(242);
    }
  };

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => {
      syncResize.unsubscribe(handleResize);
    };
  }, []);

  const { image: imageWithAlt, isImageWide } = data;

  const imageUrl = imageWithAlt ? getImgUrl(imageWithAlt.image) : null;
  const imageSize = imageWithAlt ? getImgSize(imageWithAlt.image) : null;

  return (
    <Section className={cn('picture', { 'picture_wide': isImageWide }, style)}>
      <Container className={cn('picture__wrapper')}>
        {!isImageWide ? (
          <Image
            src={imageUrl}
            layout="responsive"
            width={imageSize?.width ?? 0}
            height={imageSize?.height ?? 0}
            loading="eager"
            alt={imageWithAlt?.alt || ''}
            unoptimized
            objectFit="cover"
          />
        ) : (
          <CustomScrollbar width="100%" height={height}>
            <img src={imageUrl} alt={imageWithAlt?.alt || ''} className={cn('picture__image')} ref={wideImageRef} />
          </CustomScrollbar>
        )}
      </Container>
    </Section>
  );
}

export default ImageBlock;
