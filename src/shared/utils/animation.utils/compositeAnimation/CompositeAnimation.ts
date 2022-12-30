import { CSSProperties } from "react";

// TODO: Redo it with matrices?

interface CompositeAnimationOptions {
  element: HTMLElement;
}

interface StrictTransformObject {
  x: number;
  y: number;
  z: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
}

type TransformObject = Partial<StrictTransformObject>;

interface CompositeAnimationProperties {
  transform?: TransformObject;
  opacity?: number;
}

interface CompositeAnimationPropertieList {
  [index: string]: CompositeAnimationProperties;
}

const defaultProps: CompositeAnimationProperties = {
  transform: {},
  opacity: 1,
};

/**
 * Stores values of opacity & transform from different sorces, composites them and applies them to an element
 */
export interface CompositeAnimation {
  /**
   * Set values of opacity & transform. Use unique id for each script that uses this composite value
   */
  set: (id: string, props: CompositeAnimationProperties) => void;
  /**
   * Gets composited values of opacity & transform
   */
  getRaw: (ids?: string[]) => {
    transform: StrictTransformObject;
    opacity: number;
  };
  /**
   * Gets opacity & CSS string for transform
   */
  getCSS: () => {
    opacity: string;
    transform: string;
  };
}

export class CompositeAnimation {
  private props: CompositeAnimationPropertieList = {};
  private element: HTMLElement;

  constructor({ element }: CompositeAnimationOptions) {
    this.element = element;
  }

  set: CompositeAnimation["set"] = (id, props) => {
    this.props[id] = {
      ...defaultProps,
      ...props,
    };

    const calculatedProps = this.getCSS();

    this.element.style.opacity = calculatedProps.opacity;
    this.element.style.transform = calculatedProps.transform;
  };

  getRaw: CompositeAnimation["getRaw"] = (ids) => {
    const defaultTransform: StrictTransformObject = {
      x: 0,
      y: 0,
      z: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    };

    let opacity = 1;
    let transform: StrictTransformObject = { ...defaultTransform };

    Object.keys(this.props).forEach((key) => {
      if (ids && !ids.includes(key)) {
        return;
      }

      if (this.props[key]) {
        const newTransform: StrictTransformObject = {...defaultTransform, ...this.props[key].transform};

        const newOpacity:number = this.props[key].opacity === undefined ? 1 : (this.props[key].opacity as number);
        opacity *= newOpacity;

        transform = {
          x: transform.x + newTransform.x,
          y: transform.y + newTransform.y,
          z: transform.z + newTransform.z,
          rotate: transform.rotate + newTransform.rotate,
          rotateX: transform.rotateX + newTransform.rotateX,
          rotateY: transform.rotateX + newTransform.rotateY,
          rotateZ: transform.rotateX + newTransform.rotateZ,
          scale: transform.scale * newTransform.scale,
          scaleX: transform.scaleX * newTransform.scaleX,
          scaleY: transform.scaleY * newTransform.scaleY,
          scaleZ: transform.scaleZ * newTransform.scaleZ,
        };
      }
    });

    return {
      opacity,
      transform,
    };
  };

  getCSS: CompositeAnimation["getCSS"] = () => {
    const rawProps = this.getRaw();

    return {
      opacity: `${rawProps.opacity}`,
      transform: `translateX(${rawProps.transform.x}px) translateY(${
        rawProps.transform.y
      }px) translateZ(${rawProps.transform.z}px) rotateX(${
        rawProps.transform.rotateX
      }rad) rotateY(${rawProps.transform.rotateY}rad) rotateZ(${
        rawProps.transform.rotateZ + rawProps.transform.rotate
      }rad) scaleX(${
        rawProps.transform.scaleX * rawProps.transform.scale
      }) scaleY(${
        rawProps.transform.scaleY * rawProps.transform.scale
      }) scaleZ(${rawProps.transform.scaleZ})`,
    };
  };
}
