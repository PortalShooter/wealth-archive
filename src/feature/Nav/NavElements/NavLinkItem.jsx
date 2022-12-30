import React from "react";

// Styles
import classnames from 'classnames/bind';
import styles from '../Nav.module.scss';

// Components
import NavLink from "./NavLink";
import { useScrollInView } from '../../../hooks';
import { NavListItem } from './index';

const cn = classnames.bind(styles);

function NavLinkItem({page, id, isUnderlined = false, onClick,refElm,index}) {
  return (
    <div style={{animationDelay:`${300 + index*33}ms`}} ref={refElm} key={id} className={cn('menu__elem', {'menu__elem_underline': isUnderlined},useScrollInView(refElm).spawnAnimation)} id={`${id}__li`}>
      <NavLink id={id} uri={page.uri} title={page.title} onClick={onClick}/>
    </div>
  )
}

export default NavLinkItem;
