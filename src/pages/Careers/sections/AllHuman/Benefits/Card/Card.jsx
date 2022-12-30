import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";
import {getImgUrl} from "@/shared/utils/sanity.utils";

// Component
import {TextBlock} from "@/feature/TextBlock";
import {Image} from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './Card.module.scss';
const cn = classnames.bind(styles);

function Benefits({data}) {
  const {title, description, icon} = data
  const cardRef = useRef(null);


  return (
   <div ref={cardRef} className={cn('card', useScrollInView(cardRef).spawnAnimation)}>
     {
       icon &&
       <Image
         src={getImgUrl(icon.image.asset)}
         layout='responsive'
         width={72}
         height={72}
         loading='eager'
         objectFit='contain'
         unoptimized
         className={cn('card__img')}
         wrapperClassName={cn('card__wrapper-img')}
       />
     }
     <TextBlock
       headingText={title}
       subHeadingText={description}
       headingStyles="h4"
       tagName="h3"
       className={cn('card__title')}
       headingClassName={cn('card__heading')}
       subHeadingClassName={cn('card__subheading')}
     />
   </div>
  )
}

export default Benefits
