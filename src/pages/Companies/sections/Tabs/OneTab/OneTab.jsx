import React, { useRef } from 'react';

import styles from './OneTab.module.scss';
import classnames from 'classnames/bind';
import { useScrollInView } from '@/hooks';
const cn = classnames.bind(styles);

const OneTab = ({ children, tabObj }) => {
  const title = useRef();
  const text = useRef();
  const oneTabBlock = useRef();

  return (
    <div className={cn('advance')}>
      <div className={cn('advance__block-main')}>
        <h3 className={cn('advance__header', useScrollInView(title, { title: true }).titleSpawn)} ref={title}>
          {tabObj.title}
        </h3>
        <p className={cn('advance__block-info_text')}>{tabObj.description}</p>

        <ul className={cn('advance__list', useScrollInView(text).spawnAnimation)} ref={text}>
          {tabObj.options &&
            tabObj.options.map((item, index) => {
              return (
                <li key={`tubOne${index}`}>
                  <div>{item}</div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={cn('advance__block-info', useScrollInView(oneTabBlock).spawnAnimation)} ref={oneTabBlock}>
        <div className={cn('advance__block-info_img')} dangerouslySetInnerHTML={{__html: tabObj.image?.source}}/>
      </div>
    </div>
  );
};

export default OneTab;
