export const getFocusable = (element?: HTMLElement, anyTabIndex?: boolean):Array<HTMLElement> => {
  if (!element) element = document.documentElement;

  const nodeList = element.querySelectorAll(
    `a, button, input, textarea, select, details, [tabindex]`
  ) as NodeListOf<HTMLElement>;
  const nodeArray = Array.prototype.slice.call(nodeList);

  return nodeArray.filter((el) => {
    if (!anyTabIndex) {
      const tabindex = el.getAttribute("tabindex");

      if (tabindex && parseInt(tabindex) < 0) {
        return false;
      }
    }
    return !el.hasAttribute("disabled")
  });
};
