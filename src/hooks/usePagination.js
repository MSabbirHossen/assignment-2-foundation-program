import { useState, useMemo, useEffect } from "react";

/**
 * Custom Hook for Pagination (Single Responsibility Principle)
 */
export function usePagination({
  totalItems = 0,
  initialPage = 1,
  initialItemsPerPage = 12,
  resetDependencies = [],
} = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Reset page to 1 when search/filters/pageSize change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...resetDependencies, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage) || 1,
    [totalItems, itemsPerPage],
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}
