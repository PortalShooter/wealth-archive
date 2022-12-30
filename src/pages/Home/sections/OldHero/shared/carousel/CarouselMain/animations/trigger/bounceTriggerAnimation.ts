import { TriggerAnimation, AnimationItem } from "./interface";
import { syncResize } from "../../../../resize";
import { simpleTween } from "../../../../utils/animation.utils";
import { easingTypes } from "../../../../../app/config/ease.config";
import { ExtendedTweenStatus } from "../../../../utils/animation.utils";
import bezierEasing from "../../../../../app/config/bezier-easing.lib";

export const bounceTriggerAnimation: TriggerAnimation = ({
  carouselPosition,
  containerWidth,
  elements,
  gapWidth,
  totalWidth,
  align,
  triggered,
  immidiate,
}) => {
  const ww = syncResize.get().width;
  const speedMultiplyer = immidiate ? 0 : 1;

  const onTick = (
    element: AnimationItem,
    opacity: number,
    tick: ExtendedTweenStatus<number>
  ) => {
    if (!element.compositeAnimationRef.current) return;

    element.compositeAnimationRef.current.set(`carousel-trigger`, {
      opacity: opacity,
      transform: {
        y: tick.value,
      },
    });
  };

  elements.forEach((el) => {
    let pos = el.position + carouselPosition;

    if (triggered) {
      simpleTween(
        {
          from: 137,
          to: -15,
          delay: Math.abs(pos / ww) * speedMultiplyer,
          duration: 1.45 * speedMultiplyer,
          ease: bezierEasing(0.82, 0, 0.66, 0.99),
        },
        (tick) => {
          onTick(el, tick.easeProgress, tick);
        }
      )
        .promise?.then(() => {
          return simpleTween(
            {
              from: -15,
              to: 7,
              delay: 0,
              duration: 0.5 * speedMultiplyer,
              ease: bezierEasing(0.28, 0, 0.55, 1),
            },
            (tick) => {
              onTick(el, 1, tick);
            }
          ).promise;
        })
        .then(() => {
          return simpleTween(
            {
              from: 7,
              to: 0,
              delay: 0,
              duration: 0.85 * speedMultiplyer,
              ease: bezierEasing(0.31, 0, 0.33, 1),
            },
            (tick) => {
              onTick(el, 1, tick);
            }
          ).promise;
        });
    } else {
      simpleTween(
        {
          from: 0,
          to: 200,
          delay: Math.abs(pos / ww) * speedMultiplyer,
          duration: 2.3 * speedMultiplyer,
          ease: easingTypes.easeIn,
        },
        (tick) => {
          onTick(el, 1 - tick.easeProgress, tick);
        }
      );
    }
  });
};
