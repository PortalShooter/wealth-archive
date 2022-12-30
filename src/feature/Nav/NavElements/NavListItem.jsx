import React, {useEffect, useRef, useState} from "react";
import {useUniversalClosing} from "@/hooks";
import {throttle} from "@/helpers";
import {syncResize} from "@/shared/resize";
import {HeaderMoreArrow} from "@/svgComponents";
import {DropDown, dropDownAnimationList} from "@/shared/dropDown";
import FullSizeSubMenu from "@/feature/Nav/FullSizeSubMenu";
import NavLink from "./NavLink";

// Styles
import classnames from 'classnames/bind';
import styles from '../Nav.module.scss';
import { useScrollInView } from '../../../hooks';

const cn = classnames.bind(styles);

function NavListItem({page, id, liId, menuElemChildren, isUnderlined = false, onClick= null,children,refElm,index}) {
  const subMenuRef = useRef();
  const [url,setUrl] = useState(null)
  const [desktopMenuOpen, setDesktopMenuOpen] = useUniversalClosing([subMenuRef]);
  // add closing on resize
  const handleResize = throttle(() => {
    if (window && window.innerWidth <= 1024) {
      setDesktopMenuOpen(false);
    }
  }, 500)

  useEffect(() => {
    syncResize.subscribe(handleResize);

    return (() => {
      syncResize.unsubscribe(handleResize);
    })
  })
  useEffect(()=>{
    setUrl(window.location.pathname)
  })

  const closeMenu = () => {
    setDesktopMenuOpen(false);
  }

  const openMenu = () => {
    if (window && window.innerWidth <= 1024) {
      return;
    }

    if (!desktopMenuOpen) {
      requestAnimationFrame(() =>
        setDesktopMenuOpen(true)
      )
    }
  };

  const handleClick = () => {
    if(onClick) {
      onClick()
    }
    closeMenu();
  }

  const button = (
    <button
      type="button"
      id={id}
      className={cn('menu__item', 'menu__item_button')}
      role="menuitem"
      aria-haspopup="menu"
      onClick={() => openMenu()}
    >
      {page?.title}
      <HeaderMoreArrow className={cn('menu__svg')}/>
    </button>
  );
  return (
    <div style={{animationDelay:`${300 + index*33}ms`}} ref={refElm} id={liId ?? `${id}__li`} key={id} className={cn('menu__elem', 'menu__elem_with-submenu', {'menu__elem_underline': isUnderlined}, {'menu__elem_opened': desktopMenuOpen},useScrollInView(refElm).spawnAnimation)}
        onClick={() => openMenu()}>
      {page?.title &&
        menuElemChildren.length && (
          <DropDown button={button}
                    animation={dropDownAnimationList.Default}
                    className={cn('menu__submenu')}
                    wrapperClassName={cn('menu__submenu-wrap')}
          >
            <ul className={cn('menu__sub-list')}>
              {menuElemChildren.map((item, index) => {
                const subId = `${id}_submenu_${index}`;

                return (
                  <li
                    key={subId}
                    className={cn('menu__sub-list-elem')}
                  >
                    <NavLink active={url === item.page.uri} id={subId} uri={item.page.uri} title={item.page.title} onClick={handleClick}/>
                  </li>
                );
              })}
            </ul>
          </DropDown>
        )
      }

      <FullSizeSubMenu list={menuElemChildren}
                       isHidden={!desktopMenuOpen}
                       onElemClick={closeMenu}
                       subMenuRef={subMenuRef}
                       url={url}
      />
      {children}
    </div>
  )
}

export default NavListItem;
