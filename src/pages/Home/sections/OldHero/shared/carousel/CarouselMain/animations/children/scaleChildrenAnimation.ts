import { ChildrenAnimation } from "./interface";
import { syncResize } from "../../../../resize";
import { smoothstep } from "../../../../utils/math.utils";

export const scaleChildrenAnimation: ChildrenAnimation = ({
  carouselPosition,
  containerWidth,
  elements,
  align,
}) => {
  const ww = syncResize.get().width;

  const threshold = ww / 1.1;

  elements.forEach((el, i) => {
    if (!el.ref.current || !el.compositeAnimationRef.current) return;

    const koefRight = Math.max(
      0.6,
      1 -
        smoothstep(
          containerWidth - threshold,
          containerWidth + threshold,
          el.position + carouselPosition
        )
    );
    const koefLeft = Math.max(
      0.6,
      smoothstep(
        -containerWidth - threshold,
        -containerWidth + threshold,
        el.position + carouselPosition
      )
    );

    const originLeft = (1 - koefLeft) * 50;
    const originRight = -(1 - koefRight) * 50;

    if (align === "center" && ww > 767) {
      el.ref.current.style.transform = `scale(${koefLeft * koefRight})`;
      el.ref.current.style.transformOrigin = `${
        (originLeft + originRight) * 2 + 50
      }% center`;
    } else {
      el.ref.current.style.transform = `scale(1)`;
      el.ref.current.style.transformOrigin = `center center`;
    }
  });
};
