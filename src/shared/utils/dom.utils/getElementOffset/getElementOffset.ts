interface ElementOffset {
  top: number;
  left: number;
}

export const getElementOffset = (
  element: HTMLElement,
  parent?: HTMLElement
): ElementOffset => {
  const getOffsetSum = (
    element: HTMLElement | null,
    parent: HTMLElement | null
  ) => {
    let top = 0;
    let left = 0;

    while (element && element !== parent) {
      top = top + element.offsetTop || 0;
      left = left + element.offsetLeft || 0;
      element = element.offsetParent as HTMLElement;
    }

    return { top: top, left: left };
  };

  return getOffsetSum(element, parent || null);
};
