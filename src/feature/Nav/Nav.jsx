import React, { useMemo, useState, useEffect } from 'react';
import {NavListItem, NavLinkItem} from './NavElements';
import { modalController } from '@/pages/Home/sections/OldHero/shared/modal/useModal';
import {MODAL_ID} from '@/pages/Home/sections/OldHero/modalForm/ModalForm';
import {defaultModalGroupOptions} from '@/pages/Home/sections/OldHero/shared/modal/defaults';

// Styles
import classnames from 'classnames/bind';
import styles from './Nav.module.scss';
import { useScrollInView } from '../../hooks';


const cn = classnames.bind(styles);


function getMenuElemIds(menu) {
  const newIds = [];
  menu.forEach(({page, children = []}, index) => {
    const key = page?.id || index;
    const id = `menu_${key}`;
    newIds.push(id);
    newIds.push(`${id}__li`);

    if (children.length) {
      children.forEach((_, subIndex) => {
        const subId = `menu_${key}_submenu_${subIndex}`;

        newIds.push(subId);
      });
    }
  });

  return newIds
}


export function Nav({menu, className, isMenuOpen, setIsMenuOpen, underlined: currentPageMark}) {
  if (!menu) {
    return null;
  }
  const menuIds = useMemo(() => getMenuElemIds(menu), [menu])
  const [menuRefs,setMenuRefs] = useState([]);

  useEffect(() => {
    setMenuRefs((prev) => menu.map((_, i) => prev[i] || React.createRef()));
  }, []);

  // mobile menu toggle
  const handleMenuItemClick = () => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false)
    }
  }
  const handleMenuItemModalClick = () => {
    modalController.open(MODAL_ID, defaultModalGroupOptions["groupId"]);
    document.body.setAttribute('scrollY', window.pageYOffset)
    document.body.style.top = `-${document.body.getAttribute('scrollY')}px`
    document.body.classList.add('modal-opened')
  }

  const contactUs = (<button
    type="button"
    className={cn('menu__item')}
    role="menuitem"
    onClick={() =>handleMenuItemModalClick()}>Contact Us</button>)

  return (
    <nav aria-label="Main menu" className={cn('menu', className, {menu_visible: isMenuOpen})}>
      <div role="menubar" aria-owns={menuIds.join(' ')} className={cn('menu__list')}>
        {menu.map(({page, children = [], id: forcedId}, index) => {
          const key = page?.id || index;
          const id = `menu_${key}`;
          const isUnderlined = page.underline && currentPageMark && page.underline === currentPageMark

          if (!page) {
            return null;
          }

          if (!children.length) {
            return (
              <NavLinkItem index={index} refElm={menuRefs[index]} key={key} page={page} id={id} isUnderlined={isUnderlined} onClick={() =>handleMenuItemClick()}/>
            );
          }

          return (
            <NavListItem index={index} refElm={menuRefs[index]} key={key} page={page} id={id} liId={forcedId} menuElemChildren={children} isUnderlined={isUnderlined} onClick={() =>handleMenuItemClick()}/>
          );
        })}
        {/*<NavListItem key={'contactus'}  id={'contacts-us-header'} menuElemChildren={null} isUnderlined={false} >*/}
        {/*  {contactUs}*/}
        {/*</NavListItem>*/}
      </div>
    </nav>
  );
}
