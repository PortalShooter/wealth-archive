import React from 'react';
import { getImgUrl } from '@/shared/utils/sanity.utils';

// Component
import { TextBlock } from '@/feature/TextBlock';
import { Image } from '@/feature/Image';

// Styles
import classnames from 'classnames/bind';
import styles from './Card.module.scss';
const cn = classnames.bind(styles);

function Card({ className, data, haveImg }) {
  const { cardTitle, cardSubtitle, cardImage, cardHeader } = data;
  const backgroundImage = haveImg ? `url(${getImgUrl(cardImage?.image?.asset)})` : null;

  return (
    <div className={cn('card', { 'card-img': haveImg }, { haveHeader: cardHeader }, className)}>
      <div style={{ backgroundImage }} className={cn('card__gradient-elm')} />
      <div className={cn('card__gradient')}>
        <div className={cn('card__wrapper')}>
          {cardHeader && cardHeader?.image && (
            <div className={cn('card__header-wrapper')}>
              <Image
                src={getImgUrl(cardHeader?.image?.asset)}
                layout="fill"
                wrapperClassName={cn('card__header')}
                objectFit="contain"
                objectPosition="left"
                loading="eager"
                alt={cardHeader?.image?.alt || ''}
                unoptimized
              />
              <Image
                src={getImgUrl(cardHeader?.image?.asset)}
                layout="fill"
                wrapperClassName={cn('card__header')}
                objectFit="contain"
                objectPosition="left"
                loading="eager"
                alt={cardHeader?.image?.alt || ''}
                unoptimized
              />
            </div>
          )}
          <div className={cn('card__text-wrapper')}>
            <TextBlock
              headingText={cardTitle}
              subHeadingText={cardSubtitle}
              tagName="h2"
              headingStyles="h5"
              className={cn('card__text')}
              headingClassName={cn('card__heading')}
              subHeadingClassName={cn('card__subheading')}
              slidableSubHeading={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
