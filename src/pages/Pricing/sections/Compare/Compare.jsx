import React, { useRef } from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import Table from '../../UI/Table';

// Styles
import styles from './Compare.module.scss';

const cn = classnames.bind(styles);

function Compare({ title, list, header }) {
  const compareHeaderRef = useRef();
  const headingsData = [title, ...header];
  const headings = headingsData.map(heading => (
    <div key={heading} className={cn('compare__header__item')}>{heading}</div>
  ))

  return (
    <div className={cn('compare')}>
      <div className={cn('compare__header', useScrollInView(compareHeaderRef).spawnAnimation)} ref={compareHeaderRef}>
        {headings}
      </div>
      <div className={cn('compare__table')}>
        <div className={cn('compare__table__list')}>
          <Table data={list} />
        </div>
      </div>
    </div>
  );
}

export default Compare;
