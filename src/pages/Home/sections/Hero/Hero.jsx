import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';

import * as styles from './Hero.module.scss'
import { Link } from '../../../../feature/Link';
import { TextBlock } from '../../../../feature/TextBlock';

import {useScrollInView} from '../../../../hooks/useScrollInView';
import { LinkAnimated } from '../../../../feature/Link/LinkAnimated';
import Slider from './Slider';
import { useInView } from 'react-intersection-observer';
import {useScrollTrigger} from '../../../../feature/ScrollProvider/ScrollProvider';
import { useWindowSize } from '../../../../hooks';

const cn = classnames.bind(styles)

const Hero = ({data}) => {
  const titleRef = useRef(null);
  const subtitleAnim = useRef(null);
  const sectionRef = useRef(null);
  const leftBtn = useRef(null);
  const rightBtn = useRef(null);
  // const carouselRef = useRef(null);
  const [isScrolled,setIsScrolled] = useState(false)
  const [isMounted,setIsMounted] = useState(false)
  const carouselInView = useInView()
  const windowParams = useWindowSize()

  const progress = useScrollTrigger().progress;


  useEffect(()=>{
    setIsMounted(true)
    const checkScroll = progress.onChange(()=>{
      if (windowParams.windowHeight < 800 || windowParams.windowWidth < 768) {
        if (progress.current >= 0.25) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      } else {
        if (progress.current >= 0.01) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

    })

    return  checkScroll
  },[windowParams])



  return (
    <div ref={sectionRef} className={cn('hero')}>
      <div className={cn('hero__container',isMounted?'mounted':'')}>
        <TextBlock
          textRef={titleRef}
          subtitleRef={subtitleAnim}
          headingText={'Your legacy lives here'}
          subHeadingText={data.subtitle}
          accentPhrase={'Your legacy'}
          tagName='h1'
          headingStyles='h2'
          subHeadingLevel='1'
          headingClassName={cn('hero__title')}
          className={cn(
            'hero__content',
            useScrollInView(titleRef, { title: true,delay:400 }).titleSpawn
          )}
          subHeadingClassName={cn('hero__text', useScrollInView(subtitleAnim).spawnAnimation)}
          align="center"
        />
        <div className={cn('hero__buttons')}>
          <LinkAnimated ref={leftBtn} tabIndex={0} className={cn('hero__link',useScrollInView(leftBtn).spawnAnimation)} variant="button-fill-secondary" href={data.left_button_link}>{data.left_button_text}</LinkAnimated>
          <LinkAnimated ref={rightBtn} tabIndex={0} className={cn('hero__link',useScrollInView(rightBtn).spawnAnimation)} variant="button-fill-secondary" href={data.right_button_link}>{data.right_button_text}</LinkAnimated>
        </div>
      </div>
      <div ref={carouselInView.ref} className={cn('hero__carousel',isMounted?'mounted':'')}>
        <div ref={carouselInView.ref} className={cn('hero__carousel-inner')}>
          <Slider data={data.carousel} sectionRef={sectionRef} isScrolled={isScrolled}/>
        </div>
      </div>
    </div>
  )
}

export default Hero;
