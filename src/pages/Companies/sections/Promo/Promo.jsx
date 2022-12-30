import React, { useRef } from 'react';

import styles from './Promo.module.scss';
import { Container } from '@/feature/Container';
import classnames from 'classnames/bind';
import { useScrollInView } from '@/hooks';
import { Link } from '@/feature/Link';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import { modalController } from '@/pages/Home/sections/OldHero/shared/modal/useModal';
import { MODAL_ID } from '@/pages/Home/sections/OldHero/modalForm/ModalForm';
import { defaultModalGroupOptions } from '@/pages/Home/sections/OldHero/shared/modal/defaults';
import { Button } from '@/feature/Button';
const cn = classnames.bind(styles);

const Promo = ({ promoObj, className }) => {
  const logoMobile = useRef();
  const logoTablet = useRef();
  const logoDesktop = useRef();
  const subtitle = useRef();
  const text = useRef();
  const title = useRef();

  const handleMenuItemModalClick = () => {
    modalController.open(MODAL_ID, defaultModalGroupOptions['groupId']);
    document.body.setAttribute('scrollY', window.pageYOffset)
    document.body.style.top = `-${document.body.getAttribute('scrollY')}px`
    document.body.classList.add('modal-opened');
  };

  return (
    <section className={cn('promo')}>
      <Container className={cn('promo__links')}>
        <Link className={cn('promo__link', `${!promoObj.isAdvisers && 'promo__link_active'}`)} href={'/companies'}>
          {'For Companies'}
        </Link>
        <Link className={cn('promo__link', `${promoObj.isAdvisers && 'promo__link_active'}`)} href={'/advisors'}>
          {'For Advisors'}
        </Link>
      </Container>
      <Container className={cn('promo__main', className)}>
        <div className={styles['promo__logo']}>
          <img
            src={getImgUrl(promoObj.image.image_mobile)}
            className={cn('promo__logo_mobile', useScrollInView(logoMobile).spawnAnimation)}
            ref={logoMobile}
            alt={promoObj?.image?.alt || ''}
          />
          <img
            src={getImgUrl(promoObj.image.image_tablet)}
            className={cn('promo__logo_tablet', useScrollInView(logoTablet).spawnAnimation)}
            ref={logoTablet}
            alt={promoObj?.image?.alt || ''}
          />
          <img
            src={getImgUrl(promoObj.image.image_desktop)}
            className={cn('promo__logo_desktop', useScrollInView(logoDesktop).spawnAnimation)}
            ref={logoDesktop}
            alt={promoObj?.image?.alt || ''}
          />
        </div>

        <div className={cn('promo__block')}>
          <h2
            className={cn('promo__block_header', className, useScrollInView(title, { title: true }).titleSpawn)}
            ref={title}
          >
            {promoObj?.title}
          </h2>
          <p className={cn('promo__block_text', useScrollInView(text).spawnAnimation)} ref={text}>
            {promoObj?.description}
          </p>
          {/*<Link variant="button-fill" className={cn('promo__block_btn')} href={promoObj?.btnLink}>*/}
          {/*  {promoObj?.btnText}*/}
          {/*</Link>*/}
          <Button variant="button-fill" className={cn('promo__block_btn')} onClick={handleMenuItemModalClick}>
            {promoObj?.btnText}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Promo;
