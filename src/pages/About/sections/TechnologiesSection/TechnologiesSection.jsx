import React, {useRef} from 'react';

// Components
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';
import {useInView} from 'react-intersection-observer';

// Components
import Image from 'next/image';
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';
import {TextBlock} from '@/feature/TextBlock';

// Styles
import styles from './TechnologiesSection.module.scss';

const cn = classnames.bind(styles);

function Technology({image, title, description, index}) {
  const blockRef = useRef(null);

  return (
    <li
      key={image.url}
      className={cn(
        'technologies__elem',
        {technologies__elem_reverse: !!(index % 2)},
        useScrollInView(blockRef).spawnAnimation
      )}
      ref={blockRef}
    >
      {image && (
        <div className={cn('technologies__image')}>
          <Image
            src={image.url}
            layout="responsive"
            width={image.width}
            height={image.height}
            loading="eager"
            alt={image.alt || ''}
            unoptimized
          />
        </div>
      )}
      {title && description && (
        <TextBlock
          headingText={title}
          subHeadingText={description}
          headingStyles="h4"
          tagName="h3"
          subHeadingLevel="1"
          className={cn('technologies__text-block')}
          headingClassName={cn('technologies__text')}
          subHeadingClassName={cn('technologies__subtext')}
        />
      )}
    </li>
  );
}

function TechnologiesSection({data}) {
  const headingRef = useRef(null);
  const parentRef = useRef(null);
  const techsList = data.blocks.map((blockData, i) => <Technology key={blockData.title} {...blockData} index={i}/>);
  const logos = useInView({
    rootMargin: '-100px',
    triggerOnce: true,
  });

  const logoList = data.partnerLogos.map((logo, i) => (
    <li key={i} className={cn('technologies__partners-elem')} dangerouslySetInnerHTML={{__html: logo}}/>
  ));

  return (
    <Section className={cn('technologies')}>
      <Container>
        {data.title && (
          <TextBlock
            textRef={headingRef}
            headingText={data.title}
            accentPhrase={data.accentPhrase}
            headingStyles="h3"
            tagName="h2"
            className={cn('technologies__title')}
            headingClassName={cn('technologies__heading', useScrollInView(headingRef, {title: true}).titleSpawn)}
            align="center"
          />
        )}
        {data.blocks && data.blocks.length && <ul className={cn('technologies__list')}>{techsList}</ul>}
        {data.partners && (
          <>
            <TextBlock
              headingText={data.partners}
              headingStyles="h4"
              tagName="h3"
              className={cn('technologies__partners-title')}
              headingClassName={cn('technologies__partners-heading', useScrollInView(parentRef).spawnAnimation)}
              align="center"
              textRef={parentRef}
            />
            <ul
              className={cn('technologies__partners-list', {'technologies__partners-list_hidden': !logos.inView})}
              ref={logos.ref}
              style={{'--logos-count': logoList?.length}}
            >
              {logoList}
            </ul>
          </>
        )}
      </Container>
    </Section>
  );
}

export default TechnologiesSection;
