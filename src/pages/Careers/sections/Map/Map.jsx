import React, { useRef } from 'react';
import { useScrollInView } from '@/hooks';
import { getImgUrl } from '@/shared/utils/sanity.utils';

// Component
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { TextBlock } from '@/feature/TextBlock';
import { Image } from '@/feature/Image';
import Cards from '@/pages/Careers/sections/Map/Cards';
import Quote from '@/pages/Careers/sections/Quote';
import Investors from '@/pages/Careers/sections/Investors';

// Styles
import classnames from 'classnames/bind';
import styles from './Map.module.scss';
const cn = classnames.bind(styles);

function Map({ data }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mapRef = useRef(null);

  return (
    <Section className={cn('map')}>
      <Container>
        <TextBlock
          textRef={titleRef}
          headingText={data.title}
          tagName="h2"
          headingStyles="h2"
          className={cn('map__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
        />
        <p ref={subtitleRef} className={cn('map__subtitle', useScrollInView(subtitleRef).spawnAnimation)}>{data.subtitle}</p>
      </Container>
      <div ref={mapRef} className={cn('map__desktop-img', useScrollInView(mapRef).spawnAnimation)}>
        <Image
          src={getImgUrl(data.imageDesktop.image.asset)}
          layout="responsive"
          width={1440}
          height={624}
          loading="eager"
          objectFit="contain"
          alt={data.imageDesktop.image.alt || ''}
          unoptimized
        />
      </div>
      <div className={cn('map__mobile-img')}>
        <Image
          src={getImgUrl(data.imageMobile.image.asset)}
          layout="responsive"
          width={375}
          height={170}
          loading="eager"
          objectFit="contain"
          alt={data.imageDesktop.image.alt || ''}
          unoptimized
        />
      </div>

      <Container>
        <Cards data={data.mapCards} btnText={data.buttonMap} />
      </Container>

      <Investors
        data={data.careersCompanies}
        className={cn('map__companies')}
        classNameItem={cn('map__companies-item')}
        classNameList={cn('map__companies-list')}
        classNameTitle={cn('map__companies-title')}
      />

      <Quote data={data.quote} />
    </Section>
  );
}

export default Map;
