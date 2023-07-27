import { useMemo } from "react";

export const DOTS = '...'

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

type UsePaginationArgs = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: UsePaginationArgs) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;


	
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    console.log(totalPageNumbers , totalPageCount);
    
    const shouldShowLeftDots = leftSiblingIndex > 4;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 4;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      const rightItemCount = 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return []
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
