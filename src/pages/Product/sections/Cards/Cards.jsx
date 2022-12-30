import React, { useRef } from 'react';

// Component
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';

// Styles
import classnames from 'classnames/bind';
import styles from './Cards.module.scss';
import { Link } from '@/feature/Link';
import { useScrollInView } from '@/hooks';
const cn = classnames.bind(styles);

function Cards({ data }) {
  const titleRef = useRef(null);

  return (
    <Section className={cn('cards')}>
      <Container className={cn('cards__wrapper', useScrollInView(titleRef).spawnAnimation)} ref={titleRef}>
        {data.map((item) => {
          return (
            <div className={cn('card')} key={`cardsProd${item.title}`}>
              <h3 className={cn('card__title')}>{item.title}</h3>
              <div className={cn('card__subtitle')}>{item.description}</div>
              <Link variant={'text-primary'} href={item.url} className={cn('card__link')}>
                {item.linkTitle}
              </Link>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}

export default Cards;
