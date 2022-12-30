import React, {useRef} from 'react';

import styles from './Include.module.scss';
import classnames from 'classnames/bind';
import {Container} from '@/feature/Container';
import {useScrollInView} from '@/hooks';
import {SolutionsPlus, SolutionsPeople, SolutionsLock, SolutionsDocument} from '@/svgComponents';

import {getImgUrl} from '@/shared/utils/sanity.utils';

const cn = classnames.bind(styles);

const Include = ({includeObj, className}) => {
  const steps = useRef();
  const title = useRef();
  const image = useRef();
  const text = useRef();

  return (
    <section className={cn('include')}>
      <Container className={cn('include__main')}>
        <h3 className={cn('include_header', useScrollInView(title, {title: true}).titleSpawn)} ref={title}>
          {includeObj.title}
        </h3>

        <div className={cn('include__main-block', className, useScrollInView(steps).spawnAnimation)} ref={steps}>
          {includeObj.inclusions.map((item, index) => {
            return (
              <div className={cn('include__inner-block')} key={`includetext${index}`}>
                <div className={cn('include__inner-block_img')}
                     dangerouslySetInnerHTML={{
                  __html: item.icon?.source ?? ''
                }}/>
                <span className={cn('include__inner-block_text')}>{item.text}</span>
              </div>
            );
          })}
        </div>
        <div className={cn('include__info-block')}>
          <div className={cn('include__info-block_img', useScrollInView(image).spawnAnimation)} ref={image}>
            <img src={getImgUrl(includeObj.image.image)} alt={includeObj.image.alt ? includeObj.image.alt : ''}/>
          </div>
          <div className={cn('include__text-block', className, useScrollInView(text).spawnAnimation)} ref={text}>
            <p className={cn('include__text-block_title')}>{includeObj.membershipText}</p>
            <ul className={cn('include__text-block__list')}>
              {includeObj?.membershipInclusions.map((item, index) => {
                return (
                  <li key={`include${index}`}>
                    <div>{item}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Include;
