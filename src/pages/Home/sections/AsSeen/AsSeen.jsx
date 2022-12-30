import React, {useRef} from "react";
import {useScrollInView} from "@/hooks";

//Components
import {Container} from "@/feature/Container";
import {Section} from "@/feature/Section";
import {TextBlock} from "@/feature/TextBlock";


//Styles
import classnames from "classnames/bind";
import styles from './AsSeen.module.scss';
import Slider from "@/feature/Slider";
const cn = classnames.bind(styles);

function AsSeen ({data}) {
  const {title, slider} = data;
  const titleRef = useRef(null)

  return (
    <Section className={cn('as-seen','as-seen--home')} isPaddingTop>
      <Container className={cn('as-seen__wrapper')} >
        <TextBlock
          textRef={titleRef}
          headingText={title}
          tagName='h2'
          headingStyles='h4'
          className={cn('as-seen__text',  useScrollInView(titleRef, { title: true }).titleSpawn)}
          headingClassName={cn('as-seen__heading')}
          align="center"
        />
      </Container>
      <Slider
        data={slider}
        classSwiper={cn('as-seen__swiper')}
        classCardWrapper={cn('as-seen__card-wrapper')}
      />
    </Section>

    )
}

export default AsSeen
