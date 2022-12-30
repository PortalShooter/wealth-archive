import React from 'react';
import cn from 'classnames';
import { useResize } from '@/shared/resize';
import { CarouselControl } from '../../shared/carousel';
import { IconArrow } from '../Icon';

import styles from './Controls.module.scss';

export function Controls({ color, id, controlValue, mode, className, arialabel, onClick, onPress }) {
  const windowSize = useResize();

  return (
    <div className={cn(styles.Controls, windowSize.width < 640 && styles.Controls_Mobile, className)}>
      <div className={cn(styles.Controls__wrapper)}>
        <CarouselControl
          className={cn(styles.Controls__button, styles.Controls__button_left)}
          id={id}
          scrollValue={-controlValue}
          scrollUnits={mode}
          ariaLabel={`${arialabel}. Scroll left`}
          onPress={onPress}
        >
          <IconArrow className={styles.Controls__Ico} direction="left" type="arrow" color={color} />
        </CarouselControl>

        <CarouselControl
          className={cn(styles.Controls__button, styles.Controls__button_right)}
          id={id}
          scrollValue={controlValue}
          scrollUnits={mode}
          ariaLabel={`${arialabel}. Scroll right`}
          onPress={onPress}
        >
          <IconArrow className={styles.Controls__Ico} direction="right" type="arrow" color={color} />
        </CarouselControl>
      </div>
    </div>
  );
}
