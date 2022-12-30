import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {default as NextLink} from "next/link";

import classnames from "classnames/bind";
import styles from "./Link.module.scss";

const cn = classnames.bind(styles);

export const LinkAnimated = forwardRef(
  ({
     className,
     variant = "base",
     href = "#",
     target,
     children,
     textClassname,
     ...restProps
   },
   ref

  ) => {
    const [isExternal, setIsExternal] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const hoverElmRef = useRef(null);

    useEffect(() => {
      if (!window) {
        return;
      }

      const forcedSameHosts = ['app.wealth.com'];

      const isExternalURL = (url) => {
        const newUrl = new URL(url);
        const newUrlOrigin = newUrl.origin;
        const newUrlHost = newUrl.host;

        if(forcedSameHosts.indexOf(newUrlHost) !== -1) {
          setIsExternal(false);
          return false;
        }

        return newUrlOrigin !== origin;
      }

      const match = href.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
      if (match === null || match.length <= 2 || typeof match[2] !== 'string' || match[2].length === 0 || href.match(/^[#/]/)) {
        setIsExternal(false);
        return;
      }

      try {
        const isEx = isExternalURL(href);
        setIsExternal(isEx);
      } catch (e) {
        setIsExternal(true);
        console.log(e);
      }
    }, [href])

    const hover = (e) => {
      e.stopPropagation()
      if (hoverElmRef.current) {
        const left = e.pageX - e.target.getBoundingClientRect().left;
        const top = e.pageY -  e.target.getBoundingClientRect().top;
        hoverElmRef.current.style.left = `${left}px`
        hoverElmRef.current.style.top = `${top}px`
      }
      setIsHover(!isHover)
    }

    return (
      <NextLink href={href}>
        <a
          className={cn(
            'link',
            {'link_button-stroke': variant === "button-stroke"},
            {'link_button': variant === "button-fill"},
            {'link_text-primary': variant === "text-primary"},
            {'link_text-secondary': variant === "text-secondary"},
            {'link_icon': variant === "icon"},
            {'link_button-secondary': variant === "button-fill-secondary"},
            className
          )}
          href={href}
          target={target ? target : isExternal ? '_blank' : '_self'}
          ref={ref}
          {...restProps}
          onMouseEnter={hover}
          onMouseLeave={hover}
        >
          <span className={cn('wrap')}>
            <span className={cn('whitebg')}></span>
            <span ref={hoverElmRef} className={cn('blackbg',isHover?'hover':'')}></span>
            <span className={cn('makered')}></span>
            <span className={cn('content')}>{children}</span>
          </span>
        </a>
      </NextLink>
    );
  }
);

LinkAnimated.displayName = "LinkAnimated";
