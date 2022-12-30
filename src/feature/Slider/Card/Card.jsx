import React from "react";
import { getImgUrl } from '@/shared/utils/sanity.utils';

// Component
import {TextBlock} from "../../TextBlock";
import {Image} from "../../Image";

// Styles
import classnames from "classnames/bind";
import styles from './Card.module.scss';
const cn = classnames.bind(styles);

function Card ({data, haveImg, isActive, classCard}) {
  const {cardTitle, cardSubtitle, cardImage, cardHeader} = data
  const backgroundImage = haveImg ? `url(${getImgUrl(cardImage.image.asset)})` : null

  return (
    <div
      className={cn('card__wrapper')}
    >
      <div

        className={cn(
          'card',
          {'card-active': isActive},
          {'card-img': haveImg},
          {'haveHeader': cardHeader},
          classCard
        )}
      >
        <div className={cn('card__gradient-elm')} style={{backgroundImage}}></div>
        <div className={cn('card__gradient')}>
          <div className={cn('card__content')}>
            {
              cardHeader && cardHeader.image &&
              <div className={cn('card__header-wrapper')}>
                <Image
                  src={getImgUrl(cardHeader.image.asset)}
                  layout='fill'
                  wrapperClassName={cn('card__header')}
                  objectFit='contain'
                  objectPosition='left'
                  loading='eager'
                  alt={cardHeader.image.alt || ""}
                  unoptimized={true}
                />
                <Image
                  src={getImgUrl(cardHeader.image.asset)}
                  layout='fill'
                  wrapperClassName={cn('card__header')}
                  objectFit='contain'
                  objectPosition='left'
                  loading='eager'
                  alt={cardHeader.image.alt || ""}
                  unoptimized={true}
                />
              </div>
            }
            <div className={cn('card__text-wrapper')}>
              <TextBlock
                headingText={cardTitle}
                subHeadingText={cardSubtitle}
                tagName='h3'
                headingStyles='h5'
                subHeadingLevel='2'
                className={cn('card__text', {'card-active': isActive})}
                headingClassName={cn('card__heading')}
                subHeadingClassName={cn('card__subheading')}
                slidableSubHeading
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
