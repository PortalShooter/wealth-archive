import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";
import Benefits from "@/pages/Careers/sections/AllHuman/Benefits";
import TitleImg from "@/pages/Careers/components/TitleImg";

// Styles
import classnames from "classnames/bind";
import styles from './AllHuman.module.scss';
const cn = classnames.bind(styles);

function AllHuman({data}) {
  const {title, subtitle, benefits, titleImg} = data
  const titleRef = useRef(null);
  const subHeadingRef = useRef(null)

  return (
    <Section className={cn('all-human')} isPaddingTop>
      <TextBlock
        textRef={titleRef}
        headingText={title}
        subtitleRef={subHeadingRef}
        subHeadingText={subtitle}
        headingStyles="h1"
        tagName="h2"
        className={cn('all-human__title', useScrollInView(titleRef, {title: true}).titleSpawn)}
        headingClassName={cn('all-human__heading')}
        subHeadingClassName={cn('all-human__subheading', useScrollInView(subHeadingRef).spawnAnimation)}
        align="center"
      />
      <Container className={cn('all-human__wrap')}>
        <TitleImg data={titleImg} />
        <Benefits data={benefits} />
      </Container>
    </Section>
  )
}

export default AllHuman
