import React, {useRef} from 'react';

// Styles
import classnames from 'classnames/bind';

// Components
import NextLink from 'next/link';
import { Link } from '@/feature/Link';
import {useScrollInView} from "@/hooks";
import styles from './CategoryCard.module.scss';

const cn = classnames.bind(styles);

function CategoryCard({data}) {
  const categoryLink = `/help/${data.slug.current}`;
  const cardRef = useRef();

  const questions = data?.questions?.slice(0, 3).map((elem) => (
    <NextLink href={`${categoryLink}?q=${elem._key}#${elem._key}`} key={elem._key}>
      <a className={cn('card__item')}>{elem.question}</a>
    </NextLink>
  ));

  return (
    <div className={cn('card', useScrollInView(cardRef).spawnAnimation)} ref={cardRef}>
      <div className={cn('card__title')}>{data.title}</div>
      <div className={cn('card__categories')}>{questions}</div>
      <div className={cn('card__link-container')}>
        <Link variant="text-primary" href={categoryLink} className={cn('card__link')}>
          {`See All Questions (${data.questions?.length ?? 0})`}
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
