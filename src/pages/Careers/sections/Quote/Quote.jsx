import React, {useRef} from 'react';
import {getImgUrl} from "@/shared/utils/sanity.utils";
import {useScrollInView, useScrollQuotes} from "@/hooks";

// Component
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";

// Styles
import classnames from "classnames/bind";
import styles from './Quote.module.scss';
const cn = classnames.bind(styles);

function Quote ({data}) {
  const {jobTitle, backgroundImg, quoteAuthor, subtitle, title} = data

  const textRef = useRef(null)
  const textQuotesRef = useRef(null)
  const subtitleRef = useRef(null)
  const humanRef = useRef(null)
  const bgQuoteRef = useRef(null)

  const useQuotes = useScrollQuotes(textQuotesRef)
  const useScrollText = useScrollInView(textRef, { title: true })

  return (
    <Container className={cn('quote')}>
      <div className={cn('quote__content')}>
        <TextBlock
          ref={textQuotesRef}
          subtitleRef={subtitleRef}
          textRef={textRef}
          headingText={title}
          subHeadingText={subtitle + '“'}
          tagName='h4'
          headingStyles='h4'
          headingClassName={cn( 'quote__heading', useScrollText.titleSpawn)}
          className={cn('quote__text', useQuotes.textBlock)}
          subHeadingClassName={cn('quote__subtitle', useScrollInView(subtitleRef).spawnAnimation)}
        />
        <div ref={humanRef} className={cn(useScrollInView(humanRef).spawnAnimation)}>
          <p className={cn('quote__author')}>{quoteAuthor}</p>
          <p className={cn('quote__job')}>{jobTitle}</p>
        </div>
      </div>
      <div ref={bgQuoteRef} className={cn( useScrollInView(bgQuoteRef).spawnAnimation)}>
        <div className={cn('quote__background')} style={{backgroundImage: `url(${getImgUrl(backgroundImg.image.asset)})`}} />
      </div>
    </Container>
  )
}

export default Quote
