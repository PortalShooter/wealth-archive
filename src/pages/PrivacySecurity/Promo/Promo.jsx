import React, { useRef } from 'react';

import styles from './Promo.module.scss';
import { Container } from '@/feature/Container';
import classnames from 'classnames/bind';
import { useScrollInView } from '@/hooks';
import { TextBlock } from '@/feature/TextBlock';
import SvgPrivacyCards1 from '@/svgComponents/PrivacyCards1';
import SvgPrivacyCards2 from '@/svgComponents/PrivacyCards2';
import SvgPrivacyCards3 from '@/svgComponents/PrivacyCards3';
import SvgPrivacyCards4 from '@/svgComponents/PrivacyCards4';
import { getImgUrl } from '@/shared/utils/sanity.utils';
const cn = classnames.bind(styles);

const Promo = ({ promoObj }) => {
  const title = useRef();
  const subtitle = useRef();
  const text = useRef();
  const textInfo1 = useRef();
  const textInfo2 = useRef();
  const cards = useRef();
  const images = useRef();

  return (
    <section className={cn('promo')}>
      <Container className={cn('promo__main')}>
        <TextBlock
          headingText={promoObj?.title}
          accentPhrase={promoObj?.accentPhrase}
          tagName="h2"
          headingStyles="h2"
          subHeadingLevel="1"
          className={cn('promo__title', useScrollInView(title, { title: true }).titleSpawn)}
          headingClassName={cn('promo__heading')}
          align="left"
          textRef={title}
        />
        <p className={cn('promo__subtitle', useScrollInView(text).spawnAnimation)} ref={text}>
          {promoObj.subtitle}
        </p>
        <div className={cn('promo__blocks', useScrollInView(cards).spawnAnimation)} ref={cards}>
          {promoObj?.cards.map((item, index) => {
            return (
              <div className={cn('promo__block-external')} key={`promoprivacy${index}`}>
                <div className={cn('promo__block-inner')}>
                  {index === 0 && <SvgPrivacyCards1 className={cn('promo__block-img')} />}
                  {index === 1 && <SvgPrivacyCards2 className={cn('promo__block-img')} />}
                  {index === 2 && <SvgPrivacyCards3 className={cn('promo__block-img')} />}
                  {index === 3 && <SvgPrivacyCards4 className={cn('promo__block-img')} />}
                  <h2 className={cn('promo__block-title')}>{item?.title}</h2>
                  <p className={cn('promo__block-subtitle')}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cn('promo__info-title', useScrollInView(textInfo1).spawnAnimation)} ref={textInfo1}>
          {promoObj.info.title}
        </div>
        <div className={cn('promo__info-text', useScrollInView(textInfo2).spawnAnimation)} ref={textInfo2}>
          {promoObj.info.description}
        </div>
        <div className={cn('promo__images', useScrollInView(images).spawnAnimation)} ref={images}>
          {promoObj?.info.image.map((item, index) => {
            return (
              <div className={cn('promo__images-external')} key={`promop${index}`}>
                <div className={cn('promo__images-inner')}>
                  <img src={getImgUrl(item)} alt="" />
                </div>
              </div>
            );
          })}
          <div className={cn('promo__images-external')}>
            <div className={cn('promo__images-inner', 'trustedsite-trustmark')} data-type={202} data-width={120} data-height={50}/>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Promo;
