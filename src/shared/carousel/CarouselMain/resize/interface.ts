export interface Resize {
  destroy: VoidFunction;
  resize: () => {
    containerWidth: number,
    itemWidth: number,
    gapWidth: number,
    totalWidth: number,
    leftShift: number,
    numberOfFakeElements: number
  } | undefined;
}

export interface ResizeOptions {
  container: HTMLElement;
  outerWrapper: HTMLElement;
  mode: "simple" | "continuous";
  resizeElements: boolean;
  gap: number;
  padding: number;
  paddingUnits: "px" | "%" | "vw";
  itemWidth: number;
  maximumItemWidth: number;
  total: number;
  elementsPerScreen: {
    breakpoint: number,
    number: number,
  }[];
}