import React, { useRef } from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import { Link } from '@/feature/Link';

// Styles
import styles from './CTA.module.scss';

const cn = classnames.bind(styles);

function CTA({ ctaSection }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const buttonRef = useRef();

  if (!ctaSection) {
    return null;
  }

  return (
    <div className={cn('cta')}>
      <div className={cn('cta__header', useScrollInView(titleRef, { title: true }).titleSpawn)} ref={titleRef}>
        {ctaSection?.title}
      </div>
      <div className={cn('cta__body', useScrollInView(descriptionRef, { title: true }).titleSpawn)} ref={descriptionRef}>
        {ctaSection?.description}
      </div>
      <div className={cn('cta__btn', useScrollInView(buttonRef).spawnAnimation)} ref={buttonRef}>
        <Link variant="button-fill" href={ctaSection?.button.url} className={cn('button')}>
          {ctaSection?.button.text}
        </Link>
      </div>
    </div>
  );
}

export default CTA;
