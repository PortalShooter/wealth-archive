import React, { useRef, forwardRef } from 'react'; // Components

import { Text } from '@/feature/Text';

// Styles
const classNames = require('classnames/bind');
import styles from './TextBlock.module.scss';

const cx = classNames.bind(styles);

function unrefTextBlock(
  {
    textRef,
    subtitleRef,
    headingText,
    accentPhrase = '',
    additionalAccentPhrases = [],
    headingStyles = 'h3',
    subHeadingText,
    tagName = 'h3',
    subHeadingLevel = '1',
    align = 'left',
    className,
    headingClassName,
    subHeadingClassName,
    slidableSubHeading = false,
    titleTwoLines = false,
  },
  ref
) {
  const subtitleInnerRef = useRef(null)

  let headingTextAccent = '';

  if (headingText && accentPhrase) {
    const trimmedAccentPhrase = accentPhrase
      .trim()
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      .replace(/[ ]+/g, ' ')
    const regEx = new RegExp(trimmedAccentPhrase, 'ig');
    const replaceMask = `<span>$&</span>`;
    headingTextAccent = headingText.replace(regEx, replaceMask);

    if (additionalAccentPhrases.length) {
      additionalAccentPhrases?.forEach((phrase) => {
        headingTextAccent = headingTextAccent.replace(phrase, `<span>${phrase}</span>`);
      });
    }
  }

  const children =
    headingText && accentPhrase ? (
      <p
        dangerouslySetInnerHTML={{
          __html: headingTextAccent ? headingTextAccent : '',
        }}
      />
    ) : (
      headingText
    );

  return (
    <div className={cx(styles.TextBlock, className)} ref={ref}
         style={
          slidableSubHeading && subtitleInnerRef.current ? {'--slidable-card-subtitle-height': `${subtitleInnerRef.current?.offsetHeight - 8 /* 12px for padding top*/}px`} : null
         }
    >
      {headingText && (
        <Text
          style={titleTwoLines ? {'--max-width-text-block': `${headingText.length * 13}px`} : null}
          textRef={textRef}
          tagName={tagName}
          align={align}
          textStyles={headingStyles}
          className={cx(styles.Heading, !subHeadingText && styles.Heading_MarginNone, headingClassName)}
        >
          {children}
        </Text>
      )}
      {subHeadingText && (
        <Text
          textRef={subtitleRef}
          tagName="p"
          level={subHeadingLevel}
          align={align}
          className={cx(styles.SubHeading, subHeadingClassName)}

        >
          {slidableSubHeading ? (<span ref={subtitleInnerRef}>{subHeadingText}</span>) : subHeadingText}
        </Text>
      )}
    </div>
  );
}

export const TextBlock = forwardRef(unrefTextBlock);
