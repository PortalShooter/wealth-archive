import React, { useEffect, useRef, useState } from 'react';
import {useScrollInView} from '@/hooks';
import {getImgUrl} from '@/shared/utils/sanity.utils';
import {useScrollTrigger} from '@/feature/ScrollProvider/ScrollProvider';
import {motion,useTransform} from 'framer-motion';
import { modalController } from '@/pages/Home/sections/OldHero/shared/modal/useModal';
import { MODAL_ID } from '@/pages/Home/sections/OldHero/modalForm/ModalForm';
import { defaultModalGroupOptions } from '@/pages/Home/sections/OldHero/shared/modal/defaults';
// Components
import {TextBlock} from "@/feature/TextBlock";

// Styles
import * as styles from './PercentsTabs.module.scss';
import classnames from "classnames/bind";
import {Link} from "@/feature/Link";
const cn = classnames.bind(styles);

//images

import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import image5 from './images/image5.png'
import image6 from './images/image6.png'
import image7 from './images/image7.png'
import image8 from './images/image8.png'
import image9 from './images/image9.png'
import { useWindowSize } from '@/hooks';
import {Button} from "@/feature/Button";


const Tab = ({data}) => {
  if (!data){ return null}

  const tabRef = useRef();
  const titleRef = useRef();
  const subTitleRef = useRef();
  const imageRef = useRef();
  const stickyRef = useRef();

  const [startPercent,setStartPercent] = useState(-0.25);
  const [endPercent,setEndPercent] = useState(0.1);
  const [isPercentVisible,setIsPercentVisible] = useState(false);

  const windowParams = useWindowSize();

  const [currentPercents,setCurrentPercents] = useState(0);

  const progress = useScrollTrigger().progress;

  const percents = useTransform(progress,[startPercent,endPercent],[0,data.percents])
  const imageOffset = useTransform(progress,[-0.5,0.5],['translate(-50%,0)','translate(-50%,30%)'])

  useEffect(() => progress.onChange(latest => {
    if (progress.current >= startPercent ) {
      setIsPercentVisible(true)
    } else {
      setIsPercentVisible(false)
    }
    setCurrentPercents(Math.round(percents.current))
  }), [startPercent])

  useEffect(()=>{
    const imageBottomOffset = ( imageRef.current.offsetTop + imageRef.current.clientHeight - windowParams.windowHeight/2 ) / tabRef.current.clientHeight;
    const stickyBottomOffset = ( stickyRef.current.offsetTop + stickyRef.current.clientHeight - windowParams.windowHeight ) / tabRef.current.clientHeight;
    const width = windowParams.windowWidth;
    switch (true) {
      case width >= 768:
        setStartPercent(imageBottomOffset);
        setEndPercent(stickyBottomOffset);
        break;
      case width >= 576:
        setStartPercent(0.15);
        setEndPercent(0.35);
        break;
      default:
        setStartPercent(0.05);
        setEndPercent(0.15);
    }
  },[windowParams.windowWidth])

  const handleClick = () => {
    modalController.open(MODAL_ID, defaultModalGroupOptions["groupId"]);
    document.body.setAttribute('scrollY', window.pageYOffset)
    document.body.style.top = `-${document.body.getAttribute('scrollY')}px`
    document.body.classList.add('modal-opened')
  }

  return (
    <div ref={tabRef} className={cn('ptab')}>
      <TextBlock
        textRef={titleRef}
        subtitleRef={subTitleRef}
        headingText={data.title}
        subHeadingText={data.subtitle}
        tagName='h2'
        headingStyles='h1'
        headingClassName={cn('ptab__heading')}
        className={cn('ptab__text-wrapper', useScrollInView(titleRef,{ title:true }).titleSpawn)}
        subHeadingClassName={cn('ptab__subtitle',useScrollInView(subTitleRef).spawnAnimation)}
        align='center'
      />

      {data.ctaLink &&
        <Link variant="button-fill" className={cn('ptab__cta-link')} href={data.ctaLink.url}>
          {data.ctaLink.text}
        </Link>
      }

      <div ref={stickyRef} className={cn('ptab__sticky-container')}>
        <div ref={imageRef} className={cn('ptab__image',useScrollInView(imageRef).spawnAnimation)}>
          <motion.img style={{transform:imageOffset}} src={getImgUrl(data.image.image)} alt={data.image.alt}/>
        </div>
        <div className={cn('ptab__percents',isPercentVisible?'visible':'')}>
          <div className={cn('ptab__percents-figure')}>{currentPercents}%</div>
          <div className={cn('ptab__percents-text')}>{data.percentsText}</div>
          <div className={cn('ptab__circle','ptab__circle--c-1',currentPercents>8?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'0s'}}>
              <img src={image1.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-2',currentPercents>16?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'0.2s',animationDirection:'reverse'}}>
              <img src={image3.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-3',currentPercents>24?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'0.4s'}}>
              <img src={image6.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-4',currentPercents>32?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'0.6s',animationDirection:'reverse'}}>
              <img src={image8.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-5',currentPercents>40?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'0.8s'}}>
              <img src={image4.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-6',currentPercents>48?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'1s',animationDirection:'reverse'}}>
              <img src={image2.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-7',currentPercents>52?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'1.2s'}}>
              <img src={image7.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-8',currentPercents>60?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'1.4s',animationDirection:'reverse'}}>
              <img src={image9.src} alt="icon" role="presentation"/>
            </div>
          </div>
          <div className={cn('ptab__circle','ptab__circle--c-9',currentPercents>68?'visible':'')}>
            <div className={cn('ptab__circle-inner')} style={{animationDelay:'1.6s'}}>
              <img src={image5.src} alt="icon" role="presentation"/>
            </div>
          </div>
        </div>
      </div>

      <TextBlock
        headingText={data.text}
        tagName='h3'
        headingStyles='h3'
        // subHeadingText={}
        className={cn('ptab__footer-text-wpapper')}
        headingClassName={cn('ptab__footer-heading')}
        // subHeadingClassName={}
      />

      <div className={cn('ptab__footer-link-wrap')}>
        <p className={cn('ptab__footer-text')}>
          {data.footerText}
        </p>
        {/*<Link variant='button-fill' className={cn('ptab__footer-link')} href={data.link}>*/}
        {/*  {data.linkText}*/}
        {/*</Link>*/}
        <Button variant="base" className={cn('ptab__footer-link')} onClick={handleClick}>
          {data.linkText}
        </Button>
      </div>


    </div>
  )
}

export default Tab;
