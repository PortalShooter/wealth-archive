import React, { useRef } from 'react';

// Styles
import styles from './Card.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import { PricingCouplePay, PricingEstatePlanning } from 'src/svgComponents';
import CardTitles from '../CardTitles';
import Icon from '../Icon';
import { Link } from '@/feature/Link';

function Card({ cardData, flag, list }) {
  const title = list?.map((elem) => <CardTitles title={elem.title} key={elem._key} list={elem?.items} />);
  const cardAnimation = useRef();

  return (
    <div className={cn('card', useScrollInView(cardAnimation).spawnAnimation)} ref={cardAnimation}>
      <div className={cn('card__label')}>{cardData?.label ? <Icon title={cardData?.label} /> : null}</div>
      <div className={cn('card__wrap')}>
        <div className={cn('header')}>
          <div className={cn('header__title')}>{cardData?.title}</div>
          <div className={cn('header__icon')}>{!flag ? <PricingEstatePlanning /> : <PricingCouplePay />}</div>
        </div>
        <div className={cn('card__wrap__text')}>{cardData?.description}</div>
        <div className={cn('price')}>
          <div className={cn('price__container')}>
            <span className={cn('price__container__year')}>{cardData?.price}</span>
            <span className={cn('price__container__inscription')}>{cardData?.priceCaption}</span>
          </div>
          <div className={cn('price__renews')}>{cardData?.caption}</div>
        </div>
        <div className={cn('btn')}>
          <Link variant="button-stroke" href={cardData?.url} className={cn('button')}>
            {cardData?.buttonText}
          </Link>
        </div>
        <div className={cn('content')}>
          {title.length > 0 && (
            <div>
              <div className={cn('everything')}>{cardData?.includedText}</div>
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
