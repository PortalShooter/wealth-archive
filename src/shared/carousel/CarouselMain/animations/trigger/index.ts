import { TriggerAnimation } from "./interface";
import { bounceTriggerAnimation } from "./bounceTriggerAnimation";
import { noTriggerAnimation } from "./noTriggerAnimation";

export type { TriggerAnimation };

export { bounceTriggerAnimation, noTriggerAnimation };

export const triggerAnimations = {
  none: noTriggerAnimation,
  bounce: bounceTriggerAnimation
}
