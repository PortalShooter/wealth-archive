import React, { useRef, useState } from 'react';
import { useWindowSize } from "@/hooks";
import { getImgUrl } from "@/shared/utils/sanity.utils";

// Component
import { Section } from "@/feature/Section";
import { Container } from "@/feature/Container";
import { TextBlock } from "@/feature/TextBlock";
import { Text } from "@/feature/Text";
import { Image } from "@/feature/Image";
import { Link } from "@/feature/Link";

// Styles
import classnames from "classnames/bind";
import styles from './Value.module.scss';
const cn = classnames.bind(styles);

function Value({ data, ctaButton }) {
  const { title, list, subtitle } = data
  const { ctaButtonText, ctaButtonUrl } = ctaButton

  const titleRef = useRef(null);
  const [textAlign, setTextAlign] = useState('center')

  return (
    <Section className={cn('value')}>
      <TextBlock
        textRef={titleRef}
        headingText={title}
        tagName='h3'
        headingStyles='h3'
        headingClassName={cn('value__title')}
        subHeadingClassName={cn('value__subtitle')}
        className={cn('value__text')}
        align={textAlign}
      />

      <Container className={cn('value__wrap')}>
        {list.map((item, index) => (
          <div key={index + 1} className={cn('value__wrap-item')}>
            {
              item.image &&
              <Image
                src={getImgUrl(item.image.image.asset)}
                width={243}
                height={148}
                loading='eager'
                textAlign='center'
                alt={item.image.alt || ""}
                unoptimized
              />
            }
            <Text className={cn('value__wrap-item-text')}>
              {item.text}
            </Text>
          </div>
        ))}
      </Container>

      <TextBlock
        textRef={titleRef}
        subHeadingText={subtitle}
        tagName='h4'
        headingStyles='h4'
        subHeadingClassName={cn('value__subtitle')}
        className={cn('value__text')}
        align={textAlign}
      />

      <Link
        variant="button-fill"
        className={cn('value__link')}
        align={textAlign}
        href={ctaButtonUrl}>
        {ctaButtonText}
      </Link>
    </Section >
  )
}

export default Value
