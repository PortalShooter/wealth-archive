import React, {useEffect, useRef, useState} from 'react';
import {getImgUrl} from '@/shared/utils/sanity.utils';
import { useAnivation } from "@/pages/Home/sections/DownloadSection/Slide/useAnivation";
import gsap from "gsap";
import CustomEase from '@/app/scripts/gsap-member/src/CustomEase'

import classnames from "classnames/bind";
import styles from './Card.module.scss';
import { Button } from '../../../../../../feature/Button';
import { Link } from '../../../../../../feature/Link';
const cn = classnames.bind(styles);

const Card = ({data,onclick,onhover=()=>{},tabIndex}) => {

  // console.log(data)

  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const cardArea = useRef(null);
  const imgRef = useRef(null);
  const strength = {x:15,y:30}

  // const [imgWidth,setImgWidth] = useState(0)


  useAnivation(titleRef);
  gsap.registerPlugin(CustomEase);

  const moveMagnet = (event) => {
    const magnetButton = cardRef.current
    const bounding = magnetButton.getBoundingClientRect()

    //console.log(magnetButton, bounding)


    gsap.to( magnetButton, 0.4, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength.x,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength.y,
      ease: CustomEase.create("easeName", "0.33, 0.00, 0.43, 1.00")

    })

    //magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
  }
  // useEffect(()=>{
  //   if (imgRef.current) {
  //     setImgWidth(imgRef.current.naturalWidth)
  //   }
  // },[imgRef.current])

  useEffect(()=>{
    if (cardRef.current) {
      cardArea.current.addEventListener('mousemove', moveMagnet);
      cardArea.current.addEventListener('mouseout', function (event) {
        gsap.to(cardRef.current, 0.4, {x: 0, y: 0, ease:CustomEase.create("easeName", "0.33, 0.00, 0.43, 1.00")})
      });
    }
  }, [cardRef.current])

  return (
    <div tabIndex={tabIndex} onClick={(e)=>onclick(e)}  onMouseEnter={(e)=>{onhover(e,true)}} onMouseLeave={(e)=>onhover(e,false)}    className={cn('card-wrap')}>
      <div   ref={cardRef} className={cn('card')}>
        <div ref={cardArea} className={cn('card-area')}></div>
        <div className={cn('card__preview')}>
          <div ref={titleRef} className={cn('card__preview-title')} style={{opacity:0}}>{data.title}</div>
          <div className={cn('card__content')}>
            <div>
              {data.subtitle && <div className={cn('card__subtitle')}>{data.subtitle}</div>}
              {data.description && <div className={cn('card__text')}>{data.description}</div>}
            </div>
            <div className={cn('card__buttons')}>
              {!data.link ? <Button className={cn('card__button')}>{data.buttonText}</Button>:<Link href={data.link} variant="button-fill" className={cn('card__button')}>{data.buttonText}</Link>}
            </div>
            </div>
          <div className={cn('card__preview-image')}>
            <img ref={imgRef}  className={cn('card__preview-image-img')} src={getImgUrl(data.cardimage.image)} alt={data.cardimage.alt}/>
            {/*<img className={cn('card__card-image-img')} src={getImgUrl(data.image.image)} alt={data.cardimage.alt}/>*/}
          </div>
        </div>
        <div className={cn('card__preview-image-dublicate')}>
          <img  className={cn('card__preview-image-img')} src={getImgUrl(data.cardimage.image)} alt={data.cardimage.alt}/>
        </div>
      </div>
    </div>
  )
}

export default Card
