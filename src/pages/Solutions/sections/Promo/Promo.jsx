import React, { useRef } from 'react';

import styles from './Promo.module.scss';
import { Container } from '../../../../feature/Container';
import classnames from 'classnames/bind';
import { useScrollInView } from '@/hooks';
import { Link } from '../../../../feature/Link';
import { getImgUrl } from '../../../../shared/utils/sanity.utils';
const cn = classnames.bind(styles);

const Promo = ({ promoObj }) => {
  const logoMobile = useRef();
  const logoTablet = useRef();
  const logoDesktop = useRef();
  const subtitle = useRef();
  const text = useRef();
  const title = useRef();

  return (
    <section className={cn('promo')}>
      <Container className={styles['promo__main']}>
        <div className={styles['promo__logo']}>
          <img
            src={getImgUrl(promoObj.image.image_mobile)}
            alt={promoObj.image.alt ?? ""}
            className={cn('promo__logo_mobile', useScrollInView(logoMobile).spawnAnimation)}
            ref={logoMobile}
          />
          <img
            src={getImgUrl(promoObj.image.image_tablet)}
            alt={promoObj.image.alt ?? ""}
            className={cn('promo__logo_tablet', useScrollInView(logoTablet).spawnAnimation)}
            ref={logoTablet}
          />
          <img
            src={getImgUrl(promoObj.image.image_desktop)}
            alt={promoObj.image.alt ?? ""}
            className={cn('promo__logo_desktop', useScrollInView(logoDesktop).spawnAnimation)}
            ref={logoDesktop}
          />
        </div>

        <div className={cn('promo__block')}>
          <h4 className={cn('promo__block_subtitle', useScrollInView(subtitle).spawnAnimation)} ref={subtitle}>
            {promoObj?.subTitle}
          </h4>
          <h2 className={cn('promo__block_header', useScrollInView(title, { title: true }).titleSpawn)} ref={title}>
            {promoObj?.title}
          </h2>
          <p className={cn('promo__block_text', useScrollInView(text).spawnAnimation)} ref={text}>
            {promoObj?.description}
          </p>
          <Link variant="button-fill" className={cn('promo__block_btn')} href={promoObj.btnLink}>
            {promoObj?.btnText}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Promo;
