import React, {useRef} from 'react';
import {getImgUrl} from "@/shared/utils/sanity.utils";
import {useScrollInView, useScrollQuotes} from '@/hooks';

// Components
import {TextBlock} from "@/feature/TextBlock";
import {Image} from "@/feature/Image";

// Styles
import classnames from 'classnames/bind';
import styles from './TrustInfo.module.scss';
const cn = classnames.bind(styles);

function TrustInfo ({data}) {
  const textRef = useRef(null)
  const textQuotesRef = useRef(null)
  const {person, title} = data.reviews

  const useScrollText = useScrollInView(textRef, { title: true })
  const useQuotes = useScrollQuotes(textQuotesRef)

  return (
    <div className={cn('trust-info')}>
      <TextBlock
        ref={textQuotesRef}
        textRef={textRef}
        headingText={title.title}
        accentPhrase={title.accentPhrase}
        additionalAccentPhrases={title.additionalAccentPhrases}
        tagName='h3'
        headingStyles='h2'
        className={cn('trust-info__title-wrapper', useScrollText.titleSpawn, useQuotes.wrapperQuotes)}
        headingClassName={cn('trust-info__title', useQuotes.textBlock, useScrollText.isCompleted ? 'quotes-after' : '')}
      />

      <div className={cn('trust-info__text-block')}>
        <span className={cn('trust-info__name')}>{person.name}</span>
        <span className={cn('trust-info__work')}>{person.work}</span>
      </div>

      <Image
        src={getImgUrl(person.image.image.asset)}
        layout='fill'
        loading='eager'
        objectFit='contain'
        objectPosition='bottom right'
        wrapperClassName={cn('trust-info__img')}
        alt={person.image.image.alt || ""}
        unoptimized
      />
    </div>
  )
}

export default TrustInfo
