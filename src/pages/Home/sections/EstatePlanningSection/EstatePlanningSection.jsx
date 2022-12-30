import React, {useRef} from "react";
import {useScrollInView} from "@/hooks";

// Components
import {TextBlock} from "@/feature/TextBlock";
import {Container} from "@/feature/Container";
import {Section} from "@/feature/Section";
import Slider from "@/feature/Slider";

// Styles
import classnames from "classnames/bind";
import styles from './EstatePlanningSection.module.scss';
const cn = classnames.bind(styles);

function EstatePlanningSection ({data}) {
  if (!data){ return null}
  const titleRef = useRef(null)
  const {title, slider} = data;

  return (
    <Section className={cn('estate-planning')} isPaddingTop>
      <Container className={cn('estate-planning__wrapper')} >

        <TextBlock
          textRef={titleRef}
          headingText={title && title.title}
          tagName='h2'
          headingStyles='h2'
          className={cn('estate-planning__text',  useScrollInView(titleRef, { title: true }).titleSpawn)}
          headingClassName={cn('estate-planning__heading')}
          accentPhrase={title && title.accentPhrase}
          align="center"
        />
      </Container>
      <Slider data={slider} />
    </Section>

    )
}

export default EstatePlanningSection
