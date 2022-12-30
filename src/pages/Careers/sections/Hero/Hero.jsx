import React, {useEffect, useRef, useState} from 'react';
import {useScrollInView, useWindowSize} from "@/hooks";
import {getImgUrl} from "@/shared/utils/sanity.utils";

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";
import {Link} from "@/feature/Link";
import {Image} from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './Hero.module.scss';
const cn = classnames.bind(styles);

function Hero({data}) {
  const {image, link, subtitle, title} = data
  const titleRef = useRef(null);
  const {windowWidth} = useWindowSize();
  const [textAlign, setTextAlign] = useState('left')

  const imageRef = useRef(null)
  const subtitleRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    setTextAlign(windowWidth >= 680 ? 'center' : 'left')
  }, [windowWidth]);


  return (
    <Section className={cn('hero')}>
      <Container className={cn('hero__wrap')}>
        <TextBlock
          textRef={titleRef}
          subtitleRef={subtitleRef}
          headingText={title}
          subHeadingText={subtitle}
          tagName='h1'
          headingStyles='h1'
          headingClassName={cn( 'hero__title')}
          subHeadingClassName={cn('hero__subtitle', useScrollInView(subtitleRef).spawnAnimation)}
          className={cn('hero__text', useScrollInView(titleRef, { title: true }).titleSpawn)}
          align={textAlign}
        />

        <Link
          ref={btnRef}
          variant="button-fill"
          className={cn('hero__link', useScrollInView(btnRef).spawnAnimation)}
          href={link.url}>
          {link.text}
        </Link>
      </Container>

      {
        image &&
        <Container className={cn('hero__wrap-img', useScrollInView(imageRef).spawnAnimation)}  ref={imageRef}>
          <Image
            src={getImgUrl(image.image.asset)}
            layout='responsive'
            width={1260}
            height={704}
            loading='eager'
            objectFit='contain'
            alt={image.alt || ""}
            unoptimized
          />
        </Container>
      }
    </Section>
  )
}

export default Hero
