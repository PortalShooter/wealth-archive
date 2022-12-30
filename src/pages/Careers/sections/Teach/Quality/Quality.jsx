import React, {useRef} from 'react';
import {getImgUrl} from "@/shared/utils/sanity.utils";
import {useScrollInView} from "@/hooks";

// Component
import {Image} from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './Quality.module.scss';
const cn = classnames.bind(styles);

function Quality({data}) {
  const {icon, name} = data
  const qualityRef = useRef(null)

  return (
    <div ref={qualityRef} className={cn('quality', useScrollInView(qualityRef).spawnAnimation)}>
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
          className={cn('quality__img')}
          wrapperClassName={cn('quality__wrapper-img')}
        />
      }
      <div className={cn('quality__text')} dangerouslySetInnerHTML={{__html: `${name}`}}/>
    </div>
  )
}

export default Quality
