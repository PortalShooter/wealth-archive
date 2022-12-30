import { Animation } from "./interface";

export class AnimationNone implements Animation {
  constructor() {}

  destroy() {}

  open: Animation["open"] = ({ duration }) => {}
  
  close: Animation["close"] = ({ duration }) => {}
}