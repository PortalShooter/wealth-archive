import React, { useRef } from 'react';

import styles from './TrustInfo.module.scss';
import classnames from 'classnames/bind';
import SvgSolutionsQuotesSmall from '../../../../../svgComponents/SolutionsQuotesSmall';
import SvgSolutionsQuotesBig from '../../../../../svgComponents/SolutionsQuotesBig';
import { useScrollInView } from '@/hooks';

const cn = classnames.bind(styles);

const TrustInfo = ({ trustObj, className, classNameQuotes }) => {
  const textInfo = useRef();
  const imgInfo = useRef();

  if(trustObj.reviews.isQuoteHidden) {
    return null;
  }
  return (
    <div className={cn('trust__info', className)}>
      <div className={cn('trust__info-text', useScrollInView(textInfo).spawnAnimation)} ref={textInfo}>
        <SvgSolutionsQuotesSmall className={cn('trust__info-text_quotes-small', classNameQuotes)} />
        <p className={cn('trust__info-text_1')}>{trustObj.reviews.title.title}</p>
        {trustObj.reviews.subtitle &&
          <p className={cn('trust__info-text_2')}>{trustObj.reviews.subtitle.title}</p>
        }
        <div className={cn('trust__info-text__block')}>
          <span>{trustObj.reviews.person.name}</span>
          <span>{trustObj.reviews.person.work}</span>
        </div>
      </div>
      <div className={cn('trust__info__quotes-img', useScrollInView(imgInfo).spawnAnimation)} ref={imgInfo}>
        <SvgSolutionsQuotesBig className={cn('trust__info_quotes-big')} />
      </div>
    </div>
  );
};

export default TrustInfo;
