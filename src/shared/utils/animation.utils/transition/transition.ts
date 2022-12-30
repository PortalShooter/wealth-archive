import { cssEasings, isEasing } from "../../../../app/config/ease.config";
import { Easing } from "../../../../app/config/ease.config";

interface TransitionOptions {
  delay?: number | number[];
  ease?: Easing | Easing[] | string;
  skipFrame?: boolean
}

interface Styles {
  [index: string]: string | number;
}

export interface Transition {
  (
    elements: HTMLElement | HTMLElement[] | HTMLCollection,
    duration: number[] | number,
    styles: Styles,
    options?: TransitionOptions
  ): void;
}

interface StylesProperties {
  [index: string]: number | string;
}

export const transition: Transition = (elements, duration, styles, options) => {
  /**
   * Gets transitionProperty CSS string from styles object
   * @param properties Styles object
   * @returns CSS string
   */
  const getPropertieString = (properties:StylesProperties) => {
    return Object.keys(properties).join(", ");
  };

  /**
   * Transforms array of numbers into a string for css transition properties
   * @param values Values or value to transform into a string
   * @param suffix Suffix to use with a style (e.g "s")
   * @param numberOfStyles Number of css styles passed to the transition function
   * @returns Css string
   */
  const getValsString = (
    values: Array<number | string> | number | string,
    suffix: string,
    numberOfStyles: number
  ): string => {
    let styleString = "";

    suffix = suffix || "";

    if (!Array.isArray(values)) {
      values = [values];
    }

    for (let i = values.length - 1; i < numberOfStyles; i++) {
      values[i] = values[values.length - 1];
    }

    for (let i = 0; i < numberOfStyles; i++) {
      if (i !== 0) {
        styleString += ", ";
      }
      styleString += values[i] + suffix;
    }

    return styleString;
  };

  /**
   * Transform a transition name into css transitionTimingFunction propertie
   * @param ease Bezier easing or id from the easing config
   * @returns css string with transition easing
   */
  const getEase = (ease: string): string => {
    if (isEasing(ease)) {
      return cssEasings[ease];
    } else {
      if (ease.indexOf("cubic-bezier") !== 0) {
        throw new Error(
          "Invalid easing value"
        );
      }
      return ease;
    }
  };

  const defaultOptions = {
    delay: 0,
    ease: "ease",
  };
  options = {...defaultOptions, ...options};

  const easeings: string[] = Array.isArray(options.ease) ? options.ease.map(getEase) :[getEase(options.ease ? options.ease : "default")];
  const delays: number[] = Array.isArray(options.delay) ? options.delay : options.delay ? [options.delay] : [0];

  const numberOfStyles = getPropertieString(styles).split(" ").length;

  /**
   * Set styles for elements
   */
  const setStyles = () => {
    if (HTMLCollection.prototype.isPrototypeOf(elements)) {
      elements = Array.prototype.slice.call(elements);
    } else if (!Array.isArray(elements)) {
      elements = [elements as HTMLElement];
    }

    (elements as HTMLElement[]).forEach(function (element) {
      element.style.transitionProperty = getPropertieString(styles);
      element.style.transitionDuration = getValsString(
        duration,
        "s",
        numberOfStyles
      );
      element.style.transitionDelay = getValsString(
        delays,
        "s",
        numberOfStyles
      );
      element.style.transitionTimingFunction = getValsString(
        easeings,
        "",
        numberOfStyles
      );
  
      for (let style in styles) {
        if (!(style in element.style)) {
          throw new Error(`style ${style}  does not exist on element`);
        } else {
          if (style === "transform") {
            element.style.transform = `${styles.transform}`;
          } else {
            element.style.setProperty(style, `${styles[style]}`);
          }
        }
      }
    });
  }

  if (options.skipFrame) {
    // Do not replace with requestAnimation frame. We need to wait for at least a duration of 1 frame
    setTimeout(() => {
      setStyles();
    }, 1000 / 60);
  } else {
    setStyles();
  }
};
