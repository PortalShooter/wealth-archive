import React, { useRef, useState } from 'react';

import styles from './Questions.module.scss';
import classnames from 'classnames/bind';
import SvgSolutionsArrowUp from '../../../../svgComponents/SolutionsArrowUp';
import { useScrollInView } from '@/hooks';

const cn = classnames.bind(styles);

const Question = ({ item, className }) => {
  const [opened, setOpened] = useState(false);
  const textRef = useRef(null)

  const handleOpened = () => {
    setOpened((oldOpened) => !oldOpened);
  };

  return (
    <div
      className={cn('questions__block-external', { 'questions__block-external_open': opened })}
      onClick={handleOpened}
    >
      <div className={cn('questions__block-inner')}>
        <div className={cn('questions__block-header', className)}>
          <h3 className={cn('questions__item-title')}>{item.title}</h3>
          <SvgSolutionsArrowUp className={cn('questions__arrow', { 'questions__arrow-up': opened })} />
        </div>
        <div ref={textRef} className={cn('questions__text',opened?'visible':'')} style={{'--text-height':`${opened?textRef.current.scrollHeight:0}px`}}>{item.description}</div>
      </div>
      <hr className={cn(opened && 'hidden')}/>
    </div>
  );
};

const Questions = ({ questions, className }) => {
  const title = useRef(null);
  const text = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={cn('questions')}>
      <div className={cn('questions__wrapper', className)}>
        <h2 className={cn('questions__title', useScrollInView(title, { title: true }).titleSpawn)} ref={title}>
          {questions.title}
        </h2>
        <div className={cn('questions__block', className, useScrollInView(text).spawnAnimation)} ref={text}>
          {questions.questions.map((item, index) => {
            if (index < 5 || isOpen) {
              return <Question item={item} key={item.title + index} className={className} />;
            } else {
              return null;
            }
          })}
        </div>
        {!isOpen && questions.questions.length > 5 && (
          <button className={cn('questions__btn')} onClick={() => setIsOpen(true)}>
            Load More Questions
          </button>
        )}
      </div>
    </section>
  );
};

export default Questions;
