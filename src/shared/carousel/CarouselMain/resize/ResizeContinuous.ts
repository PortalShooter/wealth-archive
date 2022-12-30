import { syncResize } from "../../../resize";
import type { Resize, ResizeOptions } from "./interface";

export class ResizeContinuous implements Resize {
  private gap: number;
  private outerWrapper: HTMLElement;
  private container: HTMLElement;
  private elementsPerScreen: any[];
  private resizeElements: boolean;
  private padding: number;
  private paddingUnits: string;
  private itemWidth: number;
  private maximumItemWidth: number;
  private total: number;

  constructor(options: ResizeOptions) {
    this.gap = options.gap;
    this.outerWrapper = options.outerWrapper;
    this.container = options.container;
    this.elementsPerScreen = options.elementsPerScreen;
    this.resizeElements = options.resizeElements;
    this.padding = options.padding;
    this.paddingUnits = options.paddingUnits;
    this.itemWidth = options.itemWidth;
    this.maximumItemWidth = options.maximumItemWidth;
    this.total = options.total;
  }

  destroy = () => {};

  resize = () => {
    if (!this.container) return;

    const screenWidth = syncResize.get().width;
    let itemsPerWrapper: number;

    if (this.resizeElements) {
      itemsPerWrapper = this.elementsPerScreen.reduce(function (prev: any, cur: { breakpoint: number; }) {
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

    const padding =
      this.paddingUnits === "px"
        ? this.padding
        : this.paddingUnits === "%"
        ? (this.container.clientWidth * this.padding) / 100
        : this.paddingUnits === "vw"
        ? screenWidth * this.padding
        : 0

    itemsPerWrapper =
      Math.floor(
        (this.outerWrapper.clientWidth + padding) /
          (this.itemWidth + this.gap)
      ) + 1;

    const totalWidth = (this.itemWidth + this.gap) * this.total;
    const numberOfFakeElements = itemsPerWrapper;
    const leftShift = -numberOfFakeElements * (this.itemWidth + this.gap);

    return {
      containerWidth: this.outerWrapper.clientWidth,
      itemWidth: this.itemWidth,
      gapWidth: this.gap,
      totalWidth,
      leftShift,
      numberOfFakeElements,
    };
  };
}
