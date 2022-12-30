import { createLoop } from "../../../utils/animation.utils";
import { simpleTween, SimpleTween } from "../../../utils/animation.utils";
import { easingTypes } from "../../../../app/config/ease.config";
import type { CarouselProps } from "../Carousel";

export interface Motion {
  /**
   * Applies drag event
   */
  applyDrag: (dragOptions: {
    isDragActive: boolean;
    dragPosition: number;
  }) => void;
  /**
   * Applies transition event
   */
  applyTransition: (transitionOptions: { to: number }) => void;
  /**
   * Destructor
   */
  destroy: VoidFunction;
}

interface MotionData {
  position: number;
  delta: number;
}

export interface MotionCallback {
  (motionData: MotionData): void;
}

export interface MotionOptions {
  position: number;
  mode: CarouselProps["mode"];
  motionCallback: MotionCallback;
  inertionCorrection: boolean;
  inertionDecay: number;
  containerWidth: number;
  itemWidth: number;
  gapWidth: number;
  totalWidth: number;
  inertionInterpolationFunction: (
    value: number,
    targetValue: number,
    interpolationFactor: number
  ) => number;
}

export class Motion {
  private inertionDecay;
  private previousDragPosition: undefined | number = undefined;
  private speed = 0;
  private delta = 0;
  private mode;
  private correction;
  private localCarouselPosition;
  private isDragActive = false;
  private isAnimationActive = false;
  private isAnimationLocked = false;
  private dragPosition = 0;
  private loopFunction;
  private sizes: {
    itemWidth: number;
    gapWidth: number;
    totalWidth: number;
    containerWidth: number;
  };
  private speedCorrection = 0;
  private previousDeviation = 0;
  private interpolationFunction;
  private callback;
  private tween: SimpleTween<number> | undefined;

  constructor(options: MotionOptions) {
    this.interpolationFunction = options.inertionInterpolationFunction;
    this.inertionDecay = options.inertionDecay;
    this.mode = options.mode;
    this.correction = options.inertionCorrection;
    this.sizes = {
      itemWidth: options.itemWidth,
      gapWidth: options.gapWidth,
      totalWidth: options.totalWidth,
      containerWidth: options.containerWidth,
    };

    this.callback = options.motionCallback;

    this.localCarouselPosition = options.position;

    this.loopFunction = createLoop(this.loop);
    this.loopFunction.start();
  }

  destroy = () => {
    if (this.tween) {
      this.tween.kill();
    }
    this.loopFunction.kill();
  };

  /**
   * Inertion calculation
   */
  private loop = () => {
    if (this.isDragActive) {
      if (this.previousDragPosition !== undefined) {
        this.speed = this.previousDragPosition - this.dragPosition;
      } else {
        this.speed = 0;
        this.speedCorrection = 0;
      }

      this.previousDragPosition = this.dragPosition;
    } else if (this.isAnimationActive) {
      this.speed = 0;
      this.speedCorrection = 0;
    } else {
      this.speed = this.interpolationFunction(
        this.speed,
        0,
        this.inertionDecay
      );

      if (Math.abs(this.speed) < 0.005) {
        this.speed = 0;
      }

      if (this.correction) {
        this.correctSpeed();
      }
    }

    const previousPosition = this.localCarouselPosition;
    this.localCarouselPosition -= this.speed;

    /**
     * Edge correction
     */
    if (!this.isDragActive && this.mode === "simple") {
      if (this.localCarouselPosition > 0) {
        this.localCarouselPosition = this.interpolationFunction(
          this.localCarouselPosition,
          0,
          this.inertionDecay / 3
        );
      } else if (
        this.localCarouselPosition <
        -(this.sizes.totalWidth - this.sizes.containerWidth)
      ) {
        this.localCarouselPosition = this.interpolationFunction(
          this.localCarouselPosition,
          -(this.sizes.totalWidth - this.sizes.containerWidth),
          this.inertionDecay / 3
        );
      }
    }

    this.delta = this.localCarouselPosition - previousPosition;

    this.callback({
      position: this.localCarouselPosition,
      delta: this.localCarouselPosition - previousPosition,
    });
  };

  /**
   * Warning: Black Magic!
   * This block corrects the speed so the carousel will auto-allign itself with the wrapper
   */
  private correctSpeed = () => {
    if (
      this.mode === "continuous" ||
      (this.mode === "simple" &&
        this.localCarouselPosition < 0 &&
        this.localCarouselPosition >
          -(this.sizes.totalWidth - this.sizes.containerWidth))
    ) {
      let prognosedIteration = 0;
      let prognosedSpeed = this.speed;
      let prognosedEndPosition = this.localCarouselPosition + prognosedSpeed;

      while (Math.abs(prognosedSpeed) >= 0.02 || prognosedIteration < 100) {
        prognosedIteration++;
        prognosedSpeed = this.interpolationFunction(
          prognosedSpeed,
          0,
          this.inertionDecay
        );
        prognosedEndPosition -= prognosedSpeed;
      }

      prognosedIteration = 0;
      let prognosedDeviation = this.speedCorrection;

      while (Math.abs(prognosedDeviation) >= 0.02 || prognosedIteration < 100) {
        prognosedIteration++;
        prognosedDeviation = this.interpolationFunction(
          prognosedDeviation,
          this.previousDeviation,
          this.inertionDecay
        );
        prognosedEndPosition -= prognosedDeviation;
      }

      const segmentWidth = this.sizes.itemWidth + this.sizes.gapWidth;
      let deviation = prognosedEndPosition % segmentWidth;

      if (deviation > segmentWidth * 0.5) {
        deviation -= segmentWidth;
      } else if (deviation <= -segmentWidth * 0.5) {
        deviation += segmentWidth;
      }

      if (Math.abs(deviation) < 0.1) {
        deviation = 0;
      }

      this.speedCorrection = this.interpolationFunction(
        this.speedCorrection,
        deviation,
        this.inertionDecay
      );

      this.speed += this.speedCorrection;
    } else {
      this.speedCorrection = 0;
    }
  };

  applyTransition: Motion["applyTransition"] = ({ to }) => {
    if (this.isAnimationLocked) {
      return;
    }

    if (this.tween) {
      this.tween.kill();
    }

    this.isAnimationActive = true;
    this.isAnimationLocked = true;

    this.speed = 0;
    this.speedCorrection = 0;

    this.tween = simpleTween(
      {
        from: this.localCarouselPosition,
        to: to,
        duration: 0.6,
        delay: 0,
        ease: easingTypes.easePower2,
      },
      (tweenValue) => {
        if (tweenValue.progress > 0.5 && this.isAnimationLocked) {
          this.isAnimationLocked = false;
        }

        this.localCarouselPosition = tweenValue.value;
        this.delta = tweenValue.delta;

        this.callback({
          delta: tweenValue.delta,
          position: tweenValue.value,
        });
      },
      () => {
        this.isAnimationActive = false;
      }
    );
  };

  applyDrag: Motion["applyDrag"] = ({ isDragActive, dragPosition }) => {
    if (isDragActive) {
      this.isDragActive = true;
      this.dragPosition = dragPosition;
    } else {
      this.previousDragPosition = undefined;
      this.isDragActive = false;
    }
  };
}
