import React, { useRef } from 'react';

// Styles
import classNames from 'classnames/bind';
import styles from './TextCtaCards.module.scss';
import { Link } from '@/feature/Link';

const cn = classNames.bind(styles);

function TextCtaCards({ data }) {
  return (
    <div className={cn('text-cta', { 'text-cta_center': data.typeOfCta === 'both' })}>
      <div className={cn('text-cta__title')}>{data.title}</div>
      {data.typeOfCta === 'both' && <div className={cn('text-cta__subtitle')}>{data.subtitle}</div>}
      <div className={cn('text-cta__button')}>
        <Link variant="button-fill" className={cn('button')} href={data.link}>
          {data.buttonText || 'Subscribe'}
        </Link>
      </div>
    </div>
  );
}

export default TextCtaCards;
