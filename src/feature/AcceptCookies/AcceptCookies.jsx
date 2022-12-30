import React, {useEffect, useState } from 'react';
import classnames from "classnames/bind";
import styles from "./AcceptCookies.module.scss";
import Cookies from 'js-cookie';

import {HeaderClose} from "@/svgComponents";

const cn = classnames.bind(styles);

function getCookie(name) {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  } else {
    return false
  }
}

function AcceptCookies() {
  const [isActive, setIsActive] = useState(null)

  useEffect(()=>{
    setIsActive(!getCookie('AcceptCookies'))
  },[])

  const onAcceptCookies = () => {
    Cookies.set('AcceptCookies', 'true', { expires: 365 })
    setIsActive(false)
  }

  if (!isActive) return <></>

  return (
      <div className={cn('modal-cookie')}>
        <p className={cn('modal-cookie__description')}>
          This website uses cookies
          to improve your experience.
        </p>
        <HeaderClose className={cn('modal-cookie__close')} onClick={() => onAcceptCookies()} />
        <button onClick={() => onAcceptCookies()} className={cn('modal-cookie__button')} aria-disabled="false"
                tabIndex="1">Accept
        </button>
      </div>
  )
}
export default AcceptCookies
