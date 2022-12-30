import type { CarouselChildrenAnimation } from "../..";

type CarouselAnimationParams = Parameters<CarouselChildrenAnimation>[0];

interface childrenAnimationFlipBySpeedOptions extends CarouselAnimationParams {
}

interface childrenAnimationFlipBySpeed {
  (options: childrenAnimationFlipBySpeedOptions): void;
}

export const childrenAnimationFlipBySpeed:childrenAnimationFlipBySpeed = ({
  elements,
  speed,
}) => {

  
  if (elements.length !== 0) {
    elements.map((item) => {
      if (item.ref.current) {
        if (item.ref.current.parentElement && item.ref.current.parentElement.parentElement) {
          item.ref.current.parentElement.parentElement.style.perspective = `1000px`;
          item.ref.current.parentElement.style.transformStyle = `preserve-3d`;
        };

        let cardRotationAgle = speed;
        let cardScaleCalculated = 1 - (Math.abs(speed) * 0.005);
        
        // Scale limit
        if (cardScaleCalculated < 0.92) {
          cardScaleCalculated = 0.9;
        }

        // Rotation limit
        if (speed > 20) {
          cardRotationAgle = 20
        } else if (speed < -20) {
          cardRotationAgle = -20
        };
        

        item.ref.current.style.transformStyle = `preserve-3d`;
        item.ref.current.style.transform = `rotateY(${cardRotationAgle}deg) scale(${cardScaleCalculated})`;
      }
    })
  }
}