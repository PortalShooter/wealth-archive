import { carouselEventEmitter } from "../../useCarousel";

/**
 * Focus on interactive elements inside the carousel
 */
export interface TabControls {
  /**
   * Destructor
   */
  destroy: VoidFunction;
}

interface TabControlsOptions {
  container: HTMLElement;
  id: string;
  applySectionScrollFix: boolean;
  childrenRefs: React.RefObject<HTMLDivElement | null>[];
}

export class TabControls {
  private container: HTMLElement;
  private id: string;
  private childrenRefs:  React.RefObject<HTMLDivElement | null>[];
  private applySectionScrollFix: boolean;

  constructor({
    container,
    id,
    childrenRefs,
    applySectionScrollFix
  }: TabControlsOptions) {
    this.container = container;
    this.id = id;
    this.childrenRefs = childrenRefs;
    this.applySectionScrollFix = applySectionScrollFix;

    document.addEventListener("keydown", this.handleKeyboard);
  }

  destroy = () => {
    document.removeEventListener("keydown", this.handleKeyboard);
  }

  handleKeyboard = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      setTimeout(() => {
        const activeElement = document.activeElement;

        if (!activeElement || !this.container.contains(activeElement)) {
          return;
        }

        this.childrenRefs.forEach((item, i) => {
          if (item.current && item.current.contains(activeElement)) {
            carouselEventEmitter.dispatch({
              type: "carousel:toIndex",
              payload: {
                id: this.id,
                scrollValue: i,
              },
            });

            this.container.scrollTo(0, 0);

            requestAnimationFrame(() => {
              this.container.scrollTo(0, 0);
            });

            if (this.applySectionScrollFix) {
              const section = this.container.closest("section");
              if (section) {
                section.scrollTo(0, section.scrollTop);

                requestAnimationFrame(() => {
                  section.scrollTo(0, section.scrollTop);
                });
              }
            }
          }
        });
      }, 0);
    }
  };
}