import React, {useRef} from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';

// Components
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';
import {TextBlock} from '@/feature/TextBlock';
import {Link} from '@/feature/Link';

// Styles
import styles from './PartneringSection.module.scss';

const cn = classnames.bind(styles);

function PartneringSection({data}) {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const linkRef = useRef(null);
  const {title, description, link} = data;

  return (
    <Section className={cn('partnering')}>
      <Container>
        <TextBlock
          headingText={title}
          subHeadingText={description}
          subtitleRef={subHeadingRef}
          headingStyles="h3"
          tagName="h3"
          className={cn('partnering__title')}
          headingClassName={cn('partnering__heading', useScrollInView(headingRef, {title: true}).titleSpawn)}
          subHeadingClassName={cn('partnering__subheading', useScrollInView(subHeadingRef).spawnAnimation)}
          align="left"
          textRef={headingRef}
        />
        <Link
          variant="text-primary"
          className={cn('partnering__link', useScrollInView(linkRef).spawnAnimation)}
          href={link.url}
          ref={linkRef}
        >
          {link.text}
        </Link>
      </Container>
    </Section>
  );
}

export default PartneringSection;
