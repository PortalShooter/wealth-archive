import React from 'react';
import NextLink from "next/link";

// Styles
import classnames from 'classnames/bind';
import styles from './FullSizeSubMenu.module.scss';

const cn = classnames.bind(styles);

function FullSizeSubMenu({list, isHidden = false, onElemClick, subMenuRef,url}) {
  if (!list) {
    return null;
  }

  const handleClick = () => {
    if (onElemClick) {
      onElemClick();
    }
  }

  const linksList = list.map(({page}, i) => (
    <li key={''+page.title + i} className={cn('full-size-sub-menu__elem')}>
      <NextLink key={page.uri} href={page.uri}>
        <a className={cn('full-size-sub-menu__link',{active:page.uri===url})} onClick={handleClick} tabIndex={isHidden ? -1 : 0}>
          <div className={cn('full-size-sub-menu__icon')} dangerouslySetInnerHTML={{__html: page.icon}}/>
          <div className={cn('full-size-sub-menu__title')}>{page.title}</div>
          <div className={cn('full-size-sub-menu__subtitle')}>{page.description}</div>
        </a>
      </NextLink>
    </li>
  ));

  return (
    <div className={cn('full-size-sub-menu', {'full-size-sub-menu_hidden': isHidden})} ref={subMenuRef}>
      <ul className={cn('full-size-sub-menu__list')}>{linksList}</ul>
    </div>
  );
}

export default FullSizeSubMenu;
