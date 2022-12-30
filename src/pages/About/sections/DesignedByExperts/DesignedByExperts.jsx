import React, {useEffect, useRef, useState} from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';
import {useInView} from 'react-intersection-observer';

// Components
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';
import {TextBlock} from '@/feature/TextBlock';
import {AboutDesignBlocks} from '@/svgComponents';
import Lottie from 'lottie-react';

// Lottie
import lottieData from './09-Designed-by-experts-Center_Card_lottie.json';

// Styles
import styles from './DesignedByExperts.module.scss';

const cn = classnames.bind(styles);

function DesignedByExperts({data}) {
  const {title, description} = data;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const lottieRef = useRef(null);
  const backRef = useRef(null);
  const svgRef = useInView({
    rootMargin: '9999px 0px -12% 0px',
    triggerOnce: true,
  });

  useEffect(() => {
    lottieRef.current.play();
    if (svgRef.inView) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  }, [svgRef.inView]);

  return (
    <Section className={cn('designed')}>
      <Container>
        {title && description && (
          <TextBlock
            textRef={headingRef}
            subtitleRef={subHeadingRef}
            headingText={title}
            subHeadingText={description}
            tagName="h2"
            headingStyles="h2"
            subHeadingLevel="1"
            className={cn('designed__title')}
            headingClassName={cn('designed__heading', useScrollInView(headingRef, {title: true}).titleSpawn)}
            subHeadingClassName={cn('designed__subheading', useScrollInView(subHeadingRef).spawnAnimation)}
          />
        )}
      </Container>
      <Container className={cn('designed__svg-wrap', useScrollInView(backRef).spawnAnimation)} ref={backRef}>
        <AboutDesignBlocks reRef={svgRef.ref} className={cn('designed__svg')}/>
        <Lottie
          width={100}
          height={100}
          lottieRef={lottieRef}
          className={cn('designed__svg-center')}
          autoplay={false}
          loop={false}
          animationData={lottieData}
        />
      </Container>
    </Section>
  );
}

export default DesignedByExperts;
