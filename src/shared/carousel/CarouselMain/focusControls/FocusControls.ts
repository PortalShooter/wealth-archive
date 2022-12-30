import { carouselEventEmitter } from "../../useCarousel";

export interface FocusControls {
  destroy: VoidFunction;
}

interface FocusControlsOptions {
  container: HTMLElement;
  id: string;
  ariaLabel: string;
}

export class FocusControls {
  private container;
  private id;
  private isFocusOn = false;

  constructor({
    id,
    container, 
    ariaLabel
  }: FocusControlsOptions) {
    this.id = id;
    this.container = container;

    this.container.setAttribute("tabindex", "0");
    this.container.setAttribute("aria-label", ariaLabel);

    this.container.addEventListener("focus", this.handleFocus);
    this.container.addEventListener("blur", this.handleBlur);
    document.addEventListener('keydown', this.handleKeyboard);
  }

  destroy = () => {
    this.container.removeAttribute("tabindex");
    this.container.removeAttribute("aria-label");

    this.container.removeEventListener("focus", this.handleFocus);
    this.container.removeEventListener("blur", this.handleBlur);
    document.removeEventListener('keydown', this.handleKeyboard);
  }
  
  private handleFocus = () => {
    this.isFocusOn = true;
  };

  private handleBlur = () => {
    this.isFocusOn = false;
  };

  private handleKeyboard = (e: KeyboardEvent) => {
    if (!this.isFocusOn) return;

    if (e.key === "ArrowLeft") {
      carouselEventEmitter.dispatch({
        type: "carousel:byIndex",
        payload: {
          id: this.id,
          scrollValue: -1,
        },
      });
    } else if (e.key === "ArrowRight") {
      carouselEventEmitter.dispatch({
        type: "carousel:byIndex",
        payload: {
          id: this.id,
          scrollValue: 1,
        },
      });
    }
  }
}