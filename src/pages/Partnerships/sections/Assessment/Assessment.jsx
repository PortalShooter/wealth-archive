import React from 'react';
import { getImgUrl } from "@/shared/utils/sanity.utils";

// Component
import { Section } from "@/feature/Section";
import { TextBlock } from "@/feature/TextBlock";
import { Text } from "@/feature/Text";
import { Link } from "@/feature/Link";

// Styles
import classnames from "classnames/bind";
import styles from './Assessment.module.scss';
const cn = classnames.bind(styles);

function Assessment({ data, ctaButton }) {
  const { title, description, image } = data
  const { ctaButtonText, ctaButtonUrl } = ctaButton

  return (
    <Section className={cn('assess')}>
      <div className={cn('assess__image', 'assess__image-desktop')} style={{ backgroundImage: `url(${getImgUrl(image.image.asset)})` }} />
      <div className={cn('assess__content')}>
        <TextBlock
          headingText={title}
          headingStyles='span'
          headingClassName={cn('assess__heading')}
          className={cn('assess__text')}
        />

        <div className={cn('assess__image', 'assess__image-mobile')} style={{ backgroundImage: `url(${getImgUrl(image.image.asset)})` }} />

        <Text className={cn('assess__subtitle')}>
          {description}
        </Text>

        <Link
          variant="button-fill"
          className={cn('assess__link')}
          align='left'
          href={ctaButtonUrl}>
          {ctaButtonText}
        </Link>
      </div>
    </Section>
  )
}

export default Assessment
