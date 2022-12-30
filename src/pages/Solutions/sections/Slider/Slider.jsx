import React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Component
import Card from './Card/index';

// Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/virtual';
import classnames from 'classnames/bind';
import styles from './Slider.module.scss';
const cn = classnames.bind(styles);

function Slider({ data }) {
  const haveImg = !!data.cards[0].cardImage;

  return (
    <div className={cn('slider', { img: haveImg })}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={8}
        slidesPerView={1.6}
        centeredSlides
        slideToClickedSlide
        // onSlideChange={() => console.log('slide change')}
        // grabCursor={true}
        loop
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        initialSlide={1}
        breakpoints={{
          375: {
            slidesPerView: 1.6,
            spaceBetween: 0,
            enabled: true,
          },
          430: {
            slidesPerView: 1.8,
            spaceBetween: 0,
            enabled: true,
          },
          500: {
            slidesPerView: 2.2,
            spaceBetween: 0,
            enabled: true,
          },
          650: {
            slidesPerView: 2.8,
            spaceBetween: 0,
            enabled: true,
          },
          700: {
            slidesPerView: 2.4,
            spaceBetween: 0,
            enabled: true,
          },
          // 576: {
          //   slidesPerView: 2.8,
          //   enabled: true,
          // },
          768: {
            slidesPerView: 3,
            spaceBetween: -30,
            enabled: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
            enabled: false,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: -10,
            enabled: false,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 0,
            enabled: false,
          },
        }}
      >
        {data?.cards?.map((item, index) => {
          return (
            <SwiperSlide key={`itemSlider${index}`}>
              <Card data={item} haveImg={haveImg} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
