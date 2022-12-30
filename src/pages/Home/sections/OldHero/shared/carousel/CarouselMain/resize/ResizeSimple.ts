import { syncResize } from "../../../resize";
import type { Resize, ResizeOptions } from "./interface";

export class ResizeSimple implements Resize {
  private gap: number;
  private outerWrapper: HTMLElement;
  private container: HTMLElement;
  private elementsPerScreen: any[];
  private resizeElements: boolean;
  private itemWidth: number;
  private maximumItemWidth: number;
  private total: number;

  constructor(options: ResizeOptions) {
    this.gap = options.gap;
    this.outerWrapper = options.outerWrapper;
    this.container = options.container;
    this.elementsPerScreen = options.elementsPerScreen;
    this.resizeElements = options.resizeElements;
    this.itemWidth = options.itemWidth;
    this.maximumItemWidth = options.maximumItemWidth;
    this.total = options.total;
  }

  destroy = () => {};

  resize = () => {
    if (!this.container) return;

    const screenWidth = syncResize.get().width;

    if (this.resizeElements) {
      const itemsPerWrapper = this.elementsPerScreen.reduce(function (
        prev,
        cur
      ) {
        return cur.breakpoint < screenWidth ? cur : prev;
      }).number;

      this.itemWidth = Math.floor(
        Math.min(
          this.maximumItemWidth,
          (this.outerWrapper.clientWidth - this.gap * (itemsPerWrapper - 1)) /
            itemsPerWrapper
        )
      );
    }

    const totalWidth =
      (this.itemWidth + this.gap) * (this.total - 1) + this.itemWidth;

    return {
      containerWidth: this.outerWrapper.clientWidth,
      itemWidth: this.itemWidth,
      gapWidth: this.gap,
      totalWidth,
      leftShift: 0,
      numberOfFakeElements: 0,
    };
  };
}
