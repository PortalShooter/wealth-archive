import { Carousel } from "./Carousel";
import { CarouselItem } from "./CarouselItem";
import { ChildrenAnimation, childrenAnimations } from "./animations/children";
import { TriggerAnimation, triggerAnimations } from "./animations/trigger";

export type { 
  ChildrenAnimation as CarouselChildrenAnimation,
  TriggerAnimation as CarouselTriggerAnimation
}

export { 
  Carousel, 
  CarouselItem, 
  childrenAnimations as carouselChildrenAnimations,
  triggerAnimations as carouselTriggerAnimations
}