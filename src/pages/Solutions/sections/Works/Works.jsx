import React, { useRef } from 'react';

import styles from './Works.module.scss';
import classnames from 'classnames/bind';
import { useScrollInView } from '@/hooks';
// import SvgSolutionsVerticalLine from '../../../../svgComponents/SolutionsVerticalLine';
import { Link } from '@/feature/Link';
import { getImgUrl } from '@/shared/utils/sanity.utils';

const cn = classnames.bind(styles);

const Works = ({ workObj }) => {
  const title = useRef();
  const subtitle = useRef();
  const image = useRef();
  const text = useRef();

  return (
    <section className={cn('works')}>
      <h2 className={cn('works_title', useScrollInView(title, { title: true }).titleSpawn)} ref={title}>
        {workObj.title}
      </h2>
      <span className={cn('works_subtitle', useScrollInView(subtitle).spawnAnimation)} ref={subtitle}>
        {workObj.subTitle}
      </span>
      <div className={cn('works__block')}>
        <div className={cn('works__block_img', useScrollInView(image).spawnAnimation)} ref={image}>
          <img src={getImgUrl(workObj?.image?.image)} alt="" />
        </div>
        <div className={cn('works__block__text', useScrollInView(text).spawnAnimation)} ref={text}>

          {workObj.steps.map((item, index) => {
            return (
              <div className={cn('works__block__inner')} key={index}>
                <div className={cn('works__block__inner_number')}>{index + 1}</div>
                {workObj.steps.length - 1 !== index && <div className={cn('works__block__inner_text')}>{item}</div>}
                {workObj.steps.length - 1 === index && (
                  <div key={index}>
                    <div className={cn('works__block__inner_text')}>{item}</div>
                    <Link variant="button-fill" className={cn('works__block__text_btn')} href={workObj.btnLink}>
                      {workObj.btnText}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Works;
