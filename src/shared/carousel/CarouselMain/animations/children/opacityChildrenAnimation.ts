import { ChildrenAnimation } from "./interface";
import { syncResize } from "../../../../resize";
import { smoothstep } from "../../../../utils/math.utils";

export const opacityChildrenAnimation: ChildrenAnimation = ({
  carouselPosition,
  containerWidth,
  elements,
  align,
}) => {
  const ww = syncResize.get().width;

  const threshold = ww > 1024 ? 200 : ww > 640 ? 200 : 0;

  elements.forEach((el) => {
    if (!el.ref.current || !el.compositeAnimationRef.current) return;

    if (align === "center") {
      el.compositeAnimationRef.current.set("CarouselItemAnimation", {
        opacity:
          smoothstep(
            -containerWidth / 2 - threshold / 2,
            -containerWidth / 2 + threshold / 2,
            el.position + carouselPosition
          ) *
          (1 -
            smoothstep(
              containerWidth / 2 - threshold / 2,
              containerWidth / 2 + threshold / 2,
              el.position + carouselPosition
            )),
      });
    } else if (align === "left") {
      el.compositeAnimationRef.current.set("CarouselItemAnimation", {
        opacity:
          smoothstep(-threshold, 0, el.position + carouselPosition) *
          (1 -
            smoothstep(
              containerWidth,
              containerWidth + threshold,
              el.position + carouselPosition
            )),
      });
    }
  });
};
