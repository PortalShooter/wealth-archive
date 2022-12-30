import React, { useRef } from 'react';
import { getImgUrl } from "@/shared/utils/sanity.utils";
import { useScrollQuotes } from "@/hooks";

// Component
import { Section } from "@/feature/Section";
import { TextBlock } from "@/feature/TextBlock";

// Styles
import classnames from "classnames/bind";
import styles from './Quote.module.scss';
const cn = classnames.bind(styles);

function Quote({ data }) {
  const { quote, quoteAuthor, quoteAuthorInfo, quoteImage } = data

  const textQuotesRef = useRef(null)
  const useQuotes = useScrollQuotes(textQuotesRef)

  return (
    <Section className={cn('quote')}>
      <div className={cn('quote__image')} style={{ backgroundImage: `url(${getImgUrl(quoteImage.image.asset)})` }} />
      <div className={cn('quote__content')}>
        <TextBlock
          ref={textQuotesRef}
          headingText={quote}
          tagName='span'
          headingStyles='span'
          headingClassName={cn('quote__heading')}
          className={cn('quote__text', useQuotes.textBlock)}
          subHeadingClassName={cn('quote__subtitle')}
        />
        <div >
          <h5 className={cn('quote__author')}>{quoteAuthor}</h5>
          <p className={cn('quote__author-info')}>{quoteAuthorInfo}</p>
        </div>
      </div>
    </Section>
  )
}

export default Quote
