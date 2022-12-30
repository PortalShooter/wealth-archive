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

  const threshold = 180;

  elements.forEach((el) => {
    if (!el.ref.current || !el.compositeAnimationRef.current) return;

    if (align === "center" && ww < 768) {
      el.compositeAnimationRef.current.set("CarouselItemAnimation", {
        opacity:
          smoothstep(
            -containerWidth / 1.6 - threshold,
            -containerWidth / 1.6 + threshold,
            el.position + carouselPosition
          ) *
          (1 -
            smoothstep(
              containerWidth / 1.6 - threshold,
              containerWidth / 1.6 + threshold,
              el.position + carouselPosition
            )),
      });
    } else {
      el.compositeAnimationRef.current.set("CarouselItemAnimation", {
        opacity: 1,
      });
    }
  });
};
