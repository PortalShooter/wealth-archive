import React, { useState } from 'react';
import { getImgUrl } from "@/shared/utils/sanity.utils";

// Component
import { Section } from "@/feature/Section";
import { Container } from "@/feature/Container";
import { TextBlock } from "@/feature/TextBlock";
import { Link } from "@/feature/Link";
import { Image } from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './Hero.module.scss';
const cn = classnames.bind(styles);

function Hero({ data, ctaButton }) {
  const { title, description, image, banner } = data
  const { ctaButtonText, ctaButtonUrl } = ctaButton

  const [textAlign, setTextAlign] = useState('left')

  return (
    <Section className={cn('hero')}>
      <Container className={cn('hero__wrap')}>
        {
          image &&
          <Image
            src={getImgUrl(image.image.asset)}
            width={682}
            height={470}
            loading='eager'
            objectFit='contain'
            alt={image.alt || ""}
          />
        }
        <Container className={cn('hero__wrap-text')}>
          <TextBlock
            headingText={title}
            subHeadingText={description}
            tagName='h3'
            headingStyles='h3'
            headingClassName={cn('hero__title')}
            subHeadingClassName={cn('hero__subtitle')}
            className={cn('hero__text')}
            align={textAlign}
          />

          <Link
            variant="button-fill"
            className={cn('hero__link')}
            align={textAlign}
            href={ctaButtonUrl}>
            {ctaButtonText}
          </Link>
        </Container>
      </Container>

      {
        banner &&
        <Container className={cn('hero__wrap-bnr')}>
          <Image
            src={getImgUrl(banner.image.asset)}
            layout='responsive'
            width={1544}
            height={540}
            loading='eager'
            objectFit='cover  '
            alt={banner.alt || ""}
          />
        </Container>
      }
    </Section>
  )
}

export default Hero
