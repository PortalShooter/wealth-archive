import { useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "react-responsive";

import { syncScroll } from "@/shared/scroll";

import classNames from "classnames/bind";
import styles from "./Sequence.module.scss";
import { createLoop, LoopInterface } from "@/shared/utils/animation.utils";
const cx = classNames.bind(styles);

const FRAMES_PER_IMAGE = 1;
interface Sequence {
  (props: {
    className?: string;
    sections: number[];
    stops: {
      frame: number,
      loop?: number
    }[];
    width?: string, 
    range: { from: number; to: number };
    path: string;
    onUpdate?: (frame: number) => void;
    onEndForward?: () => void;
    onEndBack?: () => void;
    frames?: number;
  }): React.ReactElement;
}


export const Sequence: Sequence = ({
  className = "",
  sections = [0],
  stops = [{
    frame: 0
  }],
  range = { from: 0, to: 0 },
  path = "",
  width = '100%',
  onUpdate,
  onEndForward,
  onEndBack,
  frames = FRAMES_PER_IMAGE
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const cachedImagesRef = useRef<HTMLImageElement[]>([]);
  const isPhone = useMediaQuery({query: '(max-width: 1023px)'});

  useEffect(() => {
    cachedImagesRef.current = [];

    Array.from(new Array(range.to).keys()).forEach((index) => {
      const src = `/images/sequence/${path}/${
        isPhone ? "v" : "h"
      }/${index}.webp`;
      const image = document.createElement("img");
      cachedImagesRef.current.push(image);

      setTimeout(() => {
        image.src = src;
      }, 5 * index);
    });
  }, [range, path, isPhone]);

  const loopRef = useRef<LoopInterface | undefined>(undefined);
  const currentLoopIndexRef = useRef(0);
  const currentFrameRef = useRef(0);
  const boundStartRef = useRef(0);
  const boundEndRef = useRef(0);
  const scrollDirectionRef = useRef<"forward" | "backwards">("forward");
  const sceneDirecionRef = useRef<"forward" | "backwards">("forward");

  const handleLoop = useCallback((multiplier) => {
    currentLoopIndexRef.current += multiplier;

    if (currentLoopIndexRef.current >= frames) {
      currentLoopIndexRef.current -= frames;

      if (sceneDirecionRef.current === "forward") {
        currentFrameRef.current++;
      } else {
        currentFrameRef.current--;
      }
    }

    if (sceneDirecionRef.current === "forward") {
      if (currentFrameRef.current > range.to) {
        onEndForward && onEndForward();
      }

      if (currentFrameRef.current > boundEndRef.current) {
        currentFrameRef.current = boundStartRef.current;
      }
    } else {
      if (currentFrameRef.current > range.from) {
        onEndBack && onEndBack();
      }

      if (currentFrameRef.current < boundStartRef.current) {
        currentFrameRef.current = boundEndRef.current;
      }
    }

    if (
      imageRef.current &&
      cachedImagesRef.current[currentFrameRef.current] && 
      imageRef.current.src !==
        cachedImagesRef.current[currentFrameRef.current].src
    ) {
      onUpdate && onUpdate(currentFrameRef.current);
      imageRef.current.src =
        cachedImagesRef.current[currentFrameRef.current].src;
    }
  }, []);

  const sequenceSegments: Array<[number, number]> = [];
  sections.forEach((item, index) => {
    if (index > 0) {
      sequenceSegments.push([sections[index - 1], item]);
    }
  })

  const previousScrolledPositionRef = useRef(0);
  const previousSceneIndexRef = useRef(0);

  const handleScroll = useCallback(() => {
    if (syncScroll.get().locked) {
      return;
    }

    const scrolled = syncScroll.get().top;

    if (scrolled > previousScrolledPositionRef.current) {
      scrollDirectionRef.current = "forward";
    } else {
      scrollDirectionRef.current = "backwards";
    }
    previousScrolledPositionRef.current = scrolled;

    let newIndex = 0;
    sequenceSegments.forEach((segment, index) => {
      if (stops[index + 1] === undefined) {
        return;
      }

      if (scrolled >= segment[0]) {
        newIndex = index + 1;
      }
    });

    boundStartRef.current = stops[newIndex].frame;
    boundEndRef.current = stops[newIndex].frame;

    const loop = stops[newIndex].loop;
    if (loop) {
      boundStartRef.current = boundEndRef.current - loop;
    }

    if (newIndex > previousSceneIndexRef.current) {
      sceneDirecionRef.current = "forward";
    } else if (newIndex < previousSceneIndexRef.current) {
      sceneDirecionRef.current = "backwards";
    }

    previousSceneIndexRef.current = newIndex;
  }, [sequenceSegments]);

  useEffect(() => {
    syncScroll.subscribe(handleScroll);

    return () => {
      syncScroll.unsubscribe(handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    loopRef.current = createLoop(handleLoop);
    loopRef.current.start();

    return () => {
      if (loopRef.current) {
        loopRef.current.kill();
      }
    };
  }, [handleLoop]);

  return (
    <div className={cx(styles.Sequence, className)}>
      <div className={cx(styles["Sequence__image-wrapper"])}>
        <img 
          role="presentation"
          className={cx(styles.Sequence__image)}
          ref={imageRef}
          src=""
          alt=""
          style={{minWidth: width ? width : '100%'}}
          loading="lazy"
        />
      </div>
    </div>
  );
};
