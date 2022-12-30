import { EventEmitter, Handler } from "../../../shared/utils/EventEmitter";

interface WindowSize {
  width: number;
  height: number;
}

interface ResizeEvent {
  type: "resize";
}

/**
 * Lets you to the window resize event end get it's data
 */
export interface SyncResize {
  /**
   * Subscribe to the window resize event
   */
  subscribe: (handler: Handler<ResizeEvent>) => void;
  /**
   * Unsubscribe from the window resize event
   */
  unsubscribe: (handler: Handler<ResizeEvent>) => void;
  /**
   * Get the window size
   */
  get: () => WindowSize;
}

export class SyncResize {
  private eventEmitter = new EventEmitter<ResizeEvent>();
  private width = 0;
  private height = 0;

  constructor() {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("orientationchange", this.onResize, {
      passive: true,
    });
    window.addEventListener("load", this.onResize, { passive: true });

    this.onResize();
  }

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.eventEmitter.dispatch({
      type: "resize"
    });
  };

  get = () => {
    return {
      width: this.width,
      height: this.height,
    };
  };

  subscribe: SyncResize["subscribe"] = (handler) => {
    return this.eventEmitter.subscribe(handler);
  };

  unsubscribe: SyncResize["unsubscribe"] = (handler) => {
    return this.eventEmitter.unsubscribe(handler);
  };
}

export const syncResize:SyncResize = new SyncResize();