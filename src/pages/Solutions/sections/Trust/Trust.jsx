import React, { useRef } from 'react';

import styles from './Trust.module.scss';
import classnames from 'classnames/bind';
import { TextBlock } from '../../../../feature/TextBlock';
import SvgSolutionsTrustImg1 from '../../../../svgComponents/SolutionsTrustImg1';
import SvgSolutionsTrustImg2 from '../../../../svgComponents/SolutionsTrustImg2';
import SvgSolutionsTrustImg3 from '../../../../svgComponents/SolutionsTrustImg3';
import SvgSolutionsTrustImg4 from '../../../../svgComponents/SolutionsTrustImg4';
import { useScrollInView } from '@/hooks';
import {useInView} from "react-intersection-observer";

const cn = classnames.bind(styles);

const Trust = ({ trustObj, children }) => {
  const title = useRef();
  const subtitle = useRef();
  const text = useRef();
  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();
  const card4 = useRef();

  const arrRef = [card1, card2, card3, card4];

  const accentInviewParams = {
    rootMargin: '9999px 0px -20% 0%'
  }
  const titleInviewParams = {
    rootMargin: '9999px 0px -50% 0%'
  }
  const markerParams = {
    rootMargin: '9999px 0px -50% 0%'
  }

  const accentInView  = useInView(accentInviewParams)
  const titleInView  = useInView(titleInviewParams)
  const markerInView = useInView(markerParams)

  return (
    <section className={cn('trust')}>
      <div className={cn('trust__wrapper')}>
        <div className={cn('trust__sticky')}>
          <div ref={accentInView.ref} className={cn('trust__accent-wrap',accentInView.inView && !titleInView.inView?'visible':'')}>
            <TextBlock
              headingText={trustObj.title.accentPhrase}
              accentPhrase={trustObj.title.accentPhrase}
              tagName="h2"
              headingStyles="h1"
              subHeadingLevel="1"
              className={cn('trust__title')}
              headingClassName={cn('trust__heading')}
              align="center"
              textRef={title}
            />
          </div>
          <div ref={titleInView.ref} className={cn('trust__title-wrap',titleInView.inView && !markerInView.inView?'visible':'')}>
            <TextBlock
              headingText={trustObj.title.title}
              accentPhrase={trustObj.title.accentPhrase}
              tagName="h2"
              headingStyles="h1"
              subHeadingLevel="1"
              className={cn('trust__title','trust__title--secondary')}
              headingClassName={cn('trust__heading')}
              align="center"
              textRef={title}
            />
          </div>
        </div>
        <div ref={markerInView.ref} className={cn('trust__marker')}></div>
        {trustObj.subtitle && (
          <p className={cn('trust_subtitle', useScrollInView(text).spawnAnimation)} ref={text}>
            {trustObj.subtitle}
          </p>
        )}
        <div className={cn('trust__main')}>
          {trustObj?.cards.map((item, index) => {
            return (
              <div className={cn('trust__block-external')} key={`trust${index}`}>
                <div
                  className={cn('trust__block-inner', useScrollInView(arrRef[index]).spawnAnimation)}
                  ref={arrRef[index]}
                >
                  <h3 className={cn('trust__block-inner_title')}>{item.title}</h3>
                  <div className={cn('trust__block-inner_img-block')}>
                    {index === 0 && <SvgSolutionsTrustImg1 className={cn('trust__block-inner_img')} />}
                    {index === 1 && <SvgSolutionsTrustImg2 className={cn('trust__block-inner_img')} />}
                    {index === 2 && <SvgSolutionsTrustImg3 className={cn('trust__block-inner_img')} />}
                    {index === 3 && <SvgSolutionsTrustImg4 className={cn('trust__block-inner_img')} />}
                  </div>
                  <TextBlock
                    headingText={item.description.title}
                    accentPhrase={item.description.accentPhrase}
                    tagName="h2"
                    className={cn('trust__block-inner_text')}
                    headingClassName={cn('trust__block-inner_text-heading')}
                    align="center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cn('trust__children')}>
        <div className={cn('trust__children-wrapper')}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Trust;
