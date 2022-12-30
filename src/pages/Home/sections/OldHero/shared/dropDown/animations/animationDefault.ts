import { Animation, AnimationOptions } from "./interface";
import { transition } from "../../utils/animation.utils";
import { cssEasings } from "../../../app/config/ease.config";
import { syncResize } from "../../resize";

export class AnimationDefault implements Animation {
  private innerWrapper: React.RefObject<HTMLDivElement>;
  private outerWrapper: React.RefObject<HTMLDivElement>;
  private maxHeight: number;
  private openTimeout: number | undefined;
  private dispatchResize: boolean;

  constructor(options: AnimationOptions) {
    this.innerWrapper = options.innerWrapper;
    this.outerWrapper = options.outerWrapper;
    this.maxHeight = options.maxHeight;
    this.dispatchResize = options.dispatchResize;
  }

  destroy: Animation["destroy"] = () => {};

  open: Animation["open"] = ({ duration }) => {
    if (!window) return;
    if (!this.innerWrapper.current || !this.outerWrapper.current) return;

    transition(
      this.outerWrapper.current,
      duration,
      {
        height:
          Math.min(this.maxHeight, this.innerWrapper.current.clientHeight) +
          "px",
      },
      {
        ease: cssEasings.easeOut,
      }
    );

    clearTimeout(this.openTimeout);

    this.openTimeout = window.setTimeout(() => {
      if (!this.innerWrapper.current || !this.outerWrapper.current) return;

      if (this.maxHeight < this.innerWrapper.current.clientHeight) {
        this.outerWrapper.current.style.overflow = "auto";
        this.outerWrapper.current.style.height =
          Math.min(this.maxHeight, this.innerWrapper.current.clientHeight) +
          "px";
      } else {
        this.outerWrapper.current.style.height = "auto";
      }

      if (this.dispatchResize) {
        syncResize.onResize();
      }
    }, duration * 1000);
  };

  close: Animation["close"] = ({ duration = 0 }) => {
    if (!window) return;
    if (!this.innerWrapper.current || !this.outerWrapper.current) return;

    const height =
      this.maxHeight < this.innerWrapper.current.clientHeight
        ? this.maxHeight
        : this.innerWrapper.current.clientHeight;

    this.outerWrapper.current.style.overflow = "hidden";

    transition(this.outerWrapper.current, 0, {
      height: height + "px",
    });

    if (duration > 0) {
      clearTimeout(this.openTimeout);

      this.openTimeout = window.setTimeout(() => {
        if (!this.outerWrapper.current) return;

        transition(
          this.outerWrapper.current,
          duration,
          {
            height: "0px",
          },
          {
            ease: cssEasings.easeOut,
          }
        );

        this.openTimeout = window.setTimeout(() => {
          if (this.dispatchResize) {
            syncResize.onResize();
          }
        }, duration * 1000);
      }, 20);
    }
  };
}
