import NextLink from "next/link";
import React, {useEffect, useState} from "react";

// Styles
import classnames from 'classnames/bind';
import styles from '../Nav.module.scss';

const cn = classnames.bind(styles);

function NavLink({id, uri, title, onClick, active}) {
  const [isExternal, setIsExternal] = useState(false);
  const forcedSameHosts = ['app.wealth.com'];

  useEffect(()=>{
    if (uri.host === window.location.host) {
      return;
    }

    if (forcedSameHosts.indexOf(uri.host) !== -1) {
      return;
    }

    setIsExternal(true);
  }, [uri])

  return (
    <NextLink href={uri}>
      <a id={id} role="menuitem" className={cn('menu__item',{'active':active})} onClick={onClick} target={isExternal ? '_blank' : '_self'}>
        {title}
      </a>
    </NextLink>
  )
}

export default NavLink;
