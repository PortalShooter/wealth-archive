import React from 'react';
import { getImgUrl } from "@/shared/utils/sanity.utils";

// Component
import { Section } from "@/feature/Section";
import { Image } from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './ClosingImage.module.scss';
const cn = classnames.bind(styles);

function ClosingImage({ data }) {

  return (
    <Section className={cn('closingImage')}>
      <Image
        src={getImgUrl(data.image.asset)}
        wrapperClassName={cn('closingImage__wrap')}
        width={345}
        height={163}
        loading='eager'
        objectFit='contain'
        alt={data.alt || ""}
      />
    </Section>
  )
}

export default ClosingImage
