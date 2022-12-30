import { EventEmitter, Handler } from "../../utils/EventEmitter";

type WatchedElement = HTMLElement | Window;

type ScrollModes = "normal" | "smooth";

interface ScrollPosition {
  left: number;
  top: number;
}

interface ContainerData {
  mode: ScrollModes;
  locked: boolean;
  synthetic: boolean;
  element: WatchedElement;
  rawPosition: ScrollPosition;
  scrollPosition: ScrollPosition;
  handler: VoidFunction;
}

interface ScrollEvent {
  type: "scroll";
}

/**
 * Lets you subscribe to scroll events end get it's data
 */
export interface SyncScroll {
  /**
   * Subscribe to scroll event
   */
  subscribe: (handler: Handler<ScrollEvent>) => void;
  /**
   * Unsubscribe from scroll event
   */
  unsubscribe: (handler: Handler<ScrollEvent>) => void;
  /**
   * Unsubscribe all scroll events
   */
  unsubscribeAll: () => void;
  /**
   * Get window scroll data
   */
  get: () => {
    readonly locked: boolean;
    readonly synthetic: boolean;
    readonly mode: ScrollModes;
    readonly left: number;
    readonly top: number;
    readonly rawLeft: number;
    readonly rawTop: number;
  };
  /**
   * Get scroll data by element
   */
  getContainer: (element: WatchedElement) => ContainerData;
  /**
   * Add new tracked element
   */
  addContainer: (containerOptions: {
    mode?: ScrollModes;
    element: WatchedElement;
  }) => void;
  /**
   * Set any options to container (locked, synthetic or mode)
   */
  setContainer: (containerOptions: {
    mode?: ScrollModes;
    synthetic?: boolean;
    locked?: boolean;
    element: WatchedElement;
  }) => void;
}

const isScrollPosition = (position: any): position is ScrollPosition => {
  if (!position) return false;

  if (typeof position.top === "number" && typeof position.left === "number") {
    return true;
  } else {
    return false;
  }
};

export class SyncScroll {
  private eventEmitter = new EventEmitter<ScrollEvent>();
  private containers: Array<ContainerData> = [];

  constructor() {
    if (typeof window === "undefined") return;

    this.addContainer({
      mode: "normal",
      element: window,
    });
  }

  addContainer = ({
    mode = "normal",
    element,
  }: Parameters<SyncScroll["addContainer"]>[0]) => {
    if (typeof window === "undefined") return;

    if (this.containers.find((c) => c.element === element)) {
      throw new Error("Container already exists");
    }

    const container: ContainerData = {
      element: element,
      mode: mode,
      locked: false,
      synthetic: false,
      rawPosition: { top: 0, left: 0 },
      scrollPosition: { top: 0, left: 0 },
      handler: () => {},
    };

    container.scrollPosition = this.getScrollPosition(container, true);
    container.rawPosition = this.getRawPosition(container, true);
    container.handler = () => {
      this.onScroll(container);
    };

    this.containers.push(container);

    element.addEventListener("scroll", container.handler, { passive: false });
  };

  setContainer = ({
    mode,
    synthetic,
    locked,
    element,
  }: Parameters<SyncScroll["setContainer"]>[0]) => {
    if (typeof window === "undefined") return;

    const container = this.containers.find((c) => c.element === element);

    if (container) {
      if (mode !== undefined) {
        container.mode = mode;
        if (mode === "smooth") {
          container.element.removeEventListener("scroll", container.handler);
        } else if (mode === "normal") {
          container.element.addEventListener("scroll", container.handler, { passive: false });
        }
      }
      if (synthetic !== undefined) {
        container.synthetic = synthetic;
      }
      if (locked !== undefined) {
        container.locked = locked;
      }
    } else {
      throw new Error("Container doesn't exists");
    }
  };

  setSynthetic = ({
    element,
    synthetic,
  }: {
    element: WatchedElement;
    synthetic: boolean;
  }) => {
    const container = this.containers.find(
      (c) => c.element === (element || window)
    );
    if (container) {
      container.synthetic = synthetic;
    } else {
      throw new Error("Container doesn't exists");
    }
  };

  onScroll = (container: ContainerData, event?: CustomEvent) => {
    let originalScroll = Object.assign({}, container.scrollPosition);
    let originalRaw = Object.assign({}, container.rawPosition);

    if (
      event &&
      container.mode === "smooth" &&
      isScrollPosition(event.detail)
    ) {
      container.scrollPosition.top = event.detail.top;
      container.scrollPosition.left = event.detail.left;
    } else {
      container.scrollPosition = this.getScrollPosition(container);
    }

    container.rawPosition = this.getRawPosition(container);

    if (
      Math.abs(container.scrollPosition.left - originalScroll.left) >= 0.01 ||
      Math.abs(container.scrollPosition.top - originalScroll.top) >= 0.01 ||
      Math.abs(container.rawPosition.left - originalRaw.left) >= 0.01 ||
      Math.abs(container.rawPosition.top - originalRaw.top) >= 0.01
    ) {
      this.eventEmitter.dispatch({
        type: "scroll",
      });
    }
  };

  getRawPosition = (container: ContainerData, forced: boolean = false) => {
    if (forced) {
      return {
        top: (container.element as HTMLElement).scrollTop || 0,
        left: (container.element as HTMLElement).scrollLeft || 0,
      };
    } else {
      if (container.locked && container.element === window) {
        return container.rawPosition;
      } else {
        if (container.element === window) {
          return {
            top: container.element.scrollY || 0,
            left: container.element.scrollX || 0,
          };
        } else {
          return {
            top: (container.element as HTMLElement).scrollTop || 0,
            left: (container.element as HTMLElement).scrollLeft || 0,
          };
        }
      }
    }
  };

  getScrollPosition = (container: ContainerData, forced: boolean = false) => {
    if (forced) {
      return this.getRawPosition(container, forced);
    } else {
      if (container.locked && container.element === window) {
        return container.scrollPosition;
      } else {
        return this.getRawPosition(container, forced);
      }
    }
  };

  get: SyncScroll["get"] = () => {
    return {
      locked: this.containers[0].locked,
      synthetic: this.containers[0].synthetic,
      mode: this.containers[0].mode,
      left: this.containers[0].scrollPosition.left,
      top: this.containers[0].scrollPosition.top,
      rawLeft: this.containers[0].rawPosition.left,
      rawTop: this.containers[0].rawPosition.top,
    };
  };

  getContainer: SyncScroll["getContainer"] = (element: WatchedElement) => {
    const container = this.containers.find((c) => c.element === element);

    if (!container) {
      throw new Error("Container doesn't exist");
    }

    return container;
  };

  subscribe: SyncScroll["subscribe"] = (handler) => {
    return this.eventEmitter.subscribe(handler);
  };

  unsubscribe: SyncScroll["unsubscribe"] = (handler) => {
    return this.eventEmitter.unsubscribe(handler);
  };

  unsubscribeAll: SyncScroll["unsubscribeAll"] = () => {
    return this.eventEmitter.unsubscribeAll();
  };
}

export const syncScroll: SyncScroll = new SyncScroll();
