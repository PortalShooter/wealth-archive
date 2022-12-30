import React, {useEffect, useRef, useState} from 'react';
import { Pagination,EffectCreative } from 'swiper';

// Component
import Card from './Card/index';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles
import 'swiper/css';
import 'swiper/css/pagination';
import classnames from "classnames/bind";
import styles from './Slider.module.scss';
import {useInView} from "react-intersection-observer";
import { useWindowSize } from '../../../../../hooks';
const cn = classnames.bind(styles);

function Slider({ data,  classCard, classSwiper, classCardWrapper,sectionRef,isScrolled}) {
  if (!data){ return null}

  const swiperInView = useInView({
    triggerOnce:true
  })

  const [swiper,setSwiper] = useState(null)
  const [interval,setCustomInterval] = useState(0)
  const [transitionDelay,setTransitionDelay] = useState(750)
  const [sliderOffset,setSliderOffset] = useState(0)
  const [scalingOverlay,setScalingOverlay] = useState({x:1,y:1})
  const [isCardHover,setIsCardHover] = useState(false)
  const [isAfterAnimation,setIsAfterAnimation] = useState(false)
  const [inProgress,setInProgress] = useState(false)
  const [progressTimeOut,setProgressTimeout] = useState(0)
  const windowParams = useWindowSize()

  useEffect(()=> {
    if (swiperInView.inView) {
      setTimeout(()=>{
       swiper.slideToLoop(3,1000)
      },transitionDelay-100)
      setTimeout(()=>{
        setIsAfterAnimation(true)
      },transitionDelay + 1000)
    }
  },[swiperInView.inView,transitionDelay])

  const moveHandler = (direction) => {
    setCustomInterval( setInterval(()=>{
      if (direction) {
        swiper.slideNext(900)
      } else {
        swiper.slidePrev(900)
      }
    },600))
  }

  const moveLeave = () => {
    clearInterval(interval)
  }


  const changeHandler = (swiper) => {
    setIsCardHover(false)
    const activeIndex = swiper.activeIndex
    const slides = swiper.slides

    slides.forEach((slide,index)=> {
      slide.children[0].removeAttribute('aria-label')
      if (index === activeIndex - 4 || index === activeIndex + 4) {
        if (index === activeIndex - 4) {
          slide.setAttribute('data-level','slide-lvl-5-before');
        } else {
          slide.setAttribute('data-level','slide-lvl-5-after');
        }

      }
      else
      if (index === activeIndex - 3 || index === activeIndex + 3) {
        if (index === activeIndex - 4) {
          slide.setAttribute('data-level','slide-lvl-4-before');
        } else {
          slide.setAttribute('data-level','slide-lvl-4-after');
        }
      } else  if (index === activeIndex - 2 || index === activeIndex + 2) {
        if (index === activeIndex - 2) {
          slide.setAttribute('data-level','slide-lvl-3-before');
        } else {
          slide.setAttribute('data-level','slide-lvl-3-after');
        }
      } else  if (index === activeIndex - 1 || index === activeIndex + 1) {
        if (index === activeIndex + 1) {
          slide.children[0].setAttribute('aria-label','Next Slide')
        } else {
          slide.children[0].setAttribute('aria-label','Previous Slide')
        }
        slide.setAttribute('data-level','slide-lvl-1');
      }
      else {
        slide.removeAttribute('data-level');
      }
    })
  }


  const clickHandler = (e) => {
    const slide = e.target.closest('.swiper-slide')
    clearInterval(interval)
    if (!isScrolled) {
      if (!slide.classList.contains('swiper-slide-active')) {
        const index = Number(slide.getAttribute('data-swiper-slide-index'));
        swiper.slideToLoop(index, 900)
        setTimeout(()=>{
          sectionRef.current.scrollIntoView({behavior:"smooth",block:'end'})
        },700)
      } else {
        sectionRef.current.scrollIntoView({behavior:"smooth",block:'end'})
      }
    }

  }

  const hoverHandler = (event,flag) => {
    const slide = event.target.closest('.swiper-slide')
    if (isScrolled && !slide.classList.contains('swiper-slide-active') ) {
      setIsCardHover(flag)
    }

  }



  useEffect(()=> {
    if (swiper) {
      const scaleX = (window.innerWidth)/swiper.width
      const scaleY = (window.innerHeight)/swiper.height
      setScalingOverlay({x:scaleX,y:scaleY})
    }
  },[swiper,windowParams,swiper?.width,swiper?.height])

  useEffect(()=>{
    setInProgress(true)
    clearTimeout(progressTimeOut);
    if (swiper) {
      if (isScrolled && windowParams.windowWidth > 768) {
        swiper.allowTouchMove = false
      } else {
        swiper.allowTouchMove = true
      }
    }
    setProgressTimeout(setTimeout(()=>{
      setInProgress(false)
    },3000))
  },[isScrolled])


  return (
    <div ref={swiperInView.ref}  className={cn('slider',  classSwiper, swiperInView.inView?'inview':'')} style={{'--overlay-scaling-x':scalingOverlay.x,'--overlay-scaling-y':scalingOverlay.y,transitionDelay:`${transitionDelay}ms`}} >
      <Swiper

        modules={[Pagination,EffectCreative]}
        slidesPerView={1}
        spaceBetween={0}
        speed={isScrolled?0:1000}
        centeredSlides={true}
        loop
        loopAdditionalSlides={data.length}
        slideToClickedSlide
        className={cn('heroSwiper',isScrolled?'opened':'',isAfterAnimation?'after-init-animation':'',isCardHover?'card-hovered':'',inProgress?'inprogress':'')}
        pagination={{
          clickable: true,
        }}
        initialSlide={1}
        effect={"creative"}
        touchRatio={0.5}
        breakpoints={{
          1024: {
            touchRatio: 1,
          }
        }}
        creativeEffect={{
          limitProgress:3,
          shadowPerProgress:true,
          prev: {
            shadow: true,
            translate: ["-120%", 0, -300]
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -300]
          }
        }}
        keyboard = {
          {
            enabled: true,
            onlyInViewport: true,
          }
        }
        grabCursor={false}
        onSlideChange = {changeHandler}
        onSwiper={setSwiper}
      >
        {data.map((item, index) => (
            <SwiperSlide
              onMouseEnter={(e)=>{
                const slide = e.target.closest('.swiper-slide')
                if (!isScrolled && !slide.classList.contains('swiper-slide-active') ) {
                  moveHandler(slide.progress < swiper.progress)
                }
              }
              }

              onMouseLeave={moveLeave}
              key={`slide_${index + 1}`} >
              {({ isActive}) => (
                <Card
                  data={item}
                  isActive={isActive}
                  classCard={classCard}
                  classCardWrapper={classCardWrapper}
                  onclick={(e)=>{;
                      clickHandler(e)}
                  }
                  onhover={(event,flag) => isScrolled && hoverHandler(event,flag)}
                  tabIndex={0}
                />
              )}
            </SwiperSlide>
          ))}
          {/*<div onClick={closeHandler} className={cn('slider__close')}/>*/}
      </Swiper>
    </div>
  );
}

export default Slider;
