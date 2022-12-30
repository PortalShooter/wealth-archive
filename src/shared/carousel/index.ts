import { Carousel } from "./CarouselMain";
import { useCarousel, carouselEventEmitter, CarouselEvent } from "./useCarousel";
import type {
  CarouselChildrenAnimation,
  CarouselTriggerAnimation,
} from "./CarouselMain";
import { CarouselControl } from "./CarouselControl";

export type {
  CarouselChildrenAnimation,
  CarouselTriggerAnimation,
  CarouselEvent
};

export { Carousel, CarouselControl, useCarousel, carouselEventEmitter };
