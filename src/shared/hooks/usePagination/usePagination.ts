import { useState, useCallback } from "react";

import { DefaultObject } from "@/shared/utils/object.utils";

interface UsePaginationParams {
  /** Initial items list */
  items: DefaultObject[];
  /** Maximum count of items per page */
  maxCount: number;
}

interface UsePaginationResult {
  /** Current visible items */
  visibleItems: DefaultObject[];
  /** True if has hidden items */
  hasNextPage: boolean;
  /** On show next page action */
  onShowNextPage: () => void;
}

export const usePagination = ({
  items,
  maxCount,
}: UsePaginationParams): UsePaginationResult => {
  const initialVisibleItems = items.slice(0, maxCount);
  const initialHiddenItems = items.slice(maxCount, items.length);

  const pagesCount = Math.round((items.length - maxCount) / maxCount + 1);

  const [visibleItems, setVisibleItems] =
    useState<DefaultObject[]>(initialVisibleItems);
  const [hiddenItems, setHiddenItems] =
    useState<DefaultObject[]>(initialHiddenItems);
  const [pageNumber, setPageNumber] = useState(1);

  const [hasNextPage, setHasNextPage] = useState(items.length > maxCount);

  const handleLoadNextPage = useCallback(() => {
    const nextPageItems: DefaultObject[] = hiddenItems.slice(0, maxCount);

    setHasNextPage(pageNumber + 1 !== pagesCount);
    setPageNumber(pageNumber + 1);
    setHiddenItems(hiddenItems.slice(maxCount, hiddenItems.length));
    setVisibleItems([...visibleItems, ...nextPageItems]);
  }, [pageNumber, hiddenItems, visibleItems, pagesCount, maxCount]);

  return {
    visibleItems: visibleItems,
    hasNextPage,
    onShowNextPage: handleLoadNextPage,
  };
};
