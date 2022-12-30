import React, { useRef } from 'react';
import { useScrollInView } from '@/hooks';

// Components
import { TextBlock } from '@/feature/TextBlock';
import { Container } from '@/feature/Container';
import { Section } from '@/feature/Section';

// Styles
import classnames from 'classnames/bind';
import styles from './EstatePlanningSection.module.scss';
import Slider from '../Slider';
const cn = classnames.bind(styles);

function EstatePlanningSection({ data }) {
  const titleRef = useRef(null);
  const { oldWayTitle, cards } = data;

  return (
    <Section className={cn('estate-planning')} isPaddingTop>
      <Container className={cn('estate-planning__wrapper')}>
        <TextBlock
          textRef={titleRef}
          headingText={oldWayTitle.title}
          tagName="h2"
          headingStyles="h2"
          className={cn('estate-planning__text', useScrollInView(titleRef, { title: true }).titleSpawn)}
          headingClassName={cn('estate-planning__heading')}
          accentPhrase={oldWayTitle.accentPhrase}
          align="center"
        />
      </Container>
      <div className={cn('estate-planning__wrapper-slider')}>
        <Slider data={data} className={'estate-planning'} />
      </div>
    </Section>
  );
}

export default EstatePlanningSection;
