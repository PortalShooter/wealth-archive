import React, {forwardRef, useEffect, useState} from "react";
import {default as NextLink} from "next/link";

import classnames from "classnames/bind";
import styles from "./Link.module.scss";

const cn = classnames.bind(styles);

export const Link = forwardRef(
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
        >
          {children}
        </a>
      </NextLink>
    );
  }
);

Link.displayName = "Link";
