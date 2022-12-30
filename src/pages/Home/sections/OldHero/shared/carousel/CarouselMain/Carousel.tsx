import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  CSSProperties,
} from "react";
import { syncResize } from "../../resize";
import { CarouselItem } from "./CarouselItem";
import { Resize, ResizeSimple, ResizeContinuous } from "./resize";
import { Motion, MotionCallback } from "./motion";
import { PointerControls, PointerCallback } from "./pointerControls";
import { simpleEase } from "../../utils/ease.utils";
import { carouselEventEmitter, CarouselEvent } from "../useCarousel";
import { FocusControls } from "./focusControls";
import { TabControls } from "./tabControls";
import { ChildrenAnimation, noChildrenAnimation } from "./animations/children/";
import { CompositeAnimation } from "../../utils/animation.utils";
import { noTriggerAnimation, TriggerAnimation } from "./animations/trigger";

// TODO: Interactive auto, Composite animations
// WIP: Focus controls to check what current index is and move to next. On continuous scroll to closest, ruther then index

interface CarouselSizes {
  containerWidth: number;
  itemWidth: number;
  gapWidth: number;
  totalWidth: number;
  leftShift: number;
  numberOfFakeElements: number;
}

interface ElementsPerScreen {
  breakpoint: number;
  number: number;
}

interface PositionData {
  x: number;
  delta: number;
}

interface PositionsObject {
  [index: string]: PositionData;
}

interface Positions extends PositionsObject {
  motion: PositionData;
}

export interface CarouselProps {
  id: string;
  /**
   * Carousel mode. Should it be continuous or should it be limited by the wrapper.
   */
  mode?: "simple" | "continuous";
  /**
   * Carousel alignment.
   */
  align?: "left" | "center";
  /**
   * Carousel drag. If "auto", then carousel will be draggable only if its track width is higher then the wrapper width. Will be ignored if mode is set to continuous.
   */
  interactive?: "always" | "auto" | "never";
  /**
   * Carousel will resize it's elements according to the elementMaxWidth and elementsPerScreen properties.
   */
  resizeElements?: boolean;
  /**
   * Gap between the elements in pixels
   */
  gap?: number;
  /**
   * Additional width outside of the container
   */
  padding?: number;
  /**
   * Outer padding measurment units
   */
  paddingUnits?: "px" | "vw" | "%";
  /**
   * Width of the elements in pixels
   */
  itemWidth?: number;
  /**
   * Maximum width of the children in pixels
   */
  maximumItemWidth?: number;
  /**
   * Number of displayed children per breakpoing. The syntax looks like this: [{breakpoint: 320, number: 1}, {breakpoint: 640, number: 2}, {breakpoint: 1000, number:3}]
   */
  elementsPerScreen?: ElementsPerScreen[];
  /**
   * Maximum element width.
   */
  elementMaxWidth?: number;
  /**
   * Carousel will try to autoalign its children with the wrapper.
   */
  inertionCorrection?: boolean;
  /**
   * Inertion decay factor
   */
  inertionDecay?: number;
  /**
   * Inertion interpolation function. Function that is used to calculate the inertion.
   */
  inertionInterpolationFunction?: (
    value: number,
    targetValue: number,
    inertionDecay: number
  ) => number;
  /**
   * Applies a fix to the parent section. When user tabs through the interactive elements inside of the carousel, browser may deсide to scroll the closest "overflow:hidden" element, wich is ususally a section.
   */
  applySectionScrollFix?: boolean;
  /**
   * Prop for trigger animation
   */
  triggered?: boolean;
  /**
   * Function that handles the trigger animation
   */
  triggerFunction?: TriggerAnimation;
  /**
   * Animation function for children
   */
  childrenAnimationFunction?: ChildrenAnimation;
  /**
   * Aria Label that will be added to let users know that carousel is controllable with keyboard
   */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactElement[];
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Carousel = ({
  id,
  mode = "simple",
  inertionCorrection = false,
  align = "left",
  interactive = "always",
  gap = 30,
  padding = 0,
  paddingUnits = "px",
  itemWidth = 300,
  maximumItemWidth = 750,
  resizeElements = true,
  elementsPerScreen = [
    {
      breakpoint: 320,
      number: 1,
    },
    {
      breakpoint: 767,
      number: 2,
    },
    {
      breakpoint: 1024,
      number: 3,
    },
  ],
  inertionDecay = 16,
  inertionInterpolationFunction = simpleEase,
  applySectionScrollFix = true,
  triggered = false,
  childrenAnimationFunction = noChildrenAnimation,
  triggerFunction = noTriggerAnimation,
  ariaLabel = "Carousel. Use arrow keys to change slides.",
  className,
  style,
  children,
}: CarouselProps) => {
  /**
   * Carousel track element
   */
  const track = useRef<HTMLDivElement | null>(null);

  /**
   * Carousel html element
   */
  const wrapper = useRef<HTMLDivElement | null>(null);

  /**
   * Carousel Children
   */
  const [items, setItems] = useState<JSX.Element[]>([]);

  /**
   * Object with every value that can influence the position of the carosel track.
   */
  const carouselPosition = useRef<Positions>({
    motion: {
      x: 0,
      delta: 0,
    },
  });

  /**
   * Used in resize functon to align the children
   */
  const elementsPerScreenRef = useRef<ElementsPerScreen[]>([]);

  if (
    elementsPerScreenRef.current.length !== elementsPerScreen.length ||
    !elementsPerScreenRef.current.reduce((prev, current, index) => {
      return (
        prev &&
        current.breakpoint === elementsPerScreen[index].breakpoint &&
        current.number === elementsPerScreen[index].number
      );
    }, true)
  ) {
    elementsPerScreenRef.current = elementsPerScreen;
  }

  /**
   * Total number of children (except for the fake ones, created by carousel)
   */
  const total = children.length;

  /**
   * Actual sizes of the carusel and its children
   */
  const carouselSizesRef = useRef<CarouselSizes>({
    containerWidth: 0,
    itemWidth: 0,
    gapWidth: 0,
    totalWidth: 0,
    leftShift: 0,
    numberOfFakeElements: 0,
  });

  /**
   * Refs to the children
   */
  let childrenRefs: React.MutableRefObject<
    React.RefObject<HTMLDivElement | null>[]
  > = useRef([]);

  /**
   * Indexes and refs to children, including fake ones. Used for animations
   */

  let animatedChildredRef = useRef<
    {
      index: number;
      fake: boolean;
      ref: React.RefObject<HTMLDivElement | null>;
      compositeAnimationRef: React.RefObject<CompositeAnimation | null>;
    }[]
  >([]);

  /**
   * Position values of the track
   */
  const positionRef = useRef<{
    actual: number;
    unshifted: number;
    unnormalized: number;
  }>({
    actual: 0,
    unshifted: 0,
    unnormalized: 0,
  });

  /**
   * If element was triggered already
   */
  const triggeredRef = useRef<boolean>(triggered);

  /**
   * If trigger was initialized
   */
  const triggerInitializedRef = useRef<boolean>(false);

  /**
   * State of the carousel sizes
   */
  const [carouselSizes, setCarouselSizes] = useState<CarouselSizes>(
    carouselSizesRef.current
  );

  /**
   * State with all the carousel wrapper styles
   */
  const [wrapperStyles, setwrapperStyles] = useState<CSSProperties>(
    style || {}
  );
  /**
   * Current resize module
   */
  const resizeModule = useRef<Resize>();

  /**
   * Current pointer contols module
   */
  const pointersControlModule = useRef<PointerControls>();

  /**
   * Current motion module
   */
  const motionModule = useRef<Motion>();

  /**
   * Current focus controls module
   */
  const focusControlsModule = useRef<FocusControls>();

  /**
   * Current tab controls module
   */
  const tabControlsModule = useRef<TabControls>();

  /**
   * Sets main track position
   */
  const setPosition = useCallback(
    (forced?: boolean) => {
      if (!track.current) return;

      let position = 0;
      let delta = 0;

      for (let key in carouselPosition.current) {
        position += carouselPosition.current[key].x;
        delta += carouselPosition.current[key].delta;
      }

      const unnormalizedPosition = position;
      positionRef.current.unnormalized = position;

      if (mode === "continuous" && carouselSizesRef.current.totalWidth > 0) {
        while (position < -carouselSizesRef.current.totalWidth) {
          position += carouselSizesRef.current.totalWidth;
        }

        while (position > 0) {
          position -= carouselSizesRef.current.totalWidth;
        }
      }

      const unshiftedPosition = position;
      positionRef.current.unshifted = position;

      position += carouselSizesRef.current.leftShift;

      if (align === "center") {
        position +=
          carouselSizesRef.current.containerWidth / 2 -
          carouselSizesRef.current.itemWidth / 2;
      }

      if (forced || Math.abs(position - positionRef.current.actual) > 0.05) {
        childrenAnimationFunction({
          carouselPosition: unshiftedPosition,
          unnormalizedCarouselPosition: unnormalizedPosition,
          containerWidth: carouselSizesRef.current.containerWidth,
          elements: animatedChildredRef.current.map((ch, i) => {
            return {
              ref: ch.ref,
              fake: ch.fake,
              index: ch.index,
              compositeAnimationRef: ch.compositeAnimationRef,
              position:
                (i - carouselSizesRef.current.numberOfFakeElements) *
                (carouselSizesRef.current.itemWidth +
                  carouselSizesRef.current.gapWidth),
            };
          }),
          itemWidth: carouselSizesRef.current.itemWidth,
          gapWidth: carouselSizesRef.current.gapWidth,
          speed: delta,
          align: align,
          totalWidth: carouselSizesRef.current.totalWidth,
        });

        positionRef.current.actual = position;
        track.current.style.transform = `translateX(${position}px) translateZ(0px)`;
      }
    },
    [mode, align, childrenAnimationFunction]
  );

  /**
   * Resize handler. Handles track size, children sizes and the number of fake elements, needed for a contionius carousel to work
   */
  const handleResize = useCallback(() => {
    if (!resizeModule.current) return;

    const sizes = resizeModule.current.resize();

    if (sizes) {
      carouselSizesRef.current = {
        containerWidth: sizes.containerWidth,
        gapWidth: sizes.gapWidth,
        itemWidth: sizes.itemWidth,
        totalWidth: sizes.totalWidth,
        leftShift: sizes.leftShift,
        numberOfFakeElements: sizes.numberOfFakeElements,
      };

      setCarouselSizes(carouselSizesRef.current);

      setPosition();
    }
  }, [setPosition]);

  /**
   * Motion handler. Fires when positon of the track changes for whatever reason
   */
  const handleMotion = useCallback<MotionCallback>(
    (motionData) => {
      if (
        Math.abs(carouselPosition.current.motion.x - motionData.position) >
          0.05 ||
        Math.abs(carouselPosition.current.motion.delta - motionData.delta)
      ) {
        carouselPosition.current.motion.x = motionData.position;
        carouselPosition.current.motion.delta = motionData.delta;

        setPosition();
      }
    },
    [setPosition]
  );

  /**
   * Drag & Touch handler
   */
  const handlePointer = useCallback<PointerCallback>(
    ({ dragging, pointerX, touchAction }) => {
      if (!pointersControlModule.current) return;

      if (dragging) {
        setwrapperStyles((prevStyles) => {
          return prevStyles.cursor === "grabbing" &&
            prevStyles.touchAction === touchAction
            ? prevStyles
            : {
                ...prevStyles,
                cursor: "grabbing",
                touchAction: touchAction ? touchAction : prevStyles.touchAction,
              };
        });
      } else {
        setwrapperStyles((prevStyles) => {
          return prevStyles.cursor === "grab" &&
            prevStyles.touchAction === touchAction
            ? prevStyles
            : {
                ...prevStyles,
                cursor: "grab",
                touchAction: touchAction ? touchAction : prevStyles.touchAction,
              };
        });
      }

      if (motionModule.current) {
        motionModule.current.applyDrag({
          isDragActive: dragging,
          dragPosition: pointerX || 0,
        });
      }
    },
    []
  );

  /**
   * Carousel event handler
   */
  const handleEvent = useCallback(
    (event: CarouselEvent) => {
      if (!event || event.payload.id !== id || !motionModule.current) {
        return;
      }

      let position =
        event.type === "carousel:to"
          ? -event.payload.scrollValue
          : event.type === "carousel:toIndex"
          ? -event.payload.scrollValue *
            (carouselSizesRef.current.itemWidth +
              carouselSizesRef.current.gapWidth)
          : event.type === "carousel:toPercent"
          ? -event.payload.scrollValue *
            (carouselSizesRef.current.totalWidth -
              carouselSizesRef.current.containerWidth)
          : event.type === "carousel:toVw"
          ? -event.payload.scrollValue * syncResize.get().width
          : event.type === "carousel:by"
          ? positionRef.current.unnormalized - event.payload.scrollValue
          : event.type === "carousel:byIndex"
          ? positionRef.current.unnormalized -
            event.payload.scrollValue *
              (carouselSizesRef.current.itemWidth +
                carouselSizesRef.current.gapWidth)
          : event.type === "carousel:byPercent"
          ? positionRef.current.unnormalized -
            (event.payload.scrollValue / 100) *
              carouselSizesRef.current.containerWidth
          : event.type === "carousel:byVw"
          ? positionRef.current.unnormalized -
            event.payload.scrollValue * syncResize.get().width
          : 0;

      if (mode === "simple") {
        position = Math.min(
          0,
          Math.max(
            -(
              carouselSizesRef.current.totalWidth -
              carouselSizesRef.current.containerWidth
            ),
            position
          )
        );
      }

      if (Math.abs(position - positionRef.current.unnormalized) < 0.1) {
        return;
      }

      motionModule.current.applyTransition({
        to: position,
      });
    },
    [id, mode]
  );

  /**
   * Init event emitter and resize handlers
   */
  useEffect(() => {
    carouselEventEmitter.subscribe(handleEvent);
    syncResize.subscribe(handleResize);

    return () => {
      carouselEventEmitter.unsubscribe(handleEvent);
      syncResize.unsubscribe(handleResize);
    };
  }, [handleEvent, handleResize]);

  /**
   * Intit resize module
   */
  useIsomorphicLayoutEffect(() => {
    if (track.current && wrapper.current) {
      const options = {
        mode,
        resizeElements,
        elementsPerScreen: elementsPerScreenRef.current,
        gap,
        itemWidth,
        padding,
        paddingUnits,
        maximumItemWidth,
        total,
        container: track.current,
        outerWrapper: wrapper.current,
      };

      if (mode === "continuous") {
        resizeModule.current = new ResizeContinuous(options);
      } else if (mode === "simple") {
        resizeModule.current = new ResizeSimple(options);
      }

      handleResize();
    }

    return () => {
      if (resizeModule.current) {
        resizeModule.current.destroy();
        resizeModule.current = undefined;
      }
    };
  }, [
    mode,
    resizeElements,
    gap,
    itemWidth,
    padding,
    paddingUnits,
    maximumItemWidth,
    total,
    track.current,
    wrapper.current,
    handleResize,
  ]);

  /**
   * Init Pointer controls module
   */
  useIsomorphicLayoutEffect(() => {
    if (interactive === "always" && wrapper.current) {
      pointersControlModule.current = new PointerControls({
        outerWrapper: wrapper.current,
        callback: handlePointer,
      });

      setwrapperStyles((prevStyles) => {
        return {
          ...prevStyles,
          cursor: "grab",
          userSelect: "none",
          MozUserSelect: "none",
          WebkitTouchCallout: "none",
          touchAction: "pan-y",
        };
      });
    }

    return () => {
      if (pointersControlModule.current) {
        pointersControlModule.current.destroy();
        pointersControlModule.current = undefined;

        setwrapperStyles((prevStyles) => {
          return {
            ...prevStyles,
            cursor: "auto",
            userSelect: "auto",
            MozUserSelect: "auto",
            WebkitTouchCallout: "default",
            touchAction: "auto",
          };
        });
      }
    };
  }, [interactive, handlePointer]);

  /**
   * Init Focus module
   */
  useIsomorphicLayoutEffect(() => {
    if (interactive === "always" && wrapper.current) {
      focusControlsModule.current = new FocusControls({
        id,
        container: wrapper.current,
        ariaLabel,
      });
    }
    return () => {
      if (focusControlsModule.current) {
        focusControlsModule.current.destroy();
        focusControlsModule.current = undefined;
      }
    };
  }, [id, interactive, ariaLabel]);

  /**
   * Init Motion module
   */
  useEffect(() => {
    motionModule.current = new Motion({
      position: carouselPosition.current.motion.x,
      mode,
      itemWidth: carouselSizesRef.current.itemWidth,
      gapWidth: carouselSizesRef.current.gapWidth,
      totalWidth: carouselSizesRef.current.totalWidth,
      containerWidth: carouselSizesRef.current.containerWidth,
      inertionCorrection,
      inertionDecay,
      inertionInterpolationFunction,
      motionCallback: handleMotion,
    });

    return () => {
      if (motionModule.current) {
        motionModule.current.destroy();
      }
    };
  }, [
    mode,
    carouselSizesRef.current.itemWidth,
    carouselSizesRef.current.gapWidth,
    carouselSizesRef.current.totalWidth,
    carouselSizesRef.current.containerWidth,
    inertionCorrection,
    inertionDecay,
    inertionInterpolationFunction,
    handleMotion,
  ]);

  /**
   * Creating elements, Fake elements, Tab module
   */
  useEffect(() => {
    childrenRefs.current = [];
    animatedChildredRef.current = [];

    // const tr:React.MutableRefObject<boolean | null> = useRef(null);

    let newItems = children.map((ch, index) => {
      const ref = React.createRef<HTMLDivElement | null>();
      const compositeAnimationRef =
        React.createRef<CompositeAnimation | null>();

      childrenRefs.current.push(ref);

      animatedChildredRef.current.push({
        index,
        ref,
        fake: false,
        compositeAnimationRef,
      });

      const style: React.CSSProperties = {
        ...ch.props.style,
        width: carouselSizes.itemWidth,
        marginRight: carouselSizes.gapWidth,
        flexShrink: 0,
        flexGrow: 0,
      };

      return (
        <CarouselItem
          carouselItemRef={ref}
          fake={false}
          compositeAnimationRef={compositeAnimationRef}
          className={ch.props.className}
          style={style}
          key={ch.key}
        >
          {ch.props.children}
        </CarouselItem>
      );
    });

    // Creating fake elements
    const fakeItemsBefore: JSX.Element[] = [];
    const fakeItemsAfter: JSX.Element[] = [];

    for (let i = 0; i < carouselSizes.numberOfFakeElements; i++) {
      const j = i % total;
      const refBefore = React.createRef<HTMLDivElement>();
      const compositeAnimationRefBefore = React.createRef<CompositeAnimation>();

      fakeItemsBefore.unshift(
        <CarouselItem
          carouselItemRef={refBefore}
          fake={true}
          compositeAnimationRef={compositeAnimationRefBefore}
          className={newItems[total - j - 1].props.className}
          style={newItems[total - j - 1].props.style}
          key={`fake-1-${newItems[total - j - 1].key}-${Math.floor(i / total)}`}
        >
          {newItems[total - j - 1].props.children}
        </CarouselItem>
      );

      animatedChildredRef.current.unshift({
        index: total - j - 1,
        ref: refBefore,
        fake: true,
        compositeAnimationRef: compositeAnimationRefBefore,
      });

      const refAfter = React.createRef<HTMLDivElement>();
      const compositeAnimationRefAfter = React.createRef<CompositeAnimation>();

      fakeItemsAfter.push(
        <CarouselItem
          carouselItemRef={refAfter}
          fake={true}
          compositeAnimationRef={compositeAnimationRefAfter}
          className={newItems[j].props.className}
          style={newItems[j].props.style}
          key={`fake-0-${newItems[j].key}-${Math.floor(i / total)}`}
        >
          {newItems[j].props.children}
        </CarouselItem>
      );

      animatedChildredRef.current.push({
        index: j,
        ref: refAfter,
        fake: true,
        compositeAnimationRef: compositeAnimationRefAfter,
      });
    }

    Array.prototype.unshift.apply(newItems, fakeItemsBefore);
    newItems = newItems.concat(fakeItemsAfter);

    setItems(newItems);

    // Init Tab Module

    if (interactive === "always" && wrapper.current) {
      tabControlsModule.current = new TabControls({
        id,
        container: wrapper.current,
        childrenRefs: childrenRefs.current,
        applySectionScrollFix,
      });
    }

    return () => {
      if (tabControlsModule.current) {
        tabControlsModule.current.destroy();
        tabControlsModule.current = undefined;
      }
    };
  }, [
    children,
    carouselSizes.numberOfFakeElements,
    carouselSizes.itemWidth,
    carouselSizes.gapWidth,
    applySectionScrollFix,
    id,
    interactive,
    total,
  ]);

  useIsomorphicLayoutEffect(() => {
    setPosition(true);
  });

  /**
   * Trigger module initial
   */
  useEffect(() => {
    if (triggerInitializedRef.current) {
      return;
    }

    if (
      animatedChildredRef.current.length &&
      animatedChildredRef.current.reduce((prev, cur) => {
        return (
          prev &&
          cur.ref.current !== null &&
          cur.compositeAnimationRef.current !== null
        );
      }, true)
    ) {
      triggerInitializedRef.current = true;

      triggerFunction({
        align: align,
        carouselPosition: positionRef.current.unshifted,
        containerWidth: carouselSizesRef.current.containerWidth,
        elements: animatedChildredRef.current.map((ch, i) => {
          return {
            ref: ch.ref,
            fake: ch.fake,
            index: ch.index,
            compositeAnimationRef: ch.compositeAnimationRef,
            position:
              (i - carouselSizesRef.current.numberOfFakeElements) *
              (carouselSizesRef.current.itemWidth +
                carouselSizesRef.current.gapWidth),
          };
        }),
        gapWidth: carouselSizesRef.current.gapWidth,
        itemWidth: carouselSizesRef.current.itemWidth,
        totalWidth: carouselSizesRef.current.totalWidth,
        triggered: triggeredRef.current,
        immidiate: true,
      });
    }
  });

  /**
   * Trigger module on trigger
   */
  useEffect(() => {
    if (triggered === triggeredRef.current) {
      return;
    }

    triggeredRef.current = triggered;

    triggerFunction({
      align: align,
      carouselPosition: positionRef.current.unshifted,
      containerWidth: carouselSizesRef.current.containerWidth,
      elements: animatedChildredRef.current.map((ch, i) => {
        return {
          ref: ch.ref,
          fake: ch.fake,
          index: ch.index,
          compositeAnimationRef: ch.compositeAnimationRef,
          position:
            (i - carouselSizesRef.current.numberOfFakeElements) *
            (carouselSizesRef.current.itemWidth +
              carouselSizesRef.current.gapWidth),
        };
      }),
      gapWidth: carouselSizesRef.current.gapWidth,
      itemWidth: carouselSizesRef.current.itemWidth,
      totalWidth: carouselSizesRef.current.totalWidth,
      triggered: triggered,
      immidiate: false,
    });
  }, [triggered, align, triggerFunction]);

  /**
   * Container styles
   */
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexWrap: "nowrap",
    width: carouselSizes.totalWidth ? carouselSizes.totalWidth : "100%",
  };
  // console.log(wrapperStyles,className,containerStyles)
  return (
    <div ref={wrapper} className={className} style={{...wrapperStyles,opacity:containerStyles?1:0}}>
      <div ref={track} style={containerStyles}>
        {items}
      </div>
    </div>
  );
};
