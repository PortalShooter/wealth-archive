import React, {useCallback, useEffect, useRef, useState} from 'react';

// Styles
import classnames from "classnames/bind";
import styles from './AutoScroll.module.scss';
import {createLoop} from "@/shared/utils/animation.utils";
import {syncScroll} from "@/shared/scroll";

const cn = classnames.bind(styles);

function AutoScroll() {
  const [curr, setCurr] = useState(0);
  const [speed, setSpeed] = useState(25);
  const isRun = useRef(false);
  const loopRef = useRef(null);
  const scrollPositionRef = useRef(null);
  const currRef = useRef(0);

  const handleScroll = useCallback(() => {
    scrollPositionRef.current = syncScroll.get().top;
    currRef.current = scrollPositionRef.current;
  }, []);

  const loop = useCallback(() => {
    setCurr(scrollPositionRef.current);

    if (isRun.current) {
        window.scroll(0, Math.round(scrollPositionRef.current) + speed * 0.1);
    }
  }, [isRun, speed]);

  useEffect(() => {
    loopRef.current = createLoop(loop);
    loopRef.current.start();
    handleScroll();
    syncScroll.subscribe(handleScroll);

    return () => {
      syncScroll.unsubscribe(handleScroll);
      loopRef.current && loopRef.current.kill();
    };
  }, [loop]);


  const handleSpeedChange = (ev) => {
    setSpeed(Number(ev.target.value));
  }

  const handleStartClick = (ev) => {
    isRun.current = true
  }

  const handleStopClick = (ev) => {
    isRun.current = false
  }

  const handleToTopClick = (ev) => {
    currRef.current = 0;
    window.scroll(0, 0);
  }

  return (
    <div className={cn('autoscroll')}>

      <div className={cn('autoscroll__text')}>
        Autoscroll
      </div>
      <div className={cn('autoscroll__text')}>
        {Math.round(scrollPositionRef.current)}
      </div>

      <div className={cn('autoscroll__controls')}>
        <button className={cn('autoscroll__btn')} onClick={handleStartClick}>
          start
        </button>
        <button className={cn('autoscroll__btn')} onClick={handleStopClick}>
          stop
        </button>
        <button className={cn('autoscroll__btn')} onClick={handleToTopClick}>
          to top
        </button>
      </div>
      <div className={cn('autoscroll__controls')}>
        <input type="text" className={cn('autoscroll__input')} value={speed} onChange={handleSpeedChange}/>
        <span className={cn('autoscroll__comment')}>speed</span>
      </div>
    </div>
  )
}

export default AutoScroll;
