import React, { useRef, useEffect } from 'react';
import { getUrlFromId } from "@/shared/utils/sanity.utils";
import { useAnivation } from "@/pages/Home/sections/DownloadSection/Slide/useAnivation";
import { saveAs } from 'file-saver';

// Components
import { TextBlock } from "@/feature/TextBlock";
import { HomeDownload, IconDownload, SolutionsArrowUp } from "@/svgComponents";

// Styles
import classnames from "classnames/bind";
import styles from './Slide.module.scss';
const cn = classnames.bind(styles);

function Slide({ data, isActive, isPrev, isNext, swiperRef }) {
  const { title, file, linkName } = data

  const textRef = useRef(null)
  const fileNameRef = useRef(null)
  const LinkRef = useRef(null)

  useAnivation(textRef, isActive, isPrev, isNext, title.accentPhrase, title.title)
  useAnivation(fileNameRef, isActive, isPrev, isNext)
  useAnivation(LinkRef, isActive, isPrev, isNext)

  return (
    <div className={cn('slide', { 'prev-slide': isPrev }, { 'next-slide': isNext })}>
      <div className={cn('slide__first-column')}>
        <TextBlock
          textRef={textRef}
          headingText={title.title}
          tagName='p'
          headingStyles='h3'
          subHeadingLevel='1'
          className={cn('slide__text'
          )}
        />

        <div ref={LinkRef}>
          <div>
            <div
              onClick={() => {
                saveAs(getUrlFromId(file.file.asset._ref), file.fileName)
              }}
              className={cn('slide__link')}
            >
              <p className={cn('slide__link-text')}>{linkName}</p>
              <span className={cn('slide__link-icon')}>
                <IconDownload />
              </span>
            </div>
          </div>
        </div>

        <div className={cn('slide__arrows-group')}>
          <button
            className={cn('slide__arrow', 'left', swiperRef.current?.swiper.activeIndex <= 0 ? 'slide__arrow_disabled' : '')}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            aria-label="Previous Slide">
            <SolutionsArrowUp className={cn('slide__arrow-icon')} />
          </button>
          <button
            className={cn('slide__arrow', 'right', swiperRef.current?.swiper.activeIndex === swiperRef.current?.swiper.slides.length - 1 ? 'slide__arrow_disabled' : '')}
            onClick={() => swiperRef.current?.swiper.slideNext()}
            aria-label="Next Slide"    >

            <SolutionsArrowUp className={cn('slide__arrow-icon')} />
          </button>
        </div>
      </div>

      <div className={cn('slide__cards')}>
        <HomeDownload />
        <p ref={fileNameRef} className={cn('slide__file-name')}>{file.fileName}</p>
      </div>
    </div>
  )
}

export default Slide
