import React from 'react';
import { Pagination } from 'swiper';

// Component
import Card from './Card/index';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles
import 'swiper/css';
import 'swiper/css/pagination';
import classnames from "classnames/bind";
import styles from './Slider.module.scss';
const cn = classnames.bind(styles);

function Slider({ data,  classCard, classSwiper, classCardWrapper}) {
  if (!data){ return null}
  const haveImg = data.cards[0].cardImage ? true : false;
  const cards = [...data.cards,...data.cards]

  return (
    <div className={cn('slider', {'img': haveImg}, classSwiper)}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1.6}
        spaceBetween={6}
        centeredSlides
        loop
        loopAdditionalSlides={cards.length}
        loopFillGroupWithBlank={true}
        slideToClickedSlide
        className="mySwiper"
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"><div></div></span>';
          },
        }}
        initialSlide={Math.ceil(cards.length / 2) - 1}
        breakpoints={{
          576: {
            slidesPerView: 2.6,
          },
          768: {
            slidesPerView: 3.47,
          },
          1024: {
            slidesPerView: 3.8,
          },
          1280: {
            slidesPerView: 3.85,
          },
          1440: {
            slidesPerView: 4.32,
          },
          1600: {
            slidesPerView: 5,
          },
          1920: {
            slidesPerView: 5.8,
          },
          2350: {
            slidesPerView: 7,
          }
        }}
      >
        {cards.map((item, index) => (
            <SwiperSlide key={`slide_${index + 1}`}>
              {({ isActive}) => (
                <Card
                  data={item}
                  haveImg={haveImg}
                  isActive={isActive}
                  classCard={classCard}
                  classCardWrapper={classCardWrapper}
                />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Slider;
