import React, {useRef} from 'react';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import {useScrollInView, useWindowSize} from "@/hooks";

//Styles
import classnames from 'classnames/bind';
import styles from './Card.module.scss';
const cn = classnames.bind(styles);

function Card ({item, index, setShowModal}) {
  const {windowWidth} = useWindowSize();
  const cardRef = useRef(null)

    return (
      <div ref={cardRef} onClick={() => {
        if (windowWidth < 680) {
          setShowModal(index)
        }
      }} className={cn('card__external', useScrollInView(cardRef).spawnAnimation)} key={`careersMap${index}`}>
        <div className={cn('card__inner')}>
          <div>
            <p className={cn('card__text')}>{item.description}</p>
          </div>
          <div>
            <h2 className={cn('card__title')}>{item.title}</h2>
            <span className={cn('card__subtitle')}>{item.subtitle}</span>
          </div>
          <div className={cn('card__img')}>
            <div className={cn('card__img-black')}/>
            <img src={getImgUrl(item.image.image.asset)} alt="" />
          </div>
        </div>
      </div>
    );
  }


export default Card;
