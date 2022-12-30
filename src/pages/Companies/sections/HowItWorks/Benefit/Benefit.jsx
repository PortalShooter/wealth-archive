import React from 'react';
import {getImgUrl} from "@/shared/utils/sanity.utils";

// Component
import {Image} from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './Benefit.module.scss';
const cn = classnames.bind(styles);

function Benefit({data}) {
  const {image, text} = data
  return (
    <div className={cn('benefit')}>
      <Image
        src={getImgUrl(image.image.asset)}
        layout='fill'
        wrapperClassName={cn('benefit__img-wrapper')}
        loading='eager'
        objectFit='contain'
        alt={image.image.alt || ""}
        unoptimized
      />
      <p className={cn('benefit__text')}>{text}</p>
    </div>
  )
}

export default Benefit

