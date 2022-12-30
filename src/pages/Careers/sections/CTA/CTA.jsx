import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";
import {Link} from "@/feature/Link";

// Styles
import classnames from "classnames/bind";
import styles from './CTA.module.scss';
const cn = classnames.bind(styles);

function CTA({data}) {
  const {link, title} = data
  const titleRef = useRef(null);
  const linkRef = useRef(null);

  return (
    <Section className={cn('cta')}>
      <Container className={cn('cta__wrap')}>
        <TextBlock
          textRef={titleRef}
          headingText={title.title}
          accentPhrase={title.accentPhrase}
          additionalAccentPhrases={title.additionalAccentPhrases}
          headingStyles="h2"
          tagName="h2"
          className={cn('cta__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
          headingClassName={cn('cta__heading')}
          align="center"
        />
        <Link
          variant="button-fill"
          className={cn('cta__link', useScrollInView(linkRef).spawnAnimation)}
          href={link.url}
          ref={linkRef}
        >
          {link.text}
        </Link>
      </Container>
    </Section>
  )
}

export default CTA
