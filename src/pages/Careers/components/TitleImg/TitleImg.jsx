import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";

// Component
import {TextBlock} from "@/feature/TextBlock";

// Styles
import classnames from "classnames/bind";
import styles from './TitleImg.module.scss';
import {Image} from "@/feature/Image";
import {getImgUrl} from "@/shared/utils/sanity.utils";
import {Link} from "@/feature/Link";
import DiagonalArrow from "@/svgComponents/DiagonalArrow";
const cn = classnames.bind(styles);

function TitleImg({data, className, classNameImg, classNameText, headingStyles, classNameHeading}) {
  const {title, subtitle, img, link} = data
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const blockRef = useRef(null);

  return (
    <div ref={blockRef} className={cn('titleImg', className, useScrollInView(blockRef).spawnAnimation)}>
      <Image
        src={getImgUrl(img.image.asset)}
        layout='fill'
        loading='eager'
        wrapperClassName={cn('titleImg__wrapper-img', classNameImg)}
        objectFit='cover'
        alt={img.alt || ""}
        unoptimized
      />
      <div className={cn('titleImg__text', classNameText)}>
        <TextBlock
          textRef={headingRef}
          subtitleRef={subHeadingRef}
          headingText={title}
          subHeadingText={subtitle}
          headingStyles={headingStyles || 'h4'}
          tagName="h2"
          className={cn('titleImg__title')}
          headingClassName={cn('titleImg__heading', classNameHeading, useScrollInView(headingRef, {title: true}).titleSpawn)}
          subHeadingClassName={cn('titleImg__subheading', useScrollInView(subHeadingRef).spawnAnimation)}
        />

        {link &&
          <Link variant="button-fill" className={cn('titleImg__link')} href={link.url}>
            {link.text}
            <div className={cn('titleImg__arrow')}>
              <DiagonalArrow />
            </div>
          </Link>
        }
      </div>
    </div>
  )
}

export default TitleImg
