import React, { useRef } from 'react';

import styles from './Resources.module.scss';
import { Container } from '@/feature/Container';
import classnames from 'classnames/bind';
import { useScrollInView } from '@/hooks';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import SvgAdvisersRes1 from '@/svgComponents/AdvisersRes1';
import SvgAdvisersRes2 from '@/svgComponents/AdvisersRes2';
import SvgAdvisersRes3 from '@/svgComponents/AdvisersRes3';
const cn = classnames.bind(styles);

const Resources = ({ resourcesObj }) => {
  const logoMobile = useRef();
  const logoTablet = useRef();
  const logoDesktop = useRef();
  const text = useRef();
  const title = useRef();

  return (
    <section className={cn('resources')}>
      <Container className={styles['resources__main']}>
        <div className={styles['resources__logo']}>
          <img
            src={getImgUrl(resourcesObj.image.image_mobile)}
            alt={resourcesObj.image.alt ? resourcesObj.image.alt : ''}
            className={cn('resources__logo_mobile', useScrollInView(logoMobile).spawnAnimation)}
            ref={logoMobile}
          />
          <img
            src={getImgUrl(resourcesObj.image.image_tablet)}
            alt={resourcesObj.image.alt ? resourcesObj.image.alt : ''}
            className={cn('resources__logo_tablet', useScrollInView(logoTablet).spawnAnimation)}
            ref={logoTablet}
          />
          <img
            src={getImgUrl(resourcesObj.image.image_desktop)}
            alt={resourcesObj.image.alt ? resourcesObj.image.alt : ''}
            className={cn('resources__logo_desktop', useScrollInView(logoDesktop).spawnAnimation)}
            ref={logoDesktop}
          />
        </div>

        <div className={cn('resources__block')}>
          <h2 className={cn('resources__block_header', useScrollInView(title, { title: true }).titleSpawn)} ref={title}>
            {resourcesObj.title}
          </h2>
          <div className={cn(useScrollInView(text).spawnAnimation)} ref={text}>
            {resourcesObj.advisersResource.map((item, index) => {
              return (
                <div key={index} className={cn('resources__block_info')}>
                  {index === 0 && <SvgAdvisersRes1 className={cn('resources__block_img')} />}
                  {index === 1 && <SvgAdvisersRes2 className={cn('resources__block_img')} />}
                  {index === 2 && <SvgAdvisersRes3 className={cn('resources__block_img')} />}
                  <p className={cn('resources__block_text')}>{item?.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Resources;
