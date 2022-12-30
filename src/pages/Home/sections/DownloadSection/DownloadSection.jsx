import React, {useRef} from 'react';

//Component
import {Section} from "@/feature/Section";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation, EffectFade} from "swiper";
import Slide from "./Slide";

// Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-fade";
import classnames from "classnames/bind";
import styles from './DownloadSection.module.scss';
import { useEffect } from 'react';
const cn = classnames.bind(styles);

function DownloadSection ({data}) {
  const swiperRef = useRef()

  return (
    <Section className={cn('download')} >
      <Swiper
        // navigation={{
        //   prevEl: sliderArrowsRef.current?.prev,
        //   nextEl: sliderArrowsRef.current?.next,
        //   disabledClass: cn('slide__arrow_disabled'),
        // }}
        ref={swiperRef}
        modules={[Pagination, Navigation, EffectFade]}
        simulateTouch={false}
        slideToClickedSlide
        autoHeight
        // initialSlide={Math.ceil(data.cards.length / 2) - 1}
        effect={"fade"}
        // onInit={(swiper) => {
        //   console.log(sliderArrowsRef.current.prev);
        //   swiper.params.navigation.prevEl = sliderArrowsRef.current.prev;
        //   swiper.params.navigation.nextEl = sliderArrowsRef.current.next;
        //   swiper.navigation.init();
        //   swiper.navigation.update();
        // }}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        speed={300}
      >
        {
          data.cards.map((item, index) => (
              <SwiperSlide key={index + 1}>
                {({ isActive, isPrev, isNext}) => (
                  <Slide isPrev={isPrev} isNext={isNext} isActive={isActive} data={item} swiperRef={swiperRef} />
                )}
              </SwiperSlide>
          ))
        }
      </Swiper>

    </Section>
  )
}

export default DownloadSection
