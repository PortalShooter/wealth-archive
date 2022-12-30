import React, { useRef } from 'react';

import styles from './Way.module.scss';
import classnames from 'classnames/bind';
import SvgSolutionsOldWay from '../../../../svgComponents/SolutionsOldWay';
import SvgSolutionsNewWay from '../../../../svgComponents/SolutionsNewWay';
import { useScrollInView } from '@/hooks';

const cn = classnames.bind(styles);

const Way = ({ wayObj }) => {
  const wayBlockOld = useRef();
  const wayBlockNew = useRef();

  return (
    <section className={cn('way')}>
      <div className={cn('way__column')}>
        <div
          className={cn('way__block', 'way__block_old', useScrollInView(wayBlockOld).spawnAnimation)}
          ref={wayBlockOld}
        >
          <h2 className={cn('way_title')}>{wayObj.oldWayTitle}</h2>
          <span className={cn('way_subtitle')}>{wayObj.oldWaySubtitle}</span>
          <ul className={cn('way__list')}>
            {wayObj.oldSteps.map((item, index) => {
              return (
                <li className={cn('way__list_item')} key={index}>
                  <div className={cn('way__list_icon-block')}>
                    <SvgSolutionsOldWay className={cn('way__list_icon')} />
                  </div>
                  <p className={cn('way__list_text')}>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={cn('way__column')}>
        <div
          className={cn('way__block', 'way__block_new', useScrollInView(wayBlockNew).spawnAnimation)}
          ref={wayBlockNew}
        >
          <h2 className={cn('way_title')}>{wayObj.newWayTitle}</h2>
          <span className={cn('way_subtitle')}>{wayObj.newWaySubtitle}</span>
          <ul className={cn('way__list')}>
            {wayObj.newSteps.map((item, index) => {
              return (
                <li className={cn('way__list_item')} key={index}>
                  <div className={cn('way__list_icon-block')}>
                    <SvgSolutionsNewWay className={cn('way__list_icon')} />
                  </div>
                  <p className={cn('way__list_text')}>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Way;
