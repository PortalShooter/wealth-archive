import React, {useRef} from 'react';
import { getImgUrl } from 'src/shared/utils/sanity.utils';

//Components
import {Container} from "src/feature/Container";
import {Section} from "src/feature/Section";
import {TextBlock} from "src/feature/TextBlock";
import {Link} from "src/feature/Link";
import {Image} from "@/feature/Image";

// Styles
import classnames from "classnames/bind";
import styles from './Join.module.scss';
import {useScrollInView} from "@/hooks";
const cn = classnames.bind(styles);

function Join({data}) {
  const {href, link, title} = data
  const titleRef = useRef(null)
  const imageRef = useRef(null)

  return (
    <Section className={cn('join')}>
      <div ref={imageRef} className={cn('join__image-wrapper', useScrollInView(imageRef).spawnAnimation)}>
        <Image
          src={getImgUrl(href.image.asset)}
          layout='fill'
          wrapperClassName={cn('join__img-wrapper')}
          loading='eager'
          objectFit='cover'
          alt={href.image.alt || ""}
          unoptimized
        />
      </div>
      <Container className={cn('join__wrap')}>
        <TextBlock
          style={{'--max-width-text-block': `${title.title.length * 13.5}px`}}
          textRef={titleRef}
          headingText={title.title}
          accentPhrase={title.accentPhrase}
          headingStyles='h2'
          tagName='h2'
          className={cn('join__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
          align='center'
          titleTwoLines
          headingClassName={cn('join__heading')}
        />
        <Link variant="button-fill" className={cn('join__link')} href={link.url}>
          {link.text}
        </Link>
      </Container>
    </Section>
  )
}

export default Join;
