import { CSSProperties } from "react";

/**
 * Swipe and Drag module
 */
export interface PointerControls {
  /**
   * Destructor
   */
  destroy: VoidFunction;
}

export interface PointerCallback {
  (pointerData: {
    pointerX?: number,
    dragging: boolean,
    touchAction?: CSSProperties["touchAction"]
  }): void;
}

interface PointerControlsOptions {
  outerWrapper: HTMLElement;
  callback: PointerCallback;
}

const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => {
  return (
    (e as TouchEvent).touches !== undefined
  );
};

export class PointerControls {
  private outerWrapper;
  private callback;
  private dragging = false;
  private touch = false;
  private vertical: boolean | undefined;
  private startPointerPosition = {
    x: 0,
    y: 0
  }

  constructor({
    outerWrapper,
    callback
  }:PointerControlsOptions) {
    this.outerWrapper = outerWrapper;
    this.callback = callback;

    this.outerWrapper.addEventListener("mousedown", this.handlePointerStart, { passive: false });
    this.outerWrapper.addEventListener("mousemove", this.handlePointerMove, { passive: false });
    this.outerWrapper.addEventListener("mouseup", this.handlePointerEnd, { passive: false });
    this.outerWrapper.addEventListener("mouseleave", this.handlePointerEnd, { passive: false });
    this.outerWrapper.addEventListener("touchstart", this.handlePointerStart, { passive: false });
    this.outerWrapper.addEventListener("touchmove", this.handlePointerMove, { passive: false });
    this.outerWrapper.addEventListener("touchend", this.handlePointerEnd, { passive: false });
  }

  destroy = () => {
    this.outerWrapper.removeEventListener("mousedown", this.handlePointerStart);
    this.outerWrapper.removeEventListener("mousemove", this.handlePointerMove);
    this.outerWrapper.removeEventListener("mouseup", this.handlePointerEnd);
    this.outerWrapper.removeEventListener("mouseleave", this.handlePointerEnd);
    this.outerWrapper.removeEventListener("touchstart", this.handlePointerStart);
    this.outerWrapper.removeEventListener("touchmove", this.handlePointerMove);
    this.outerWrapper.removeEventListener("touchend", this.handlePointerEnd);
  }

  private handlePointerStart = (e:TouchEvent | MouseEvent) => {
    this.dragging = true;

    let x: number;
    let y: number;

    if (isTouchEvent(e)) {
			if (e.touches.length !== 1) {
				return false;
			}
			x = e.touches[0].clientX;
			y = e.touches[0].clientY;

			this.touch = true;
		} else {
			x = e.clientX;
			y = e.clientY;

			this.touch = false;
		}

    this.vertical = undefined;

    this.startPointerPosition = {
      x: x,
      y: y
    }

    this.callback({
      pointerX: x,
      dragging: this.dragging
    });
  }
  
  private handlePointerMove = (e:TouchEvent | MouseEvent) => {
		if (!this.dragging) {
			return false;
		}

    let x: number;
    let y: number;

		if (isTouchEvent(e)) {
			if (e.touches.length !== 1) {
				return false;
			}

			x = e.touches[0].clientX;
			y = e.touches[0].clientY;

			this.touch = true;
		} else {
			x = e.clientX;
			y = e.clientY;

			this.touch = false;
		}

    const delta = {
			x: this.startPointerPosition.x - x,
			y: this.startPointerPosition.y - y,
		};

		if (this.vertical === undefined && delta.x !== 0 && delta.y !== 0) {
			this.vertical = Math.abs(delta.x) < Math.abs(delta.y);
		}

		if (this.vertical) {
      this.callback({
        dragging: this.dragging,
        touchAction: "pan-y",
      });

			return false;
		} else {
			if (this.touch) {
				e.preventDefault();
				e.stopPropagation();
			}
		}

    this.callback({
      pointerX: x,
      dragging: this.dragging,
      touchAction: "none"
    });
  }
  
  private handlePointerEnd = () => {
    this.dragging = false;

		this.startPointerPosition = {
      x: 0,
      y: 0
    };

    this.callback({
      dragging: this.dragging,
      touchAction: "pan-y"
    });
  }
}