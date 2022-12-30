import React from 'react';

// Helpers
import classnames from 'classnames/bind';

// Components
import TableRow from '../TableRow';

// Styles
import styles from './Table.module.scss';

const cn = classnames.bind(styles);

function Table({ data }) {
  const rows = data?.map((elem, index) => <TableRow data={elem} index={index} key={elem._key} />);

  return <div className={cn('table')}>{rows}</div>;
}

export default Table;
