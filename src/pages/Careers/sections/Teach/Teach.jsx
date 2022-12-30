import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";


// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";
import Quality from "./Quality";

// Styles
import classnames from "classnames/bind";
import styles from './Teach.module.scss';
const cn = classnames.bind(styles);

function Teach({data}) {
  const {subtitle, title, quality} = data
  const titleRef = useRef(null);
  const subHeadingRef = useRef(null)

  return (
    <Section className={cn('teach')}>
      <Container className={cn('teach__wrap')}>
        <TextBlock
          textRef={titleRef}
          headingText={title}
          subtitleRef={subHeadingRef}
          subHeadingText={subtitle}
          tagName='h2'
          headingStyles='h2'
          headingClassName={cn( 'teach__title')}
          subHeadingClassName={cn('teach__subtitle', useScrollInView(subHeadingRef).spawnAnimation)}
          className={cn('teach__text', useScrollInView(titleRef, { title: true }).titleSpawn)}
        />

        <div className={cn('teach__quality')}>
          {quality.map((item, index) => <Quality data={item} key={index} />)}
        </div>

      </Container>
    </Section>
  )
}

export default Teach
