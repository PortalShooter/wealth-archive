import React from 'react';
import {Scrollbar} from "react-scrollbars-custom";

import classNames from 'classnames/bind';
import styles from './CustomScrollbar.module.scss';

const cn = classNames.bind(styles);

function CustomScrollbar(props) {
  const {children, width, height} = props;
  return (
    <Scrollbar
      style={{width, height}}
      noScrollY
      contentProps={{
        renderer: localProps => {
          const { elementRef, ...restProps } = localProps;
          return <span {...restProps} ref={elementRef} className={cn("custom-scrollbar__content")} />;
        }
      }}
      scrollerProps={{
        renderer: localProps => {
          const { elementRef, ...restProps } = localProps;
          return <span {...restProps} ref={elementRef} className={cn("custom-scrollbar__scroller")} />;
        }
      }}
      trackXProps={{
        renderer: localProps => {
          const { elementRef, ...restProps } = localProps;
          return <span {...restProps} ref={elementRef} className={cn("custom-scrollbar__track-horizontal")} />;
        }
      }}
      thumbXProps={{
        renderer: localProps => {
          const { elementRef, ...restProps } = localProps;
          return <span {...restProps} ref={elementRef} className={cn("custom-scrollbar__thumb-horizontal")} />;
        }
      }}
      {...props}
    >
      {children}
    </Scrollbar>
  );
}

export default CustomScrollbar;
