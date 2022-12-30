import React, { useEffect, useRef, useState } from 'react';
import classnames from "classnames/bind";
import {useDispatch, useSelector} from 'react-redux';
import { setCardsStartCoords, setEndCoords } from '@/redux/reducers/animationReducer/actions';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import {useScrollInView} from "@/hooks";
// Styles
import styles from './Cards.module.scss';
import {useInView} from "react-intersection-observer";
import {useScrollTrigger} from "@/feature/ScrollProvider/ScrollProvider";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import DiamondIcon from '../FlyingIllustartions/DiamondIcon';
import HomeIcon from '../FlyingIllustartions/HomeIcon';
import DocumentIcon from '../FlyingIllustartions/DocumentIcon';
import AutoIcon from '../FlyingIllustartions/AutoIcon';
import { useWindowSize } from '@/hooks';
import { hideIcons, setCardsSectionOffset } from '@/redux/reducers/animationReducer/actions';

const cn = classnames.bind(styles);


function Cards({data,black}) {
  if (!data){ return null}
  const homeArea = useRef(null);
  const diamondArea = useRef(null);
  const documentArea = useRef(null);
  const autoArea = useRef(null);
  const dispatch = useDispatch();
  const [elRefs, setElRefs] = useState([[],[],[]]);
  const [mounted,setMounted] = useState(false);
  const [isMotion,setIsMotion] = useState(false);
  const [isMobile,setIsMobile] = useState(false)
  const [progressBorder,setProgressBorder] = useState(0.99)
  const cardsProps = useSelector(globalState=>globalState.animation.coloredCards);
  const iconSProps = useSelector(globalState=>globalState.animation.icons);
  const isHideIcons = useSelector(globalState=>globalState.animation.isHideIcons);
  const sectionsOffset = useSelector(globalState=>globalState.animation.sectionsOffset);

  const windowParams = useWindowSize();


  const purpleContentUseInViewSettings = {
    triggerOnce:true,
    rootMargin: '9999px 0% -35% 0%'
  }

  const contentUseInViewSettings = {
    //triggerOnce:true,
    rootMargin: '9999px 0% -35% 0%'
  }

  const titleUseInViewSettings = {
    rootMargin: '9999px 0% -10% 0%'
  }

  const purpleCardContent = useInView(purpleContentUseInViewSettings)
  const yellowCardContent = useInView(contentUseInViewSettings)
  const mintCardContent = useInView(contentUseInViewSettings)
  const sectionStart = useInView({
    triggerOnce:true,
    rootMargin: '0px 0px -100% 0px'
  })


  const staticCardRef = useRef(null)

  const purpleTitleRef=  useRef(null)
  const yellowTitleRef=  useRef(null)
  const mintTitleRef=  useRef(null)



  const yellowCardTitle = useInView(titleUseInViewSettings)
  const mintCardTitle = useInView(titleUseInViewSettings)

  const sectionEnd = useInView({
    //triggerOnce:true,
    rootMargin:'0% 0% -100% 0%'
  })

  const video1Ref=  useRef(null)
  const video2Ref=  useRef(null)
  const video3Ref=  useRef(null)

  const sectionRef = useRef(null);

  const progress = useScrollTrigger()?.progress || useMotionValue(0);

  /********** Icons animation ***********/

  const icons = [homeArea.current,diamondArea.current,documentArea.current,autoArea.current]
  const cards = [video1Ref,video2Ref,video3Ref]
  const motionParams = {}
  cards.forEach((card,index)=> {
    const transformX = cardsProps[`card${index}`]?.endX - cardsProps[`card${index}`]?.startX
    const transformY = cardsProps[`card${index}`]?.endY - cardsProps[`card${index}`]?.startY
    const scaleX = ((cardsProps[`card${index}`]?.endWidth) / cardsProps[`card${index}`]?.startWidth)
    const scaleY = ((cardsProps[`card${index}`]?.endHeight) / cardsProps[`card${index}`]?.startHeight)


    const cardTransform = useTransform(progress, [progressBorder - 0.1, progressBorder],
      [`translate3d(0,0,0) scale(1,1)`,
        `translate3d(${transformX}px,${transformY}px,0) scale(${scaleX},${scaleY})`])
    const offsetScale =  useTransform(progress, [progressBorder - 0.1, progressBorder-0.09],['translateX(-50%) scale(1,1)',`translateX(-50%) scale(${1/scaleX},${1/scaleY})`]);
    const hiddenContentOpacity = useTransform(progress, [progressBorder,progressBorder+0.01],[0,1]);
    const videoOpacity = useTransform(progress, [progressBorder - 0.1, progressBorder-0.09],[1,0]);
    motionParams[`card${index}`] = {
      transform:!isMobile && cardTransform,
      offsetScale:!isMobile &&  offsetScale,
      hiddenContentOpacity:!isMobile && hiddenContentOpacity,
      videoOpacity:!isMobile && videoOpacity
    }
  })

  icons.forEach((icon,index)=> {
    const directionX = iconSProps[`icon${index}`]?.startX > iconSProps[`icon${index}`]?.endX?1:-1
    const directionY = iconSProps[`icon${index}`]?.startY > iconSProps[`icon${index}`]?.endY?1:-1
    const catAC = Math.abs(iconSProps[`icon${index}`]?.endX - iconSProps[`icon${index}`]?.startX)
    const catBC = Math.abs(iconSProps[`icon${index}`]?.endY - iconSProps[`icon${index}`]?.startY)
    const hippo = Math.sqrt(Math.pow(catAC,2)+Math.pow(catBC,2))
    const angle  = Math.atan(catBC/catAC);
    const transformXhalf = (hippo*0.5)*Math.cos(angle)*directionX
    const transformYhalf = (hippo*0.5)*Math.sin(angle)*directionY
    const scaleXhalf = ((iconSProps[`icon${index}`]?.endWidth/2) / iconSProps[`icon${index}`]?.startWidth) + ((iconSProps[`icon${index}`]?.endWidth/2) / iconSProps[`icon${index}`]?.startWidth)*0.5


    motionParams[`icon${index}`] = {
      transformStart:`translate3d(${transformXhalf}px,${transformYhalf}px,0px) scale(${scaleXhalf})`,
      transformEnd:`translate3d(0px,0px,0px) scale(1)`,
      colorStart:'#051505',
      colorEnd:'#00534F',
      width:iconSProps[`icon${index}`]?.startWidth,
      height:iconSProps[`icon${index}`]?.startHeight,
    }
  })

  useEffect(()=>{
    if (windowParams.windowWidth <= 1024) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  },[
    windowParams
  ])


  useEffect(()=>{
    const icons = [homeArea.current,diamondArea.current,documentArea.current,autoArea.current]
    icons.forEach((icon,index)=> {
      const stateX = icon.getBoundingClientRect().left + window.scrollX;
      const stateY = icon.getBoundingClientRect().top + window.scrollY;
      const stateWidth = icon.clientWidth;
      const stateHeight = icon.clientHeight;
      dispatch(setEndCoords(stateX,stateY,stateWidth,stateHeight,`icon${index}`))
    })
  },[sectionsOffset,sectionsOffset?.flyOffset?.offsetY])

  useEffect(()=>{
      const card = staticCardRef.current
      const stateX = card.getBoundingClientRect().left + card.clientWidth / 2;
      const stateY = card.getBoundingClientRect().top + window.scrollY + card.clientHeight / 2;
      const stateWidth = card.clientWidth;
      const stateHeight = card.clientHeight;
      for (let i=0;i<3;i++) {
        dispatch(setCardsStartCoords(stateX, stateY, stateWidth, stateHeight, `card${i}`))
      }
  },[sectionEnd.inView,mounted,windowParams])

  useEffect(()=>{
    if ((purpleCardContent.inView || windowParams.windowWidth <= 768) && video1Ref.current.played) {
      dispatch(hideIcons(true))
      video1Ref.current.currentTime = (black || windowParams.windowWidth <= 768)?1.30:1;
      video1Ref.current.onended = (event) => {
        if (video1Ref.current) {
          video1Ref.current.currentTime = 1.30
          video1Ref.current.play()
        }
      };
      const timeout1 = setTimeout(()=>{
        video1Ref.current.currentTime = 1.30
        clearTimeout(timeout1);
      },1200)
      const timeout2 = setTimeout(()=>{
        video1Ref.current.play()
        clearTimeout(timeout2);

      },2000)
    }
  },[purpleCardContent.inView])
  useEffect(()=>{
    if (yellowCardContent.inView || windowParams.windowWidth <= 768) {
      video2Ref.current.play()
      video2Ref.current.onended = (event) => {
        if (video2Ref.current) {
          video2Ref.current.currentTime = 0.57
          video2Ref.current.play()
        }
      };
    }
  },[yellowCardContent.inView])
  useEffect(()=>{
    if (mintCardContent.inView || windowParams.windowWidth <= 768) {
      video3Ref.current.play()
      video3Ref.current.onended = (event) => {
        if (video3Ref.current) {
          video3Ref.current.currentTime = 1.10
          video3Ref.current.play()
        }

      };
    }
  },[mintCardContent.inView])

  // useEffect(()=>{
  //   if (sectionStart.inView && !video1Ref.current.played) {
  //     if (video1Ref.current) { video1Ref.current.currentTime = 1.5 }
  //     setTimeout(()=>{
  //       video1Ref.current.play()
  //     },2000)
  //   }
  // },[sectionStart.inView])

  useEffect(() => {
    setElRefs((prevRefs) => {
      const refs = [[],[],[]];
      data.cards.map((card, index) => {
        refs[index] = card.list.map((_, i) => {
          /* eslint no-param-reassign: "error" */
          prevRefs[index][i] = prevRefs[index][i] || {};
          prevRefs[index][i].itmRef = prevRefs[index][i].itmRef || React.createRef();
          return prevRefs[index][i];
        })
        return refs
      })
      return refs
    });
  }, []);

  useEffect(()=>{
    if (!black) {
      const calcBorderValue = ((sectionsOffset?.chartsOffset?.offsetY - windowParams.windowHeight) - sectionsOffset?.cardsOffset?.offsetY) / sectionRef.current.clientHeight
      !isNaN(calcBorderValue) && setProgressBorder(calcBorderValue);
    }
  },[sectionsOffset,sectionsOffset?.flyOffset?.offsetY])

  useEffect(()=>{
    const checkMotion = progress.onChange(()=>{
      if (progress.current >= progressBorder - 0.1) {
        setIsMotion(true)
      } else {
        setIsMotion(false)
      }
    })

    return  checkMotion
  },[])

  const cardsTemplate = (
    <>
      <motion.div className={cn('card',
        'card--purple',
        purpleCardContent.inView ? 'inview':'',
        yellowCardContent.inView && yellowCardTitle.inView ? 'hidevideo':'',
        yellowCardContent.inView && yellowCardTitle.inView ? 'sublvl':'',
        mintCardContent.inView && mintCardTitle.inView ? 'subsublvl':'',
        isMotion?'motion':'')
      }
                  style={{transform:motionParams.card0.transform}}
      >
        <div className={cn('card__video-container')}>
          <div className={cn('card__video-container-inner')}>
            <motion.video style={{opacity:motionParams.card0.videoOpacity}} preload="metadata" ref={video1Ref} muted={true} playsInline={true}  className={cn('card__video')}>
              <source src='/video/01-Visualize.mp4'/>
            </motion.video>
          </div>
        </div>
        <div ref={homeArea} className={cn('card__area','card__area--home',black?'hidden':'')}>
          <div className={cn('card__motion-icon','card__motion-icon--home',isHideIcons?'animated':'')}
               style={{
                 transform:isHideIcons?motionParams.icon0.transformEnd:motionParams.icon0.transformStart,
                 color:isHideIcons?motionParams.icon0.colorEnd:motionParams.icon0.colorStart,
                 width:!isHideIcons?motionParams.icon0.width:'100%',
                 height:!isHideIcons?motionParams.icon0.height:'100%'
               }}>
            <div className={cn('card__motion-icon-inner')}><HomeIcon/></div>
          </div>
        </div>
        <div ref={diamondArea} className={cn('card__area','card__area--diamond',black?'hidden':'')} >
          <div className={cn('card__motion-icon','card__motion-icon--diamond',isHideIcons?'animated':'')}
               style={{
                 transform:isHideIcons?motionParams.icon1.transformEnd:motionParams.icon1.transformStart,
                 color:isHideIcons?motionParams.icon1.colorEnd:motionParams.icon1.colorStart,
                 width:!isHideIcons?motionParams.icon1.width:'100%',
                 height:!isHideIcons?motionParams.icon1.height:'100%'
               }}>
            <div className={cn('card__motion-icon-inner')}><DiamondIcon/></div>
          </div>
        </div>
        <div ref={documentArea} className={cn('card__area','card__area--document',black?'hidden':'')} >
          <div className={cn('card__motion-icon','card__motion-icon--document',isHideIcons?'animated':'')}
               style={{
                 transform:isHideIcons?motionParams.icon2.transformEnd:motionParams.icon2.transformStart,
                 color:isHideIcons?motionParams.icon2.colorEnd:motionParams.icon1.colorStart,
                 width:!isHideIcons?motionParams.icon2.width:'100%',
                 height:!isHideIcons?motionParams.icon2.height:'100%'
               }}>
            <div className={cn('card__motion-icon-inner')}><DocumentIcon/></div>
          </div>
        </div>
        <div ref={autoArea} className={cn('card__area','card__area--auto',black?'hidden':'')} >
          <div className={cn('card__motion-icon','card__motion-icon--auto',isHideIcons?'animated':'')}
               style={{
                 transform:isHideIcons?motionParams.icon3.transformEnd:motionParams.icon3.transformStart,
                 color:isHideIcons?motionParams.icon3.colorEnd:motionParams.icon1.colorStart,
                 width:!isHideIcons?motionParams.icon3.width:'100%',
                 height:!isHideIcons?motionParams.icon3.height:'100%'
               }}>
            <div className={cn('card__motion-icon-inner')}><AutoIcon/></div>
          </div>
        </div>
        <motion.div style={{
          transform:motionParams.card0.offsetScale,
          opacity:motionParams.card0.hiddenContentOpacity
        }} className={cn('card__hidden-content')}>
          <div className={cn('card__hidden-content-text')}>{ data.purple_text}</div>
        </motion.div>
      </motion.div>
      <motion.div className={cn('card',
        'card--yellow',yellowCardContent.inView  ? 'inview':'',
        mintCardContent.inView && mintCardTitle.inView ? 'hidevideo':'',
        mintCardContent.inView && mintCardTitle.inView  ? 'sublvl':'',
        isMotion?'motion':'')}
                  style={{transform:motionParams.card1.transform}}
      >
        <div className={cn('card__video-container')}>
          <div className={cn('card__video-container-inner')}>
            <motion.video style={{opacity:motionParams.card1.videoOpacity}} preload="metadata" ref={video2Ref} muted={true} playsInline={true} className={cn('card__video')}>
              <source src='/video/02-Create-v2.mp4' type='video/mp4'/>
            </motion.video>
          </div>
        </div>
        <motion.div style={{
          transform:motionParams.card1.offsetScale,
          opacity:motionParams.card1.hiddenContentOpacity
        }} className={cn('card__hidden-content')}>
          <div className={cn('card__hidden-content-text')}>{ data.yellow_text}</div>
        </motion.div>
      </motion.div>

      <motion.div  style={{transform:motionParams.card2.transform}} className={cn('card','card--mint',mintCardContent.inView ? 'inview':'',isMotion?'motion':'')}>
        <div className={cn('card__video-container')}>
          <div className={cn('card__video-container-inner')}>
            <motion.video  style={{opacity:motionParams.card2.videoOpacity}} preload="metadata" ref={video3Ref} muted={true} playsInline={true} className={cn('card__video')}>
              <source src='/video/03-Manage.mp4'/>
            </motion.video>
          </div>
        </div>
        <motion.div style={{
          transform:motionParams.card2.offsetScale,
          opacity:motionParams.card2.hiddenContentOpacity
        }} className={cn('card__hidden-content')}>
          <div className={cn('card__hidden-content-text')}>{ data.mint_text}</div>
        </motion.div>
      </motion.div>
    </>
)


  useEffect(()=>{
     const offset = purpleTitleRef.current.getBoundingClientRect().top + window.scrollY
    dispatch(setCardsSectionOffset(offset))
  },[mounted,sectionsOffset?.flyOffset?.offsetY])

  useEffect(()=>{
    setMounted(true)
  },[])

  return (
    <Section ref={sectionRef} className={cn('cards-section',black?'cards-section--black':'')}>
      <Container>
        <div ref={sectionStart.ref}  className={cn('cards')} style={{minHeight:'10px'}}>
            { mounted && windowParams.windowWidth>=768?(<div className={cn('cards__card-wrapper')}>{cardsTemplate}</div>):cardsTemplate }
            <div ref={purpleCardContent.ref} className={cn('card-content','card-content--purple')}>
              <div ref={purpleTitleRef} className={cn(
                'card-content__title',useScrollInView(purpleTitleRef).spawnAnimation)}>
                <h2>
                  <span>{data.cards[0].key}</span>&nbsp;
                  {data.cards[0].title}
                </h2>
              </div>
              <ul className={cn('card-content__list')}>
                {data.cards[0].list.map((item,index)=>(
                  <li ref={elRefs[0][index] ? elRefs[0][index].itmRef:React.createRef()} key={`card1${index}`} className={cn(
                    'card-content__list-item',
                    useScrollInView(elRefs[0][index] ? elRefs[0][index].itmRef: {}).spawnAnimation
                  )}>{item}</li>
                ))}
              </ul>
            </div>
          {/**********************************/}
            <div ref={yellowCardContent.ref} className={cn('card-content','card-content--yellow')}>
            <div ref={yellowTitleRef} className={cn('card-content__title',useScrollInView(yellowTitleRef).spawnAnimation)}>
              <h2 ref={yellowCardTitle.ref}>
                <span>{data.cards[1].key}</span>&nbsp;
                {data.cards[1].title}
              </h2>
            </div>
              <ul className={cn('card-content__list')}>
                {data.cards[1].list.map((item,index)=>(
                  <li ref={elRefs[1][index] ? elRefs[1][index].itmRef:React.createRef()} key={`card2${index}`} className={cn(
                    'card-content__list-item',
                    useScrollInView(elRefs[1][index] ? elRefs[1][index].itmRef: {}).spawnAnimation
                  )}>{item}</li>
                ))}
              </ul>
          </div>


          {/**********************************/}
          <div ref={mintCardContent.ref} className={cn('card-content','card-content--mint')}>
            <div ref={mintTitleRef} className={cn('card-content__title',useScrollInView(mintTitleRef).spawnAnimation)}>
              <h2 ref={mintCardTitle.ref}>
                <span ref={sectionEnd.ref} >{data.cards[2].key}</span>&nbsp;
                {data.cards[2].title}
              </h2>
            </div>
            <ul className={cn('card-content__list')}>
              {data.cards[2].list.map((item,index)=>(
                <li ref={elRefs[2][index] ? elRefs[2][index].itmRef:React.createRef()} key={`card3${index}`} className={cn(
                  'card-content__list-item',
                  useScrollInView(elRefs[2][index] ? elRefs[2][index].itmRef: {}).spawnAnimation
                )}>{item}</li>
              ))}
            </ul>
          </div>
          <div ref={staticCardRef} className={cn('card','card--static')}></div>
        </div>
      </Container>
    </Section>
  )
}

export  default Cards;
