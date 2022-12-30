import React, {useRef} from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';

// Components
import {Container} from '@/feature/Container';
import {Section} from '@/feature/Section';
import {TextBlock} from '@/feature/TextBlock';
import {Link} from '@/feature/Link';

// Styles
import styles from './JoinSection.module.scss';

const cn = classnames.bind(styles);

function JoinSection({data}) {
  const headingRef = useRef(null);
  const linkRef = useRef(null);

  return (
    <Section className={cn('join')}>
      <Container className={cn('join__wrap')}>
        <TextBlock
          headingText={data.title}
          accentPhrase={data.accentPhrase}
          headingStyles="h2"
          tagName="h2"
          className={cn('join__title')}
          headingClassName={cn('join__heading', useScrollInView(headingRef, {title: true}).titleSpawn)}
          align="center"
          textRef={headingRef}
        />
        <Link
          variant="button-fill"
          className={cn('join__link', useScrollInView(linkRef).spawnAnimation)}
          href={data.link.url}
          ref={linkRef}
        >
          {data.link.text}
        </Link>
      </Container>
    </Section>
  );
}

export default JoinSection;
