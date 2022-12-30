import React, {useEffect, useRef, useState} from 'react';
import {useScrollInView} from "@/hooks";

// Component
import Day from "@/pages/Companies/sections/HowItWorks/Day";
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";

// Styles
import classnames from "classnames/bind";
import styles from './HowItWorks.module.scss';
import Benefit from "@/pages/Companies/sections/HowItWorks/Benefit";
const cn = classnames.bind(styles);

function HowItWorks({data}) {
  const {benefits, days, title} = data
  const textRef = useRef(null);

  const [activeDay, setActiveDay] = useState(0)
  const [scrollUp, setScrollUp] = useState(false)

  useEffect(() => {
    let scrollPos = window.scrollY;
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollPos){
        setScrollUp(false)
      } else {
        setScrollUp(true)
      }
      scrollPos = window.scrollY
    });
  }, [])

  return (
    <Section className={cn('works')} isPaddingTop={true} >
      <Container className={cn('works__wrap')}>
        <TextBlock
          textRef={textRef}
          headingText={title}
          tagName='h2'
          headingStyles='h2'
          headingClassName={cn('works__heading')}
          className={cn('works__title', useScrollInView(textRef, { title: true }).titleSpawn)}
          align="center"
        />
        <div className={cn('works__days-wrapper')}>
          {days.map((data, index) => <Day key={index} data={data} index={index} lastDay={index + 1 === days.length} scrollUp={scrollUp}  setActiveDay={setActiveDay} activeDay={activeDay}/>)}
        </div>
        <div className={cn('works__benefits-wrapper')}>
          {benefits.map((data, index) => <Benefit key={`benefit_${index + 1}`} data={data} />)}
        </div>
      </Container>
    </Section>
  )
}

export default HowItWorks
