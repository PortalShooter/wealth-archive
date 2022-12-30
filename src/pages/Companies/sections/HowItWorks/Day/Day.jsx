import React, { useEffect, useState } from 'react';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@/hooks';

// Component
import { Image } from '@/feature/Image';
import { TextBlock } from '@/feature/TextBlock';

// Styles
import classnames from 'classnames/bind';
import styles from './Day.module.scss';
const cn = classnames.bind(styles);

function Day({ data, index, lastDay, scrollUp, activeDay, setActiveDay }) {
  const { header, image, subtitle, title } = data;
  const [refImage, inView] = useInView({
    threshold: 1,
  });
  const [imgVisible, setImgVisibe] = useState(false);
  const { windowWidth } = useWindowSize();
  const [orderEven, setOrderEven] = useState(null);
  const [orderUneven, setOrderUneven] = useState(null);

  useEffect(() => {
    setOrderEven(windowWidth >= 680 ? (index + 1) * 2 : 0);
    setOrderUneven(windowWidth >= 680 ? index * 2 : 0);
  }, [windowWidth]);

  useEffect(() => {
    if (lastDay && !scrollUp && inView) {
      setImgVisibe(true);
    }
    if (lastDay && scrollUp && inView) {
      setImgVisibe(false);
    }
    if (!index && scrollUp && inView) {
      setImgVisibe(true);
    }

    if (inView) {
      setActiveDay(index);
    }
    if (!inView && scrollUp && activeDay && index && activeDay >= index) {
      setActiveDay(index - 1);
    }
  }, [scrollUp, inView]);

  return (
    <React.Fragment key={`day_${index + 1}`}>
      <div
        className={cn(
          'day__img-wrapper',
          { 'day__img-wrapper_view': inView || imgVisible },
          { prev: activeDay > index }
        )}
        style={{ order: orderEven }}
      >
        <div className={cn('day__animate-wrap')} ref={refImage}>
          <Image
            src={getImgUrl(image.image.asset)}
            layout="fill"
            loading="eager"
            objectFit="contain"
            alt={image.image.alt || ''}
            unoptimized
          />
        </div>
      </div>

      <div
        style={{ order: orderUneven }}
        className={cn('day__text-wrapper', { view: activeDay === index }, { prev: activeDay > index })}
      >
        <div className={cn('day__header')}>{header}</div>
        <TextBlock headingText={title} tagName="h2" headingStyles="h4" className={cn('day__title')} />

        {subtitle.map((el, index) => (
          <div key={el + index} className={cn('day__subtitle')}>
            {el}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Day;
