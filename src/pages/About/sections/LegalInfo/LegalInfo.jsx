import React, {useRef} from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';

// Components
import {Container} from '@/feature/Container';
import {Section} from '@/feature/Section';
import {Link} from '@/feature/Link';

// Styles
import styles from './LegalInfo.module.scss';

const cn = classnames.bind(styles);

function LegalInfoSection({data}) {
  const containerRef = useRef(null);

  return (
    <Section className={cn('legal-info')}>
      <Container className={cn('legal-info__wrap', useScrollInView(containerRef).spawnAnimation)} ref={containerRef}>
        <Link
          variant="text-primary"
          className={cn('legal-info__link')}
          href={data.link.url}
        >
          {data.link.text}
        </Link>
        <span className={cn('legal-info__text')}>{data.text}</span>
      </Container>
    </Section>
  );
}

export default LegalInfoSection;
