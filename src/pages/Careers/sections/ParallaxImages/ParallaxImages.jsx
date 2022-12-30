import React from 'react';
import AreWeForYouSection from "@/pages/About/sections/AreWeForYouSection";
import {getImgSize, getImgUrl} from "@/shared/utils/sanity.utils";

// Styles
import classnames from "classnames/bind";
import styles from './ParallaxImages.module.scss';
const cn = classnames.bind(styles);


function ParallaxImages({data}) {

  const areWeForYouData = {
    title: data.title,
    secondTitle: data.secondTitle,
    description: data.description,
    mainImage: {
      alt: data.mainImage.alt || '',
      url: getImgUrl(data.mainImage.image)
    },
    avatars: data.avatars.map(avatar => {
      const imageUrl = getImgUrl(avatar.image);
      const {width, height} = getImgSize(avatar.image);

      return {
        url: imageUrl,
        width,
        height,
        alt: avatar.alt || ''
      }
    })
  }

  return (
    <AreWeForYouSection
      data={areWeForYouData}
      className={cn('parallax-images')}
      classNameMainImage={cn('parallax-images__main-image')}
      classNameWrap={cn('parallax-images__wrap')}
      classNameHeading={cn('parallax-images__heading')}
      classNameTitle={cn('parallax-images__title')}
    />
  )
}

export default ParallaxImages
