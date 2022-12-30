import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";

// Component
import {TextBlock} from "@/feature/TextBlock";
import Card from "@/pages/Careers/sections/AllHuman/Benefits/Card";

// Styles
import classnames from "classnames/bind";
import styles from './Benefits.module.scss';
const cn = classnames.bind(styles);

function Benefits({data}) {
  const {title, subtitle, benefitsItems} = data
  const titleRef = useRef(null);
  const subHeadingRef = useRef(null);

  return (
    <div className={cn('benefits')}>
      <TextBlock
        textRef={titleRef}
        headingText={title}
        subtitleRef={subHeadingRef}
        subHeadingText={subtitle}
        headingStyles="h2"
        tagName="h2"
        className={cn('benefits__title', useScrollInView(titleRef, {title: true}).titleSpawn)}
        headingClassName={cn('benefits__heading')}
        subHeadingClassName={cn('benefits__subheading', useScrollInView(subHeadingRef).spawnAnimation)}
      />

      <div className={cn('benefits__wrapper')}>
        {benefitsItems.map((el, index) => <Card data={el} key={index}  />)}
      </div>
    </div>
  )
}

export default Benefits
