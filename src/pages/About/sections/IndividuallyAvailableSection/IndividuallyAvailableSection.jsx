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
import {AboutIndividuallyAvailable} from '@/svgComponents';

// Styles
import styles from './IndividuallyAvailableSection.module.scss';

const cn = classnames.bind(styles);

function IndividuallyAvailableSection({data}) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  return (
    <Section className={cn('available', useScrollInView(sectionRef).spawnAnimation)} ref={sectionRef}>
      <Container small className={cn('available__container')}>
        <div className={cn('available__svg-wrap')}>
          <AboutIndividuallyAvailable className={cn('available__svg')}/>
        </div>
        <div className={cn('available__text-with-link')}>
          <TextBlock
            headingText={data.title}
            accentPhrase={data.accentPhrase}
            headingStyles="h3"
            tagName="h3"
            className={cn('available__title')}
            headingClassName={cn('available__heading', useScrollInView(headingRef, {title: true}).titleSpawn)}
            align="left"
            textRef={headingRef}
          />
          <Link variant="button-fill" className={cn('available__link')} href={data.link.url}>
            {data.link.text}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default IndividuallyAvailableSection;
